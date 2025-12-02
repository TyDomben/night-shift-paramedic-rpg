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

        const patient = this.generatePatient(template);
        const equipment = this.getRequiredEquipment(template.id, patient);

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
            patientStability: 0, // Tracks patient condition throughout call
            complications: [], // Accumulates complications during call

            // Equipment
            requiredEquipment: equipment,

            // Timing
            dispatchTime: gameState.time,
            arrivalTime: null,
            completionTime: null,

            // Generated details
            patient: patient,
            bystanders: this.generateBystanders(scene),
            chiefComplaint: patient.chiefComplaint
        };
    },

    // Get required equipment based on call type
    getRequiredEquipment(callType, patient) {
        const baseEquipment = ['oxygen', 'monitor', 'iv_supplies'];

        switch (callType) {
            case 'cardiac_arrest':
                return ['defibrillator', 'airway_kit', 'medications', 'monitor', 'cpr_board'];

            case 'chest_pain':
                return ['monitor', '12_lead_ecg', 'oxygen', 'medications'];

            case 'overdose':
                if (patient.vitals.pupils === 'pinpoint') {
                    return ['airway_kit', 'narcan', 'monitor', 'oxygen'];
                }
                return ['airway_kit', 'monitor', 'restraints'];

            case 'allergic_reaction':
                return ['epinephrine', 'airway_kit', 'monitor', 'oxygen'];

            case 'stroke':
                return ['monitor', 'glucose_meter', 'oxygen', 'stroke_assessment'];

            case 'diabetic_emergency':
                return ['glucose_meter', 'dextrose', 'monitor'];

            case 'childbirth':
                return ['ob_kit', 'bulb_syringe', 'clamps', 'blankets'];

            case 'pediatric_trauma':
            case 'shooting':
            case 'industrial_accident':
                return ['trauma_kit', 'tourniquets', 'splints', 'monitor', 'iv_supplies'];

            case 'burn_victim':
                return ['burn_sheets', 'iv_supplies', 'airway_kit', 'monitor'];

            case 'seizure':
                return ['airway_kit', 'medications', 'monitor', 'oxygen'];

            default:
                return baseEquipment;
        }
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

    // Generate patient details with realistic vital signs
    generatePatient(template) {
        const ageRanges = {
            pediatric_trauma: [1, 12],
            pediatric_care: [1, 12],
            elderly_fall: [65, 95],
            geriatric_care: [65, 95],
            childbirth: [18, 45],
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

        // Generate realistic vital signs based on condition and age
        const vitals = this.generateVitals(template.id, age);
        const chiefComplaint = this.getChiefComplaint(template.id);
        const medicalHistory = this.generateMedicalHistory(template.id, age);

        return {
            name: Utils.shuffle(names[gender])[0],
            age: age,
            gender: gender,
            vitals: vitals,
            chiefComplaint: chiefComplaint,
            medicalHistory: medicalHistory,
            conscious: vitals.consciousness !== 'unresponsive',
            breathing: vitals.respiratory_rate > 0,
            cooperative: Math.random() < 0.6,
            pain: vitals.pain || 0
        };
    },

    // Generate realistic vital signs
    generateVitals(callType, age) {
        // Base normal vitals by age
        const isPediatric = age < 13;
        const isGeriatric = age > 65;

        let baseVitals = {
            systolic: 120,
            diastolic: 80,
            heart_rate: 75,
            respiratory_rate: 16,
            spo2: 98,
            temperature: 98.6,
            consciousness: 'alert',
            pain: 0
        };

        // Adjust for age
        if (isPediatric) {
            baseVitals.heart_rate = 100;
            baseVitals.respiratory_rate = 24;
            baseVitals.systolic = 95;
            baseVitals.diastolic = 60;
        } else if (isGeriatric) {
            baseVitals.systolic = 135;
            baseVitals.heart_rate = 70;
        }

        // Adjust for specific call types
        switch (callType) {
            case 'cardiac_arrest':
                return {
                    systolic: 0, diastolic: 0, heart_rate: 0,
                    respiratory_rate: 0, spo2: 0,
                    temperature: 98.0, consciousness: 'unresponsive', pain: 0
                };

            case 'chest_pain':
                return {
                    systolic: Utils.random(140, 180),
                    diastolic: Utils.random(85, 105),
                    heart_rate: Utils.random(85, 120),
                    respiratory_rate: Utils.random(18, 26),
                    spo2: Utils.random(94, 99),
                    temperature: 98.6,
                    consciousness: 'alert',
                    pain: Utils.random(6, 10)
                };

            case 'overdose':
                const isOpioid = Math.random() < 0.6;
                if (isOpioid) {
                    return {
                        systolic: Utils.random(85, 110),
                        diastolic: Utils.random(50, 70),
                        heart_rate: Utils.random(45, 70),
                        respiratory_rate: Utils.random(4, 10),
                        spo2: Utils.random(75, 88),
                        temperature: 97.2,
                        consciousness: 'unresponsive',
                        pain: 0,
                        pupils: 'pinpoint'
                    };
                } else {
                    // Stimulant overdose
                    return {
                        systolic: Utils.random(160, 200),
                        diastolic: Utils.random(95, 120),
                        heart_rate: Utils.random(130, 180),
                        respiratory_rate: Utils.random(24, 35),
                        spo2: Utils.random(92, 98),
                        temperature: 101.5,
                        consciousness: 'agitated',
                        pain: 2
                    };
                }

            case 'stroke':
                return {
                    systolic: Utils.random(160, 210),
                    diastolic: Utils.random(95, 115),
                    heart_rate: Utils.random(70, 100),
                    respiratory_rate: Utils.random(14, 22),
                    spo2: Utils.random(94, 98),
                    temperature: 98.6,
                    consciousness: 'confused',
                    pain: 2,
                    symptoms: ['facial_droop', 'slurred_speech', 'arm_drift']
                };

            case 'allergic_reaction':
                const severity = Math.random();
                if (severity < 0.3) {
                    // Severe anaphylaxis
                    return {
                        systolic: Utils.random(75, 95),
                        diastolic: Utils.random(45, 60),
                        heart_rate: Utils.random(110, 150),
                        respiratory_rate: Utils.random(28, 40),
                        spo2: Utils.random(82, 91),
                        temperature: 98.6,
                        consciousness: 'drowsy',
                        pain: 3,
                        symptoms: ['stridor', 'hives', 'swelling']
                    };
                } else {
                    // Moderate reaction
                    return {
                        systolic: Utils.random(105, 125),
                        diastolic: Utils.random(65, 80),
                        heart_rate: Utils.random(90, 115),
                        respiratory_rate: Utils.random(22, 30),
                        spo2: Utils.random(92, 96),
                        temperature: 98.6,
                        consciousness: 'alert',
                        pain: 4,
                        symptoms: ['hives', 'difficulty_breathing']
                    };
                }

            case 'diabetic_emergency':
                const isHypo = Math.random() < 0.7;
                if (isHypo) {
                    // Hypoglycemia
                    return {
                        systolic: Utils.random(100, 130),
                        diastolic: Utils.random(60, 80),
                        heart_rate: Utils.random(95, 125),
                        respiratory_rate: Utils.random(16, 24),
                        spo2: Utils.random(96, 99),
                        temperature: 98.0,
                        consciousness: 'confused',
                        pain: 0,
                        glucose: Utils.random(35, 55)
                    };
                } else {
                    // Hyperglycemia/DKA
                    return {
                        systolic: Utils.random(95, 115),
                        diastolic: Utils.random(55, 70),
                        heart_rate: Utils.random(105, 140),
                        respiratory_rate: Utils.random(26, 36),
                        spo2: Utils.random(94, 98),
                        temperature: 99.2,
                        consciousness: 'drowsy',
                        pain: 3,
                        glucose: Utils.random(350, 600)
                    };
                }

            case 'pediatric_trauma':
            case 'shooting':
            case 'industrial_accident':
                // Trauma with shock
                return {
                    systolic: Utils.random(85, 105),
                    diastolic: Utils.random(50, 65),
                    heart_rate: Utils.random(115, 145),
                    respiratory_rate: Utils.random(22, 32),
                    spo2: Utils.random(88, 94),
                    temperature: 97.0,
                    consciousness: 'drowsy',
                    pain: Utils.random(8, 10)
                };

            case 'anxiety_attack':
                return {
                    systolic: Utils.random(135, 155),
                    diastolic: Utils.random(80, 95),
                    heart_rate: Utils.random(110, 145),
                    respiratory_rate: Utils.random(28, 40),
                    spo2: Utils.random(98, 100),
                    temperature: 98.6,
                    consciousness: 'alert',
                    pain: 5
                };

            default:
                // Add some variation to base vitals
                return {
                    systolic: baseVitals.systolic + Utils.random(-10, 15),
                    diastolic: baseVitals.diastolic + Utils.random(-5, 10),
                    heart_rate: baseVitals.heart_rate + Utils.random(-10, 20),
                    respiratory_rate: baseVitals.respiratory_rate + Utils.random(-2, 6),
                    spo2: baseVitals.spo2 + Utils.random(-2, 2),
                    temperature: baseVitals.temperature + Utils.random(-0.5, 1.0),
                    consciousness: baseVitals.consciousness,
                    pain: Utils.random(0, 7)
                };
        }
    },

    // Get chief complaint for call type
    getChiefComplaint(callType) {
        const complaints = {
            chest_pain: 'chest_pain',
            cardiac_arrest: 'unresponsive',
            overdose: 'altered_mental_status',
            stroke: 'facial_droop',
            allergic_reaction: 'difficulty_breathing',
            diabetic_emergency: 'altered_mental_status',
            seizure: 'seizure',
            anxiety_attack: 'difficulty_breathing',
            elderly_fall: 'fall',
            pediatric_trauma: 'traumatic_injury',
            shooting: 'penetrating_trauma',
            mva: 'traumatic_injury',
            intoxicated: 'altered_mental_status',
            childbirth: 'labor',
            burn_victim: 'burns',
            domestic_violence: 'assault',
            suicide_attempt: 'self_harm'
        };

        return complaints[callType] || 'general_illness';
    },

    // Generate medical history
    generateMedicalHistory(callType, age) {
        const history = [];

        // Age-related conditions
        if (age > 65) {
            if (Math.random() < 0.6) history.push('hypertension');
            if (Math.random() < 0.4) history.push('diabetes');
            if (Math.random() < 0.3) history.push('atrial_fibrillation');
            if (Math.random() < 0.25) history.push('copd');
        }

        // Call-specific history
        if (callType === 'chest_pain' || callType === 'cardiac_arrest') {
            if (Math.random() < 0.5) history.push('prior_mi');
            if (Math.random() < 0.4) history.push('coronary_artery_disease');
            if (Math.random() < 0.3) history.push('hyperlipidemia');
        }

        if (callType === 'stroke') {
            if (Math.random() < 0.6) history.push('hypertension');
            if (Math.random() < 0.3) history.push('atrial_fibrillation');
            if (Math.random() < 0.2) history.push('prior_stroke');
        }

        if (callType === 'seizure') {
            if (Math.random() < 0.7) history.push('epilepsy');
            if (Math.random() < 0.2) history.push('brain_tumor');
        }

        // Medications
        const medications = [];
        if (history.includes('hypertension')) medications.push('lisinopril', 'metoprolol');
        if (history.includes('diabetes')) medications.push('metformin');
        if (history.includes('atrial_fibrillation')) medications.push('warfarin');
        if (history.includes('copd')) medications.push('albuterol');

        return {
            conditions: history,
            medications: medications,
            allergies: Math.random() < 0.15 ? ['aspirin'] : []
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

    // Calculate call outcome based on patient stability, skill checks, and complications
    calculateOutcome(call, character) {
        const successes = call.skillChecks.filter(c => c.result.success).length;
        const total = call.skillChecks.length;
        const skillRatio = total > 0 ? successes / total : 0;

        // Patient stability is the primary determinant
        const patientStability = call.patientStability || 0;
        const complications = call.complications || [];
        const complicationPenalty = complications.length * -2;

        // Calculate final stability score
        const finalStability = patientStability + complicationPenalty;

        let outcome = {
            survived: true,
            quality: 'adequate',
            stressImpact: call.stressBase,
            xpGained: 10,
            relationshipImpact: 0,
            deathType: null,
            stabilityScore: finalStability
        };

        // Determine survival based on patient stability and call criticality
        if (call.critical) {
            // Critical calls require positive stability or very high skill ratio
            if (finalStability >= 3) {
                outcome.survived = true;
            } else if (finalStability >= 0) {
                outcome.survived = Math.random() < 0.7;
            } else if (finalStability >= -3) {
                outcome.survived = Math.random() < 0.4;
            } else {
                outcome.survived = Math.random() < 0.15; // Heroic save
            }
        } else {
            // Non-critical calls are more forgiving
            if (finalStability >= 0) {
                outcome.survived = true;
            } else if (finalStability >= -3) {
                outcome.survived = Math.random() < 0.8;
            } else {
                outcome.survived = Math.random() < 0.5;
            }
        }

        // Determine death type if patient didn't survive
        if (!outcome.survived) {
            if (call.templateId === 'cardiac_arrest') {
                outcome.deathType = 'cardiac_death';
            } else if (call.templateId === 'pediatric_trauma') {
                outcome.deathType = 'pediatric_death';
            } else if (call.templateId === 'overdose') {
                outcome.deathType = 'overdose_death';
            } else if (call.critical) {
                outcome.deathType = 'traumatic_death';
            } else {
                outcome.deathType = 'patient_death';
            }

            // Apply stress multiplier for death
            outcome.stressImpact *= (call.stressMultiplier || 1.0);
        }

        // Determine quality based on combination of stability and skill performance
        const overallScore = (finalStability / 5) + (skillRatio * 2);

        if (overallScore >= 2.5 && outcome.survived) {
            outcome.quality = 'excellent';
            outcome.xpGained = 25;
            outcome.relationshipImpact = 5;
            outcome.stressImpact *= 0.5;
        } else if (overallScore >= 1.5 && outcome.survived) {
            outcome.quality = 'good';
            outcome.xpGained = 15;
            outcome.relationshipImpact = 2;
            outcome.stressImpact *= 0.7;
        } else if (overallScore >= 0.5) {
            outcome.quality = 'adequate';
            outcome.xpGained = 10;
        } else {
            outcome.quality = 'poor';
            outcome.xpGained = 5;
            outcome.relationshipImpact = -3;
            outcome.stressImpact *= 1.3;
        }

        // Additional stress modifiers
        if (complications.length > 0) {
            outcome.stressImpact += complications.length * 2;
        }

        // Bonus for saving critical patients against the odds
        if (call.critical && outcome.survived && finalStability < 0) {
            outcome.xpGained += 10;
            outcome.stressImpact *= 0.8; // Less stress when you pull off a miracle
        }

        call.outcome = outcome;
        return outcome;
    },

    // Get call description for current phase
    getPhaseDescription(call) {
        const vitals = call.patient?.vitals;
        const stability = call.patientStability || 0;

        const descriptions = {
            dispatch: `Dispatch: ${call.dispatch}\nLocation: ${call.districtData.name} - ${call.sceneData.name}`,

            response: `En route to ${call.sceneData.name}.\nTime limit: ${call.timeLimit} minutes.\nPrepare for: ${call.name}`,

            scene: `On scene. ${call.patient.name}, ${call.patient.age} y/o ${call.patient.gender}.\n` +
                (vitals ? `BP: ${vitals.systolic}/${vitals.diastolic}  HR: ${vitals.heart_rate}  RR: ${vitals.respiratory_rate}  SpO2: ${vitals.spo2}%\n` : '') +
                `Conscious: ${call.patient.conscious ? 'Yes' : 'No'}  ` +
                `Breathing: ${call.patient.breathing ? 'Yes' : 'No'}  ` +
                `Pain: ${call.patient.pain}/10\n` +
                (vitals?.symptoms ? `Symptoms: ${vitals.symptoms.join(', ')}\n` : '') +
                (stability !== 0 ? `Patient stability: ${stability > 0 ? '+' : ''}${stability}` : ''),

            transport: `Transporting to hospital.\nPatient status: ${call.outcome?.survived ? 'Stable' : 'Critical'}\n` +
                (call.complications && call.complications.length > 0 ? `Complications: ${call.complications.join(', ')}` : ''),

            hospital: `At hospital. Handing off to ER staff.\nFinal stability: ${stability > 0 ? '+' : ''}${stability}`
        };

        return descriptions[call.phase] || '';
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CallSystem;
}
