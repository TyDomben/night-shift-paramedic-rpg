// Night Shift - Dialogue System (Disco Elysium-inspired)

const DialogueSystem = {
    // Skill voices - internal monologue from different skills
    skillVoices: {
        // Medical skills
        cardiology: {
            name: 'CARDIOLOGY',
            color: '#c44556',
            personality: 'Clinical, rhythmic, focused on the beat',
            interjections: {
                cardiac_symptom: [
                    "Listen to that rhythm. Irregular. ST elevation, maybe.",
                    "The heart doesn't lie. This is cardiac.",
                    "Tachycardic. Diaphoretic. Classic presentation."
                ],
                normal_rhythm: [
                    "Strong and regular. This heart is fine.",
                    "Sinus rhythm. Whatever's wrong, it's not the ticker."
                ]
            }
        },
        trauma_assessment: {
            name: 'TRAUMA',
            color: '#8b5a35',
            personality: 'Direct, systematic, sees the damage',
            interjections: {
                severe_injury: [
                    "That's arterial. You have seconds.",
                    "Deformity. Crepitus. This bone is done.",
                    "Mechanism of injury says internal bleeding. Trust me."
                ],
                hidden_injury: [
                    "Something's wrong. Check again.",
                    "They're guarding their abdomen. There's more damage."
                ]
            }
        },
        pharmacology: {
            name: 'PHARMACOLOGY',
            color: '#4a7aab',
            personality: 'Precise, calculating, chemical',
            interjections: {
                medication_needed: [
                    "0.3mg epi, IM. Now.",
                    "Push the Narcan. 0.4mg IV.",
                    "They need glucose. 25g, D50."
                ],
                drug_interaction: [
                    "Wait. What else are they on?",
                    "Check for contraindications. This could kill them."
                ]
            }
        },

        // Physical skills
        composure: {
            name: 'COMPOSURE',
            color: '#5a8a7a',
            personality: 'Calm, steady, the eye of the storm',
            interjections: {
                chaos: [
                    "Breathe. The panic helps no one.",
                    "You've done this before. You can do it again.",
                    "Steady hands. Clear mind. Focus."
                ],
                losing_it: [
                    "You're spiraling. Ground yourself.",
                    "Your hands are shaking. Notice it. Control it."
                ]
            }
        },
        reflexes: {
            name: 'REFLEXES',
            color: '#c49a35',
            personality: 'Quick, instinctive, reactive',
            interjections: {
                danger: [
                    "MOVE!",
                    "Incoming. React.",
                    "Your body knows. Trust it."
                ],
                opportunity: [
                    "Now. This is your window.",
                    "Catch them before they fall."
                ]
            }
        },
        stamina: {
            name: 'STAMINA',
            color: '#7a9a5a',
            personality: 'Enduring, aware of the body\'s limits',
            interjections: {
                exhaustion: [
                    "You're running on fumes.",
                    "The body is screaming. You're ignoring it.",
                    "How long since you slept? Don't answer that."
                ],
                push_through: [
                    "You've got more in the tank. Dig deep.",
                    "Pain is temporary. They need you now."
                ]
            }
        },

        // Interpersonal skills
        empathy: {
            name: 'EMPATHY',
            color: '#9a5a8a',
            personality: 'Feeling, connecting, absorbing',
            interjections: {
                patient_pain: [
                    "They're terrified. You can feel it.",
                    "Look at their eyes. They need to know someone cares.",
                    "This isn't just physical. They're suffering."
                ],
                hidden_emotion: [
                    "They're lying about how they feel. Protective.",
                    "There's shame underneath the anger."
                ],
                warning: [
                    "You're absorbing too much. Careful.",
                    "Their pain is not your pain. Remember that."
                ]
            }
        },
        authority: {
            name: 'AUTHORITY',
            color: '#5a5a9a',
            personality: 'Commanding, decisive, in charge',
            interjections: {
                take_charge: [
                    "This scene is chaos. Take control.",
                    "Speak with command. They'll listen.",
                    "You're the medical authority here. Act like it."
                ],
                challenge: [
                    "They're questioning you. Shut it down.",
                    "Don't ask. Tell."
                ]
            }
        },
        de_escalation: {
            name: 'DE-ESCALATION',
            color: '#5a9a9a',
            personality: 'Calming, diplomatic, defusing',
            interjections: {
                aggression: [
                    "Match their energy and it explodes. Go low, go slow.",
                    "Find common ground. Fast.",
                    "They don't want to fight. They're scared."
                ],
                panic: [
                    "Mirror their breathing. Slow it down.",
                    "Validate first, solve second."
                ]
            }
        },
        observation: {
            name: 'OBSERVATION',
            color: '#8a8a5a',
            personality: 'Noticing, cataloguing, missing nothing',
            interjections: {
                detail: [
                    "Track marks. Inner elbow.",
                    "Photo on the wall. Kid isn't here. Why?",
                    "They said they fell. Those bruises are grab marks."
                ],
                inconsistency: [
                    "The story doesn't match the scene.",
                    "Something's off. Look again."
                ]
            }
        },
        streetwise: {
            name: 'STREETWISE',
            color: '#8a5a5a',
            personality: 'Street-smart, aware, reading the game',
            interjections: {
                danger: [
                    "This neighborhood. Watch your back.",
                    "That look means trouble. Exit strategy.",
                    "Don't flash anything valuable."
                ],
                reading_situation: [
                    "This isn't random. Gang territory.",
                    "They're not giving you the real story. Street code."
                ]
            }
        },

        // Mental/Emotional skills
        intuition: {
            name: 'INTUITION',
            color: '#9a8a5a',
            personality: 'Instinctive, knowing without knowing why',
            interjections: {
                gut_feeling: [
                    "Something's wrong. You can feel it.",
                    "Don't ignore that feeling. It's right.",
                    "This call is going to go bad."
                ],
                truth: [
                    "They're telling the truth.",
                    "Lie. Don't know how you know, but you do."
                ]
            }
        },
        dark_humor: {
            name: 'DARK HUMOR',
            color: '#6a6a6a',
            personality: 'Gallows humor, coping, deflecting',
            interjections: {
                grim_situation: [
                    "Well, they're not going to walk this one off.",
                    "On the bright side... no, actually, there isn't one.",
                    "Add it to the therapy bill."
                ],
                coping: [
                    "If you don't laugh, you'll scream.",
                    "That's going in the 'calls that haunt me' file."
                ],
                warning: [
                    "Careful. That joke's a wall, not a window.",
                    "Laughing so you don't have to feel it?"
                ]
            }
        },
        self_awareness: {
            name: 'SELF-AWARENESS',
            color: '#7a5a9a',
            personality: 'Introspective, honest, sometimes painfully so',
            interjections: {
                mental_state: [
                    "You're not okay. Admit it.",
                    "This call is triggering you. Notice it.",
                    "You're projecting. This patient isn't them."
                ],
                growth: [
                    "You handled that better than before.",
                    "You're learning. Slowly."
                ],
                denial: [
                    "You're lying to yourself again.",
                    "How long can you keep this up?"
                ]
            }
        },
        memory: {
            name: 'MEMORY',
            color: '#5a7a8a',
            personality: 'Recalling, connecting past and present',
            interjections: {
                recall: [
                    "Similar case, two years ago. Different outcome.",
                    "The protocol changed. New dosage.",
                    "You've seen this address before."
                ],
                flashback: [
                    "This is familiar. Too familiar.",
                    "The smell. The sound. It's coming back."
                ]
            }
        },
        stress_tolerance: {
            name: 'FORTITUDE',
            color: '#5a6a5a',
            personality: 'Resilient, enduring, armor',
            interjections: {
                stress: [
                    "This is a lot. But you can take it.",
                    "The stress is building. Watch your reserves.",
                    "You've carried heavier loads than this."
                ],
                breaking: [
                    "The cracks are showing. Get help.",
                    "Even you have limits."
                ]
            }
        },
        compartmentalization: {
            name: 'COMPARTMENTS',
            color: '#6a5a5a',
            personality: 'Separating, boxing away, protecting',
            interjections: {
                trauma: [
                    "Box it up. Deal with it later.",
                    "That goes in the vault. You have a job to do.",
                    "Separate it. You're at work."
                ],
                warning: [
                    "The boxes are getting full.",
                    "You can't keep everything locked away forever.",
                    "Compartmentalization is a tool, not a solution."
                ]
            }
        }
    },

    // Current dialogue state
    state: {
        currentNode: null,
        history: [],
        variables: {},
        activeSkillVoices: []
    },

    // Initialize dialogue
    init() {
        this.state = {
            currentNode: null,
            history: [],
            variables: {},
            activeSkillVoices: []
        };
    },

    // Get skill voice interjection
    getSkillVoice(skillId, context, character) {
        const voice = this.skillVoices[skillId];
        if (!voice || !voice.interjections[context]) return null;

        // Check if skill is high enough to "speak"
        const skillValue = CharacterSystem.getSkillValue(character, skillId);
        if (skillValue < 6) return null; // Too low to interject

        // Higher skills speak more often
        const speakChance = (skillValue - 5) * 0.1;
        if (Math.random() > speakChance) return null;

        const interjections = voice.interjections[context];
        const text = interjections[Utils.random(0, interjections.length - 1)];

        return {
            skill: voice.name,
            text: text,
            color: voice.color,
            skillId: skillId
        };
    },

    // Get multiple skill voices for a situation
    getSkillVoices(contexts, character) {
        const voices = [];

        for (const context of contexts) {
            for (const skillId in this.skillVoices) {
                const voice = this.getSkillVoice(skillId, context, character);
                if (voice) {
                    voices.push(voice);
                }
            }
        }

        // Limit to 2-3 voices to not overwhelm
        return Utils.shuffle(voices).slice(0, Utils.random(1, 3));
    },

    // Create a dialogue node
    createNode(options) {
        return {
            id: options.id || Utils.generateId(),
            speaker: options.speaker || 'narrator',
            text: options.text,
            choices: options.choices || [],
            skillCheck: options.skillCheck || null,
            effects: options.effects || [],
            next: options.next || null,
            condition: options.condition || null,
            voices: options.voices || []
        };
    },

    // Create a choice
    createChoice(options) {
        return {
            id: options.id || Utils.generateId(),
            text: options.text,
            tooltip: options.tooltip || null,
            skillRequirement: options.skillRequirement || null,
            skillCheck: options.skillCheck || null,
            effects: options.effects || [],
            next: options.next,
            condition: options.condition || null,
            style: options.style || 'neutral' // neutral, compassionate, professional, aggressive, humorous
        };
    },

    // Check if choice is available
    isChoiceAvailable(choice, character, gameState) {
        // Check condition
        if (choice.condition) {
            if (!this.evaluateCondition(choice.condition, character, gameState)) {
                return false;
            }
        }

        // Check skill requirement
        if (choice.skillRequirement) {
            const skillValue = CharacterSystem.getSkillValue(
                character,
                choice.skillRequirement.skill
            );
            if (skillValue < choice.skillRequirement.minimum) {
                return false;
            }
        }

        return true;
    },

    // Evaluate a condition
    evaluateCondition(condition, character, gameState) {
        switch (condition.type) {
            case 'flag':
                return character.flags[condition.flag] === condition.value;
            case 'skill':
                return CharacterSystem.getSkillValue(character, condition.skill) >= condition.value;
            case 'trait':
                return character.traits.includes(condition.trait);
            case 'relationship':
                const rel = character.relationships[condition.partner];
                return rel && rel.trust >= condition.value;
            case 'stress':
                if (condition.operator === 'above') {
                    return character.stress > condition.value;
                }
                return character.stress < condition.value;
            case 'mental_state':
                return character.mentalState === condition.state;
            default:
                return true;
        }
    },

    // Process dialogue node
    processNode(node, character, gameState) {
        const result = {
            speaker: node.speaker,
            text: this.interpolateText(node.text, character, gameState),
            choices: [],
            voices: [],
            effects: []
        };

        // Get skill voices
        if (node.voices && node.voices.length > 0) {
            for (const voiceContext of node.voices) {
                const voices = this.getSkillVoices([voiceContext], character);
                result.voices.push(...voices);
            }
        }

        // Process skill check if present
        if (node.skillCheck) {
            const check = this.processSkillCheck(node.skillCheck, character, gameState);
            result.skillCheck = check;
        }

        // Filter available choices
        if (node.choices && node.choices.length > 0) {
            for (const choice of node.choices) {
                const available = this.isChoiceAvailable(choice, character, gameState);
                result.choices.push({
                    ...choice,
                    available,
                    text: this.interpolateText(choice.text, character, gameState)
                });
            }
        }

        // Apply effects
        if (node.effects) {
            result.effects = this.processEffects(node.effects, character, gameState);
        }

        // Record in history
        this.state.history.push({
            nodeId: node.id,
            speaker: result.speaker,
            text: result.text,
            timestamp: Date.now()
        });

        return result;
    },

    // Process skill check
    processSkillCheck(checkData, character, gameState) {
        const result = CharacterSystem.performSkillCheck(
            character,
            checkData.skill,
            checkData.difficulty,
            checkData.modifiers || 0
        );

        return {
            skill: checkData.skill,
            skillName: Utils.snakeToTitle(checkData.skill),
            difficulty: checkData.difficulty,
            result: result,
            successText: checkData.successText,
            failureText: checkData.failureText
        };
    },

    // Process effects
    processEffects(effects, character, gameState) {
        const results = [];

        for (const effect of effects) {
            switch (effect.type) {
                case 'stress':
                    const stressResult = MentalHealthSystem.applyStress(
                        character,
                        effect.source,
                        effect.modifier || 1.0
                    );
                    results.push({ type: 'stress', ...stressResult });
                    break;

                case 'relationship':
                    const rel = character.relationships[effect.partner];
                    if (rel) {
                        const relResult = PartnerSystem.modifyRelationship(
                            rel,
                            effect.amount,
                            effect.reason
                        );
                        results.push({ type: 'relationship', ...relResult });
                    }
                    break;

                case 'flag':
                    character.flags[effect.flag] = effect.value;
                    results.push({ type: 'flag', flag: effect.flag, value: effect.value });
                    break;

                case 'trait':
                    if (effect.action === 'add') {
                        CharacterSystem.addTrait(character, effect.trait);
                    } else {
                        CharacterSystem.removeTrait(character, effect.trait);
                    }
                    results.push({ type: 'trait', trait: effect.trait, action: effect.action });
                    break;

                case 'item':
                    // Handle inventory changes
                    results.push({ type: 'item', ...effect });
                    break;
            }
        }

        return results;
    },

    // Interpolate variables in text
    interpolateText(text, character, gameState) {
        return text
            .replace(/{player}/g, character.name)
            .replace(/{partner}/g, gameState.currentPartner ?
                PartnerSystem.partners[gameState.currentPartner]?.nickname || 'Partner' : 'Partner')
            .replace(/{patient}/g, gameState.currentCall?.patient?.name || 'the patient')
            .replace(/{stress}/g, character.stress)
            .replace(/{time}/g, Utils.formatTime(gameState.time));
    },

    // Get speaker display info
    getSpeakerInfo(speakerId, gameState) {
        const speakers = {
            narrator: { name: '', color: 'var(--text-secondary)', style: 'italic' },
            player: { name: gameState.character?.name || 'You', color: 'var(--accent-red-light)', style: 'normal' },
            internal: { name: 'Internal', color: 'var(--accent-yellow)', style: 'italic' },
            dispatch: { name: 'Dispatch', color: 'var(--accent-blue-light)', style: 'normal' },
            patient: { name: gameState.currentCall?.patient?.name || 'Patient', color: 'var(--text-primary)', style: 'normal' }
        };

        // Check if it's a partner
        if (PartnerSystem.partners[speakerId]) {
            const partner = PartnerSystem.partners[speakerId];
            return {
                name: partner.nickname,
                color: 'var(--accent-blue-light)',
                style: 'normal'
            };
        }

        return speakers[speakerId] || speakers.narrator;
    },

    // Format skill voice for display
    formatSkillVoice(voice) {
        return {
            speaker: voice.skill,
            text: voice.text,
            color: voice.color,
            isSkillVoice: true
        };
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DialogueSystem;
}
