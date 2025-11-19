// Night Shift - Complete Scripted Story Calls
// 50+ fully written calls with complete dialogue, choices, and outcomes

const StoryCallsData = {
    // ============================================
    // ROUTINE CALLS (10 complete scripted calls)
    // ============================================

    routine_001_elderly_fall: {
        id: 'routine_001_elderly_fall',
        name: 'Mrs. Patterson\'s Fall',
        category: 'routine',
        dispatch: '82-year-old female, fall victim. Patient is conscious and alert.',
        district: 'suburbs',
        scene: 'residential',
        difficulty: 7,
        timeLimit: 20,
        stressBase: 3,

        patient: {
            name: 'Margaret Patterson',
            age: 82,
            gender: 'female',
            history: 'Atrial fibrillation, on blood thinners. Lives alone since husband passed.'
        },

        scenes: {
            arrival: {
                description: 'A well-kept suburban home. Garden gnomes line the walkway. An elderly woman sits on the kitchen floor, apologizing before you even enter.',
                image: 'suburban_home_interior'
            },
            assessment: {
                description: 'Mrs. Patterson is alert but embarrassed. Her right hip is tender to palpation. A small cut on her forehead.',
                image: 'elderly_patient'
            }
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'The front door is unlocked. You find her in the kitchen, sitting against the cabinets.',
                next: 'patient_greeting'
            },
            {
                id: 'patient_greeting',
                speaker: 'patient',
                text: '"I\'m so sorry to bother you. I tried to get up myself but my hip... I should have just stayed down."',
                voices: ['empathy', 'observation'],
                next: 'player_response_1'
            },
            {
                id: 'player_response_1',
                speaker: 'player',
                choices: [
                    {
                        text: '"You did the right thing calling. Let\'s take a look at you."',
                        style: 'compassionate',
                        effects: [{ type: 'relationship', partner: 'current', amount: 1 }],
                        next: 'assessment_start'
                    },
                    {
                        text: '"Can you tell me exactly what happened?"',
                        style: 'professional',
                        next: 'patient_explanation'
                    },
                    {
                        text: '"How long have you been on the floor?"',
                        style: 'clinical',
                        skillCheck: { skill: 'geriatric_care', difficulty: 8 },
                        next: 'time_check'
                    }
                ]
            },
            {
                id: 'patient_explanation',
                speaker: 'patient',
                text: '"I was reaching for the coffee filters—top shelf—and I just... my balance went. I grabbed the counter but couldn\'t hold on."',
                next: 'assessment_start'
            },
            {
                id: 'time_check',
                speaker: 'patient',
                text: '"About twenty minutes? I called right away. My daughter programmed the phone with your number after Frank passed."',
                voices: ['empathy'],
                next: 'assessment_start'
            },
            {
                id: 'assessment_start',
                speaker: 'narrator',
                text: 'You begin your assessment. Primary survey: Airway clear, breathing normal, circulation good. Secondary survey reveals...',
                skillCheck: { skill: 'trauma_assessment', difficulty: 8 },
                next: 'assessment_result'
            },
            {
                id: 'assessment_result',
                speaker: 'narrator',
                text: 'Right hip pain with limited range of motion. Possible fracture. The head laceration is minor but she\'s on blood thinners—Warfarin.',
                voices: ['pharmacology', 'geriatric_care'],
                next: 'partner_input'
            },
            {
                id: 'partner_input',
                speaker: 'partner',
                text: '"Blood thinners. Even that small cut could be a problem. We should dress it and monitor."',
                next: 'treatment_decision'
            },
            {
                id: 'treatment_decision',
                speaker: 'player',
                choices: [
                    {
                        text: 'Splint the hip, dress the wound, gentle transport',
                        style: 'thorough',
                        skillCheck: { skill: 'geriatric_care', difficulty: 9 },
                        next: 'treatment_thorough'
                    },
                    {
                        text: 'Quick assessment, rapid transport—hospital can do imaging',
                        style: 'efficient',
                        next: 'treatment_quick'
                    },
                    {
                        text: 'Call medical control for guidance on the blood thinner concern',
                        style: 'cautious',
                        skillCheck: { skill: 'memory', difficulty: 7 },
                        next: 'medical_control'
                    }
                ]
            },
            {
                id: 'treatment_thorough',
                speaker: 'narrator',
                text: 'You take your time. Proper splinting, pressure dressing on the laceration, vital signs every five minutes. Mrs. Patterson thanks you repeatedly.',
                effects: [{ type: 'stress', source: 'good_outcome', modifier: -0.5 }],
                next: 'transport_start'
            },
            {
                id: 'treatment_quick',
                speaker: 'narrator',
                text: 'You prioritize transport. The hospital has imaging, orthopedics on call. Speed over thoroughness.',
                next: 'transport_start'
            },
            {
                id: 'medical_control',
                speaker: 'narrator',
                text: 'Medical control confirms your concern. They advise close monitoring and pressure on any bleeding sites. Your caution was warranted.',
                effects: [{ type: 'experience', amount: 5 }],
                next: 'transport_start'
            },
            {
                id: 'transport_start',
                speaker: 'narrator',
                text: 'Moving her to the stretcher, she grips your hand.',
                next: 'patient_concern'
            },
            {
                id: 'patient_concern',
                speaker: 'patient',
                text: '"Will you call my daughter? I don\'t want her to worry but she should know. The number\'s on the fridge."',
                next: 'daughter_decision'
            },
            {
                id: 'daughter_decision',
                speaker: 'player',
                choices: [
                    {
                        text: '"Of course. We\'ll make sure she knows."',
                        style: 'compassionate',
                        effects: [{ type: 'flag', flag: 'called_family', value: true }],
                        next: 'call_daughter'
                    },
                    {
                        text: '"The hospital will contact her when you arrive."',
                        style: 'professional',
                        next: 'transport_continue'
                    },
                    {
                        text: '"Would you like to call her yourself? I can help you hold the phone."',
                        style: 'empowering',
                        skillCheck: { skill: 'empathy', difficulty: 6 },
                        next: 'patient_calls'
                    }
                ]
            },
            {
                id: 'call_daughter',
                speaker: 'narrator',
                text: 'You grab the number from the fridge—held by a magnet that says "World\'s Best Grandma." A quick call to reassure the daughter. Mrs. Patterson smiles through her pain.',
                next: 'transport_continue'
            },
            {
                id: 'patient_calls',
                speaker: 'narrator',
                text: 'You help her make the call herself. She sounds stronger talking to her daughter. Being in control, even of this small thing, matters.',
                effects: [{ type: 'relationship', partner: 'current', amount: 2 }],
                next: 'transport_continue'
            },
            {
                id: 'transport_continue',
                speaker: 'narrator',
                text: 'En route to the hospital. Mrs. Patterson is stable. She tells you about Frank—forty-seven years of marriage.',
                voices: ['empathy'],
                next: 'hospital_arrival'
            },
            {
                id: 'hospital_arrival',
                speaker: 'narrator',
                text: 'You hand her off to the ER team. X-rays will likely confirm a hip fracture. Surgery, rehab, maybe assisted living after.',
                next: 'resolution'
            },
            {
                id: 'resolution',
                speaker: 'patient',
                text: '"Thank you for being so gentle. Frank would have liked you."',
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: true,
                quality: 'good',
                message: 'Mrs. Patterson is admitted for hip surgery. Her daughter arrives within the hour. Another routine call, another life quietly helped.',
                xp: 15,
                stressChange: -2
            },
            partial: {
                survived: true,
                quality: 'adequate',
                message: 'Mrs. Patterson is stable but anxious. The clinical approach got the job done, but she seemed lonely.',
                xp: 10,
                stressChange: 0
            }
        }
    },

    routine_002_chest_pain_anxiety: {
        id: 'routine_002_chest_pain_anxiety',
        name: 'The Executive\'s Chest Pain',
        category: 'routine',
        dispatch: '45-year-old male, chest pain at office building. Patient is diaphoretic.',
        district: 'downtown',
        scene: 'workplace',
        difficulty: 10,
        timeLimit: 10,
        stressBase: 8,

        patient: {
            name: 'David Chen',
            age: 45,
            gender: 'male',
            history: 'High stress job, no cardiac history. Father died of MI at 52.'
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'Thirty-second floor. Glass walls, expensive suits, fear. A man sits in his corner office, loosened tie, pale and sweating.',
                next: 'coworker_info'
            },
            {
                id: 'coworker_info',
                speaker: 'bystander',
                text: '"He was in a meeting, just grabbed his chest and went white. We called right away. Is it a heart attack?"',
                next: 'approach_patient'
            },
            {
                id: 'approach_patient',
                speaker: 'narrator',
                text: 'The patient—David Chen, according to the nameplate—looks up at you with barely contained panic.',
                next: 'patient_greeting'
            },
            {
                id: 'patient_greeting',
                speaker: 'patient',
                text: '"It\'s happening. Like my father. I can\'t breathe. I\'m 45, he was 52. Oh god."',
                voices: ['cardiology', 'observation', 'empathy'],
                next: 'initial_response'
            },
            {
                id: 'initial_response',
                speaker: 'player',
                choices: [
                    {
                        text: '"Let\'s get a 12-lead on you right now. Aspirin if you\'re not allergic."',
                        style: 'urgent',
                        skillCheck: { skill: 'cardiology', difficulty: 10 },
                        next: 'cardiac_workup'
                    },
                    {
                        text: '"I need you to describe the pain. Where exactly? Does it radiate?"',
                        style: 'diagnostic',
                        skillCheck: { skill: 'observation', difficulty: 9 },
                        next: 'pain_assessment'
                    },
                    {
                        text: '"Look at me. Breathe with me. In... out. Let\'s slow this down."',
                        style: 'calming',
                        skillCheck: { skill: 'de_escalation', difficulty: 8 },
                        next: 'calm_approach'
                    }
                ]
            },
            {
                id: 'cardiac_workup',
                speaker: 'narrator',
                text: 'You move fast. Aspirin administered, 12-lead applied. The rhythm strips start printing.',
                next: 'ecg_reading'
            },
            {
                id: 'ecg_reading',
                speaker: 'narrator',
                text: 'Sinus tachycardia at 110. No ST changes. No ectopy. Electrically, this heart looks fine.',
                voices: ['cardiology', 'intuition'],
                next: 'further_assessment'
            },
            {
                id: 'pain_assessment',
                speaker: 'patient',
                text: '"It\'s... everywhere? No, the center. Sharp. No, dull. I don\'t know. My arm feels weird but I don\'t know if that\'s because I\'m thinking about it."',
                voices: ['observation', 'intuition'],
                next: 'anxiety_indicators'
            },
            {
                id: 'anxiety_indicators',
                speaker: 'narrator',
                text: 'The pain is vague, changes with attention. He\'s hyperventilating. Tingling in extremities—likely from the hyperventilation itself.',
                next: 'further_assessment'
            },
            {
                id: 'calm_approach',
                speaker: 'narrator',
                text: 'You match his breathing, slow it down. His respiratory rate drops from 28 to 20. The tingling starts to fade.',
                next: 'calm_result'
            },
            {
                id: 'calm_result',
                speaker: 'patient',
                text: '"That\'s... that\'s a little better. But what if it\'s real? My father—"',
                next: 'further_assessment'
            },
            {
                id: 'further_assessment',
                speaker: 'narrator',
                text: 'Vital signs: BP 150/95 (high but not critical), HR 105 (coming down), SpO2 99%. He\'s stable.',
                next: 'diagnosis_decision'
            },
            {
                id: 'diagnosis_decision',
                speaker: 'player',
                choices: [
                    {
                        text: '"This looks like a panic attack, but we should rule out cardiac at the hospital."',
                        style: 'balanced',
                        next: 'balanced_approach'
                    },
                    {
                        text: '"Your ECG is normal. This is anxiety. But I understand the fear."',
                        style: 'direct',
                        skillCheck: { skill: 'authority', difficulty: 10 },
                        next: 'direct_approach'
                    },
                    {
                        text: '"We can\'t rule out cardiac in the field. Let\'s transport and get full workup."',
                        style: 'cautious',
                        next: 'cautious_approach'
                    }
                ]
            },
            {
                id: 'balanced_approach',
                speaker: 'narrator',
                text: 'You explain the findings while validating his fear. The family history is real. The anxiety is understandable. But the objective data is reassuring.',
                voices: ['empathy'],
                next: 'patient_response'
            },
            {
                id: 'direct_approach',
                speaker: 'narrator',
                text: 'You lay out the facts clearly. Sometimes people need certainty more than comfort.',
                next: 'patient_relief'
            },
            {
                id: 'patient_relief',
                speaker: 'patient',
                text: '"It\'s not... I\'m not dying right now?"',
                next: 'reassurance'
            },
            {
                id: 'reassurance',
                speaker: 'player',
                text: '"Your heart looks good right now. But stress is a real risk factor. This is your body telling you something."',
                next: 'transport_decision'
            },
            {
                id: 'cautious_approach',
                speaker: 'narrator',
                text: 'You err on the side of caution. Troponins, repeat ECG at the hospital. Cover your bases.',
                next: 'transport_decision'
            },
            {
                id: 'patient_response',
                speaker: 'patient',
                text: '"I thought I was dying. The meeting was going bad and suddenly I couldn\'t breathe and I just knew..."',
                voices: ['self_awareness'],
                next: 'transport_decision'
            },
            {
                id: 'transport_decision',
                speaker: 'player',
                choices: [
                    {
                        text: '"Let\'s get you checked out at the hospital. Peace of mind."',
                        style: 'standard',
                        next: 'transport_hospital'
                    },
                    {
                        text: '"You can refuse transport if you want, but I\'d recommend follow-up with your doctor."',
                        style: 'informative',
                        skillCheck: { skill: 'persuasion', difficulty: 9 },
                        next: 'refusal_option'
                    }
                ]
            },
            {
                id: 'transport_hospital',
                speaker: 'narrator',
                text: 'He agrees to transport. In the ambulance, he\'s calmer. The terror is fading, replaced by embarrassment.',
                next: 'ambulance_talk'
            },
            {
                id: 'ambulance_talk',
                speaker: 'patient',
                text: '"I feel stupid. All those people saw me... and it was just panic."',
                next: 'final_response'
            },
            {
                id: 'final_response',
                speaker: 'player',
                choices: [
                    {
                        text: '"Panic attacks are medical events. Nothing to be embarrassed about."',
                        style: 'validating',
                        next: 'end_validating'
                    },
                    {
                        text: '"Your body gave you a warning. Use it. See a doctor about that stress."',
                        style: 'pragmatic',
                        next: 'end_pragmatic'
                    },
                    {
                        text: '"Better safe than sorry. You made the right call."',
                        style: 'reassuring',
                        next: 'end_reassuring'
                    }
                ]
            },
            {
                id: 'refusal_option',
                speaker: 'narrator',
                text: 'He considers. The terror has passed. He has a meeting to salvage.',
                next: 'refusal_result'
            },
            {
                id: 'refusal_result',
                speaker: 'patient',
                text: '"I\'ll... I\'ll go to my doctor tomorrow. I promise. But I can\'t leave right now."',
                next: 'refusal_paperwork'
            },
            {
                id: 'refusal_paperwork',
                speaker: 'narrator',
                text: 'You get his signature on the refusal form. He promises to follow up. You hope he does.',
                next: 'end_refusal'
            },
            {
                id: 'end_validating',
                speaker: 'narrator',
                text: 'He nods slowly. Maybe he\'ll actually address the root cause. Probably not. But you planted the seed.',
                next: 'end'
            },
            {
                id: 'end_pragmatic',
                speaker: 'narrator',
                text: 'He takes the card for his doctor. Whether he calls is up to him.',
                next: 'end'
            },
            {
                id: 'end_reassuring',
                speaker: 'narrator',
                text: 'A small smile. The ER will confirm what you already know. Sometimes the reassurance is the treatment.',
                next: 'end'
            },
            {
                id: 'end_refusal',
                speaker: 'narrator',
                text: 'You leave him your card. Most panic attacks aren\'t heart attacks. But his father\'s ghost will keep haunting him until he deals with it.',
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: true,
                quality: 'good',
                message: 'ER confirms anxiety-induced episode. No cardiac damage. But this was a warning—stress is killing him slowly.',
                xp: 20,
                stressChange: 0
            }
        }
    },

    routine_003_frequent_flyer: {
        id: 'routine_003_frequent_flyer',
        name: 'Raymond Again',
        category: 'routine',
        dispatch: 'Regular caller. 67-year-old male, difficulty breathing. Third call this week.',
        district: 'downtown',
        scene: 'residential',
        difficulty: 6,
        timeLimit: 25,
        stressBase: 2,

        patient: {
            name: 'Raymond Willis',
            age: 67,
            gender: 'male',
            history: 'COPD, CHF, diabetes. Widower. Calls frequently.'
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'You know this building. Apartment 4C. Raymond Willis. This is your third visit in a week.',
                voices: ['memory', 'intuition'],
                next: 'partner_comment'
            },
            {
                id: 'partner_comment',
                speaker: 'partner',
                text: '"Raymond again? What is this, Tuesday?"',
                next: 'approach_options'
            },
            {
                id: 'approach_options',
                speaker: 'player',
                choices: [
                    {
                        text: '"Same protocol as always. Let\'s do our job."',
                        style: 'professional',
                        next: 'entry'
                    },
                    {
                        text: '"Maybe this time it\'s real. We treat every call."',
                        style: 'dedicated',
                        next: 'entry'
                    },
                    {
                        text: '*Sigh* "Let\'s get this over with."',
                        style: 'frustrated',
                        effects: [{ type: 'trait', trait: 'compassion_fatigue', action: 'add' }],
                        next: 'entry'
                    }
                ]
            },
            {
                id: 'entry',
                speaker: 'narrator',
                text: 'The door is unlocked, as always. Raymond is in his recliner. The TV is on—some game show. He brightens when he sees you.',
                next: 'raymond_greeting'
            },
            {
                id: 'raymond_greeting',
                speaker: 'patient',
                text: '"Oh thank God! I couldn\'t catch my breath. Worse than before. I think this is the big one."',
                voices: ['observation', 'empathy'],
                next: 'initial_assessment'
            },
            {
                id: 'initial_assessment',
                speaker: 'narrator',
                text: 'Vital signs: SpO2 94% on room air (his baseline is 92-95), HR 88, BP 138/85. He\'s actually doing okay.',
                next: 'clinical_picture'
            },
            {
                id: 'clinical_picture',
                speaker: 'narrator',
                text: 'Lung sounds: decreased bases bilaterally (chronic), no acute wheezing. Pedal edema stable. This is his baseline.',
                voices: ['cardiology', 'memory'],
                next: 'patient_interaction'
            },
            {
                id: 'patient_interaction',
                speaker: 'player',
                choices: [
                    {
                        text: '"Raymond, your vitals are stable. Same as last time."',
                        style: 'direct',
                        next: 'raymond_insists'
                    },
                    {
                        text: '"Tell me about today. When did this start?"',
                        style: 'thorough',
                        skillCheck: { skill: 'empathy', difficulty: 7 },
                        next: 'raymond_story'
                    },
                    {
                        text: '"Have you been taking your medications?"',
                        style: 'clinical',
                        skillCheck: { skill: 'pharmacology', difficulty: 6 },
                        next: 'medication_check'
                    }
                ]
            },
            {
                id: 'raymond_insists',
                speaker: 'patient',
                text: '"But it felt different this time! My chest was tight. I got scared."',
                next: 'deeper_conversation'
            },
            {
                id: 'raymond_story',
                speaker: 'patient',
                text: '"It was after lunch. I was watching TV and... I don\'t know. It just felt wrong. Martha used to know when something was off. She always knew."',
                voices: ['empathy', 'intuition'],
                next: 'martha_reveal'
            },
            {
                id: 'martha_reveal',
                speaker: 'narrator',
                text: 'Martha. His wife. Passed eight months ago. The calls started about six months ago.',
                next: 'deeper_conversation'
            },
            {
                id: 'medication_check',
                speaker: 'narrator',
                text: 'The pill organizer on the counter—some compartments still full. He\'s not compliant.',
                next: 'medication_confrontation'
            },
            {
                id: 'medication_confrontation',
                speaker: 'player',
                text: '"Raymond, your medications aren\'t taken. Your diuretic, your—"',
                next: 'raymond_excuse'
            },
            {
                id: 'raymond_excuse',
                speaker: 'patient',
                text: '"I forget sometimes. Martha used to remind me. She had a system with little notes and..."',
                voices: ['empathy'],
                next: 'deeper_conversation'
            },
            {
                id: 'deeper_conversation',
                speaker: 'player',
                choices: [
                    {
                        text: '"Raymond... is this about Martha?"',
                        style: 'direct_compassion',
                        skillCheck: { skill: 'empathy', difficulty: 8 },
                        next: 'breakthrough'
                    },
                    {
                        text: '"Do you have anyone who can help? Family?"',
                        style: 'practical',
                        next: 'family_question'
                    },
                    {
                        text: '"We should still take you in for evaluation."',
                        style: 'protocol',
                        next: 'hospital_option'
                    }
                ]
            },
            {
                id: 'breakthrough',
                speaker: 'narrator',
                text: 'He looks at you—really looks—and his eyes get wet.',
                next: 'raymond_truth'
            },
            {
                id: 'raymond_truth',
                speaker: 'patient',
                text: '"Fifty-two years. She was here every day. Now it\'s just... quiet. So quiet. When you come, at least someone\'s here. Someone\'s talking to me."',
                voices: ['empathy', 'self_awareness'],
                next: 'truth_response'
            },
            {
                id: 'truth_response',
                speaker: 'player',
                choices: [
                    {
                        text: '"We\'re not the answer for loneliness, Raymond. But I know some resources..."',
                        style: 'helpful',
                        effects: [{ type: 'flag', flag: 'helped_raymond', value: true }],
                        next: 'resources'
                    },
                    {
                        text: '"I can\'t be your friend, but I can help you find people who can."',
                        style: 'honest',
                        next: 'resources'
                    },
                    {
                        text: '*Sit down across from him*',
                        style: 'human',
                        skillCheck: { skill: 'empathy', difficulty: 9 },
                        next: 'human_moment'
                    }
                ]
            },
            {
                id: 'human_moment',
                speaker: 'narrator',
                text: 'You sit. Your partner raises an eyebrow but says nothing. For a few minutes, you\'re just two people.',
                next: 'raymond_talks'
            },
            {
                id: 'raymond_talks',
                speaker: 'patient',
                text: '"She made lists for everything. Called me hopeless. But she\'d smile when she said it. Who\'s gonna smile at me like that now?"',
                next: 'resources'
            },
            {
                id: 'family_question',
                speaker: 'patient',
                text: '"Son\'s in California. Calls on Sundays. Daughter... we don\'t talk much. She took her mother\'s death hard. Blames me, I think."',
                next: 'resources'
            },
            {
                id: 'hospital_option',
                speaker: 'patient',
                text: '"If you think I should go... I just don\'t want to be alone there either."',
                next: 'transport_decision'
            },
            {
                id: 'resources',
                speaker: 'narrator',
                text: 'You tell him about the senior center. The grief support group at the church. The visiting nurse program that can check on him.',
                next: 'raymond_listens'
            },
            {
                id: 'raymond_listens',
                speaker: 'patient',
                text: '"I never was good at making friends. That was Martha. She could talk to anyone."',
                next: 'final_choice'
            },
            {
                id: 'final_choice',
                speaker: 'player',
                choices: [
                    {
                        text: '"I\'ll call the visiting nurse program for you. Get someone here tomorrow."',
                        style: 'active_help',
                        effects: [{ type: 'flag', flag: 'called_nurse_program', value: true }],
                        next: 'call_made'
                    },
                    {
                        text: '"Here\'s the number. You have to make the call, Raymond."',
                        style: 'empowering',
                        next: 'number_given'
                    },
                    {
                        text: '"Let\'s take you to the hospital. Maybe social services can connect you with resources."',
                        style: 'systemic',
                        next: 'transport_decision'
                    }
                ]
            },
            {
                id: 'call_made',
                speaker: 'narrator',
                text: 'You make the call while your partner finishes paperwork. They\'ll send someone tomorrow to assess his needs.',
                next: 'goodbye'
            },
            {
                id: 'number_given',
                speaker: 'narrator',
                text: 'He takes the paper. Whether he calls is up to him. You\'ve done what you can.',
                next: 'goodbye'
            },
            {
                id: 'transport_decision',
                speaker: 'narrator',
                text: 'He refuses transport. He doesn\'t need the hospital—he knows it and so do you.',
                next: 'goodbye'
            },
            {
                id: 'goodbye',
                speaker: 'patient',
                text: '"Thank you for coming. I mean it. I\'ll... I\'ll try those things you said."',
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: true,
                quality: 'good',
                message: 'You addressed the real problem—not his lungs, but his loneliness. Maybe the calls will slow down. Maybe.',
                xp: 20,
                stressChange: -3,
                specialFlag: 'helped_frequent_flyer'
            },
            partial: {
                survived: true,
                quality: 'adequate',
                message: 'Raymond stays home, still alone. You\'ll see him again soon.',
                xp: 10,
                stressChange: 2
            }
        }
    },

    // ============================================
    // MEDICAL EMERGENCIES (15 complete calls)
    // ============================================

    medical_001_stemi: {
        id: 'medical_001_stemi',
        name: 'Widow Maker',
        category: 'medical',
        dispatch: '58-year-old male, severe chest pain, diaphoretic. Bystander reports patient collapsed.',
        district: 'suburbs',
        scene: 'residential',
        difficulty: 14,
        timeLimit: 8,
        stressBase: 15,
        critical: true,

        patient: {
            name: 'Thomas Martinez',
            age: 58,
            gender: 'male',
            history: 'Unknown to you. Hypertension, hyperlipidemia, family history CAD.'
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'Sunday afternoon. Suburban home. A woman runs toward your ambulance, screaming.',
                next: 'wife_panic'
            },
            {
                id: 'wife_panic',
                speaker: 'bystander',
                text: '"He was mowing the lawn! He just dropped! Please, please help him!"',
                next: 'find_patient'
            },
            {
                id: 'find_patient',
                speaker: 'narrator',
                text: 'He\'s on the driveway, clutching his chest, gray as concrete. Diaphoretic. Agonal respirations.',
                voices: ['cardiology', 'composure'],
                next: 'critical_choice'
            },
            {
                id: 'critical_choice',
                speaker: 'player',
                choices: [
                    {
                        text: 'Aspirin, oxygen, 12-lead, nitro—full STEMI protocol',
                        style: 'protocol',
                        skillCheck: { skill: 'cardiology', difficulty: 12 },
                        next: 'full_protocol'
                    },
                    {
                        text: 'He\'s about to code. Prepare for CPR, get pads on now',
                        style: 'anticipatory',
                        skillCheck: { skill: 'intuition', difficulty: 11 },
                        next: 'prepare_for_worst'
                    },
                    {
                        text: 'Primary assessment first—ABCs before anything else',
                        style: 'by_the_book',
                        next: 'abcs_first'
                    }
                ]
            },
            {
                id: 'full_protocol',
                speaker: 'narrator',
                text: 'Aspirin crushed under his tongue. Oxygen on. Leads going on. You work fast, efficient.',
                next: 'ecg_reveals'
            },
            {
                id: 'prepare_for_worst',
                speaker: 'narrator',
                text: 'Smart. You get the pads on while your partner does the 12-lead. He\'s barely conscious.',
                next: 'ecg_reveals'
            },
            {
                id: 'abcs_first',
                speaker: 'narrator',
                text: 'Airway compromised—he\'s vomiting. You clear it fast. Breathing agonal. Circulation—radial pulse weak and thready.',
                next: 'ecg_reveals'
            },
            {
                id: 'ecg_reveals',
                speaker: 'narrator',
                text: 'The 12-lead prints. Tombstones. Massive ST elevation in V1-V4, reciprocal depression inferior. This is a widow maker—LAD occlusion.',
                voices: ['cardiology', 'memory'],
                next: 'transmission'
            },
            {
                id: 'transmission',
                speaker: 'player',
                text: '*Transmit 12-lead to hospital* "St. Mary\'s, we have a STEMI. 58-year-old male, onset during exertion, massive anterior elevation. ETA 12 minutes."',
                next: 'hospital_response'
            },
            {
                id: 'hospital_response',
                speaker: 'dispatch',
                text: '"Copy, Unit 7. Cath lab is activating. Cardiology on standby."',
                next: 'patient_deteriorates'
            },
            {
                id: 'patient_deteriorates',
                speaker: 'narrator',
                text: 'He\'s trying to talk. Hand gripping your arm.',
                next: 'patient_speaks'
            },
            {
                id: 'patient_speaks',
                speaker: 'patient',
                text: '"My daughter... wedding... next month..."',
                voices: ['empathy', 'composure'],
                next: 'comfort_or_work'
            },
            {
                id: 'comfort_or_work',
                speaker: 'player',
                choices: [
                    {
                        text: '"You\'ll be there. Stay with me, Thomas."',
                        style: 'reassuring',
                        effects: [{ type: 'stress', source: 'emotional_call', modifier: 0.5 }],
                        next: 'arrest'
                    },
                    {
                        text: '"I need you to save your energy. We\'re taking care of you."',
                        style: 'professional',
                        next: 'arrest'
                    },
                    {
                        text: '*Focus entirely on treatment*',
                        style: 'clinical',
                        next: 'arrest'
                    }
                ]
            },
            {
                id: 'arrest',
                speaker: 'narrator',
                text: 'Then he\'s gone. V-fib on the monitor. Pulseless.',
                voices: ['cardiology', 'composure'],
                next: 'defib_decision'
            },
            {
                id: 'defib_decision',
                speaker: 'player',
                choices: [
                    {
                        text: 'Shock immediately—shockable rhythm',
                        style: 'decisive',
                        skillCheck: { skill: 'cardiology', difficulty: 10 },
                        next: 'first_shock'
                    },
                    {
                        text: 'CPR first, then shock',
                        style: 'protocol',
                        next: 'cpr_first'
                    }
                ]
            },
            {
                id: 'first_shock',
                speaker: 'narrator',
                text: '"Charging... Clear!" 200 joules delivered. His body convulses.',
                next: 'post_shock'
            },
            {
                id: 'cpr_first',
                speaker: 'narrator',
                text: 'Compressions, then shock. By the book. 200 joules delivered.',
                next: 'post_shock'
            },
            {
                id: 'post_shock',
                speaker: 'narrator',
                text: 'Check rhythm...',
                skillCheck: { skill: 'cardiology', difficulty: 12 },
                next: 'rhythm_check'
            },
            {
                id: 'rhythm_check',
                speaker: 'narrator',
                text: 'Still V-fib. Another shock. Epinephrine. Amiodarone. You\'re in the dance now.',
                next: 'second_round'
            },
            {
                id: 'second_round',
                speaker: 'narrator',
                text: 'Second shock. Third. Four minutes of CPR. Your arms are burning.',
                next: 'wife_watching'
            },
            {
                id: 'wife_watching',
                speaker: 'narrator',
                text: 'The wife is at the edge of the driveway. Neighbors holding her back. She\'s praying.',
                voices: ['empathy', 'compartmentalization'],
                next: 'continue_efforts'
            },
            {
                id: 'continue_efforts',
                speaker: 'partner',
                text: '"I\'ve got compressions. You push the epi."',
                next: 'team_work'
            },
            {
                id: 'team_work',
                speaker: 'narrator',
                text: 'You switch. Your partner is strong, keeps the compressions deep and fast. You manage the drugs.',
                next: 'fourth_shock'
            },
            {
                id: 'fourth_shock',
                speaker: 'narrator',
                text: 'Fourth shock. Check rhythm.',
                skillCheck: { skill: 'cardiology', difficulty: 13 },
                next: 'rosc'
            },
            {
                id: 'rosc',
                speaker: 'narrator',
                text: 'Sinus tach. Pulse at the carotid. ROSC. Return of spontaneous circulation.',
                voices: ['cardiology'],
                next: 'rosc_moment'
            },
            {
                id: 'rosc_moment',
                speaker: 'narrator',
                text: 'You feel the pulse under your fingers. He\'s back. For now.',
                next: 'rapid_transport'
            },
            {
                id: 'rapid_transport',
                speaker: 'player',
                text: '"Load and go. He needs that cath lab now."',
                next: 'loading'
            },
            {
                id: 'loading',
                speaker: 'narrator',
                text: 'Into the ambulance. Wife follows in her car. You\'re twelve minutes from the cath lab.',
                next: 'transport_monitor'
            },
            {
                id: 'transport_monitor',
                speaker: 'narrator',
                text: 'He\'s intubated, sedated, on pressors. His heart is hanging on by a thread.',
                next: 'hospital_arrival'
            },
            {
                id: 'hospital_arrival',
                speaker: 'narrator',
                text: 'The cath lab team meets you at the door. He\'s in their hands now.',
                next: 'handoff'
            },
            {
                id: 'handoff',
                speaker: 'narrator',
                text: '"58-year-old male, STEMI, V-fib arrest in field, four shocks to ROSC. Down time approximately six minutes."',
                next: 'doctor_response'
            },
            {
                id: 'doctor_response',
                speaker: 'bystander',
                text: '"Good work. We\'ll take it from here."',
                next: 'wait_or_leave'
            },
            {
                id: 'wait_or_leave',
                speaker: 'player',
                choices: [
                    {
                        text: 'Wait to hear if he survives the cath',
                        style: 'invested',
                        next: 'waiting'
                    },
                    {
                        text: 'Back in service—there are other calls',
                        style: 'professional',
                        next: 'back_in_service'
                    },
                    {
                        text: 'Talk to the wife before leaving',
                        style: 'compassionate',
                        skillCheck: { skill: 'empathy', difficulty: 8 },
                        next: 'wife_talk'
                    }
                ]
            },
            {
                id: 'waiting',
                speaker: 'narrator',
                text: 'An hour later: 99% LAD occlusion. Stent placed. He\'s in the ICU, but alive. His daughter will have her father at the wedding.',
                effects: [{ type: 'stress', source: 'good_outcome', modifier: -1 }],
                next: 'end'
            },
            {
                id: 'back_in_service',
                speaker: 'narrator',
                text: 'You\'ll never know if he made it. That\'s the job. You did your part.',
                next: 'end'
            },
            {
                id: 'wife_talk',
                speaker: 'bystander',
                text: '"Is he... will he..."',
                next: 'wife_response'
            },
            {
                id: 'wife_response',
                speaker: 'player',
                text: '"He\'s got a chance. The best chance we could give him. The doctors are very good here."',
                next: 'wife_thanks'
            },
            {
                id: 'wife_thanks',
                speaker: 'bystander',
                text: '"Thank you. Thank you. He has to see her get married. He has to."',
                effects: [{ type: 'flag', flag: 'gave_family_hope', value: true }],
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: true,
                quality: 'excellent',
                message: 'Thomas Martinez survives. Six-minute down time, complete ROSC, successful PCI. He\'ll walk his daughter down the aisle.',
                xp: 50,
                stressChange: -5
            },
            partial: {
                survived: true,
                quality: 'good',
                message: 'He makes it to the cath lab alive. Whether he survives with good neuro function—that\'s out of your hands.',
                xp: 35,
                stressChange: 5
            },
            failure: {
                survived: false,
                quality: 'poor',
                message: 'He doesn\'t make it. Down time too long, damage too extensive. The wife\'s scream stays with you.',
                xp: 20,
                stressChange: 20
            }
        }
    },

    medical_002_overdose_narcan: {
        id: 'medical_002_overdose_narcan',
        name: 'Blue Lips',
        category: 'medical',
        dispatch: 'Unresponsive male in alley. Possible overdose. Bystander performing rescue breaths.',
        district: 'downtown',
        scene: 'alley',
        difficulty: 11,
        timeLimit: 6,
        stressBase: 10,

        patient: {
            name: 'Unknown Male',
            age: 28,
            gender: 'male',
            history: 'Track marks, signs of chronic IV drug use.'
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'Downtown alley. A young woman is giving breaths to someone on the ground. She looks up, desperate.',
                next: 'bystander_info'
            },
            {
                id: 'bystander_info',
                speaker: 'bystander',
                text: '"He just stopped breathing! I found him and he wasn\'t—I called and I\'ve been trying—"',
                next: 'scene_assessment'
            },
            {
                id: 'scene_assessment',
                speaker: 'narrator',
                text: 'Pinpoint pupils. Blue lips. Agonal breathing. Needle still in his arm. Classic opioid overdose.',
                voices: ['pharmacology', 'observation'],
                next: 'immediate_action'
            },
            {
                id: 'immediate_action',
                speaker: 'player',
                choices: [
                    {
                        text: 'Narcan immediately—IN or IM',
                        style: 'decisive',
                        skillCheck: { skill: 'pharmacology', difficulty: 9 },
                        next: 'narcan_admin'
                    },
                    {
                        text: 'BVM first—need to oxygenate before Narcan',
                        style: 'careful',
                        skillCheck: { skill: 'airway_management', difficulty: 10 },
                        next: 'bvm_first'
                    },
                    {
                        text: 'IV access for Narcan—faster this way',
                        style: 'aggressive',
                        skillCheck: { skill: 'dexterity', difficulty: 11 },
                        next: 'iv_narcan'
                    }
                ]
            },
            {
                id: 'narcan_admin',
                speaker: 'narrator',
                text: 'Intranasal Narcan—2mg per nostril. Fast, effective, no needle needed.',
                next: 'waiting_for_response'
            },
            {
                id: 'bvm_first',
                speaker: 'narrator',
                text: 'Good oxygen saturation first. His color starts to improve with the assisted ventilations. Then the Narcan.',
                next: 'waiting_for_response'
            },
            {
                id: 'iv_narcan',
                speaker: 'narrator',
                text: 'You find a vein—not easy on a chronic user. 0.4mg IV push. This will be fast.',
                next: 'waiting_for_response'
            },
            {
                id: 'waiting_for_response',
                speaker: 'narrator',
                text: 'Seconds tick by. The bystander is holding her breath. Then—',
                next: 'response'
            },
            {
                id: 'response',
                speaker: 'narrator',
                text: 'He gasps. Eyes fly open. And then the Narcan rage kicks in.',
                voices: ['composure', 'de_escalation'],
                next: 'patient_reaction'
            },
            {
                id: 'patient_reaction',
                speaker: 'patient',
                text: '"What the—get OFF me! Who are you? Get away!"',
                next: 'de_escalation'
            },
            {
                id: 'de_escalation',
                speaker: 'player',
                choices: [
                    {
                        text: '"You overdosed. We saved your life. Calm down."',
                        style: 'direct',
                        skillCheck: { skill: 'authority', difficulty: 10 },
                        next: 'direct_approach'
                    },
                    {
                        text: '"I know this doesn\'t feel good. Just breathe. You\'re safe."',
                        style: 'calming',
                        skillCheck: { skill: 'de_escalation', difficulty: 9 },
                        next: 'calming_approach'
                    },
                    {
                        text: '*Stay back, give him space*',
                        style: 'cautious',
                        next: 'cautious_approach'
                    }
                ]
            },
            {
                id: 'direct_approach',
                speaker: 'narrator',
                text: 'He\'s combative but you hold firm. Eventually the reality sinks in.',
                next: 'patient_realization'
            },
            {
                id: 'calming_approach',
                speaker: 'narrator',
                text: 'Your tone cuts through his panic. He\'s scared, sick, and the high is gone.',
                next: 'patient_realization'
            },
            {
                id: 'cautious_approach',
                speaker: 'narrator',
                text: 'He swings, misses. The withdrawal is brutal. Eventually he exhausts himself.',
                next: 'patient_realization'
            },
            {
                id: 'patient_realization',
                speaker: 'patient',
                text: '"I was dead? I was... oh god." *vomiting*',
                next: 'bystander_reveal'
            },
            {
                id: 'bystander_reveal',
                speaker: 'narrator',
                text: 'The young woman who was doing rescue breaths—she\'s crying with relief.',
                next: 'bystander_info_2'
            },
            {
                id: 'bystander_info_2',
                speaker: 'bystander',
                text: '"He\'s my brother. He said he was clean. He promised."',
                voices: ['empathy'],
                next: 'family_dynamic'
            },
            {
                id: 'family_dynamic',
                speaker: 'patient',
                text: '"Sarah? What are you—I didn\'t—this wasn\'t—"',
                next: 'sister_reaction'
            },
            {
                id: 'sister_reaction',
                speaker: 'bystander',
                text: '"I came to bring you lunch. And I found you dying in an alley."',
                next: 'transport_discussion'
            },
            {
                id: 'transport_discussion',
                speaker: 'narrator',
                text: 'He needs to go to the hospital. The Narcan will wear off, and whatever he took is still in his system.',
                next: 'transport_choice'
            },
            {
                id: 'transport_choice',
                speaker: 'player',
                choices: [
                    {
                        text: '"You need to come with us. When the Narcan wears off, you could stop breathing again."',
                        style: 'medical',
                        skillCheck: { skill: 'persuasion', difficulty: 10 },
                        next: 'persuade_transport'
                    },
                    {
                        text: '"Your sister just saved your life. Don\'t make that mean nothing."',
                        style: 'emotional',
                        skillCheck: { skill: 'empathy', difficulty: 9 },
                        next: 'emotional_appeal'
                    },
                    {
                        text: '"You can refuse. Sign here. But the next time, there might not be anyone around."',
                        style: 'realistic',
                        next: 'refusal_option'
                    }
                ]
            },
            {
                id: 'persuade_transport',
                speaker: 'narrator',
                text: 'The medical facts get through. He knows you\'re right.',
                next: 'agrees_transport'
            },
            {
                id: 'emotional_appeal',
                speaker: 'narrator',
                text: 'He looks at his sister. Something cracks.',
                next: 'agrees_transport'
            },
            {
                id: 'agrees_transport',
                speaker: 'patient',
                text: '"Fine. Fine. But I\'m not... I don\'t need rehab. This was a one-time thing."',
                voices: ['intuition', 'observation'],
                next: 'denial_response'
            },
            {
                id: 'denial_response',
                speaker: 'player',
                choices: [
                    {
                        text: '"That\'s between you and your doctor. Let\'s just get you safe."',
                        style: 'neutral',
                        next: 'transport_load'
                    },
                    {
                        text: '"I\'ve heard that before. Every single time I\'ve run this call."',
                        style: 'honest',
                        next: 'harsh_truth'
                    },
                    {
                        text: '"The hospital has resources. It\'s your choice to use them."',
                        style: 'informative',
                        next: 'resources_mention'
                    }
                ]
            },
            {
                id: 'harsh_truth',
                speaker: 'narrator',
                text: 'He flinches. But the truth sometimes does that.',
                next: 'transport_load'
            },
            {
                id: 'resources_mention',
                speaker: 'narrator',
                text: 'You plant the seed. Whether it grows is up to him.',
                next: 'transport_load'
            },
            {
                id: 'refusal_option',
                speaker: 'narrator',
                text: 'He hesitates. His sister grabs his hand.',
                next: 'sister_intervention'
            },
            {
                id: 'sister_intervention',
                speaker: 'bystander',
                text: '"Please, Marcus. Please. Mom can\'t bury another son."',
                next: 'agrees_transport'
            },
            {
                id: 'transport_load',
                speaker: 'narrator',
                text: 'He gets in the ambulance. His sister follows in her car. He\'s nauseous, shaking—the withdrawal is hitting.',
                next: 'ambulance_conversation'
            },
            {
                id: 'ambulance_conversation',
                speaker: 'patient',
                text: '"She was supposed to find me clean. Employed. Getting my life together. Instead..."',
                next: 'player_ambulance_response'
            },
            {
                id: 'player_ambulance_response',
                speaker: 'player',
                choices: [
                    {
                        text: '"Addiction is a disease. It\'s not about willpower."',
                        style: 'medical',
                        next: 'medical_perspective'
                    },
                    {
                        text: '"Getting better is hard. But you\'re still alive. That\'s a start."',
                        style: 'hopeful',
                        next: 'hopeful_perspective'
                    },
                    {
                        text: '*Just monitor him, let him think*',
                        style: 'silent',
                        next: 'silent_transport'
                    }
                ]
            },
            {
                id: 'medical_perspective',
                speaker: 'patient',
                text: '"Then how do I fix my brain?"',
                next: 'hospital_arrival_od'
            },
            {
                id: 'hopeful_perspective',
                speaker: 'patient',
                text: '"...yeah. Still alive."',
                next: 'hospital_arrival_od'
            },
            {
                id: 'silent_transport',
                speaker: 'narrator',
                text: 'Sometimes silence is what they need. He stares at the ceiling.',
                next: 'hospital_arrival_od'
            },
            {
                id: 'hospital_arrival_od',
                speaker: 'narrator',
                text: 'You hand him off to the ER. Social work will visit. Maybe he\'ll take the help. Maybe you\'ll see him again.',
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: true,
                quality: 'good',
                message: 'Marcus is stable. His sister stays with him. This was a wake-up call. Whether he hits snooze... time will tell.',
                xp: 25,
                stressChange: 3
            },
            partial: {
                survived: true,
                quality: 'adequate',
                message: 'Another Narcan save. Another person who might or might not change. The cycle continues.',
                xp: 15,
                stressChange: 5
            }
        }
    },

    // Continue with more complete calls...
    // I'll add the remaining calls in subsequent chunks due to length
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StoryCallsData;
}
