// Night Shift - Thought Cabinet System (Disco Elysium-style)
// Internalize thoughts to gain bonuses and unlock dialogue

const ThoughtCabinet = {
    // Available thoughts to internalize
    thoughts: {
        // ============================================
        // TRAUMA-RELATED THOUGHTS
        // ============================================

        the_girl_in_pink: {
            id: 'the_girl_in_pink',
            name: 'The Girl in Pink Pajamas',
            category: 'trauma',
            description: 'Emily Chen. 6 years old. You couldn\'t save her. Maybe you never could have.',
            unlockCondition: { type: 'flag', flag: 'prologueCompleted', value: true },

            internalizationTime: 180, // 3 hours game time
            internalizingText: 'You\'re thinking about her again. The pink pajamas. The mother\'s scream. Maybe if you think about it enough, you\'ll understand.',

            completedText: 'You\'ve accepted it. Not forgiven yourself—that may never come. But you understand that some calls are unwinnable from the start. The peace is fragile, but it\'s real.',

            bonuses: {
                stress_tolerance: 2,
                compartmentalization: 2,
                pediatric_care: 1
            },
            penalties: {
                empathy: -1
            },

            unlocksDialogue: ['trauma_processed', 'survivor_wisdom'],
            stressOnComplete: -10,

            internalMonologue: [
                'She was gone before you arrived. The obstruction, the time down—it was too long.',
                'You did everything right. And it didn\'t matter.',
                'That\'s the job. Sometimes it doesn\'t matter.'
            ]
        },

        gallows_humor_defense: {
            id: 'gallows_humor_defense',
            name: 'Laughing at the Reaper',
            category: 'coping',
            description: 'If you can\'t laugh at death, it wins. Right?',
            unlockCondition: { type: 'skill', skill: 'dark_humor', value: 8 },

            internalizationTime: 120,
            internalizingText: 'What did the paramedic say to the flatline? "You\'re killing me here." ...that\'s not funny. Why did you think that was funny?',

            completedText: 'Humor is a shield, not a wall. You can use it to deflect the darkness without letting it replace genuine feeling. The jokes are better now—darker, but more human.',

            bonuses: {
                dark_humor: 3,
                stress_tolerance: 1,
                composure: 1
            },
            penalties: {
                empathy: -1
            },

            unlocksDialogue: ['gallows_wisdom', 'joke_timing'],
            stressOnComplete: -5,

            internalMonologue: [
                'Laughter is just crying with better PR.',
                'The best jokes are the ones that hurt a little.',
                'If they\'re offended, they\'ve never done this job.'
            ]
        },

        // ============================================
        // PHILOSOPHICAL THOUGHTS
        // ============================================

        the_trolley_problem: {
            id: 'the_trolley_problem',
            name: 'Real World Trolley Problem',
            category: 'philosophy',
            description: 'Two patients, one unit. Who do you save? Philosophy class didn\'t prepare you for this.',
            unlockCondition: { type: 'call_completed', callType: 'mass_casualty' },

            internalizationTime: 240,
            internalizingText: 'Triage isn\'t choosing who lives. It\'s choosing who you can help. But that distinction feels thinner every time.',

            completedText: 'Triage is brutal utilitarianism. You save the most lives possible. The ones you lose were going to die anyway—you just had to make that official. It doesn\'t make it easier, but it makes it clearer.',

            bonuses: {
                trauma_assessment: 2,
                composure: 2,
                authority: 1
            },
            penalties: {
                empathy: -2
            },

            unlocksDialogue: ['triage_expert', 'hard_choices'],
            stressOnComplete: 5,

            internalMonologue: [
                'Black tags don\'t mean they\'re less human. They mean you can\'t help them.',
                'The greatest good for the greatest number. Cold math.',
                'Don\'t think about the ones you passed. Think about the ones you reached.'
            ]
        },

        first_do_no_harm: {
            id: 'first_do_no_harm',
            name: 'Primum Non Nocere',
            category: 'philosophy',
            description: 'First, do no harm. But sometimes doing nothing IS harm. Where\'s the line?',
            unlockCondition: { type: 'call_completed', callType: 'treatment_refusal' },

            internalizationTime: 180,
            internalizingText: 'Autonomy versus beneficence. They have the right to refuse. But you know they\'ll die if they do. What does "do no harm" mean then?',

            completedText: 'You can\'t save someone who doesn\'t want to be saved. Respecting their choice IS doing no harm—even when that choice kills them. The hardest part is accepting that their death isn\'t your failure.',

            bonuses: {
                persuasion: 2,
                self_awareness: 2,
                authority: 1
            },
            penalties: {
                stress_tolerance: -1
            },

            unlocksDialogue: ['ethical_expert', 'informed_refusal'],
            stressOnComplete: 0,

            internalMonologue: [
                'Their body, their choice. Even when they\'re wrong.',
                'You gave them the information. What they do with it is on them.',
                'Sometimes the kindest thing is stepping back.'
            ]
        },

        // ============================================
        // PROFESSIONAL THOUGHTS
        // ============================================

        protocol_vs_instinct: {
            id: 'protocol_vs_instinct',
            name: 'The Book vs. The Gut',
            category: 'professional',
            description: 'Protocols exist for a reason. But so does experience. When do you deviate?',
            unlockCondition: { type: 'skill', skill: 'intuition', value: 10 },

            internalizationTime: 150,
            internalizingText: 'The protocol says one thing. Your gut says another. One is legally defensible. The other might save a life.',

            completedText: 'Protocols are guidelines, not commandments. They\'re written for the average case—but there is no average case. Trust your training, but trust yourself too. Know when to color outside the lines.',

            bonuses: {
                intuition: 3,
                memory: 1,
                composure: 1
            },
            penalties: {},

            unlocksDialogue: ['protocol_deviation', 'experienced_judgment'],
            stressOnComplete: -3,

            internalMonologue: [
                'The protocol was written by someone who wasn\'t here.',
                'Experience is what the protocol can\'t capture.',
                'But if you\'re wrong, you\'re liable. Choose carefully.'
            ]
        },

        burnout_recognition: {
            id: 'burnout_recognition',
            name: 'The Smell of Smoke',
            category: 'self',
            description: 'You know the signs of burnout. In your patients. In your partners. When will you see them in yourself?',
            unlockCondition: { type: 'stress', operator: 'above', value: 70 },

            internalizationTime: 200,
            internalizingText: 'Insomnia. Cynicism. Detachment. Irritability. You\'ve lectured partners about these symptoms. When did you develop all of them?',

            completedText: 'You\'re burning out. Acknowledging it is the first step. You can\'t save anyone if you don\'t save yourself first. Time to actually use those coping strategies you recommend to everyone else.',

            bonuses: {
                self_awareness: 4,
                stress_tolerance: 2
            },
            penalties: {
                stamina: -1
            },

            unlocksDialogue: ['burnout_honest', 'self_care_serious'],
            stressOnComplete: -15,

            internalMonologue: [
                'Physician, heal thyself.',
                'You can\'t pour from an empty cup.',
                'Maybe it\'s time to take your own advice.'
            ]
        },

        // ============================================
        // RELATIONSHIP THOUGHTS
        // ============================================

        partner_dependency: {
            id: 'partner_dependency',
            name: 'Two-Person Crew',
            category: 'relationship',
            description: 'Your partner has your back. You have theirs. But where does partnership end and dependency begin?',
            unlockCondition: { type: 'relationship', partner: 'any', value: 70 },

            internalizationTime: 160,
            internalizingText: 'You rely on them. They rely on you. It works. But what happens when one of you isn\'t there?',

            completedText: 'Good partnerships are built on trust, not dependency. You can rely on each other without needing each other. Strong alone, stronger together.',

            bonuses: {
                composure: 2,
                self_awareness: 1
            },
            penalties: {},

            partnerBonuses: { all: 2 },
            unlocksDialogue: ['partner_trust', 'independence'],
            stressOnComplete: -5,

            internalMonologue: [
                'They\'re good at what you\'re bad at.',
                'Trust them to do their job while you do yours.',
                'But be ready to do it alone if you have to.'
            ]
        },

        patient_attachment: {
            id: 'patient_attachment',
            name: 'Just Another Number',
            category: 'relationship',
            description: 'You\'re not supposed to get attached to patients. But some of them stay with you.',
            unlockCondition: { type: 'flag', flag: 'helped_frequent_flyer', value: true },

            internalizationTime: 180,
            internalizingText: 'Raymond. Mrs. Patterson. The ones you remember. Why them? Why not the hundreds of others?',

            completedText: 'Some patients become people to you. That\'s not a weakness—it\'s proof you\'re still human. Just don\'t let their outcome determine your worth.',

            bonuses: {
                empathy: 3,
                intuition: 1
            },
            penalties: {
                compartmentalization: -1
            },

            unlocksDialogue: ['patient_connection', 'healthy_boundaries'],
            stressOnComplete: 0,

            internalMonologue: [
                'They\'re not just a call number.',
                'But you can\'t carry them all with you.',
                'Remember them. Learn from them. Then let go.'
            ]
        },

        // ============================================
        // CAREER THOUGHTS
        // ============================================

        why_still_here: {
            id: 'why_still_here',
            name: 'Why Do You Stay?',
            category: 'career',
            description: 'The pay is bad. The hours are worse. The trauma is constant. So why are you still here?',
            unlockCondition: { type: 'shifts_completed', value: 20 },

            internalizationTime: 240,
            internalizingText: 'It\'s not the money. It\'s not the glory. Most days it\'s not even the gratitude. So what keeps you coming back?',

            completedText: 'Because someone has to. Because you\'re good at it. Because in the worst moments of someone\'s life, you can make a difference. That\'s not nothing. That\'s everything.',

            bonuses: {
                stress_tolerance: 3,
                stamina: 2,
                composure: 1
            },
            penalties: {},

            unlocksDialogue: ['vocational_calling', 'job_meaning'],
            stressOnComplete: -10,

            internalMonologue: [
                'It\'s not a job. It\'s a calling.',
                'Someone has to answer when they call 911.',
                'Might as well be someone who gives a damn.'
            ]
        },

        promotion_question: {
            id: 'promotion_question',
            name: 'The Desk Job',
            category: 'career',
            description: 'Supervisor position is open. Better pay. No more calls. Is that what you want?',
            unlockCondition: { type: 'level', value: 10 },

            internalizationTime: 200,
            internalizingText: 'Trade the ambulance for a desk. Paperwork instead of patients. It\'s the "smart" career move. So why does it feel like giving up?',

            completedText: 'Leadership isn\'t giving up—it\'s leveling up. You can help more people by training better paramedics than by being one. But only when you\'re ready. Not as an escape.',

            bonuses: {
                authority: 3,
                memory: 1
            },
            penalties: {},

            unlocksDialogue: ['leadership_ready', 'mentor_mindset'],
            stressOnComplete: 0,

            internalMonologue: [
                'Those who can, do. Those who can\'t, manage.',
                '...or those who\'ve done enough do more by teaching.',
                'It\'s not about escaping. It\'s about what you\'re running toward.'
            ]
        }
    },

    // Player's thought cabinet state
    playerCabinet: {
        available: [],      // Unlocked but not started
        internalizing: null, // Currently processing
        completed: [],      // Fully internalized
        timeRemaining: 0    // Time left on current thought
    },

    // Check what thoughts are unlocked based on game state
    checkUnlocks(character, gameState) {
        const newUnlocks = [];

        for (const id in this.thoughts) {
            const thought = this.thoughts[id];

            // Skip if already available or completed
            if (this.playerCabinet.available.includes(id) ||
                this.playerCabinet.completed.includes(id)) {
                continue;
            }

            // Check unlock condition
            if (this.evaluateCondition(thought.unlockCondition, character, gameState)) {
                this.playerCabinet.available.push(id);
                newUnlocks.push(thought);
            }
        }

        return newUnlocks;
    },

    // Evaluate unlock condition
    evaluateCondition(condition, character, gameState) {
        if (!condition) return true;

        switch (condition.type) {
            case 'flag':
                return character.flags[condition.flag] === condition.value;
            case 'skill':
                return CharacterSystem.getSkillValue(character, condition.skill) >= condition.value;
            case 'stress':
                if (condition.operator === 'above') {
                    return character.stress > condition.value;
                }
                return character.stress < condition.value;
            case 'relationship':
                if (condition.partner === 'any') {
                    return Object.values(character.relationships).some(r => r.trust >= condition.value);
                }
                return character.relationships[condition.partner]?.trust >= condition.value;
            case 'call_completed':
                return gameState.completedCallTypes?.includes(condition.callType);
            case 'shifts_completed':
                return character.shiftsCompleted >= condition.value;
            case 'level':
                return character.level >= condition.value;
            default:
                return false;
        }
    },

    // Start internalizing a thought
    startInternalizing(thoughtId, character) {
        if (!this.playerCabinet.available.includes(thoughtId)) {
            return { success: false, reason: 'Thought not available' };
        }

        if (this.playerCabinet.internalizing) {
            return { success: false, reason: 'Already internalizing another thought' };
        }

        const thought = this.thoughts[thoughtId];

        this.playerCabinet.internalizing = thoughtId;
        this.playerCabinet.timeRemaining = thought.internalizationTime;

        // Remove from available
        const index = this.playerCabinet.available.indexOf(thoughtId);
        this.playerCabinet.available.splice(index, 1);

        return {
            success: true,
            thought: thought,
            message: thought.internalizingText
        };
    },

    // Progress time on current thought
    progressTime(minutes) {
        if (!this.playerCabinet.internalizing) return null;

        this.playerCabinet.timeRemaining -= minutes;

        if (this.playerCabinet.timeRemaining <= 0) {
            return this.completeThought();
        }

        return null;
    },

    // Complete internalization
    completeThought() {
        const thoughtId = this.playerCabinet.internalizing;
        if (!thoughtId) return null;

        const thought = this.thoughts[thoughtId];

        // Move to completed
        this.playerCabinet.completed.push(thoughtId);
        this.playerCabinet.internalizing = null;
        this.playerCabinet.timeRemaining = 0;

        return {
            thought: thought,
            message: thought.completedText,
            bonuses: thought.bonuses,
            penalties: thought.penalties,
            stressChange: thought.stressOnComplete,
            unlocksDialogue: thought.unlocksDialogue
        };
    },

    // Apply thought bonuses to character
    applyThoughtEffects(character) {
        const totalBonuses = {};
        const totalPenalties = {};

        for (const thoughtId of this.playerCabinet.completed) {
            const thought = this.thoughts[thoughtId];

            for (const skill in thought.bonuses) {
                totalBonuses[skill] = (totalBonuses[skill] || 0) + thought.bonuses[skill];
            }

            for (const skill in thought.penalties) {
                totalPenalties[skill] = (totalPenalties[skill] || 0) + thought.penalties[skill];
            }
        }

        return { bonuses: totalBonuses, penalties: totalPenalties };
    },

    // Get internal monologue for a completed thought
    getInternalMonologue(thoughtId) {
        const thought = this.thoughts[thoughtId];
        if (!thought || !thought.internalMonologue) return null;

        return thought.internalMonologue[Utils.random(0, thought.internalMonologue.length - 1)];
    },

    // Cancel current internalization
    cancelInternalization() {
        if (!this.playerCabinet.internalizing) return false;

        // Return to available
        this.playerCabinet.available.push(this.playerCabinet.internalizing);
        this.playerCabinet.internalizing = null;
        this.playerCabinet.timeRemaining = 0;

        return true;
    },

    // Get display data for UI
    getCabinetDisplay() {
        const display = {
            available: [],
            internalizing: null,
            completed: []
        };

        // Available thoughts
        for (const id of this.playerCabinet.available) {
            const thought = this.thoughts[id];
            display.available.push({
                id: id,
                name: thought.name,
                category: thought.category,
                description: thought.description,
                time: thought.internalizationTime
            });
        }

        // Currently internalizing
        if (this.playerCabinet.internalizing) {
            const thought = this.thoughts[this.playerCabinet.internalizing];
            display.internalizing = {
                id: this.playerCabinet.internalizing,
                name: thought.name,
                text: thought.internalizingText,
                timeRemaining: this.playerCabinet.timeRemaining,
                totalTime: thought.internalizationTime
            };
        }

        // Completed thoughts
        for (const id of this.playerCabinet.completed) {
            const thought = this.thoughts[id];
            display.completed.push({
                id: id,
                name: thought.name,
                category: thought.category,
                text: thought.completedText,
                bonuses: thought.bonuses,
                penalties: thought.penalties
            });
        }

        return display;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThoughtCabinet;
}
