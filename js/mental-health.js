// Night Shift - Mental Health/Sanity System

const MentalHealthSystem = {
    // Mental states and their effects
    mentalStates: {
        normal: {
            name: 'Normal',
            desc: 'Clear-headed and functional',
            cssClass: ''
        },
        exhausted: {
            name: 'Exhausted',
            desc: 'Running on empty. Everything is slower, harder.',
            cssClass: 'mental-state-exhausted',
            triggers: { energy: { below: 20 } }
        },
        adrenaline_rush: {
            name: 'Adrenaline Rush',
            desc: 'Heart pounding. Everything is sharp, clear, fast.',
            cssClass: 'mental-state-adrenaline',
            duration: 30 // minutes
        },
        compassion_fatigue: {
            name: 'Compassion Fatigue',
            desc: 'Emotionally numb. Patients are just bodies.',
            cssClass: 'mental-state-fatigued',
            triggers: { stress: { above: 60 }, callsWithoutBreak: { above: 5 } }
        },
        hypervigilant: {
            name: 'Hypervigilant',
            desc: 'Can\'t stop scanning for danger. Seeing threats everywhere.',
            cssClass: 'mental-state-hypervigilant',
            triggers: { recentTrauma: true }
        },
        dissociated: {
            name: 'Dissociated',
            desc: 'Watching yourself from outside. Going through motions.',
            cssClass: 'mental-state-dissociated',
            triggers: { stress: { above: 85 } }
        },
        manic: {
            name: 'Manic',
            desc: 'Energetic but erratic. Talking fast, moving fast, thinking scattered.',
            cssClass: 'mental-state-manic'
        },
        depressed: {
            name: 'Depressed',
            desc: 'Everything is gray. What\'s the point?',
            cssClass: 'mental-state-depressed',
            triggers: { consecutiveBadCalls: { above: 3 } }
        }
    },

    // Coping mechanisms
    copingMechanisms: {
        // Healthy coping
        therapy: {
            name: 'Therapy',
            type: 'healthy',
            desc: 'Talk to a professional. Process what you\'ve seen.',
            stressReduction: 15,
            energyCost: 10,
            timeCost: 60, // minutes
            unlocks: ['trauma_processing', 'insight_dialogues'],
            longTermBenefit: { stress_tolerance: 1 }
        },
        exercise: {
            name: 'Exercise',
            type: 'healthy',
            desc: 'Hit the gym. Run. Lift. Sweat it out.',
            stressReduction: 10,
            energyCost: 20,
            timeCost: 45,
            statBoost: { stamina: 1, strength: 1 },
            duration: 480 // 8 hours
        },
        social: {
            name: 'Social Activities',
            type: 'healthy',
            desc: 'See friends. Remember you\'re human.',
            stressReduction: 12,
            energyCost: 15,
            timeCost: 120,
            relationshipBoost: true
        },
        hobby: {
            name: 'Hobbies',
            type: 'healthy',
            desc: 'Do something that isn\'t about death.',
            stressReduction: 8,
            energyCost: 10,
            timeCost: 60,
            identityBoost: true
        },
        sleep: {
            name: 'Good Sleep',
            type: 'healthy',
            desc: 'Actually sleep for once.',
            stressReduction: 10,
            energyGain: 100,
            timeCost: 480, // 8 hours
            requirement: 'off_duty'
        },

        // Unhealthy coping
        alcohol: {
            name: 'Drinking',
            type: 'unhealthy',
            desc: 'A few drinks to take the edge off.',
            stressReduction: 20,
            energyCost: 10,
            timeCost: 60,
            addictionRisk: 0.1,
            nextDayPenalty: { energy: -20, dexterity: -1, memory: -1 },
            escalation: true
        },
        drugs: {
            name: 'Substances',
            type: 'unhealthy',
            desc: 'Something stronger.',
            stressReduction: 30,
            energyEffect: 'variable', // Can be up or down
            timeCost: 120,
            addictionRisk: 0.3,
            careerRisk: 0.1,
            escalation: true
        },
        isolation: {
            name: 'Isolation',
            type: 'unhealthy',
            desc: 'Just want to be alone.',
            stressReduction: 5,
            energyCost: 0,
            timeCost: 240,
            relationshipPenalty: true,
            depressionRisk: 0.15
        },
        overworking: {
            name: 'Overworking',
            type: 'unhealthy',
            desc: 'Pick up extra shifts. Stay busy.',
            stressReduction: -5, // Actually increases stress
            energyCost: 30,
            moneyGain: true,
            burnoutRisk: 0.2
        },
        reckless: {
            name: 'Reckless Behavior',
            type: 'unhealthy',
            desc: 'Gambling. Fights. Speed. Anything to feel alive.',
            stressReduction: 15,
            energyCost: 25,
            timeCost: 180,
            injuryRisk: 0.2,
            financialRisk: 0.3
        }
    },

    // Stress sources
    stressSources: {
        // Call-related
        patient_death: { base: 15, name: 'Patient Death' },
        pediatric_death: { base: 30, name: 'Pediatric Death' },
        traumatic_injury: { base: 10, name: 'Traumatic Injury' },
        failed_resuscitation: { base: 20, name: 'Failed Resuscitation' },
        violent_scene: { base: 12, name: 'Violent Scene' },
        suicide: { base: 25, name: 'Suicide Call' },
        mass_casualty: { base: 35, name: 'Mass Casualty Incident' },

        // Work-related
        sleep_deprivation: { base: 5, name: 'Sleep Deprivation' },
        long_shift: { base: 8, name: 'Extended Shift' },
        no_break: { base: 3, name: 'No Break Between Calls' },
        equipment_failure: { base: 10, name: 'Equipment Failure' },
        protocol_violation: { base: 8, name: 'Protocol Violation' },

        // Personal
        relationship_conflict: { base: 10, name: 'Relationship Conflict' },
        financial_stress: { base: 7, name: 'Financial Stress' },
        isolation: { base: 5, name: 'Social Isolation' }
    },

    // Apply stress to character
    applyStress(character, sourceId, modifier = 1.0) {
        const source = this.stressSources[sourceId];
        if (!source) return 0;

        // Calculate stress with character's modifier
        let stressAmount = source.base * modifier * character.stressModifier;

        // Apply skill-based reduction
        const tolerance = CharacterSystem.getSkillValue(character, 'stress_tolerance');
        const reduction = tolerance * 0.5;
        stressAmount = Math.max(1, stressAmount - reduction);

        // Apply mental state modifiers
        if (character.mentalState === 'compassion_fatigue') {
            stressAmount *= 0.5; // Numb to it
        } else if (character.mentalState === 'hypervigilant') {
            stressAmount *= 1.3; // Everything hits harder
        }

        // Update character stress
        character.stress = Utils.clamp(character.stress + stressAmount, 0, 100);

        // Check for mental state changes
        this.updateMentalState(character);

        // Check for flashback trigger
        const flashback = this.checkFlashbackTrigger(character, sourceId);

        return {
            amount: Math.round(stressAmount),
            source: source.name,
            newTotal: character.stress,
            flashback
        };
    },

    // Reduce stress
    reduceStress(character, amount) {
        const reduction = Math.min(amount, character.stress);
        character.stress = Utils.clamp(character.stress - amount, 0, 100);
        this.updateMentalState(character);
        return reduction;
    },

    // Update mental state based on current conditions
    updateMentalState(character) {
        const oldState = character.mentalState;

        // Check for dissociation (highest priority - severe stress)
        if (character.stress >= 85) {
            character.mentalState = 'dissociated';
        }
        // Check for exhaustion
        else if (character.energy < 20) {
            character.mentalState = 'exhausted';
        }
        // Check for compassion fatigue
        else if (character.stress >= 60 && character.callsWithoutBreak >= 5) {
            character.mentalState = 'compassion_fatigue';
        }
        // Check for depression (extended high stress)
        else if (character.stress >= 50 && character.consecutiveBadCalls >= 3) {
            character.mentalState = 'depressed';
        }
        // Normal if nothing else
        else if (character.stress < 40 && character.energy > 50) {
            character.mentalState = 'normal';
        }

        // Return whether state changed
        return oldState !== character.mentalState ? character.mentalState : null;
    },

    // Trigger adrenaline rush (temporary state)
    triggerAdrenalineRush(character) {
        character.mentalState = 'adrenaline_rush';
        character.adrenalineTimer = 30; // Will be decremented by game time
    },

    // Check if situation should trigger a flashback
    checkFlashbackTrigger(character, sourceId) {
        // Only after prologue
        if (!character.flags.prologueCompleted) return null;
        if (character.flags.openingTraumaProcessed) return null;

        // Triggers for the opening trauma
        const triggers = ['pediatric_death', 'failed_resuscitation', 'traumatic_injury'];

        if (triggers.includes(sourceId)) {
            // Chance based on stress and self-awareness
            const selfAwareness = CharacterSystem.getSkillValue(character, 'self_awareness');
            const chance = (character.stress / 100) - (selfAwareness * 0.03);

            if (Math.random() < chance) {
                return {
                    type: 'opening_trauma',
                    trigger: sourceId
                };
            }
        }

        return null;
    },

    // Apply coping mechanism
    applyCopingMechanism(character, mechanismId, gameState) {
        const mechanism = this.copingMechanisms[mechanismId];
        if (!mechanism) return { success: false, reason: 'Unknown mechanism' };

        // Check requirements
        if (mechanism.requirement === 'off_duty' && gameState.onShift) {
            return { success: false, reason: 'Must be off duty' };
        }

        // Check energy cost
        if (mechanism.energyCost && character.energy < mechanism.energyCost) {
            return { success: false, reason: 'Not enough energy' };
        }

        // Apply effects
        const results = {
            success: true,
            mechanism: mechanism.name,
            effects: []
        };

        // Stress reduction
        if (mechanism.stressReduction) {
            const reduced = this.reduceStress(character, mechanism.stressReduction);
            results.effects.push(`Stress reduced by ${reduced}`);
        }

        // Energy cost/gain
        if (mechanism.energyCost) {
            character.energy = Utils.clamp(character.energy - mechanism.energyCost, 0, 100);
            results.effects.push(`Energy spent: ${mechanism.energyCost}`);
        }
        if (mechanism.energyGain) {
            character.energy = Utils.clamp(character.energy + mechanism.energyGain, 0, 100);
            results.effects.push(`Energy restored: ${mechanism.energyGain}`);
        }

        // Time cost (will be handled by game loop)
        if (mechanism.timeCost) {
            results.timeCost = mechanism.timeCost;
        }

        // Handle unhealthy mechanism consequences
        if (mechanism.type === 'unhealthy') {
            results.consequences = this.processUnhealthyConsequences(character, mechanism);
        }

        // Handle healthy mechanism benefits
        if (mechanism.type === 'healthy') {
            results.benefits = this.processHealthyBenefits(character, mechanism);
        }

        // Track usage
        if (!character.copingHistory) character.copingHistory = {};
        if (!character.copingHistory[mechanismId]) {
            character.copingHistory[mechanismId] = { count: 0, lastUsed: null };
        }
        character.copingHistory[mechanismId].count++;
        character.copingHistory[mechanismId].lastUsed = Date.now();

        return results;
    },

    // Process unhealthy coping consequences
    processUnhealthyConsequences(character, mechanism) {
        const consequences = [];

        // Addiction risk
        if (mechanism.addictionRisk) {
            const history = character.copingHistory?.[mechanism.id] || { count: 0 };
            const adjustedRisk = mechanism.addictionRisk * (1 + history.count * 0.1);

            if (Math.random() < adjustedRisk) {
                CharacterSystem.addTrait(character, `${mechanism.name.toLowerCase()}_dependency`);
                consequences.push({
                    type: 'addiction',
                    message: `You're starting to depend on this...`
                });
            }
        }

        // Career risk
        if (mechanism.careerRisk && Math.random() < mechanism.careerRisk) {
            consequences.push({
                type: 'career',
                message: 'This could affect your job if anyone finds out.'
            });
        }

        // Next day penalty
        if (mechanism.nextDayPenalty) {
            character.pendingPenalties = mechanism.nextDayPenalty;
            consequences.push({
                type: 'penalty',
                message: 'You\'ll feel this tomorrow.'
            });
        }

        // Depression risk
        if (mechanism.depressionRisk && Math.random() < mechanism.depressionRisk) {
            character.mentalState = 'depressed';
            consequences.push({
                type: 'mental',
                message: 'The walls are closing in.'
            });
        }

        return consequences;
    },

    // Process healthy coping benefits
    processHealthyBenefits(character, mechanism) {
        const benefits = [];

        // Long-term skill improvement
        if (mechanism.longTermBenefit) {
            for (const skill in mechanism.longTermBenefit) {
                // Accumulate toward skill increase
                if (!character.skillProgress) character.skillProgress = {};
                if (!character.skillProgress[skill]) character.skillProgress[skill] = 0;
                character.skillProgress[skill] += mechanism.longTermBenefit[skill];

                if (character.skillProgress[skill] >= 10) {
                    character.skills[skill] = Math.min(15, character.skills[skill] + 1);
                    character.skillProgress[skill] = 0;
                    benefits.push({
                        type: 'skill',
                        message: `${Utils.snakeToTitle(skill)} improved!`
                    });
                }
            }
        }

        // Temporary stat boost
        if (mechanism.statBoost) {
            character.tempBoosts = character.tempBoosts || [];
            character.tempBoosts.push({
                stats: mechanism.statBoost,
                duration: mechanism.duration || 480
            });
            benefits.push({
                type: 'boost',
                message: 'You feel stronger.'
            });
        }

        // Unlock special dialogue/content
        if (mechanism.unlocks) {
            for (const unlock of mechanism.unlocks) {
                if (!character.unlocks) character.unlocks = [];
                if (!character.unlocks.includes(unlock)) {
                    character.unlocks.push(unlock);
                    benefits.push({
                        type: 'unlock',
                        message: `New insight unlocked: ${Utils.snakeToTitle(unlock)}`
                    });
                }
            }
        }

        return benefits;
    },

    // Get internal monologue based on mental state
    getInternalMonologue(character, context) {
        const state = character.mentalState;
        const stress = character.stress;

        const monologues = {
            normal: {
                call_start: "Another call. Let's do this.",
                patient_critical: "Focus. You've trained for this.",
                success: "Good work. That's why we do this.",
                failure: "Damn it. Can't save them all."
            },
            exhausted: {
                call_start: "How many more? Just... keep moving.",
                patient_critical: "Come on, come on... stay with me.",
                success: "...okay. Next.",
                failure: "I can't... I should have..."
            },
            compassion_fatigue: {
                call_start: "Here we go again.",
                patient_critical: "Do the protocol. That's all.",
                success: "Package delivered.",
                failure: "Was going to happen anyway."
            },
            dissociated: {
                call_start: "...is this real?",
                patient_critical: "Hands are moving. That's good.",
                success: "Did I do that?",
                failure: "Watching from outside. Can't feel it."
            },
            hypervigilant: {
                call_start: "Check everything. Miss nothing.",
                patient_critical: "I see it all. Every detail.",
                success: "What did I miss? Must have missed something.",
                failure: "I knew it. I saw it coming."
            },
            depressed: {
                call_start: "What's the point?",
                patient_critical: "Just going through motions.",
                success: "Does it matter?",
                failure: "Of course."
            },
            adrenaline_rush: {
                call_start: "Let's GO!",
                patient_critical: "I've got this. Everything's clear.",
                success: "Hell yeah!",
                failure: "No no no NO!"
            }
        };

        const stateMonologues = monologues[state] || monologues.normal;
        return stateMonologues[context] || "...";
    },

    // Get current mental state description for UI
    getMentalStateDescription(character) {
        const state = this.mentalStates[character.mentalState];
        return {
            name: state.name,
            description: state.desc,
            cssClass: state.cssClass,
            stress: character.stress,
            energy: character.energy
        };
    },

    // Check if character needs intervention
    checkInterventionNeeded(character) {
        const warnings = [];

        if (character.stress >= 90) {
            warnings.push({
                severity: 'critical',
                message: 'You are at breaking point. You need help.',
                suggestion: 'therapy'
            });
        } else if (character.stress >= 70) {
            warnings.push({
                severity: 'high',
                message: 'Stress is dangerously high.',
                suggestion: 'coping'
            });
        }

        if (character.energy <= 10) {
            warnings.push({
                severity: 'critical',
                message: 'You can barely function.',
                suggestion: 'sleep'
            });
        }

        // Check for addiction
        const addictionTraits = character.traits.filter(t => t.includes('dependency'));
        if (addictionTraits.length > 0) {
            warnings.push({
                severity: 'high',
                message: 'Your coping mechanisms are becoming dependencies.',
                suggestion: 'therapy'
            });
        }

        return warnings;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MentalHealthSystem;
}
