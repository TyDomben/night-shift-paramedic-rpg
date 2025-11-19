// Night Shift - Character System

const CharacterSystem = {
    // Skill definitions (24 total across 4 categories)
    skills: {
        // MEDICAL EXPERTISE
        medical: {
            name: 'Medical Expertise',
            skills: {
                cardiology: { name: 'Cardiology', desc: 'Heart-related emergencies, cardiac rhythms' },
                trauma_assessment: { name: 'Trauma Assessment', desc: 'Injury evaluation and triage' },
                pharmacology: { name: 'Pharmacology', desc: 'Medication knowledge and administration' },
                airway_management: { name: 'Airway Management', desc: 'Intubation, breathing support' },
                pediatric_care: { name: 'Pediatric Care', desc: 'Children require different approaches' },
                geriatric_care: { name: 'Geriatric Care', desc: 'Elderly patient complications' }
            }
        },
        // PHYSICAL ABILITIES
        physical: {
            name: 'Physical Abilities',
            skills: {
                stamina: { name: 'Stamina', desc: 'Handle long shifts and physical labor' },
                dexterity: { name: 'Dexterity', desc: 'Perform delicate procedures under pressure' },
                strength: { name: 'Strength', desc: 'Move patients and carry equipment' },
                composure: { name: 'Composure', desc: 'Stay steady in chaos' },
                pain_threshold: { name: 'Pain Threshold', desc: 'Work through injury and exhaustion' },
                reflexes: { name: 'Reflexes', desc: 'React quickly to emergencies' }
            }
        },
        // INTERPERSONAL SKILLS
        interpersonal: {
            name: 'Interpersonal Skills',
            skills: {
                empathy: { name: 'Empathy', desc: 'Understand patient emotions, bedside manner' },
                authority: { name: 'Authority', desc: 'Command respect and take charge' },
                de_escalation: { name: 'De-escalation', desc: 'Calm aggressive or panicked people' },
                persuasion: { name: 'Persuasion', desc: 'Convince patients to comply with treatment' },
                observation: { name: 'Observation', desc: 'Notice subtle details, read body language' },
                streetwise: { name: 'Streetwise', desc: 'Navigate rough neighborhoods, spot danger' }
            }
        },
        // MENTAL/EMOTIONAL
        mental: {
            name: 'Mental/Emotional',
            skills: {
                stress_tolerance: { name: 'Stress Tolerance', desc: 'Resist sanity drain' },
                compartmentalization: { name: 'Compartmentalization', desc: 'Separate work from personal life' },
                memory: { name: 'Memory', desc: 'Recall protocols and patient histories' },
                intuition: { name: 'Intuition', desc: 'Gut feelings about situations' },
                dark_humor: { name: 'Dark Humor', desc: 'Cope through gallows humor' },
                self_awareness: { name: 'Self-Awareness', desc: 'Recognize your own mental state' }
            }
        }
    },

    // Character backgrounds
    backgrounds: {
        burned_out_veteran: {
            name: 'Burned Out Veteran',
            desc: '15 years on the job. You\'ve seen everything, done everything. The fire burned out long ago, but you keep showing up.',
            bonuses: {
                cardiology: 3, trauma_assessment: 3, memory: 2, pharmacology: 2,
                composure: 2, streetwise: 2
            },
            penalties: {
                stress_tolerance: -2, empathy: -1
            },
            startingStress: 40,
            startingTrait: 'cynical',
            dialogue: 'veteran'
        },
        idealistic_rookie: {
            name: 'Idealistic Rookie',
            desc: 'Fresh out of training, ready to save the world. You still believe you can make a difference.',
            bonuses: {
                empathy: 3, stamina: 2, memory: 2, stress_tolerance: 1
            },
            penalties: {
                streetwise: -2, composure: -1, intuition: -1
            },
            startingStress: 10,
            startingTrait: 'hopeful',
            dialogue: 'rookie'
        },
        career_changer: {
            name: 'Career-Changer',
            desc: 'You left a different life behind. Maybe running from something, maybe toward something better.',
            bonuses: {
                persuasion: 2, observation: 2, self_awareness: 2,
                compartmentalization: 1, authority: 1
            },
            penalties: {
                pediatric_care: -1, geriatric_care: -1
            },
            startingStress: 20,
            startingTrait: 'determined',
            dialogue: 'changer'
        },
        legacy_paramedic: {
            name: 'Legacy Paramedic',
            desc: 'Your parent was a paramedic. Their partner. Their whole crew. You have a reputation to uphold.',
            bonuses: {
                authority: 2, memory: 2, pharmacology: 1, cardiology: 1,
                airway_management: 1
            },
            penalties: {
                self_awareness: -2, stress_tolerance: -1
            },
            startingStress: 25,
            startingTrait: 'pressured',
            dialogue: 'legacy'
        },
        second_chance: {
            name: 'Second Chance',
            desc: 'You\'ve been to the bottom. Addiction, incident, breakdown - doesn\'t matter. This is your redemption.',
            bonuses: {
                empathy: 3, intuition: 2, de_escalation: 2, self_awareness: 2
            },
            penalties: {
                authority: -2, composure: -1
            },
            startingStress: 30,
            startingTrait: 'recovering',
            dialogue: 'second_chance'
        }
    },

    // Personality archetypes
    archetypes: {
        compassionate: {
            name: 'The Compassionate',
            desc: 'You feel everything deeply. Every patient is a person, not a case number.',
            bonuses: { empathy: 2, de_escalation: 1, intuition: 1 },
            penalties: { compartmentalization: -2 },
            stressModifier: 1.2, // Takes more stress from trauma
            dialogueStyle: 'emotional'
        },
        professional: {
            name: 'The Professional',
            desc: 'Clinical. Detached. Reliable. You do the job and go home.',
            bonuses: { composure: 2, compartmentalization: 2 },
            penalties: { empathy: -1, dark_humor: -1 },
            stressModifier: 0.8,
            dialogueStyle: 'clinical'
        },
        adrenaline_junkie: {
            name: 'The Adrenaline Junkie',
            desc: 'Chaos is where you thrive. The worse it gets, the better you perform.',
            bonuses: { reflexes: 2, stamina: 1, composure: 1 },
            penalties: { stress_tolerance: -1, self_awareness: -1 },
            stressModifier: 0.9,
            dialogueStyle: 'intense'
        },
        skeptic: {
            name: 'The Skeptic',
            desc: 'You question everything. Protocols, patients, the system itself.',
            bonuses: { observation: 2, intuition: 2 },
            penalties: { authority: -1, persuasion: -1 },
            stressModifier: 1.0,
            dialogueStyle: 'questioning'
        },
        idealist: {
            name: 'The Idealist',
            desc: 'The system is broken and you want to fix it. Every call is a symptom of something bigger.',
            bonuses: { empathy: 1, memory: 1, persuasion: 1, self_awareness: 1 },
            penalties: { compartmentalization: -1, composure: -1 },
            stressModifier: 1.1,
            dialogueStyle: 'systemic'
        }
    },

    // Create a new character
    createCharacter(name, backgroundId, archetypeId) {
        const background = this.backgrounds[backgroundId];
        const archetype = this.archetypes[archetypeId];

        // Initialize base skills (all start at 5)
        const skills = {};
        for (const category in this.skills) {
            for (const skillId in this.skills[category].skills) {
                skills[skillId] = 5;
            }
        }

        // Apply background bonuses/penalties
        for (const skill in background.bonuses) {
            skills[skill] = (skills[skill] || 5) + background.bonuses[skill];
        }
        for (const skill in background.penalties) {
            skills[skill] = (skills[skill] || 5) + background.penalties[skill];
        }

        // Apply archetype bonuses/penalties
        for (const skill in archetype.bonuses) {
            skills[skill] = (skills[skill] || 5) + archetype.bonuses[skill];
        }
        for (const skill in archetype.penalties) {
            skills[skill] = (skills[skill] || 5) + archetype.penalties[skill];
        }

        // Clamp all skills between 1 and 15
        for (const skill in skills) {
            skills[skill] = Utils.clamp(skills[skill], 1, 15);
        }

        return {
            id: Utils.generateId(),
            name: name,
            background: backgroundId,
            archetype: archetypeId,
            skills: skills,
            traits: [background.startingTrait],
            dialogueStyle: archetype.dialogueStyle,
            stressModifier: archetype.stressModifier,

            // Stats
            stress: background.startingStress,
            energy: 100,

            // Progression
            experience: 0,
            level: 1,
            skillPoints: 0,

            // Game progress
            shiftsCompleted: 0,
            callsCompleted: 0,
            livesaved: 0,
            livesLost: 0,

            // Relationships (will be populated with partner IDs)
            relationships: {},

            // Inventory/Equipment
            equipment: this.getStartingEquipment(),

            // Coping mechanisms chosen
            copingMechanisms: [],

            // Thought cabinet (Disco Elysium style)
            thoughts: [],
            activeThought: null,

            // Story flags
            flags: {
                prologueCompleted: false,
                openingTraumaProcessed: false
            },

            // Mental state
            mentalState: 'normal',

            // Created timestamp
            createdAt: Date.now()
        };
    },

    // Get starting equipment
    getStartingEquipment() {
        return {
            medical: {
                bandages: 10,
                gauze: 10,
                tape: 5,
                gloves: 20,
                masks: 10,
                iv_kits: 5,
                syringes: 10,
                splints: 4,
                cervical_collars: 2,
                burn_sheets: 2
            },
            medications: {
                epinephrine: 3,
                narcan: 4,
                aspirin: 10,
                nitroglycerin: 5,
                albuterol: 3,
                glucose: 5,
                saline: 10,
                morphine: 2
            },
            equipment: {
                defibrillator: 1,
                pulse_oximeter: 1,
                blood_pressure_cuff: 1,
                stethoscope: 1,
                bag_valve_mask: 1,
                suction_unit: 1,
                backboard: 1,
                stretcher: 1
            }
        };
    },

    // Get skill value with any active modifiers
    getSkillValue(character, skillId) {
        let value = character.skills[skillId] || 5;

        // Apply mental state modifiers
        const stateModifiers = this.getMentalStateModifiers(character.mentalState);
        if (stateModifiers[skillId]) {
            value += stateModifiers[skillId];
        }

        // Apply stress penalties (high stress = penalties to certain skills)
        if (character.stress > 70) {
            const stressPenaltySkills = ['composure', 'memory', 'dexterity', 'observation'];
            if (stressPenaltySkills.includes(skillId)) {
                value -= Math.floor((character.stress - 70) / 15);
            }
        }

        // Apply energy penalties
        if (character.energy < 30) {
            const energyPenaltySkills = ['reflexes', 'stamina', 'dexterity', 'memory'];
            if (energyPenaltySkills.includes(skillId)) {
                value -= Math.floor((30 - character.energy) / 10);
            }
        }

        return Utils.clamp(value, 1, 20);
    },

    // Get mental state modifiers
    getMentalStateModifiers(state) {
        const modifiers = {
            normal: {},
            exhausted: {
                reflexes: -2, memory: -2, observation: -1, stamina: -2
            },
            adrenaline_rush: {
                reflexes: 3, stamina: 2, composure: -1, memory: -1
            },
            compassion_fatigue: {
                empathy: -3, de_escalation: -2, dark_humor: 2
            },
            hypervigilant: {
                observation: 3, reflexes: 2, stress_tolerance: -2, composure: -1
            },
            dissociated: {
                stress_tolerance: 2, empathy: -3, intuition: -2, self_awareness: -2
            },
            manic: {
                stamina: 2, persuasion: 2, composure: -2, memory: -1
            },
            depressed: {
                stamina: -2, empathy: -1, motivation: -2, self_awareness: 1
            }
        };
        return modifiers[state] || {};
    },

    // Perform a skill check
    performSkillCheck(character, skillId, difficulty, bonusModifiers = 0) {
        const skillValue = this.getSkillValue(character, skillId);
        const result = Utils.skillCheck(skillValue, difficulty, bonusModifiers);

        // Gain experience from skill checks
        if (result.success) {
            this.gainExperience(character, skillId, difficulty);
        }

        return result;
    },

    // Gain experience
    gainExperience(character, skillId, amount) {
        character.experience += amount;

        // Check for level up (every 100 XP)
        const newLevel = Math.floor(character.experience / 100) + 1;
        if (newLevel > character.level) {
            character.level = newLevel;
            character.skillPoints += 2;
            return { levelUp: true, newLevel };
        }
        return { levelUp: false };
    },

    // Spend skill point
    spendSkillPoint(character, skillId) {
        if (character.skillPoints <= 0) return false;
        if (character.skills[skillId] >= 15) return false;

        character.skills[skillId]++;
        character.skillPoints--;
        return true;
    },

    // Add trait
    addTrait(character, trait) {
        if (!character.traits.includes(trait)) {
            character.traits.push(trait);
        }
    },

    // Remove trait
    removeTrait(character, trait) {
        const index = character.traits.indexOf(trait);
        if (index > -1) {
            character.traits.splice(index, 1);
        }
    },

    // Get skill category
    getSkillCategory(skillId) {
        for (const category in this.skills) {
            if (this.skills[category].skills[skillId]) {
                return category;
            }
        }
        return null;
    },

    // Get all skills as flat array
    getAllSkills() {
        const allSkills = [];
        for (const category in this.skills) {
            for (const skillId in this.skills[category].skills) {
                allSkills.push({
                    id: skillId,
                    category: category,
                    ...this.skills[category].skills[skillId]
                });
            }
        }
        return allSkills;
    },

    // Get character summary for display
    getCharacterSummary(character) {
        const background = this.backgrounds[character.background];
        const archetype = this.archetypes[character.archetype];

        return {
            name: character.name,
            background: background.name,
            archetype: archetype.name,
            level: character.level,
            experience: character.experience,
            stress: character.stress,
            energy: character.energy,
            mentalState: character.mentalState,
            shiftsCompleted: character.shiftsCompleted,
            callsCompleted: character.callsCompleted
        };
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterSystem;
}
