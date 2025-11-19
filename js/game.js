// Night Shift - Main Game Engine

const Game = {
    // Game state
    state: {
        character: null,
        currentPartner: null,
        currentCall: null,
        time: 1140, // 19:00 in minutes
        day: 1, // Monday
        onShift: false,
        currentDistrict: 'downtown',
        dialogueQueue: [],
        phase: 'menu' // menu, creation, prologue, game
    },

    // Character creation state
    creationState: {
        background: null,
        archetype: null,
        skillValues: {},
        remainingPoints: 10
    },

    // Initialize game
    init() {
        console.log('Night Shift initializing...');

        // Initialize systems
        AudioSystem.init();
        UI.init();
        DialogueSystem.init();

        // Initialize skill values for creation
        const allSkills = CharacterSystem.getAllSkills();
        allSkills.forEach(skill => {
            this.creationState.skillValues[skill.id] = 5;
        });

        // Play menu music
        AudioSystem.playMusic('menu');

        console.log('Night Shift initialized');
    },

    // Start new game
    newGame() {
        this.creationState = {
            background: null,
            archetype: null,
            skillValues: {},
            remainingPoints: 10
        };

        // Reset skill values
        const allSkills = CharacterSystem.getAllSkills();
        allSkills.forEach(skill => {
            this.creationState.skillValues[skill.id] = 5;
        });

        UI.renderCharacterCreation();
        UI.showScreen('character-creation');
    },

    // Continue saved game
    continueGame() {
        const saveData = Utils.load('night_shift_save');
        if (saveData) {
            this.loadGameData(saveData);
            UI.showScreen('game-screen');
            this.state.phase = 'game';
            this.updateGame();
        }
    },

    // Start game after character creation
    startGame() {
        const name = UI.elements.playerName.value.trim() || 'Alex';
        const background = this.creationState.background;
        const archetype = this.creationState.archetype;

        if (!background || !archetype) {
            UI.showNotification('Please select a background and archetype', 'warning');
            return;
        }

        // Create character
        const character = CharacterSystem.createCharacter(name, background, archetype);

        // Apply custom skill allocations
        for (const skillId in this.creationState.skillValues) {
            const customValue = this.creationState.skillValues[skillId];
            if (customValue !== 5) {
                character.skills[skillId] = Utils.clamp(
                    character.skills[skillId] + (customValue - 5),
                    1, 15
                );
            }
        }

        // Initialize relationships
        for (const partnerId in PartnerSystem.partners) {
            character.relationships[partnerId] = PartnerSystem.initializeRelationship(partnerId);
        }

        // Set game state
        this.state.character = character;
        this.state.phase = 'prologue';
        this.state.time = 1380; // 23:00 - late night for prologue
        this.state.day = 0;

        // Show game screen
        UI.showScreen('game-screen');
        UI.updateHUD(this.state);

        // Start prologue
        this.startPrologue();
    },

    // Start the traumatic prologue sequence
    async startPrologue() {
        AudioSystem.playMusic('ambient_tense');

        // Set partner for prologue (Marcus - the veteran)
        this.state.currentPartner = 'marcus';

        // Opening scene
        UI.setScene('Five years ago. The call that changed everything.');

        await this.showDialogue('narrator', 'The radio crackles. Another call. But this one will be different.');
        await this.showDialogue('narrator', 'This one will follow you.');

        await Utils.sleep(1000);

        // Dispatch call
        AudioSystem.play('radio_dispatch');
        await this.showDialogue('dispatch', 'Unit 7, respond to 1847 Oak Street. Pediatric emergency. 6-year-old, not breathing. CPR in progress.');

        await this.showDialogue('marcus', '"Shit. Pediatric arrest. You ready for this, kid?"');

        // First choice
        const response = await this.showChoices([
            { text: '"Ready as I\'ll ever be."', style: 'professional', effect: { composure: 1 } },
            { text: '"Six years old... God."', style: 'emotional', effect: { empathy: 1 } },
            { text: '*Stay silent, check equipment*', style: 'neutral', effect: { stress: -2 } }
        ]);

        if (response.index === 1) {
            await this.showDialogue('marcus', '"Don\'t think about the age. Think about the protocol. That\'s how you survive this job."');
        }

        // En route
        AudioSystem.play('siren');
        UI.setScene('Racing through the night. Every second counts.');

        await this.showDialogue('narrator', 'The siren tears through the darkness. Your partner drives. You prepare.');

        // Internal monologue - skill voice
        const voices = DialogueSystem.getSkillVoices(['stress', 'gut_feeling'], this.state.character);
        for (const voice of voices) {
            await this.showSkillVoice(voice);
        }

        // Arrival
        AudioSystem.stop('siren');
        UI.setScene('A house. Lights blazing. A woman screaming on the lawn.');

        await this.showDialogue('narrator', 'You arrive to chaos. A mother, inconsolable. Neighbors watching. A father appears in the doorway, carrying a small, limp form.');

        await this.showDialogue('narrator', '"HELP HER! PLEASE!"');

        // Scene assessment
        await this.showDialogue('marcus', '"I\'ve got the mother. You take the kid. Go."');

        // Skill check - Composure
        const composureCheck = await this.performSkillCheckWithDisplay('composure', 12);

        if (composureCheck.success) {
            await this.showDialogue('narrator', 'Your training takes over. You move.');
        } else {
            MentalHealthSystem.applyStress(this.state.character, 'traumatic_injury', 0.5);
            await this.showDialogue('narrator', 'Your hands shake. Your vision narrows. But you move anyway.');
        }

        // Assessment
        UI.setScene('A little girl. Brown hair. Pink pajamas. Not breathing.');

        await this.showDialogue('narrator', 'She\'s cyanotic. No pulse. Pupils fixed and dilated.');

        // Internal voice
        const traumaVoices = DialogueSystem.getSkillVoices(['severe_injury', 'patient_pain'], this.state.character);
        for (const voice of traumaVoices) {
            await this.showSkillVoice(voice);
        }

        // Critical choice
        const actionChoice = await this.showChoices([
            {
                text: 'Start CPR immediately',
                style: 'professional',
                skillCheck: { skill: 'cardiology', difficulty: 14 }
            },
            {
                text: 'Check airway first - could be obstruction',
                style: 'analytical',
                skillCheck: { skill: 'airway_management', difficulty: 12 }
            },
            {
                text: 'Ask father what happened - need history',
                style: 'investigative',
                skillCheck: { skill: 'observation', difficulty: 10 }
            }
        ]);

        // Process the choice
        let foundObstruction = false;

        if (actionChoice.index === 1) {
            // Airway check
            const airwayCheck = await this.performSkillCheckWithDisplay('airway_management', 12);
            if (airwayCheck.success) {
                foundObstruction = true;
                await this.showDialogue('narrator', 'Foreign body. Grape. Lodged in the trachea.');
                await this.showDialogue('narrator', 'You extract it. Clear the airway.');

                const voices2 = DialogueSystem.getSkillVoices(['recall'], this.state.character);
                for (const voice of voices2) {
                    await this.showSkillVoice(voice);
                }
            } else {
                await this.showDialogue('narrator', 'You check but find nothing obvious. Precious seconds lost.');
            }
        } else if (actionChoice.index === 2) {
            // Ask father
            const obsCheck = await this.performSkillCheckWithDisplay('observation', 10);
            if (obsCheck.success) {
                await this.showDialogue('narrator', '"She was eating grapes. Started choking. We tried—we tried to—"');
                foundObstruction = true;
                await this.showDialogue('narrator', 'Obstruction. You check the airway and find it.');
            } else {
                await this.showDialogue('narrator', '"I don\'t know! She just—just stopped!"');
                await this.showDialogue('narrator', 'No useful information. You proceed blind.');
            }
        }

        // CPR sequence
        AudioSystem.play('heartbeat');
        UI.setScene('Compressions. Breaths. The rhythm of attempted resurrection.');

        await this.showDialogue('narrator', 'You begin CPR. Thirty compressions. Two breaths. Check rhythm.');

        // Multiple rounds of CPR with checks
        for (let round = 1; round <= 3; round++) {
            await this.showDialogue('narrator', `Round ${round}. No response.`);

            if (round === 2) {
                await this.showDialogue('marcus', '"Epi\'s on board. Come on, kid, come on..."');
            }

            // Skill check for CPR quality
            const cprCheck = await this.performSkillCheckWithDisplay('cardiology', 13 + round);

            if (!cprCheck.success) {
                await this.showDialogue('narrator', 'Your rhythm falters. Fatigue. Fear.');
            }

            // Time passing
            await this.showDialogue('narrator', `${round * 2} minutes on scene. Still no pulse.`);
        }

        // The decision point
        AudioSystem.stop('heartbeat');
        UI.setScene('Six minutes. Then eight. Then ten. The math of brain death.');

        await this.showDialogue('marcus', '"...how long has it been?"');
        await this.showDialogue('narrator', '"Ten minutes. Maybe more before we arrived."');

        // Internal struggle
        const struggleVoices = DialogueSystem.getSkillVoices(['mental_state', 'denial'], this.state.character);
        for (const voice of struggleVoices) {
            await this.showSkillVoice(voice);
        }

        await this.showDialogue('marcus', '"You know what that means."');

        // The impossible choice
        const finalChoice = await this.showChoices([
            {
                text: 'Keep going. We don\'t stop until the hospital calls it.',
                style: 'desperate',
                effect: { stress: 10, trait: 'refuses_to_quit' }
            },
            {
                text: 'Call it. She\'s gone. She was gone before we got here.',
                style: 'clinical',
                effect: { stress: 15, trait: 'makes_hard_calls' }
            },
            {
                text: '*Can\'t speak. Can\'t stop. Just keep doing compressions.*',
                style: 'breakdown',
                effect: { stress: 20, trait: 'haunted' }
            }
        ]);

        // Apply choice effects
        MentalHealthSystem.applyStress(this.state.character, 'pediatric_death', 1.5);

        if (finalChoice.effect.trait) {
            CharacterSystem.addTrait(this.state.character, finalChoice.effect.trait);
        }

        // The aftermath
        AudioSystem.playMusic('trauma');

        if (finalChoice.index === 0) {
            // Kept going
            await this.showDialogue('narrator', 'You keep going. Twenty minutes. Twenty-five.');
            await this.showDialogue('narrator', 'Marcus finally puts a hand on your shoulder.');
            await this.showDialogue('marcus', '"She\'s gone. She was gone when we got here. You did everything right."');
            await this.showDialogue('narrator', 'But you didn\'t stop until the ER doctor called it. 23:47.');
        } else if (finalChoice.index === 1) {
            // Called it
            await this.showDialogue('narrator', 'You stop. Your hands still on her chest.');
            await this.showDialogue('narrator', '"Time of death. 23:38."');
            await this.showDialogue('narrator', 'The right call. The merciful call. It doesn\'t feel that way.');
        } else {
            // Breakdown
            await this.showDialogue('narrator', 'You can\'t stop. Your arms move without you.');
            await this.showDialogue('narrator', 'Marcus has to pull you off.');
            await this.showDialogue('marcus', '"It\'s over. It\'s over. Let her go."');
            await this.showDialogue('narrator', 'You don\'t remember stopping.');
        }

        // The mother
        UI.setScene('The mother\'s scream. A sound that will never leave you.');

        await this.showDialogue('narrator', 'The mother understands before you can speak.');
        await this.showDialogue('narrator', 'That sound. You\'ll hear it in your sleep. You\'ll hear it on quiet nights. You\'ll hear it whenever you see pink pajamas.');

        // Closing
        await Utils.sleep(1500);

        await this.showDialogue('narrator', 'Emily Chen. 6 years old.');
        await this.showDialogue('narrator', 'Choking incident. Anoxic brain injury.');
        await this.showDialogue('narrator', 'Declared dead at St. Mary\'s Hospital, 23:47.');

        await Utils.sleep(1500);

        // Time skip
        UI.setScene('');
        await this.showDialogue('narrator', '...');
        await Utils.sleep(1000);
        await this.showDialogue('narrator', 'Five years later.');
        await Utils.sleep(1000);
        await this.showDialogue('narrator', 'You\'re still here.');
        await this.showDialogue('narrator', 'Still answering calls.');
        await this.showDialogue('narrator', 'Still carrying her with you.');

        await Utils.sleep(1500);

        // Transition to main game
        await this.showDialogue('narrator', '*RADIO CRACKLE*');
        AudioSystem.play('radio_static');

        await this.showDialogue('dispatch', `"Unit 7, status?"`, DialogueSystem.getSpeakerInfo('dispatch', this.state));

        await this.showDialogue('narrator', 'Another shift. Another night.');
        await this.showDialogue('narrator', 'The job doesn\'t stop for grief.');

        // Set flags
        this.state.character.flags.prologueCompleted = true;
        this.state.character.shiftsCompleted = 0;

        // Transition to main game
        this.state.phase = 'game';
        this.state.time = 1140; // Reset to 19:00
        this.state.day = 1;

        // Save
        this.saveGame();

        // Start main game loop
        this.startShift();
    },

    // Start a shift
    async startShift() {
        this.state.onShift = true;
        this.state.character.shiftsCompleted++;

        UI.updateHUD(this.state);
        AudioSystem.playMusic(AudioSystem.getMusicForState(this.state, this.state.character));

        // Assign random partner if not set
        if (!this.state.currentPartner) {
            const partners = Object.keys(PartnerSystem.partners);
            this.state.currentPartner = partners[Utils.random(0, partners.length - 1)];
        }

        const partner = PartnerSystem.partners[this.state.currentPartner];

        UI.setScene(`Station House - Start of Shift ${this.state.character.shiftsCompleted}`);

        await this.showDialogue('narrator', `Night shift. ${Utils.formatTime(this.state.time)}. Your partner tonight: ${partner.name}.`);

        // Partner greeting
        const greeting = PartnerSystem.getPartnerDialogue(
            this.state.currentPartner,
            'greetings',
            this.state.character.relationships[this.state.currentPartner]
        );
        await this.showDialogue(this.state.currentPartner, `"${greeting}"`);

        // Advance time and wait for first call
        await Utils.sleep(1000);
        this.advanceTime(30);

        // Generate first call
        await this.dispatchCall();
    },

    // Dispatch a call
    async dispatchCall() {
        // Generate call
        const call = CallSystem.generateCall(this.state);
        this.state.currentCall = call;

        AudioSystem.play('radio_dispatch');
        AudioSystem.playMusic('ambient_tense');

        UI.setScene(CallSystem.getPhaseDescription(call));

        // Dispatch dialogue
        await this.showDialogue('dispatch', `"${call.dispatch}"`);

        // Partner reaction
        const partnerCall = PartnerSystem.getPartnerDialogue(
            this.state.currentPartner,
            'callStart',
            this.state.character.relationships[this.state.currentPartner]
        );
        await this.showDialogue(this.state.currentPartner, `"${partnerCall}"`);

        // Player response
        const response = await this.showChoices([
            { text: '"Copy, en route."', style: 'professional' },
            { text: '"Let\'s move."', style: 'urgent' },
            { text: '*Grab gear and go*', style: 'action' }
        ]);

        // Start response phase
        call.phase = 'response';
        this.advanceTime(Utils.random(3, 8));

        // Run call sequence
        await this.runCallSequence(call);
    },

    // Run through a call
    async runCallSequence(call) {
        // Response phase (en route)
        UI.setScene(CallSystem.getPhaseDescription(call));
        AudioSystem.play('siren');

        await this.showDialogue('narrator', `Responding to ${call.sceneData.name}. ETA ${Utils.random(2, 5)} minutes.`);

        // Skill voices during response
        const voices = DialogueSystem.getSkillVoices(['gut_feeling', 'recall'], this.state.character);
        for (const voice of voices) {
            await this.showSkillVoice(voice);
        }

        await Utils.sleep(1000);

        // Arrive on scene
        AudioSystem.stop('siren');
        call.phase = 'scene';
        call.arrivalTime = this.state.time;
        this.advanceTime(Utils.random(3, 6));

        UI.setScene(CallSystem.getPhaseDescription(call));

        await this.showDialogue('narrator', `On scene. ${call.patient.name}, ${call.patient.age}-year-old ${call.patient.gender}.`);

        // Primary assessment
        const primarySkill = call.skills[0];
        const primaryCheck = await this.performSkillCheckWithDisplay(primarySkill, call.difficulty);
        CallSystem.processSkillCheck(call, this.state.character, primarySkill);

        if (primaryCheck.success) {
            await this.showDialogue('narrator', 'Assessment complete. You know what you\'re dealing with.');
        } else {
            await this.showDialogue('narrator', 'Something\'s not adding up. You might be missing something.');
        }

        // Secondary skill check
        if (call.skills.length > 1) {
            const secondarySkill = call.skills[1];
            await Utils.sleep(500);

            const choice = await this.showChoices([
                {
                    text: `Focus on ${Utils.snakeToTitle(secondarySkill).toLowerCase()}`,
                    skillCheck: { skill: secondarySkill, difficulty: call.difficulty }
                },
                {
                    text: 'Trust your initial assessment',
                    style: 'confident'
                },
                {
                    text: 'Ask your partner for input',
                    style: 'collaborative'
                }
            ]);

            if (choice.index === 0) {
                const secondCheck = await this.performSkillCheckWithDisplay(secondarySkill, call.difficulty);
                CallSystem.processSkillCheck(call, this.state.character, secondarySkill);
            } else if (choice.index === 2) {
                // Partner helps
                const partnerMod = PartnerSystem.getPartnerModifier(this.state.currentPartner, primarySkill);
                if (partnerMod > 0) {
                    await this.showDialogue(this.state.currentPartner, '"I see it. Let me help."');
                    call.skillChecks.push({ skill: primarySkill, result: { success: true }, partner: true });
                }
            }
        }

        // Treatment phase
        await this.showDialogue('narrator', 'Time for treatment.');

        const treatmentChoice = await this.showChoices([
            { text: 'Follow standard protocol', style: 'professional' },
            { text: 'Aggressive intervention', style: 'bold' },
            { text: 'Conservative approach, monitor closely', style: 'cautious' }
        ]);

        // Final skill check based on approach
        let finalDifficulty = call.difficulty;
        if (treatmentChoice.index === 1) finalDifficulty -= 2; // Aggressive is easier but riskier
        if (treatmentChoice.index === 2) finalDifficulty += 1; // Conservative is harder to succeed with

        const composureCheck = await this.performSkillCheckWithDisplay('composure', finalDifficulty);
        CallSystem.processSkillCheck(call, this.state.character, 'composure');

        // Calculate outcome
        const outcome = CallSystem.calculateOutcome(call, this.state.character);
        call.phase = 'transport';

        // Outcome narration
        if (outcome.survived) {
            AudioSystem.playMusic('ambient_calm');
            await this.showDialogue('narrator', `${call.patient.name} is stable. Transport to hospital.`);

            if (outcome.quality === 'excellent') {
                await this.showDialogue('narrator', 'Textbook work. The patient is lucky you were on call.');
                const partnerLine = PartnerSystem.getPartnerDialogue(this.state.currentPartner, 'success', this.state.character.relationships[this.state.currentPartner]);
                await this.showDialogue(this.state.currentPartner, `"${partnerLine}"`);
            }
        } else {
            AudioSystem.playMusic('emotional');
            await this.showDialogue('narrator', `${call.patient.name} doesn\'t make it.`);

            const partnerLine = PartnerSystem.getPartnerDialogue(this.state.currentPartner, 'failure', this.state.character.relationships[this.state.currentPartner]);
            await this.showDialogue(this.state.currentPartner, `"${partnerLine}"`);

            // Apply stress
            const stressResult = MentalHealthSystem.applyStress(
                this.state.character,
                outcome.deathType || 'patient_death',
                outcome.stressMultiplier || 1.0
            );

            UI.showNotification(`Stress +${stressResult.amount}`, 'stress');
            UI.updateHUD(this.state);

            // Check for flashback
            if (stressResult.flashback) {
                await this.triggerFlashback(stressResult.flashback);
            }
        }

        // Complete call
        call.phase = 'hospital';
        call.completionTime = this.state.time;
        this.advanceTime(Utils.random(20, 40));

        // Update stats
        this.state.character.callsCompleted++;
        if (outcome.survived) {
            this.state.character.livesaved++;
        } else {
            this.state.character.livesLost++;
        }

        // XP gain
        CharacterSystem.gainExperience(this.state.character, 'call', outcome.xpGained);

        // Clear current call
        this.state.currentCall = null;

        // Update HUD
        UI.updateHUD(this.state);

        // Check for end of shift or continue
        const hoursWorked = (this.state.time - 1140 + 1440) % 1440;
        if (hoursWorked >= 720 || this.state.character.energy < 10) {
            // End shift
            await this.endShift();
        } else {
            // Next call after break
            await Utils.sleep(1000);
            await this.showDialogue('narrator', 'Back to the station. Wait for the next call.');
            this.advanceTime(Utils.random(10, 30));

            // Random chance for next call
            setTimeout(() => this.dispatchCall(), Utils.random(1000, 3000));
        }
    },

    // Trigger a flashback
    async triggerFlashback(flashback) {
        AudioSystem.playMusic('trauma');

        UI.setScene('The present blurs. The past rushes in.');

        await this.showDialogue('narrator', '...');
        await this.showDialogue('narrator', 'Pink pajamas.');
        await this.showDialogue('narrator', 'The mother\'s scream.');
        await this.showDialogue('narrator', 'Emily.');

        await Utils.sleep(1500);

        // Self-awareness check to snap out of it
        const awarenessCheck = await this.performSkillCheckWithDisplay('self_awareness', 12);

        if (awarenessCheck.success) {
            await this.showDialogue('narrator', 'You recognize it. A flashback. You ground yourself.');
            await this.showDialogue('narrator', 'Five things you can see. Four you can touch. Three you can hear.');
            await this.showDialogue('narrator', 'The present returns.');
        } else {
            await this.showDialogue('narrator', 'You\'re back there. You can\'t escape it.');
            await this.showDialogue('narrator', 'Your partner\'s voice, somewhere distant, pulls you back.');
            MentalHealthSystem.applyStress(this.state.character, 'traumatic_injury', 0.5);
        }

        AudioSystem.playMusic(AudioSystem.getMusicForState(this.state, this.state.character));
    },

    // End shift
    async endShift() {
        this.state.onShift = false;
        AudioSystem.playMusic('ambient_calm');

        UI.setScene('End of shift.');

        await this.showDialogue('narrator', 'Shift complete. Time to go home.');

        // Partner farewell
        const partner = PartnerSystem.partners[this.state.currentPartner];
        await this.showDialogue(this.state.currentPartner, `"${partner.dialogue.greetings[0].replace('Morning', 'Night').replace('Ready', 'Same time')}"`);

        // Shift summary
        await this.showDialogue('narrator', `Calls completed: ${this.state.character.callsCompleted}`);
        await this.showDialogue('narrator', `Current stress: ${Math.round(this.state.character.stress)}`);

        // Check mental health warnings
        const warnings = MentalHealthSystem.checkInterventionNeeded(this.state.character);
        for (const warning of warnings) {
            UI.showNotification(warning.message, warning.severity === 'critical' ? 'error' : 'warning');
        }

        // Save game
        this.saveGame();

        // Off-duty choices
        const offDutyChoice = await this.showChoices([
            { text: 'Go home and sleep', style: 'healthy' },
            { text: 'Hit the bar', style: 'unhealthy' },
            { text: 'Go to therapy (if available)', style: 'healthy' },
            { text: 'Start next shift', style: 'workaholic' }
        ]);

        if (offDutyChoice.index === 0) {
            // Sleep
            const result = MentalHealthSystem.applyCopingMechanism(this.state.character, 'sleep', this.state);
            UI.showNotification('Rested. Energy restored.', 'success');
            this.advanceTime(480);
            this.state.character.energy = 100;
        } else if (offDutyChoice.index === 1) {
            // Bar
            const result = MentalHealthSystem.applyCopingMechanism(this.state.character, 'alcohol', this.state);
            UI.showNotification('Stress reduced... for now.', 'warning');
            this.advanceTime(180);
        } else if (offDutyChoice.index === 3) {
            // Workaholic - immediately start next shift
            this.state.character.energy = Utils.clamp(this.state.character.energy - 20, 10, 100);
        }

        UI.updateHUD(this.state);

        // Continue to next shift
        await Utils.sleep(1500);
        this.state.day++;
        this.state.time = 1140;

        // Assign new random partner
        const partners = Object.keys(PartnerSystem.partners);
        this.state.currentPartner = partners[Utils.random(0, partners.length - 1)];

        this.startShift();
    },

    // Show dialogue and wait
    async showDialogue(speaker, text) {
        const speakerInfo = DialogueSystem.getSpeakerInfo(speaker, this.state);
        await UI.displayDialogue(speaker, text, speakerInfo);

        // Wait for click to continue
        return new Promise(resolve => {
            const handler = () => {
                UI.elements.dialogueContinue.removeEventListener('click', handler);
                UI.elements.dialogueText.removeEventListener('click', handler);
                resolve();
            };
            UI.elements.dialogueContinue.addEventListener('click', handler);
            UI.elements.dialogueText.addEventListener('click', handler);
        });
    },

    // Show skill voice
    async showSkillVoice(voice) {
        const formatted = DialogueSystem.formatSkillVoice(voice);
        await UI.displayDialogue(voice.skill, voice.text, formatted);

        return new Promise(resolve => {
            const handler = () => {
                UI.elements.dialogueContinue.removeEventListener('click', handler);
                resolve();
            };
            UI.elements.dialogueContinue.addEventListener('click', handler);
        });
    },

    // Show choices and wait for selection
    showChoices(choices) {
        return new Promise(resolve => {
            UI.displayChoices(choices.map((c, i) => ({ ...c, available: true, id: i })), (choice, index) => {
                resolve({ ...choice, index });
            });
        });
    },

    // Perform skill check with display
    async performSkillCheckWithDisplay(skillId, difficulty) {
        const result = CharacterSystem.performSkillCheck(
            this.state.character,
            skillId,
            difficulty
        );

        const checkResult = {
            skill: skillId,
            skillName: Utils.snakeToTitle(skillId),
            difficulty,
            result
        };

        await UI.displaySkillCheck(checkResult);
        return result;
    },

    // Continue dialogue (called from UI)
    continueDialogue() {
        // Handled by promises in showDialogue
    },

    // Advance time
    advanceTime(minutes) {
        this.state.time = (this.state.time + minutes) % 1440;
        this.state.character.energy = Utils.clamp(
            this.state.character.energy - (minutes / 30),
            0, 100
        );
        UI.updateHUD(this.state);
    },

    // Save game
    saveGame() {
        const saveData = {
            character: this.state.character,
            currentPartner: this.state.currentPartner,
            time: this.state.time,
            day: this.state.day,
            currentDistrict: this.state.currentDistrict,
            phase: this.state.phase,
            savedAt: Date.now()
        };

        Utils.save('night_shift_save', saveData);
        UI.showNotification('Game saved', 'success');
    },

    // Load game data
    loadGameData(saveData) {
        this.state.character = saveData.character;
        this.state.currentPartner = saveData.currentPartner;
        this.state.time = saveData.time;
        this.state.day = saveData.day;
        this.state.currentDistrict = saveData.currentDistrict;
        this.state.phase = saveData.phase;

        UI.updateHUD(this.state);
    },

    // Load game
    loadGame() {
        const saveData = Utils.load('night_shift_save');
        if (saveData) {
            this.loadGameData(saveData);
            UI.closeModal();
            UI.showNotification('Game loaded', 'success');
        }
    },

    // Quit to menu
    quitToMenu() {
        this.saveGame();
        this.state.phase = 'menu';
        AudioSystem.playMusic('menu');
        UI.closeModal();
        UI.showScreen('main-menu');
    },

    // Update game (called periodically)
    updateGame() {
        UI.updateHUD(this.state);
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
