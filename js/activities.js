// Night Shift - Off-Duty Activities System
// Complete activities for managing stress and building relationships

const ActivitiesSystem = {
    // All available activities
    activities: {
        // ============================================
        // THERAPY & PROFESSIONAL HELP
        // ============================================

        therapy_session: {
            id: 'therapy_session',
            name: 'Therapy Session',
            category: 'therapy',
            description: 'Meet with Dr. Sarah Chen, the department psychologist.',
            timeCost: 60,
            energyCost: 10,
            available: { always: true },

            effects: {
                stressReduction: 15,
                unlocks: ['trauma_dialogue', 'insight_options']
            },

            dialogueTree: [
                {
                    id: 'start',
                    speaker: 'therapist',
                    text: '"How have you been since our last session?"',
                    choices: [
                        {
                            text: '"Rough. Had a bad call this week."',
                            next: 'bad_call',
                            effects: [{ type: 'stress', amount: -5 }]
                        },
                        {
                            text: '"Actually... better. The techniques are helping."',
                            next: 'improvement',
                            effects: [{ type: 'flag', flag: 'therapy_progress', value: true }]
                        },
                        {
                            text: '"Same as always."',
                            next: 'same',
                            effects: []
                        }
                    ]
                },
                {
                    id: 'bad_call',
                    speaker: 'therapist',
                    text: '"Tell me about it. What made it particularly difficult?"',
                    choices: [
                        {
                            text: '"It was a kid. Always harder with kids."',
                            next: 'pediatric',
                            condition: { type: 'flag', flag: 'prologueCompleted', value: true }
                        },
                        {
                            text: '"Nothing I did helped. They died anyway."',
                            next: 'helplessness',
                            effects: []
                        },
                        {
                            text: '"I don\'t want to talk about it."',
                            next: 'avoidance',
                            effects: [{ type: 'flag', flag: 'therapy_avoidance', value: true }]
                        }
                    ]
                },
                {
                    id: 'pediatric',
                    speaker: 'therapist',
                    text: '"Pediatric calls are uniquely difficult. Have you thought more about Emily? About what you were feeling when you saw this child?"',
                    choices: [
                        {
                            text: '"It was her. I saw her. Pink pajamas. Brown hair."',
                            next: 'flashback_admission',
                            effects: [{ type: 'stress', amount: -10 }, { type: 'flag', flag: 'flashback_discussed', value: true }]
                        },
                        {
                            text: '"I pushed it down. Did my job."',
                            next: 'compartmentalization',
                            effects: []
                        }
                    ]
                },
                {
                    id: 'flashback_admission',
                    speaker: 'therapist',
                    text: '"Flashbacks are your mind trying to process trauma it couldn\'t handle in the moment. Acknowledging them is the first step. Would you like to try EMDR today?"',
                    choices: [
                        {
                            text: '"Yes. I need to process this."',
                            next: 'emdr_session',
                            effects: [
                                { type: 'stress', amount: -15 },
                                { type: 'flag', flag: 'emdr_started', value: true },
                                { type: 'thought_unlock', thought: 'the_girl_in_pink' }
                            ]
                        },
                        {
                            text: '"I\'m not ready."',
                            next: 'not_ready',
                            effects: []
                        }
                    ]
                },
                {
                    id: 'emdr_session',
                    speaker: 'narrator',
                    text: 'The bilateral stimulation brings it back—the call, the mother\'s scream, your hands on Emily\'s small chest. But this time, you\'re not alone. This time, it\'s contained.',
                    next: 'session_end'
                },
                {
                    id: 'improvement',
                    speaker: 'therapist',
                    text: '"That\'s wonderful to hear. What specifically has been helping?"',
                    next: 'techniques_discussion'
                },
                {
                    id: 'session_end',
                    speaker: 'therapist',
                    text: '"Good work today. Same time next week?"',
                    effects: [{ type: 'flag', flag: 'therapy_attended', value: true }]
                }
            ],

            completion: {
                message: 'Therapy session complete. Progress tracked.',
                skillProgress: { self_awareness: 2, stress_tolerance: 1 }
            }
        },

        peer_support: {
            id: 'peer_support',
            name: 'Peer Support Group',
            category: 'therapy',
            description: 'Meet with other first responders who understand.',
            timeCost: 90,
            energyCost: 15,
            available: { shiftsCompleted: 5 },

            effects: {
                stressReduction: 12,
                socialBonus: true
            },

            dialogueTree: [
                {
                    id: 'start',
                    speaker: 'narrator',
                    text: 'The room is a mix of uniforms—paramedics, firefighters, police. Different patches, same haunted eyes. You find a seat.',
                    next: 'facilitator'
                },
                {
                    id: 'facilitator',
                    speaker: 'facilitator',
                    text: '"Welcome back, everyone. Who wants to start tonight?"',
                    choices: [
                        {
                            text: '*Raise your hand*',
                            next: 'your_turn',
                            effects: [{ type: 'stress', amount: -10 }]
                        },
                        {
                            text: '*Just listen tonight*',
                            next: 'listen',
                            effects: [{ type: 'stress', amount: -5 }]
                        }
                    ]
                },
                {
                    id: 'your_turn',
                    speaker: 'narrator',
                    text: 'You talk about the call. The room is silent, but it\'s not uncomfortable. They understand. They\'ve been there.',
                    next: 'response'
                },
                {
                    id: 'listen',
                    speaker: 'narrator',
                    text: 'A firefighter talks about a house fire. A cop talks about a domestic. Different details, same story—the weight of it. You\'re not alone.',
                    next: 'end'
                },
                {
                    id: 'response',
                    speaker: 'group_member',
                    text: '"I had one like that last month. Thought about quitting. But... I\'m still here. Still showing up. That\'s not nothing."',
                    next: 'end'
                },
                {
                    id: 'end',
                    speaker: 'narrator',
                    text: 'The meeting ends. You shake hands. You don\'t feel fixed, but you feel less alone. Sometimes that\'s enough.',
                    effects: [{ type: 'flag', flag: 'peer_support_attended', value: true }]
                }
            ],

            completion: {
                message: 'Group session complete. You\'re not alone in this.',
                socialBonus: 5
            }
        },

        // ============================================
        // EXERCISE & PHYSICAL
        // ============================================

        gym: {
            id: 'gym',
            name: 'Hit the Gym',
            category: 'exercise',
            description: 'Lift weights. Run. Sweat out the stress.',
            timeCost: 60,
            energyCost: 25,
            available: { always: true },

            effects: {
                stressReduction: 10,
                tempBoost: { stamina: 2, strength: 1 },
                boostDuration: 480
            },

            miniGame: {
                type: 'rhythm',
                description: 'Match the rhythm for maximum benefit',
                difficulty: 'easy'
            },

            completion: {
                message: 'Good workout. You feel stronger.',
                skillProgress: { stamina: 1, strength: 1 }
            }
        },

        run: {
            id: 'run',
            name: 'Go for a Run',
            category: 'exercise',
            description: 'Clear your head. Pound the pavement.',
            timeCost: 45,
            energyCost: 20,
            available: { always: true },

            effects: {
                stressReduction: 12,
                tempBoost: { stamina: 2, reflexes: 1 },
                boostDuration: 360
            },

            internal: [
                'The first mile is the worst. Your body fights it.',
                'The second mile, your mind quiets.',
                'The third mile, it\'s just you and the rhythm.',
                'You can\'t outrun the job. But you can outrun the noise in your head. For a while.'
            ],

            completion: {
                message: 'Runner\'s high achieved.',
                skillProgress: { stamina: 2 }
            }
        },

        // ============================================
        // SOCIAL ACTIVITIES
        // ============================================

        bar_with_crew: {
            id: 'bar_with_crew',
            name: 'Bar with the Crew',
            category: 'social',
            description: 'Grab drinks with other paramedics. Decompress together.',
            timeCost: 120,
            energyCost: 15,
            available: { always: true },

            effects: {
                stressReduction: 8,
                relationshipBonus: 3
            },

            risks: {
                alcoholTemptation: true,
                maxDrinks: 3
            },

            dialogueTree: [
                {
                    id: 'start',
                    speaker: 'narrator',
                    text: 'The bar is a dive, but it\'s your dive. Off-duty cops, firefighters, paramedics. People who get it.',
                    next: 'drinks_arrive'
                },
                {
                    id: 'drinks_arrive',
                    speaker: 'colleague',
                    text: '"First round\'s on me. We earned it after that shift."',
                    choices: [
                        {
                            text: '*Just one beer*',
                            next: 'one_drink',
                            effects: [{ type: 'stress', amount: -5 }]
                        },
                        {
                            text: '*Keep them coming*',
                            next: 'multiple_drinks',
                            effects: [
                                { type: 'stress', amount: -10 },
                                { type: 'addiction_risk', substance: 'alcohol', amount: 0.05 }
                            ]
                        },
                        {
                            text: '"I\'ll stick with soda tonight."',
                            next: 'sober',
                            effects: [{ type: 'flag', flag: 'chose_sober', value: true }]
                        }
                    ]
                },
                {
                    id: 'one_drink',
                    speaker: 'narrator',
                    text: 'One beer, good conversation, and you\'re out. The balance is important. You\'re learning that.',
                    next: 'end'
                },
                {
                    id: 'multiple_drinks',
                    speaker: 'narrator',
                    text: 'The drinks flow. The stories get darker. It feels good until it doesn\'t. Tomorrow will be rough.',
                    effects: [{ type: 'flag', flag: 'hungover_tomorrow', value: true }],
                    next: 'end'
                },
                {
                    id: 'sober',
                    speaker: 'colleague',
                    text: '"Good for you. Wish I had that discipline."',
                    next: 'end'
                },
                {
                    id: 'end',
                    speaker: 'narrator',
                    text: 'The night winds down. You swap numbers, make plans no one will keep. But the connection is real, even if brief.',
                    effects: [{ type: 'social', amount: 5 }]
                }
            ],

            completion: {
                message: 'Social time with the crew.',
                relationshipBonus: true
            }
        },

        dinner_with_partner: {
            id: 'dinner_with_partner',
            name: 'Dinner with Partner',
            category: 'social',
            description: 'Spend time with your current partner outside of work.',
            timeCost: 90,
            energyCost: 10,
            available: { partnerTrust: 40 },

            effects: {
                stressReduction: 10,
                relationshipBonus: 5
            },

            // Dynamic dialogue based on which partner
            dialogueGenerator: 'generatePartnerDinnerDialogue',

            completion: {
                message: 'Quality time with your partner. Trust deepened.',
                partnerTrustBonus: 5
            }
        },

        // ============================================
        // HOBBIES & PERSONAL
        // ============================================

        art_class: {
            id: 'art_class',
            name: 'Art Class',
            category: 'hobby',
            description: 'Express what you can\'t say in words.',
            timeCost: 120,
            energyCost: 10,
            available: { shiftsCompleted: 10 },

            effects: {
                stressReduction: 10,
                identityBonus: true
            },

            internal: [
                'The instructor says it doesn\'t have to be good. It has to be true.',
                'You draw the ambulance. Then the patient. Then the face you see in your dreams.',
                'It\'s ugly. It\'s honest. The instructor says that\'s art.',
                'You don\'t feel better exactly. But you feel... something. That\'s more than you felt before.'
            ],

            completion: {
                message: 'You created something. It\'s not much, but it\'s yours.',
                skillProgress: { self_awareness: 1 }
            }
        },

        video_games: {
            id: 'video_games',
            name: 'Video Games',
            category: 'hobby',
            description: 'Turn your brain off. Shoot some aliens.',
            timeCost: 60,
            energyCost: 5,
            available: { always: true },

            effects: {
                stressReduction: 6,
                energyGain: 5
            },

            internal: [
                'No consequences. No real stakes. Just reflexes and pixels.',
                'Your brain quiets. The call replaying in your head finally stops.',
                'It\'s not processing. It\'s avoiding. But sometimes you need that.',
                'Tomorrow you\'ll deal with reality. Tonight, you save the galaxy.'
            ],

            completion: {
                message: 'Mental break achieved. Sometimes that\'s enough.',
                smallRest: true
            }
        },

        cooking: {
            id: 'cooking',
            name: 'Cook a Real Meal',
            category: 'hobby',
            description: 'Actually make something instead of microwave garbage.',
            timeCost: 60,
            energyCost: 10,
            available: { always: true },

            effects: {
                stressReduction: 5,
                energyGain: 15
            },

            miniGame: {
                type: 'timing',
                description: 'Time everything right for the perfect meal',
                difficulty: 'easy'
            },

            internal: [
                'Chop. Season. Stir. Simple steps, clear results.',
                'It\'s not about the food. It\'s about control.',
                'You can\'t control the calls. You can control this.',
                'The meal turns out okay. That\'s victory enough.'
            ],

            completion: {
                message: 'A home-cooked meal. You\'re a functional adult.',
                energyBonus: 15
            }
        },

        // ============================================
        // REST & RECOVERY
        // ============================================

        sleep: {
            id: 'sleep',
            name: 'Actually Sleep',
            category: 'rest',
            description: 'Eight hours. In a bed. Revolutionary concept.',
            timeCost: 480,
            energyCost: 0,
            available: { always: true },

            effects: {
                stressReduction: 10,
                energyGain: 100
            },

            internal: [
                'Sleep comes easier when you\'re exhausted.',
                'The dreams still come. But even bad sleep is better than none.',
                'You wake up feeling... not good. But functional. That\'s something.'
            ],

            completion: {
                message: 'Full rest achieved. Energy restored.',
                fullEnergyRestore: true
            }
        },

        nap: {
            id: 'nap',
            name: 'Power Nap',
            category: 'rest',
            description: 'Twenty minutes. Quick reset.',
            timeCost: 30,
            energyCost: 0,
            available: { always: true },

            effects: {
                energyGain: 25
            },

            completion: {
                message: 'Quick rest. Back in action.',
                energyBonus: 25
            }
        }
    },

    // Check if activity is available
    isAvailable(activityId, character, gameState) {
        const activity = this.activities[activityId];
        if (!activity) return false;

        const conditions = activity.available;

        if (conditions.always) return true;

        if (conditions.shiftsCompleted) {
            if (character.shiftsCompleted < conditions.shiftsCompleted) return false;
        }

        if (conditions.partnerTrust) {
            const currentPartner = gameState.currentPartner;
            const trust = character.relationships[currentPartner]?.trust || 0;
            if (trust < conditions.partnerTrust) return false;
        }

        return true;
    },

    // Start an activity
    async startActivity(activityId, character, gameState, displayCallback) {
        const activity = this.activities[activityId];
        if (!activity) return null;

        // Check energy
        if (character.energy < activity.energyCost) {
            return { success: false, reason: 'Not enough energy' };
        }

        // Start activity
        const result = {
            activity: activity,
            stressReduction: 0,
            energyChange: -activity.energyCost,
            timePassed: activity.timeCost,
            bonuses: [],
            flags: []
        };

        // Process dialogue tree if present
        if (activity.dialogueTree) {
            await this.runDialogueTree(activity.dialogueTree, displayCallback);
        }

        // Process internal monologue if present
        if (activity.internal) {
            for (const thought of activity.internal) {
                await displayCallback({
                    speaker: 'narrator',
                    text: thought,
                    isInternal: true
                });
            }
        }

        // Apply effects
        if (activity.effects.stressReduction) {
            result.stressReduction = activity.effects.stressReduction;
            character.stress = Math.max(0, character.stress - result.stressReduction);
        }

        if (activity.effects.energyGain) {
            result.energyChange += activity.effects.energyGain;
        }

        // Apply energy change
        character.energy = Utils.clamp(character.energy + result.energyChange, 0, 100);

        // Apply temp boosts
        if (activity.effects.tempBoost) {
            character.tempBoosts = character.tempBoosts || [];
            character.tempBoosts.push({
                stats: activity.effects.tempBoost,
                duration: activity.effects.boostDuration || 480
            });
            result.bonuses.push('Temporary stat boost applied');
        }

        // Track in history
        if (!character.activityHistory) character.activityHistory = {};
        if (!character.activityHistory[activityId]) {
            character.activityHistory[activityId] = { count: 0, lastUsed: null };
        }
        character.activityHistory[activityId].count++;
        character.activityHistory[activityId].lastUsed = Date.now();

        // Show completion
        await displayCallback({
            speaker: 'narrator',
            text: activity.completion.message,
            isCompletion: true
        });

        return result;
    },

    // Run dialogue tree
    async runDialogueTree(tree, displayCallback) {
        let currentNode = tree.find(n => n.id === 'start') || tree[0];

        while (currentNode) {
            await displayCallback({
                speaker: currentNode.speaker,
                text: currentNode.text
            });

            if (currentNode.choices) {
                // Wait for player choice
                const choice = await new Promise(resolve => {
                    displayCallback({
                        type: 'choices',
                        choices: currentNode.choices,
                        onSelect: resolve
                    });
                });

                currentNode = tree.find(n => n.id === choice.next);
            } else if (currentNode.next) {
                currentNode = tree.find(n => n.id === currentNode.next);
            } else {
                break;
            }
        }
    },

    // Get all available activities
    getAvailableActivities(character, gameState) {
        const available = [];

        for (const id in this.activities) {
            if (this.isAvailable(id, character, gameState)) {
                const activity = this.activities[id];
                available.push({
                    id: id,
                    name: activity.name,
                    category: activity.category,
                    description: activity.description,
                    timeCost: activity.timeCost,
                    energyCost: activity.energyCost,
                    canAfford: character.energy >= activity.energyCost
                });
            }
        }

        return available;
    },

    // Group activities by category
    getActivitiesByCategory(character, gameState) {
        const available = this.getAvailableActivities(character, gameState);
        const categories = {};

        for (const activity of available) {
            if (!categories[activity.category]) {
                categories[activity.category] = [];
            }
            categories[activity.category].push(activity);
        }

        return categories;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActivitiesSystem;
}
