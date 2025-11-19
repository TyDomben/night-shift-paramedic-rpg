// Night Shift - Endings System
// 8 complete endings based on player choices and state

const EndingsSystem = {
    // All possible endings
    endings: {
        // ============================================
        // ENDING 1: BURNOUT
        // You quit, broken by the job
        // ============================================
        burnout: {
            id: 'burnout',
            name: 'Burnout',
            type: 'negative',
            conditions: {
                stress: { above: 85 },
                mentalState: ['dissociated', 'depressed'],
                shiftsCompleted: { above: 30 },
                unhealthyCopingCount: { above: 10 }
            },
            priority: 10,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'The resignation letter sits on your desk. Three sentences. No explanation necessary.',
                },
                {
                    speaker: 'narrator',
                    text: 'Your supervisor doesn\'t try to talk you out of it. They\'ve seen that look before. They know what it means.',
                },
                {
                    speaker: 'narrator',
                    text: 'Twenty-three years of service. Thousands of calls. Hundreds of lives saved. And you can\'t remember any of the good ones anymore.',
                },
                {
                    speaker: 'narrator',
                    text: 'You clean out your locker. The spare uniform. The stress ball someone gave you as a joke. The photo from the academy.',
                },
                {
                    speaker: 'player',
                    text: 'You were so young. So sure you\'d make a difference.',
                },
                {
                    speaker: 'narrator',
                    text: 'Your partner finds you there. They don\'t say anything. Just help you carry the box to your car.',
                },
                {
                    speaker: 'partner',
                    text: '"You know where to find me. If you need anything."',
                },
                {
                    speaker: 'narrator',
                    text: 'You drive home through streets you know better than anyone. Every corner has a memory. A call. A face.',
                },
                {
                    speaker: 'narrator',
                    text: 'You don\'t know who you are without the uniform. But you know you can\'t wear it anymore.',
                },
                {
                    speaker: 'narrator',
                    text: 'Maybe someday the nightmares will stop. Maybe someday you\'ll feel something again.',
                },
                {
                    speaker: 'narrator',
                    text: 'But not today.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: BURNOUT**\n\nYou gave everything to the job. The job took it all and asked for more. Now there\'s nothing left.',
                }
            ],

            epilogue: 'Six months later, you\'re working at a hardware store. Regular hours. No sirens. No death. You\'re stable, but hollow. The dreams still come.',
            achievement: 'The Hollow'
        },

        // ============================================
        // ENDING 2: SURVIVOR
        // You continue, scarred but stable
        // ============================================
        survivor: {
            id: 'survivor',
            name: 'Survivor',
            type: 'neutral',
            conditions: {
                stress: { between: [40, 70] },
                shiftsCompleted: { above: 50 },
                prologueProcessed: false,
                therapyCount: { below: 5 }
            },
            priority: 5,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'Another shift ends. Another begins. The rhythm of it is all that keeps you moving.',
                },
                {
                    speaker: 'narrator',
                    text: 'You\'re not okay. But you\'re functional. You know your limits now. Where the lines are that you can\'t cross.',
                },
                {
                    speaker: 'narrator',
                    text: 'The job hasn\'t broken you. But it\'s left marks. Scars that don\'t show on the outside.',
                },
                {
                    speaker: 'narrator',
                    text: 'Emily still visits in your dreams. Not every night anymore. But she\'s there. Waiting for you to understand something you\'re not ready to learn.',
                },
                {
                    speaker: 'narrator',
                    text: 'Your partner knows not to ask about the bad calls. They know the look. They have it too.',
                },
                {
                    speaker: 'partner',
                    text: '"You good?"',
                },
                {
                    speaker: 'player',
                    text: '"I\'m here."',
                },
                {
                    speaker: 'partner',
                    text: '"Yeah. Me too."',
                },
                {
                    speaker: 'narrator',
                    text: 'And that\'s enough. For now. For this shift. For this call.',
                },
                {
                    speaker: 'narrator',
                    text: 'You survive by not looking too deep. By staying in the moment. By not asking what it all means.',
                },
                {
                    speaker: 'narrator',
                    text: 'One call at a time. One shift at a time. One day at a time.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: SURVIVOR**\n\nYou carry the weight. It\'s heavy, but you\'ve learned to bear it. Maybe that\'s all anyone can do.',
                }
            ],

            epilogue: 'Years pass. You train new paramedics and see your younger self in their eyes. You teach them the job. You don\'t teach them how to feel about it. That\'s something they\'ll have to learn on their own.',
            achievement: 'Still Standing'
        },

        // ============================================
        // ENDING 3: REDEEMED
        // You process the trauma and find peace
        // ============================================
        redeemed: {
            id: 'redeemed',
            name: 'Redeemed',
            type: 'positive',
            conditions: {
                stress: { below: 30 },
                prologueProcessed: true,
                therapyCount: { above: 10 },
                healthyCopingCount: { above: 15 },
                thoughtCompleted: 'the_girl_in_pink'
            },
            priority: 15,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'Emily visits you one last time.',
                },
                {
                    speaker: 'narrator',
                    text: 'Not in a dream. Not in a flashback. Just a quiet moment between calls, when you see a girl in pink pajamas walking with her mother.',
                },
                {
                    speaker: 'narrator',
                    text: 'And you smile.',
                },
                {
                    speaker: 'narrator',
                    text: 'Because you finally understand. Emily couldn\'t be saved. She was gone before you arrived. But every child you\'ve saved since then—they\'re here because you kept going.',
                },
                {
                    speaker: 'narrator',
                    text: 'The grief doesn\'t disappear. But it transforms. From a weight into a foundation. Something you build on instead of something that buries you.',
                },
                {
                    speaker: 'narrator',
                    text: 'Therapy helped. Talking about it helped. Understanding that you\'re not alone—that every paramedic carries ghosts—that helped most of all.',
                },
                {
                    speaker: 'narrator',
                    text: 'Your partner notices the change. They don\'t say anything. Just smile when you crack a joke. Nod when you volunteer for the tough calls.',
                },
                {
                    speaker: 'partner',
                    text: '"You seem... lighter."',
                },
                {
                    speaker: 'player',
                    text: '"I\'m working on it. Finally."',
                },
                {
                    speaker: 'narrator',
                    text: 'The job is still hard. It always will be. But you\'re not fighting it anymore. You\'re not fighting yourself.',
                },
                {
                    speaker: 'narrator',
                    text: 'Emily will always be with you. But now she\'s a reminder instead of a punishment. A reason to keep going instead of a reason to stop.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: REDEEMED**\n\nYou found peace. Not by forgetting, but by accepting. The past shapes you without defining you.',
                }
            ],

            epilogue: 'You speak at training sessions about trauma and coping. Young paramedics listen with skeptical eyes—they haven\'t seen enough yet. But some of them will remember when they need to.',
            achievement: 'Finding Peace'
        },

        // ============================================
        // ENDING 4: ESCALATION
        // Mental health crisis leads to breakdown
        // ============================================
        escalation: {
            id: 'escalation',
            name: 'Escalation',
            type: 'negative',
            conditions: {
                stress: { above: 95 },
                mentalState: ['dissociated', 'manic'],
                unhealthyCopingCount: { above: 20 },
                interventionIgnored: { above: 3 }
            },
            priority: 20,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'You don\'t remember the call that breaks you. Just fragments. Lights. Voices. Hands on your shoulders.',
                },
                {
                    speaker: 'narrator',
                    text: 'When you come back to yourself, you\'re sitting in the back of your own ambulance. Your partner is there. So is a supervisor.',
                },
                {
                    speaker: 'partner',
                    text: '"You scared me. You scared everyone."',
                },
                {
                    speaker: 'narrator',
                    text: 'You don\'t remember what you did. What you said. What happened to the patient.',
                },
                {
                    speaker: 'narrator',
                    text: 'They tell you later. The patient is fine. You\'re the one who isn\'t.',
                },
                {
                    speaker: 'narrator',
                    text: 'Mandatory leave. Psych evaluation. The words feel like a foreign language. Like they\'re talking about someone else.',
                },
                {
                    speaker: 'narrator',
                    text: 'But they\'re talking about you. The one who couldn\'t ask for help. Who thought they could white-knuckle through the darkness.',
                },
                {
                    speaker: 'narrator',
                    text: 'The hospital is quiet. Not the ER—a different kind. The kind with locked doors and careful conversations.',
                },
                {
                    speaker: 'narrator',
                    text: 'It\'s not the end. But it feels like it. And maybe that\'s okay. Maybe something has to end before something new can begin.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: ESCALATION**\n\nYou fell. But falling isn\'t failing—refusing to get back up is. The climb starts here.',
                }
            ],

            epilogue: 'Three months of intensive treatment. Then outpatient. Then back to work—dispatch, at first. It\'s a long road. But you\'re finally on it.',
            achievement: 'Rock Bottom'
        },

        // ============================================
        // ENDING 5: PROMOTION
        // Rise in ranks, but at what cost?
        // ============================================
        promotion: {
            id: 'promotion',
            name: 'Promotion',
            type: 'bittersweet',
            conditions: {
                level: { above: 15 },
                shiftsCompleted: { above: 60 },
                callsExcellent: { above: 50 },
                relationshipHigh: { below: 2 }
            },
            priority: 8,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'The nameplate on the desk says Supervisor. The office has a window. The coffee is free.',
                },
                {
                    speaker: 'narrator',
                    text: 'You earned this. Every excellent call, every commendation, every time you went above and beyond. It all led here.',
                },
                {
                    speaker: 'narrator',
                    text: 'Your old partner sends a congratulations text. You haven\'t seen them in weeks. Haven\'t seen anyone, really. The climb took everything you had.',
                },
                {
                    speaker: 'narrator',
                    text: 'The calls come through the radio now instead of the speaker. You dispatch instead of respond. You manage instead of treat.',
                },
                {
                    speaker: 'narrator',
                    text: 'It\'s what you wanted. Isn\'t it?',
                },
                {
                    speaker: 'narrator',
                    text: 'At night, you miss the weight of the bag. The smell of the ambulance. The look in someone\'s eyes when you tell them it\'s going to be okay.',
                },
                {
                    speaker: 'narrator',
                    text: 'You\'re helping more people from here. That\'s what they told you. And it\'s true. Probably.',
                },
                {
                    speaker: 'narrator',
                    text: 'But helping isn\'t the same as saving. And managing isn\'t the same as being there.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: PROMOTION**\n\nYou climbed the ladder. Now you can see further, but you\'ve lost touch with the ground.',
                }
            ],

            epilogue: 'You\'re good at the job. Your department runs smoothly. You hire good people and fire bad ones. But late at night, you sometimes check to see if your certification is still valid. Just in case.',
            achievement: 'Corner Office'
        },

        // ============================================
        // ENDING 6: CHANGE
        // Leave EMS for something else
        // ============================================
        change: {
            id: 'change',
            name: 'Change',
            type: 'neutral',
            conditions: {
                thoughtCompleted: 'why_still_here',
                stress: { between: [30, 60] },
                callsCompleted: { above: 100 },
                partnerStoryCompleted: { any: true }
            },
            priority: 7,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'The nursing school acceptance letter sits in your pocket. You\'ve read it a hundred times.',
                },
                {
                    speaker: 'narrator',
                    text: 'It\'s not giving up. It\'s moving on. There\'s a difference. You\'ve finally learned that.',
                },
                {
                    speaker: 'narrator',
                    text: 'Your partner is the first to know. They don\'t take it personally. They understand that the ambulance isn\'t the only place to help people.',
                },
                {
                    speaker: 'partner',
                    text: '"You\'ll be a good nurse. You see people, not just patients."',
                },
                {
                    speaker: 'narrator',
                    text: 'The last shift is strange. Every call feels significant. Every moment weighted.',
                },
                {
                    speaker: 'narrator',
                    text: 'You\'ll miss the sirens. The adrenaline. The immediate, visceral reality of it. You won\'t miss the nightmares. The burnout. The feeling of being used up.',
                },
                {
                    speaker: 'narrator',
                    text: 'Nursing will have its own challenges. Different demons. But you\'re ready for something new. Something that grows instead of depletes.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: CHANGE**\n\nYou learned what you needed to learn. Now it\'s time to use it somewhere else.',
                }
            ],

            epilogue: 'Two years later, you\'re working in the ER. You see ambulances arrive and feel a pang of something—nostalgia, maybe, or recognition. But you don\'t regret leaving. Some chapters have to end.',
            achievement: 'New Chapter'
        },

        // ============================================
        // ENDING 7: TRUE PARTNER
        // Find meaning through connection
        // ============================================
        true_partner: {
            id: 'true_partner',
            name: 'True Partner',
            type: 'positive',
            conditions: {
                relationshipHigh: { above: 3 },
                partnerStoryCompleted: { above: 2 },
                romanceComplete: { any: true }
            },
            priority: 12,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'The shift ends the way they always do. Paperwork, cleaning, restocking. But this time you\'re not alone.',
                },
                {
                    speaker: 'narrator',
                    text: 'Not just partners on the rig. Partners in everything. Someone who knows the weight you carry because they carry it too.',
                },
                {
                    speaker: 'partner',
                    text: '"Same time tomorrow?"',
                },
                {
                    speaker: 'player',
                    text: '"Same time always."',
                },
                {
                    speaker: 'narrator',
                    text: 'The job is still hard. But sharing it makes it bearable. More than bearable—meaningful.',
                },
                {
                    speaker: 'narrator',
                    text: 'You\'ve seen each other at your worst. The bad calls, the breakdowns, the moments of doubt. And you stayed. Both of you stayed.',
                },
                {
                    speaker: 'narrator',
                    text: 'That\'s not weakness. That\'s trust. The rarest thing in this job.',
                },
                {
                    speaker: 'narrator',
                    text: 'They know about Emily. They know why you freeze on pediatric calls. They know how to bring you back.',
                },
                {
                    speaker: 'narrator',
                    text: 'And you know their ghosts too. You carry each other\'s weight when it gets too heavy.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: TRUE PARTNER**\n\nYou found someone who understands. Together, you can face anything. Even this job.',
                }
            ],

            epilogue: 'Years later, you train together, work together, live together. Some people don\'t understand how you can be so close to someone in such a dark job. But they don\'t understand that the darkness is exactly why you need each other.',
            achievement: 'In This Together'
        },

        // ============================================
        // ENDING 8: ADVOCATE
        // Fight to change the system
        // ============================================
        advocate: {
            id: 'advocate',
            name: 'Advocate',
            type: 'positive',
            conditions: {
                thoughtCompleted: 'burnout_recognition',
                therapyCount: { above: 8 },
                level: { above: 12 },
                corruptionFlag: true
            },
            priority: 9,

            sequence: [
                {
                    speaker: 'narrator',
                    text: 'The city council meeting is standing room only. You\'ve done the research. Gathered the testimony. Prepared the presentation.',
                },
                {
                    speaker: 'narrator',
                    text: 'Mandatory mental health support for EMS. Reduced shift lengths. Better staffing ratios. Everything the department heads say is impossible.',
                },
                {
                    speaker: 'narrator',
                    text: 'But you know it\'s not impossible. You know what\'s really impossible—expecting people to see death every day and come out whole.',
                },
                {
                    speaker: 'narrator',
                    text: 'You speak about the calls. The ones that stay with you. Emily. The others. The faces you see when you close your eyes.',
                },
                {
                    speaker: 'narrator',
                    text: 'You speak about the partners you\'ve lost. Not to calls—to burnout. To suicide. To the bottle.',
                },
                {
                    speaker: 'narrator',
                    text: 'You speak about the system that takes everything and offers nothing. And then you speak about what it could be instead.',
                },
                {
                    speaker: 'narrator',
                    text: 'The vote isn\'t unanimous. But it passes. First step of many. But the first step is the hardest.',
                },
                {
                    speaker: 'narrator',
                    text: '**ENDING: ADVOCATE**\n\nYou couldn\'t save everyone. But you could change things for the ones who come next.',
                }
            ],

            epilogue: 'They name the mental health program after you. You tell them not to. They do it anyway. Years later, a young paramedic approaches you at a conference and says the program saved their life. That\'s when you finally believe it made a difference.',
            achievement: 'Systemic Change'
        }
    },

    // Check which ending the player has earned
    checkEndings(character, gameState) {
        const qualifiedEndings = [];

        for (const id in this.endings) {
            const ending = this.endings[id];

            if (this.checkConditions(ending.conditions, character, gameState)) {
                qualifiedEndings.push({
                    id: id,
                    ending: ending,
                    priority: ending.priority
                });
            }
        }

        // Sort by priority and return highest
        qualifiedEndings.sort((a, b) => b.priority - a.priority);

        return qualifiedEndings.length > 0 ? qualifiedEndings[0] : null;
    },

    // Check ending conditions
    checkConditions(conditions, character, gameState) {
        for (const key in conditions) {
            const condition = conditions[key];

            switch (key) {
                case 'stress':
                    if (condition.above && character.stress <= condition.above) return false;
                    if (condition.below && character.stress >= condition.below) return false;
                    if (condition.between &&
                        (character.stress < condition.between[0] ||
                            character.stress > condition.between[1])) return false;
                    break;

                case 'mentalState':
                    if (!condition.includes(character.mentalState)) return false;
                    break;

                case 'shiftsCompleted':
                    if (condition.above && character.shiftsCompleted <= condition.above) return false;
                    break;

                case 'callsCompleted':
                    if (condition.above && character.callsCompleted <= condition.above) return false;
                    break;

                case 'level':
                    if (condition.above && character.level <= condition.above) return false;
                    break;

                case 'prologueProcessed':
                    if (character.flags.openingTraumaProcessed !== condition) return false;
                    break;

                case 'therapyCount':
                    const therapy = character.copingHistory?.therapy?.count || 0;
                    if (condition.above && therapy <= condition.above) return false;
                    if (condition.below && therapy >= condition.below) return false;
                    break;

                case 'unhealthyCopingCount':
                    const unhealthy = this.countUnhealthyCoping(character);
                    if (condition.above && unhealthy <= condition.above) return false;
                    break;

                case 'healthyCopingCount':
                    const healthy = this.countHealthyCoping(character);
                    if (condition.above && healthy <= condition.above) return false;
                    break;

                case 'thoughtCompleted':
                    if (!character.thoughtCabinet?.completed?.includes(condition)) return false;
                    break;

                case 'relationshipHigh':
                    const highRels = this.countHighRelationships(character);
                    if (condition.above && highRels <= condition.above) return false;
                    if (condition.below && highRels >= condition.below) return false;
                    break;

                case 'partnerStoryCompleted':
                    const stories = this.countPartnerStoriesCompleted(character);
                    if (condition.above && stories <= condition.above) return false;
                    if (condition.any && stories === 0) return false;
                    break;

                case 'romanceComplete':
                    if (condition.any && !this.hasCompletedRomance(character)) return false;
                    break;

                case 'corruptionFlag':
                    if (!character.flags.discoveredCorruption) return false;
                    break;
            }
        }

        return true;
    },

    // Helper functions for condition checking
    countUnhealthyCoping(character) {
        const unhealthy = ['alcohol', 'drugs', 'isolation', 'overworking', 'reckless'];
        let count = 0;
        for (const id of unhealthy) {
            count += character.copingHistory?.[id]?.count || 0;
        }
        return count;
    },

    countHealthyCoping(character) {
        const healthy = ['therapy', 'exercise', 'social', 'hobby', 'sleep'];
        let count = 0;
        for (const id of healthy) {
            count += character.copingHistory?.[id]?.count || 0;
        }
        return count;
    },

    countHighRelationships(character) {
        return Object.values(character.relationships).filter(r => r.trust >= 80).length;
    },

    countPartnerStoriesCompleted(character) {
        return Object.values(character.flags).filter((v, k) =>
            k.endsWith('_story_complete') && v === true
        ).length;
    },

    hasCompletedRomance(character) {
        return Object.values(character.relationships).some(r => r.romanceStage >= 3);
    },

    // Play the ending sequence
    async playEnding(endingId, displayCallback) {
        const ending = this.endings[endingId];
        if (!ending) return null;

        // Play each dialogue in sequence
        for (const dialogue of ending.sequence) {
            await displayCallback(dialogue);
        }

        return {
            ending: ending,
            epilogue: ending.epilogue,
            achievement: ending.achievement
        };
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EndingsSystem;
}
