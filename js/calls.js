// Night Shift - Call/Mission System

const CallSystem = {
    // Call categories and types
    callTypes: {
        routine: {
            weight: 40,
            stressBase: 2,
            calls: [
                {
                    id: 'elderly_fall',
                    name: 'Elderly Fall',
                    dispatch: 'Elderly fall victim, minor injuries reported.',
                    scenes: ['nursing_home', 'residential'],
                    skills: ['geriatric_care', 'trauma_assessment'],
                    difficulty: 8,
                    timeLimit: 15,
                    complications: ['hidden_injury', 'medication_interaction', 'family_panic']
                },
                {
                    id: 'chest_pain',
                    name: 'Chest Pain',
                    dispatch: 'Chest pain, unknown origin.',
                    scenes: ['residential', 'workplace', 'public'],
                    skills: ['cardiology', 'pharmacology'],
                    difficulty: 10,
                    timeLimit: 10,
                    complications: ['cardiac_arrest', 'anxiety_attack', 'denial']
                },
                {
                    id: 'intoxicated',
                    name: 'Intoxicated Person',
                    dispatch: 'Intoxicated individual, unresponsive.',
                    scenes: ['bar', 'street', 'park'],
                    skills: ['observation', 'de_escalation'],
                    difficulty: 7,
                    timeLimit: 20,
                    complications: ['aggressive', 'overdose', 'hypothermia']
                },
                {
                    id: 'nursing_transfer',
                    name: 'Nursing Home Transfer',
                    dispatch: 'Routine transfer to hospital.',
                    scenes: ['nursing_home'],
                    skills: ['geriatric_care', 'memory'],
                    difficulty: 5,
                    timeLimit: 30,
                    complications: ['deterioration', 'lost_paperwork', 'family_questions']
                },
                {
                    id: 'anxiety_attack',
                    name: 'Possible Anxiety Attack',
                    dispatch: 'Difficulty breathing, possible panic attack.',
                    scenes: ['residential', 'workplace', 'school'],
                    skills: ['empathy', 'de_escalation', 'observation'],
                    difficulty: 8,
                    timeLimit: 15,
                    complications: ['actual_cardiac', 'asthma', 'repeat_caller']
                },
                {
                    id: 'frequent_flyer',
                    name: 'Frequent Caller',
                    dispatch: 'Regular caller, various complaints.',
                    scenes: ['residential', 'street'],
                    skills: ['empathy', 'observation', 'persuasion'],
                    difficulty: 6,
                    timeLimit: 20,
                    complications: ['real_emergency', 'mental_health', 'loneliness']
                }
            ]
        },
        medical: {
            weight: 35,
            stressBase: 8,
            calls: [
                {
                    id: 'cardiac_arrest',
                    name: 'Cardiac Arrest',
                    dispatch: 'CPR in progress. Unresponsive adult.',
                    scenes: ['residential', 'workplace', 'public'],
                    skills: ['cardiology', 'airway_management', 'pharmacology'],
                    difficulty: 14,
                    timeLimit: 8,
                    critical: true,
                    complications: ['family_interference', 'rigor', 'equipment_failure']
                },
                {
                    id: 'mva',
                    name: 'Motor Vehicle Accident',
                    dispatch: 'MVA, injuries reported. Multiple vehicles.',
                    scenes: ['highway', 'intersection', 'parking'],
                    skills: ['trauma_assessment', 'strength', 'composure'],
                    difficulty: 12,
                    timeLimit: 12,
                    complications: ['multiple_patients', 'entrapment', 'hazmat']
                },
                {
                    id: 'overdose',
                    name: 'Overdose',
                    dispatch: 'Possible overdose, unresponsive.',
                    scenes: ['residential', 'alley', 'bathroom'],
                    skills: ['pharmacology', 'airway_management', 'observation'],
                    difficulty: 11,
                    timeLimit: 8,
                    complications: ['aggressive_on_narcan', 'multiple_substances', 'unsafe_scene']
                },
                {
                    id: 'stroke',
                    name: 'Stroke',
                    dispatch: 'Facial droop, slurred speech.',
                    scenes: ['residential', 'nursing_home'],
                    skills: ['cardiology', 'memory', 'composure'],
                    difficulty: 12,
                    timeLimit: 10,
                    critical: true,
                    complications: ['symptom_denial', 'time_unknown', 'medication_conflict']
                },
                {
                    id: 'allergic_reaction',
                    name: 'Allergic Reaction',
                    dispatch: 'Severe allergic reaction, difficulty breathing.',
                    scenes: ['restaurant', 'residential', 'school'],
                    skills: ['pharmacology', 'airway_management'],
                    difficulty: 11,
                    timeLimit: 6,
                    critical: true,
                    complications: ['no_epipen', 'unknown_allergen', 'child']
                },
                {
                    id: 'diabetic_emergency',
                    name: 'Diabetic Emergency',
                    dispatch: 'Diabetic patient, altered mental status.',
                    scenes: ['residential', 'workplace', 'street'],
                    skills: ['pharmacology', 'observation', 'memory'],
                    difficulty: 10,
                    timeLimit: 10,
                    complications: ['combative', 'no_history', 'insulin_shock']
                },
                {
                    id: 'seizure',
                    name: 'Seizure',
                    dispatch: 'Active seizure.',
                    scenes: ['residential', 'public', 'school'],
                    skills: ['airway_management', 'pharmacology', 'composure'],
                    difficulty: 10,
                    timeLimit: 8,
                    complications: ['status_epilepticus', 'post_ictal_aggression', 'crowd']
                },
                {
                    id: 'childbirth',
                    name: 'Childbirth',
                    dispatch: 'Woman in labor, delivery imminent.',
                    scenes: ['residential', 'vehicle', 'public'],
                    skills: ['pediatric_care', 'composure', 'dexterity'],
                    difficulty: 13,
                    timeLimit: 15,
                    complications: ['breech', 'cord_prolapse', 'hemorrhage']
                }
            ]
        },
        traumatic: {
            weight: 15,
            stressBase: 20,
            calls: [
                {
                    id: 'pediatric_trauma',
                    name: 'Pediatric Trauma',
                    dispatch: 'Child injured, trauma.',
                    scenes: ['residential', 'playground', 'street'],
                    skills: ['pediatric_care', 'trauma_assessment', 'composure'],
                    difficulty: 14,
                    timeLimit: 8,
                    critical: true,
                    stressMultiplier: 2.0,
                    complications: ['parent_hysteria', 'abuse_suspicion', 'severity']
                },
                {
                    id: 'domestic_violence',
                    name: 'Domestic Violence',
                    dispatch: 'Assault victim, injuries reported.',
                    scenes: ['residential'],
                    skills: ['empathy', 'observation', 'de_escalation'],
                    difficulty: 12,
                    timeLimit: 12,
                    stressMultiplier: 1.5,
                    complications: ['perpetrator_present', 'victim_denial', 'children_present']
                },
                {
                    id: 'suicide_attempt',
                    name: 'Suicide Attempt',
                    dispatch: 'Attempted suicide, method unknown.',
                    scenes: ['residential', 'bridge', 'parking'],
                    skills: ['trauma_assessment', 'empathy', 'composure'],
                    difficulty: 13,
                    timeLimit: 10,
                    stressMultiplier: 1.8,
                    complications: ['active_attempt', 'overdose', 'lacerations']
                },
                {
                    id: 'shooting',
                    name: 'Gunshot Wound',
                    dispatch: 'GSW, police on scene.',
                    scenes: ['street', 'residential', 'club'],
                    skills: ['trauma_assessment', 'composure', 'reflexes'],
                    difficulty: 14,
                    timeLimit: 8,
                    critical: true,
                    stressMultiplier: 1.5,
                    complications: ['multiple_victims', 'scene_unsafe', 'arterial']
                },
                {
                    id: 'industrial_accident',
                    name: 'Industrial Accident',
                    dispatch: 'Industrial accident, severe injuries.',
                    scenes: ['factory', 'construction', 'warehouse'],
                    skills: ['trauma_assessment', 'strength', 'composure'],
                    difficulty: 14,
                    timeLimit: 10,
                    stressMultiplier: 1.7,
                    complications: ['amputation', 'crush_syndrome', 'hazmat']
                },
                {
                    id: 'burn_victim',
                    name: 'Burn Victim',
                    dispatch: 'Fire victim, burns.',
                    scenes: ['residential', 'industrial'],
                    skills: ['trauma_assessment', 'airway_management', 'pharmacology'],
                    difficulty: 13,
                    timeLimit: 10,
                    stressMultiplier: 1.6,
                    complications: ['inhalation', 'extensive', 'child']
                }
            ]
        },
        psychological: {
            weight: 10,
            stressBase: 10,
            calls: [
                {
                    id: 'mental_health_crisis',
                    name: 'Mental Health Crisis',
                    dispatch: 'Psych emergency, patient agitated.',
                    scenes: ['residential', 'street', 'shelter'],
                    skills: ['de_escalation', 'empathy', 'authority'],
                    difficulty: 11,
                    timeLimit: 20,
                    complications: ['weapon', 'self_harm', 'police_escalation']
                },
                {
                    id: 'elderly_neglect',
                    name: 'Elderly Neglect',
                    dispatch: 'Welfare check, possible neglect.',
                    scenes: ['residential', 'nursing_home'],
                    skills: ['geriatric_care', 'observation', 'empathy'],
                    difficulty: 9,
                    timeLimit: 25,
                    complications: ['family_denial', 'patient_protection', 'reporting']
                },
                {
                    id: 'homeless_crisis',
                    name: 'Homeless Person in Crisis',
                    dispatch: 'Homeless individual, medical/psych.',
                    scenes: ['street', 'shelter', 'park'],
                    skills: ['empathy', 'streetwise', 'observation'],
                    difficulty: 10,
                    timeLimit: 20,
                    complications: ['refusal', 'multiple_issues', 'no_resources']
                },
                {
                    id: 'treatment_refusal',
                    name: 'Treatment Refusal',
                    dispatch: 'Patient refusing treatment.',
                    scenes: ['residential', 'nursing_home'],
                    skills: ['persuasion', 'empathy', 'authority'],
                    difficulty: 10,
                    timeLimit: 30,
                    complications: ['capacity_question', 'family_conflict', 'liability']
                }
            ]
        }
    },

    // Scene locations
    scenes: {
        residential: { name: 'Residential', access: 'normal', safety: 'usually_safe' },
        nursing_home: { name: 'Nursing Home', access: 'easy', safety: 'safe' },
        street: { name: 'Street', access: 'variable', safety: 'check_required' },
        highway: { name: 'Highway', access: 'difficult', safety: 'hazardous' },
        workplace: { name: 'Workplace', access: 'normal', safety: 'usually_safe' },
        public: { name: 'Public Space', access: 'normal', safety: 'crowd_control' },
        alley: { name: 'Alley', access: 'tight', safety: 'check_required' },
        bar: { name: 'Bar/Club', access: 'crowd', safety: 'variable' },
        school: { name: 'School', access: 'normal', safety: 'safe' },
        factory: { name: 'Factory', access: 'industrial', safety: 'hazardous' },
        construction: { name: 'Construction Site', access: 'difficult', safety: 'hazardous' }
    },

    // Districts affect call types
    districts: {
        downtown: {
            name: 'Downtown',
            callModifiers: { intoxicated: 1.5, overdose: 1.3, mental_health_crisis: 1.2 },
            responseTime: 'medium',
            danger: 'moderate'
        },
        suburbs: {
            name: 'Suburbs',
            callModifiers: { elderly_fall: 1.5, chest_pain: 1.3, anxiety_attack: 1.2 },
            responseTime: 'long',
            danger: 'low'
        },
        projects: {
            name: 'The Projects',
            callModifiers: { shooting: 1.8, domestic_violence: 1.5, pediatric_trauma: 1.3 },
            responseTime: 'short',
            danger: 'high'
        },
        industrial: {
            name: 'Industrial District',
            callModifiers: { industrial_accident: 2.0, mva: 1.3 },
            responseTime: 'medium',
            danger: 'moderate'
        },
        university: {
            name: 'University District',
            callModifiers: { overdose: 1.5, intoxicated: 1.5, anxiety_attack: 1.3 },
            responseTime: 'short',
            danger: 'low'
        },
        waterfront: {
            name: 'Waterfront',
            callModifiers: { mva: 1.3, assault: 1.4 },
            responseTime: 'medium',
            danger: 'moderate'
        }
    },

    // Generate a call
    generateCall(gameState) {
        const timeOfDay = Utils.getTimePeriod(gameState.time);
        const district = gameState.currentDistrict || 'downtown';

        // Select call category based on weights and time
        const category = this.selectCategory(timeOfDay);

        // Select specific call type
        const callTemplate = this.selectCallType(category, district);

        // Generate the call instance
        const call = this.instantiateCall(callTemplate, district, gameState);

        return call;
    },

    // Select category based on time and weights
    selectCategory(timeOfDay) {
        const weights = {
            routine: this.callTypes.routine.weight,
            medical: this.callTypes.medical.weight,
            traumatic: this.callTypes.traumatic.weight,
            psychological: this.callTypes.psychological.weight
        };

        // Modify weights based on time
        if (timeOfDay === 'night') {
            weights.traumatic *= 1.5;
            weights.psychological *= 1.3;
            weights.routine *= 0.7;
        } else if (timeOfDay === 'evening') {
            weights.medical *= 1.2;
            weights.traumatic *= 1.1;
        }

        const categories = Object.keys(weights);
        const weightValues = Object.values(weights);

        return Utils.weightedRandom(categories, weightValues);
    },

    // Select call type within category
    selectCallType(category, district) {
        const calls = this.callTypes[category].calls;
        const districtData = this.districts[district];

        // Weight calls by district modifiers
        const weights = calls.map(call => {
            let weight = 1;
            if (districtData.callModifiers[call.id]) {
                weight = districtData.callModifiers[call.id];
            }
            return weight;
        });

        return Utils.weightedRandom(calls, weights);
    },

    // Create a call instance from template
    instantiateCall(template, district, gameState) {
        const scene = Utils.shuffle(template.scenes)[0];
        const complication = Math.random() < 0.4 ?
            Utils.shuffle(template.complications)[0] : null;

        return {
            id: Utils.generateId(),
            templateId: template.id,
            name: template.name,
            dispatch: this.generateDispatchText(template, complication),
            scene: scene,
            sceneData: this.scenes[scene],
            district: district,
            districtData: this.districts[district],

            skills: template.skills,
            difficulty: template.difficulty + Utils.random(-1, 1),
            timeLimit: template.timeLimit,
            critical: template.critical || false,

            complication: complication,
            stressBase: this.callTypes[this.getCallCategory(template.id)].stressBase,
            stressMultiplier: template.stressMultiplier || 1.0,

            // State
            phase: 'dispatch', // dispatch, response, scene, transport, hospital
            outcome: null,
            choices: [],
            skillChecks: [],

            // Timing
            dispatchTime: gameState.time,
            arrivalTime: null,
            completionTime: null,

            // Generated details
            patient: this.generatePatient(template),
            bystanders: this.generateBystanders(scene)
        };
    },

    // Get category for a call template
    getCallCategory(templateId) {
        for (const category in this.callTypes) {
            if (this.callTypes[category].calls.find(c => c.id === templateId)) {
                return category;
            }
        }
        return 'routine';
    },

    // Generate dispatch text
    generateDispatchText(template, complication) {
        let text = template.dispatch;

        if (complication) {
            const complicationTexts = {
                hidden_injury: ' Possible additional injuries.',
                cardiac_arrest: ' UPDATE: CPR in progress.',
                aggressive: ' Caution: Patient may be combative.',
                multiple_patients: ' Multiple victims on scene.',
                unsafe_scene: ' Scene safety unknown.',
                child: ' Pediatric patient.'
            };

            if (complicationTexts[complication]) {
                text += complicationTexts[complication];
            }
        }

        return text;
    },

    // Generate patient details
    generatePatient(template) {
        const ageRanges = {
            pediatric_trauma: [1, 12],
            pediatric_care: [1, 12],
            elderly_fall: [65, 95],
            geriatric_care: [65, 95],
            default: [18, 85]
        };

        let ageRange = ageRanges.default;
        for (const skill of template.skills) {
            if (ageRanges[skill]) {
                ageRange = ageRanges[skill];
                break;
            }
        }
        if (ageRanges[template.id]) {
            ageRange = ageRanges[template.id];
        }

        const age = Utils.random(ageRange[0], ageRange[1]);
        const gender = Math.random() < 0.5 ? 'male' : 'female';

        const names = {
            male: ['James', 'Michael', 'David', 'John', 'Robert', 'William', 'Carlos', 'Marcus', 'Andre', 'Wei'],
            female: ['Mary', 'Sarah', 'Jennifer', 'Lisa', 'Maria', 'Angela', 'Kim', 'Priya', 'Fatima', 'Elena']
        };

        return {
            name: Utils.shuffle(names[gender])[0],
            age: age,
            gender: gender,
            conscious: Math.random() < 0.7,
            breathing: Math.random() < 0.85,
            cooperative: Math.random() < 0.6
        };
    },

    // Generate bystanders
    generateBystanders(scene) {
        const counts = {
            residential: Utils.random(0, 3),
            street: Utils.random(1, 8),
            public: Utils.random(3, 15),
            workplace: Utils.random(2, 6)
        };

        const count = counts[scene] || Utils.random(0, 5);

        if (count === 0) return [];

        const bystanders = [];
        const types = ['helpful', 'panicked', 'filming', 'angry', 'family'];

        for (let i = 0; i < count; i++) {
            bystanders.push({
                type: Utils.shuffle(types)[0],
                interference: Math.random() < 0.3
            });
        }

        return bystanders;
    },

    // Process a skill check during a call
    processSkillCheck(call, character, skillId, bonusMod = 0) {
        const partnerMod = PartnerSystem.getPartnerModifier(
            character.currentPartner,
            skillId
        );

        const result = CharacterSystem.performSkillCheck(
            character,
            skillId,
            call.difficulty,
            bonusMod + partnerMod
        );

        // Record the check
        call.skillChecks.push({
            skill: skillId,
            result: result,
            time: Date.now()
        });

        return result;
    },

    // Calculate call outcome
    calculateOutcome(call, character) {
        const successes = call.skillChecks.filter(c => c.result.success).length;
        const total = call.skillChecks.length;
        const ratio = total > 0 ? successes / total : 0;

        let outcome = {
            survived: true,
            quality: 'adequate',
            stressImpact: call.stressBase,
            xpGained: 10,
            relationshipImpact: 0
        };

        // Determine survival
        if (call.critical) {
            outcome.survived = ratio >= 0.5;
        } else {
            outcome.survived = ratio >= 0.3 || Math.random() < 0.7;
        }

        // Determine quality
        if (ratio >= 0.8) {
            outcome.quality = 'excellent';
            outcome.xpGained = 25;
            outcome.relationshipImpact = 5;
            outcome.stressImpact *= 0.5;
        } else if (ratio >= 0.6) {
            outcome.quality = 'good';
            outcome.xpGained = 15;
            outcome.relationshipImpact = 2;
            outcome.stressImpact *= 0.7;
        } else if (ratio >= 0.4) {
            outcome.quality = 'adequate';
            outcome.xpGained = 10;
        } else {
            outcome.quality = 'poor';
            outcome.xpGained = 5;
            outcome.relationshipImpact = -3;
            outcome.stressImpact *= 1.3;
        }

        // Apply death stress
        if (!outcome.survived) {
            const deathType = call.patient.age < 18 ? 'pediatric_death' : 'patient_death';
            outcome.stressImpact = call.stressBase * call.stressMultiplier * 2;
            outcome.deathType = deathType;
        }

        call.outcome = outcome;
        return outcome;
    },

    // Get call description for current phase
    getPhaseDescription(call) {
        const descriptions = {
            dispatch: `Dispatch: ${call.dispatch}\nLocation: ${call.districtData.name} - ${call.sceneData.name}`,

            response: `En route to ${call.sceneData.name}.\nTime limit: ${call.timeLimit} minutes.\nPrepare for: ${call.name}`,

            scene: `On scene. ${call.patient.name}, ${call.patient.age} y/o ${call.patient.gender}.\n` +
                `Conscious: ${call.patient.conscious ? 'Yes' : 'No'}\n` +
                `Breathing: ${call.patient.breathing ? 'Yes' : 'No'}`,

            transport: `Transporting to hospital.\nPatient status: ${call.outcome?.survived ? 'Stable' : 'Critical'}`,

            hospital: `At hospital. Handing off to ER staff.`
        };

        return descriptions[call.phase] || '';
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CallSystem;
}
