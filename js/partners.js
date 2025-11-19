// Night Shift - Partner System

const PartnerSystem = {
    // Partner definitions
    partners: {
        marcus: {
            id: 'marcus',
            name: 'Marcus "Doc" Williams',
            nickname: 'Doc',
            age: 52,
            yearsOnJob: 20,
            portrait: 'marcus',

            description: 'Twenty years of sirens and silence. Marcus has seen it all, done it all, and buried most of it. He\'s counting the days to retirement, but can\'t shake the feeling he\'s wasted his life saving others while losing himself.',

            personality: {
                traits: ['cynical', 'competent', 'guarded', 'dry_humor'],
                style: 'clinical',
                quirks: ['Calls everyone "kid"', 'Always has coffee', 'Never talks about family']
            },

            skills: {
                cardiology: 12,
                trauma_assessment: 11,
                pharmacology: 10,
                composure: 13,
                memory: 10,
                empathy: 4,
                dark_humor: 9
            },

            buffs: {
                medical_checks: 2,
                composure_checks: 3,
                stress_in_chaos: -5
            },

            nerfs: {
                empathy_checks: -3,
                emotional_calls: { stressMultiplier: 0.5, patientRapport: -2 }
            },

            story: {
                arc: 'legacy',
                centralQuestion: 'Was it worth it?',
                backstory: 'Divorced twice. Kids don\'t call. The job took everything, and now he\'s not sure what he saved.',
                growth: 'Learning that connection isn\'t weakness',
                personalCall: 'marcus_retirement_crisis'
            },

            relationships: {
                initialTrust: 40,
                romanceable: false,
                rivalWith: null,
                friendsWith: ['ray']
            },

            dialogue: {
                greetings: [
                    "Another day in paradise, kid.",
                    "You ready? Coffee's fresh.",
                    "Let's get this over with."
                ],
                callStart: [
                    "Here we go. Stay sharp.",
                    "I've seen a thousand of these. Follow my lead.",
                    "Remember your training."
                ],
                success: [
                    "Good work. Don't let it go to your head.",
                    "That's how it's done.",
                    "Acceptable."
                ],
                failure: [
                    "You did what you could. Move on.",
                    "Can't save them all, kid. Learn that now.",
                    "Shake it off. Next call's coming."
                ],
                stressed: [
                    "You're losing it. Breathe.",
                    "Get your head straight or wait in the rig.",
                    "I've seen that look before. Don't go down that road."
                ]
            },

            teaches: 'Clinical detachment can be survival, but don\'t let it become your whole life.'
        },

        jenny: {
            id: 'jenny',
            name: 'Jenny Rodriguez',
            nickname: 'Jenny',
            age: 26,
            yearsOnJob: 3,
            portrait: 'jenny',

            description: 'Three years in and still believes. Jenny wants to make a difference, save lives, be the light in someone\'s darkest moment. She hasn\'t broken yet.',

            personality: {
                traits: ['optimistic', 'empathetic', 'passionate', 'naive'],
                style: 'emotional',
                quirks: ['Names the ambulance', 'Remembers every patient\'s name', 'Volunteers on off days']
            },

            skills: {
                empathy: 12,
                persuasion: 10,
                de_escalation: 9,
                pediatric_care: 8,
                stress_tolerance: 5,
                composure: 6,
                compartmentalization: 3
            },

            buffs: {
                empathy_checks: 3,
                patient_rapport: 4,
                morale: 10,
                pediatric_calls: 2
            },

            nerfs: {
                stress_from_trauma: 1.5,
                composure_checks: -2,
                death_calls: { stressMultiplier: 2.0 }
            },

            story: {
                arc: 'breaking',
                centralQuestion: 'Can hope survive reality?',
                backstory: 'Became a paramedic after her little brother was saved by EMS. Wants to pay it forward.',
                growth: 'Learning that hope isn\'t naive - it\'s a choice',
                personalCall: 'jenny_first_pediatric_death'
            },

            relationships: {
                initialTrust: 60,
                romanceable: true,
                rivalWith: ['marcus'],
                friendsWith: ['sarah']
            },

            dialogue: {
                greetings: [
                    "Morning! Ready to save some lives?",
                    "I brought donuts. Sugar for energy!",
                    "Every shift is a chance to make a difference."
                ],
                callStart: [
                    "Let's go help someone.",
                    "They need us. Let's not keep them waiting.",
                    "I hope we get there in time."
                ],
                success: [
                    "Yes! We did it!",
                    "That's why I do this job.",
                    "They're going to be okay. That matters."
                ],
                failure: [
                    "Oh god... I... we tried...",
                    "There had to be something else we could do...",
                    "I can't... give me a minute."
                ],
                stressed: [
                    "Are you okay? Talk to me.",
                    "We should debrief. It helps, I promise.",
                    "You don't have to carry this alone."
                ]
            },

            teaches: 'Hope isn\'t weakness. Caring isn\'t naive. But you need to protect yourself too.'
        },

        darius: {
            id: 'darius',
            name: 'Darius Thompson',
            nickname: 'Darius',
            age: 34,
            yearsOnJob: 4,
            portrait: 'darius',

            description: 'Combat medic, two tours. Darius came home but left pieces of himself in the desert. He\'s looking for purpose, but the ghosts followed him back.',

            personality: {
                traits: ['disciplined', 'intense', 'haunted', 'protective'],
                style: 'military',
                quirks: ['Checks exits first', 'Sleeps light', 'Never sits with back to door']
            },

            skills: {
                trauma_assessment: 13,
                strength: 11,
                reflexes: 10,
                composure: 9,
                authority: 10,
                stress_tolerance: 7,
                empathy: 5,
                de_escalation: 4
            },

            buffs: {
                trauma_calls: 4,
                strength_checks: 3,
                mass_casualty: 5,
                triage: 4
            },

            nerfs: {
                civilian_rapport: -2,
                triggers: ['explosions', 'children_injured', 'confined_spaces'],
                triggered_state: { composure: -5, aggression: 3 }
            },

            story: {
                arc: 'healing',
                centralQuestion: 'Can you come home from war?',
                backstory: 'Lost his whole squad to an IED. Survivor\'s guilt. VA isn\'t helping.',
                growth: 'Finding that saving lives here can\'t erase there, but it can build something new',
                personalCall: 'darius_veteran_suicide'
            },

            relationships: {
                initialTrust: 35,
                romanceable: true,
                rivalWith: null,
                friendsWith: []
            },

            dialogue: {
                greetings: [
                    "Ready to roll.",
                    "*nods* Partner.",
                    "Let's move. Time's wasting."
                ],
                callStart: [
                    "Stay behind me until we secure the scene.",
                    "Watch your sectors.",
                    "Execute the protocol. No improvising."
                ],
                success: [
                    "Mission complete.",
                    "Clean execution.",
                    "That's how you save a life."
                ],
                failure: [
                    "*silence*",
                    "Couldn't save them all over there either.",
                    "You did everything right. Sometimes it's not enough."
                ],
                stressed: [
                    "You need to lock it down. Now.",
                    "Falling apart doesn't help them.",
                    "I know that look. Come find me when you're ready to talk."
                ]
            },

            teaches: 'Some wounds never close. But you can learn to live with the scars.'
        },

        olivia: {
            id: 'olivia',
            name: 'Olivia Chen',
            nickname: 'Liv',
            age: 28,
            yearsOnJob: 5,
            portrait: 'olivia',

            description: 'Perfectionist, by-the-book, studying for medical school. Olivia knows every protocol, every medication, every procedure. But knowledge alone isn\'t enough, and she\'s terrified of making mistakes.',

            personality: {
                traits: ['perfectionist', 'anxious', 'intelligent', 'rigid'],
                style: 'technical',
                quirks: ['Organizes everything', 'Quotes studies', 'Practices procedures off-duty']
            },

            skills: {
                memory: 14,
                pharmacology: 12,
                cardiology: 11,
                airway_management: 10,
                composure: 4,
                intuition: 5,
                streetwise: 3
            },

            buffs: {
                protocol_checks: 4,
                diagnosis: 3,
                medication_dosage: 5,
                rare_conditions: 4
            },

            nerfs: {
                improvisation: -3,
                protocol_failure: { panicRisk: 0.4, composure: -4 },
                streetwise_checks: -3
            },

            story: {
                arc: 'confidence',
                centralQuestion: 'What happens when the textbook is wrong?',
                backstory: 'Parents are both doctors. Anything less than perfect is failure.',
                growth: 'Learning that competence includes adapting, not just memorizing',
                personalCall: 'olivia_impossible_diagnosis'
            },

            relationships: {
                initialTrust: 45,
                romanceable: true,
                rivalWith: ['ray'],
                friendsWith: ['jenny']
            },

            dialogue: {
                greetings: [
                    "I reviewed the latest protocol updates. Did you?",
                    "Good morning. Let's do this correctly.",
                    "I made flashcards for the new medications."
                ],
                callStart: [
                    "Remember: ABCs, then secondary assessment.",
                    "Let's follow the protocol exactly.",
                    "I'll handle the medications. You do compressions."
                ],
                success: [
                    "Textbook execution. Well done.",
                    "That's what proper training looks like.",
                    "The protocol works when you follow it."
                ],
                failure: [
                    "What did I miss? I must have missed something.",
                    "The protocol... I followed it exactly...",
                    "I need to review this. There has to be an explanation."
                ],
                stressed: [
                    "Your vitals look concerning. When did you last sleep?",
                    "There are resources for this. I can send you links.",
                    "Maybe we should... debrief? That's what you're supposed to do, right?"
                ]
            },

            teaches: 'Knowledge is the foundation, but wisdom is knowing when to build something new on top of it.'
        },

        ray: {
            id: 'ray',
            name: 'Ray "Lucky" Sullivan',
            nickname: 'Lucky',
            age: 38,
            yearsOnJob: 10,
            portrait: 'ray',

            description: 'Ten years and still cracking jokes. Ray uses humor like armor - the darker the call, the worse the puns. But armor can become a prison if you forget to take it off.',

            personality: {
                traits: ['humorous', 'avoidant', 'superstitious', 'perceptive'],
                style: 'deflecting',
                quirks: ['Lucky rabbit foot on mirror', 'Never says "quiet shift"', 'Knows every diner in the city']
            },

            skills: {
                dark_humor: 14,
                streetwise: 12,
                observation: 10,
                intuition: 9,
                de_escalation: 8,
                self_awareness: 3,
                compartmentalization: 4
            },

            buffs: {
                morale: 15,
                partner_stress_reduction: 5,
                reading_scenes: 3,
                finding_resources: 4
            },

            nerfs: {
                serious_conversations: -4,
                emotional_processing: -3,
                authority_checks: -2
            },

            story: {
                arc: 'vulnerability',
                centralQuestion: 'What are you hiding from?',
                backstory: 'Lost his partner to suicide five years ago. Found him. Never talked about it.',
                growth: 'Learning that humor is a tool, not a wall',
                personalCall: 'ray_partner_anniversary'
            },

            relationships: {
                initialTrust: 55,
                romanceable: true,
                rivalWith: ['olivia'],
                friendsWith: ['marcus']
            },

            dialogue: {
                greetings: [
                    "Hey, partner! Brought my lucky socks!",
                    "Ready for another day in the chaos casino?",
                    "Don't worry, I already knocked on wood."
                ],
                callStart: [
                    "Let's rock and roll. Or maybe just roll, we're in an ambulance.",
                    "Time to earn those slightly-above-minimum-wage bucks!",
                    "Another satisfied customer of the Boo-Boo Bus awaits!"
                ],
                success: [
                    "And THAT'S why they pay us the mediocre bucks!",
                    "See? Lucky socks. Never doubt the socks.",
                    "Another one for the win column!"
                ],
                failure: [
                    "Well... on the bright side... *trails off*",
                    "Sometimes the dice just... yeah.",
                    "That's, uh... that's gonna be a quiet ride back."
                ],
                stressed: [
                    "Hey, you know what's funny? Neither do I right now. You okay?",
                    "Want to hear a joke? ...No? Okay. That's okay too.",
                    "I know a diner. Best pie in the city. Let's go not talk about it."
                ]
            },

            teaches: 'Sometimes you laugh so you don\'t break. Just don\'t forget there\'s a real person under the jokes.'
        },

        sarah: {
            id: 'sarah',
            name: 'Sarah Mitchell',
            nickname: 'Sarah',
            age: 24,
            yearsOnJob: 1,
            portrait: 'sarah',

            description: 'You saved her life. She became a paramedic because of you. Sarah sees you as a hero, and that weight might be heavier than any patient you\'ve ever carried.',

            personality: {
                traits: ['devoted', 'earnest', 'pressured', 'growing'],
                style: 'eager',
                quirks: ['Takes notes on everything you do', 'Studies your old calls', 'Defends you to everyone']
            },

            skills: {
                empathy: 9,
                stamina: 8,
                memory: 8,
                observation: 7,
                composure: 5,
                streetwise: 4,
                trauma_assessment: 5
            },

            buffs: {
                partner_morale: 8,
                dedication: 4,
                learning_speed: 3
            },

            nerfs: {
                independence: -3,
                pressure_from_expectations: { stressMultiplier: 1.3 },
                experience_checks: -4
            },

            story: {
                arc: 'disillusionment',
                centralQuestion: 'What happens when heroes are human?',
                backstory: 'Cardiac arrest at 22. You brought her back. She left her job, went to EMT school, applied to your station.',
                growth: 'Discovering that real heroism isn\'t perfection - it\'s showing up broken and doing the work anyway',
                personalCall: 'sarah_discovers_truth'
            },

            relationships: {
                initialTrust: 80,
                romanceable: false, // Ethically complicated
                rivalWith: null,
                friendsWith: ['jenny']
            },

            dialogue: {
                greetings: [
                    "Good morning! I reviewed the calls from last shift.",
                    "I'm ready. Whatever you need.",
                    "It's an honor to work with you. Really."
                ],
                callStart: [
                    "I'll follow your lead. Just tell me what you need.",
                    "How would you handle this?",
                    "Watching and learning."
                ],
                success: [
                    "That was amazing! How did you know to do that?",
                    "I want to be able to do that someday.",
                    "You make it look easy."
                ],
                failure: [
                    "You did everything right. It's not your fault.",
                    "Even you can't save everyone. That's... that's okay.",
                    "I'm sorry. What can I do?"
                ],
                stressed: [
                    "Are you okay? Really? Because I... I need you to be okay.",
                    "Maybe I can help? Just tell me how.",
                    "You've helped so many people. Let someone help you."
                ]
            },

            teaches: 'Your actions have ripples. The responsibility is real, but so is the hope you create.'
        }
    },

    // Relationship mechanics
    relationshipLevels: {
        0: { name: 'Stranger', trust: 0, perks: [] },
        1: { name: 'Acquaintance', trust: 20, perks: ['small_talk'] },
        2: { name: 'Colleague', trust: 40, perks: ['backstory_hints'] },
        3: { name: 'Friend', trust: 60, perks: ['personal_calls', 'stress_sharing'] },
        4: { name: 'Close Friend', trust: 80, perks: ['deep_dialogue', 'crisis_support'] },
        5: { name: 'Bond', trust: 100, perks: ['full_story', 'special_ending'] }
    },

    // Initialize partner relationship
    initializeRelationship(partnerId) {
        const partner = this.partners[partnerId];
        if (!partner) return null;

        return {
            partnerId: partnerId,
            trust: partner.relationships.initialTrust,
            shiftsWorked: 0,
            callsTogether: 0,
            conflictsResolved: 0,
            sharedTraumas: 0,
            personalCallsCompleted: [],
            romanceStage: 0, // 0 = none, 1-3 = stages
            currentMood: 'neutral',
            stressLevel: 20
        };
    },

    // Get relationship level from trust
    getRelationshipLevel(trust) {
        if (trust >= 100) return 5;
        if (trust >= 80) return 4;
        if (trust >= 60) return 3;
        if (trust >= 40) return 2;
        if (trust >= 20) return 1;
        return 0;
    },

    // Modify relationship
    modifyRelationship(relationship, change, reason) {
        const oldLevel = this.getRelationshipLevel(relationship.trust);
        relationship.trust = Utils.clamp(relationship.trust + change, 0, 100);
        const newLevel = this.getRelationshipLevel(relationship.trust);

        return {
            change,
            reason,
            oldLevel,
            newLevel,
            levelUp: newLevel > oldLevel,
            levelDown: newLevel < oldLevel
        };
    },

    // Get partner dialogue
    getPartnerDialogue(partnerId, context, relationship) {
        const partner = this.partners[partnerId];
        if (!partner) return null;

        const dialogues = partner.dialogue[context];
        if (!dialogues || dialogues.length === 0) return null;

        // Select based on relationship level for variety
        const level = this.getRelationshipLevel(relationship.trust);
        const index = Math.min(level, dialogues.length - 1);

        return dialogues[Utils.random(0, Math.min(index, dialogues.length - 1))];
    },

    // Apply partner buffs/nerfs to a check
    getPartnerModifier(partnerId, checkType, context = {}) {
        const partner = this.partners[partnerId];
        if (!partner) return 0;

        let modifier = 0;

        // Check buffs
        if (partner.buffs[checkType]) {
            modifier += partner.buffs[checkType];
        }
        if (partner.buffs[`${checkType}_checks`]) {
            modifier += partner.buffs[`${checkType}_checks`];
        }

        // Check nerfs
        if (partner.nerfs[checkType]) {
            modifier += partner.nerfs[checkType];
        }
        if (partner.nerfs[`${checkType}_checks`]) {
            modifier += partner.nerfs[`${checkType}_checks`];
        }

        return modifier;
    },

    // Check for partner triggers (PTSD, etc.)
    checkPartnerTrigger(partnerId, triggerType) {
        const partner = this.partners[partnerId];
        if (!partner || !partner.nerfs.triggers) return null;

        if (partner.nerfs.triggers.includes(triggerType)) {
            return {
                triggered: true,
                effects: partner.nerfs.triggered_state,
                partnerId
            };
        }

        return null;
    },

    // Get partner stress impact on player
    getPartnerStressImpact(partnerId, relationship) {
        const partner = this.partners[partnerId];
        if (!partner) return 0;

        // Partners can reduce or increase stress based on relationship
        const level = this.getRelationshipLevel(relationship.trust);
        let impact = 0;

        // Morale buff reduces stress
        if (partner.buffs.morale) {
            impact -= partner.buffs.morale * (level / 5);
        }

        // Partner stress reduction
        if (partner.buffs.partner_stress_reduction) {
            impact -= partner.buffs.partner_stress_reduction;
        }

        return Math.round(impact);
    },

    // Get available partners for scheduling
    getAvailablePartners(gameState) {
        const available = [];
        for (const partnerId in this.partners) {
            const partner = this.partners[partnerId];
            // Check if partner is available (not on leave, not in crisis, etc.)
            const relationship = gameState.character.relationships[partnerId];

            if (!relationship) {
                // Initialize if first time
                gameState.character.relationships[partnerId] = this.initializeRelationship(partnerId);
            }

            available.push({
                id: partnerId,
                name: partner.name,
                nickname: partner.nickname,
                trust: gameState.character.relationships[partnerId].trust,
                level: this.getRelationshipLevel(gameState.character.relationships[partnerId].trust)
            });
        }
        return available;
    },

    // Get partner info for display
    getPartnerInfo(partnerId, relationship) {
        const partner = this.partners[partnerId];
        if (!partner) return null;

        const level = this.getRelationshipLevel(relationship.trust);
        const levelInfo = this.relationshipLevels[level];

        return {
            id: partner.id,
            name: partner.name,
            nickname: partner.nickname,
            age: partner.age,
            yearsOnJob: partner.yearsOnJob,
            description: partner.description,
            relationshipLevel: levelInfo.name,
            trust: relationship.trust,
            shiftsWorked: relationship.shiftsWorked,
            perks: levelInfo.perks,
            romanceable: partner.relationships.romanceable,
            romanceStage: relationship.romanceStage,
            teaches: partner.teaches
        };
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PartnerSystem;
}
