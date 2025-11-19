// Night Shift - Complete Scripted Story Calls Part 2
// Traumatic Calls and Partner Story Missions

const StoryCallsData2 = {
    // ============================================
    // TRAUMATIC CALLS (15 complete scripted calls)
    // ============================================

    traumatic_001_pediatric_drowning: {
        id: 'traumatic_001_pediatric_drowning',
        name: 'Backyard Pool',
        category: 'traumatic',
        dispatch: '4-year-old pulled from pool. CPR in progress by parent.',
        district: 'suburbs',
        scene: 'residential',
        difficulty: 14,
        timeLimit: 6,
        stressBase: 30,
        critical: true,
        stressMultiplier: 2.0,
        triggersFlashback: true,

        patient: {
            name: 'Lily',
            age: 4,
            gender: 'female',
            history: 'Healthy child. Slipped through pool gate.'
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'Suburban home. The screaming hits you before you open the door. In the backyard, a man is doing CPR on a small, wet form.',
                voices: ['memory', 'composure'],
                next: 'flashback_trigger'
            },
            {
                id: 'flashback_trigger',
                speaker: 'narrator',
                text: 'Pink swimsuit. Brown hair. For a moment, you\'re somewhere else. Someone else.',
                condition: { type: 'flag', flag: 'prologueCompleted', value: true },
                voices: ['self_awareness', 'memory'],
                next: 'shake_off'
            },
            {
                id: 'shake_off',
                speaker: 'player',
                choices: [
                    {
                        text: '*Push it down. This is now. This is different.*',
                        style: 'compartmentalize',
                        skillCheck: { skill: 'compartmentalization', difficulty: 12 },
                        effects: [{ type: 'stress', source: 'triggered', modifier: 1.5 }],
                        next: 'approach_patient'
                    },
                    {
                        text: '*Freeze for a moment*',
                        style: 'overwhelmed',
                        effects: [{ type: 'stress', source: 'triggered', modifier: 2.0 }],
                        next: 'partner_takes_over'
                    },
                    {
                        text: '*Deep breath. You\'ve trained for this.*',
                        style: 'grounded',
                        skillCheck: { skill: 'self_awareness', difficulty: 10 },
                        next: 'approach_patient'
                    }
                ]
            },
            {
                id: 'partner_takes_over',
                speaker: 'partner',
                text: '"I\'ve got the kid. You do the parents."',
                voices: ['composure'],
                next: 'partner_lead'
            },
            {
                id: 'partner_lead',
                speaker: 'narrator',
                text: 'Your partner pushes past you, takes over compressions. Professional. Fast. You follow, but you\'re a step behind.',
                next: 'delayed_assessment'
            },
            {
                id: 'approach_patient',
                speaker: 'narrator',
                text: 'Four years old. Cyanotic. Unresponsive. Dad\'s CPR is good—deep compressions, but exhausted.',
                next: 'take_over'
            },
            {
                id: 'take_over',
                speaker: 'player',
                text: '"I\'ve got her. Keep talking to her—she can hear you."',
                next: 'assessment'
            },
            {
                id: 'assessment',
                speaker: 'narrator',
                text: 'Cold, clammy, pulseless. How long was she down? You need to know.',
                next: 'time_question'
            },
            {
                id: 'delayed_assessment',
                speaker: 'narrator',
                text: 'Your partner assesses while you deal with the parents. "How long was she in the water?"',
                next: 'parent_answer'
            },
            {
                id: 'time_question',
                speaker: 'player',
                text: '"How long was she under?"',
                next: 'parent_answer'
            },
            {
                id: 'parent_answer',
                speaker: 'bystander',
                text: '"I don\'t know! Minutes? I was inside, I heard the splash—the gate was supposed to be locked!"',
                voices: ['observation', 'intuition'],
                next: 'mother_arrives'
            },
            {
                id: 'mother_arrives',
                speaker: 'narrator',
                text: 'The mother runs out. She sees her daughter on the ground and the sound she makes is primal.',
                voices: ['empathy', 'compartmentalization'],
                next: 'pediatric_protocol'
            },
            {
                id: 'pediatric_protocol',
                speaker: 'narrator',
                text: 'Pediatric CPR. 30:2 for two rescuers. BVM with pediatric mask. AED pads—child size.',
                skillCheck: { skill: 'pediatric_care', difficulty: 13 },
                next: 'aed_analysis'
            },
            {
                id: 'aed_analysis',
                speaker: 'narrator',
                text: 'AED analyzing... "Shock advised."',
                next: 'shock_decision'
            },
            {
                id: 'shock_decision',
                speaker: 'player',
                choices: [
                    {
                        text: '"Clear!" *Shock immediately*',
                        style: 'fast',
                        skillCheck: { skill: 'reflexes', difficulty: 10 },
                        next: 'first_shock_peds'
                    },
                    {
                        text: '*Verify everyone is clear, then shock*',
                        style: 'careful',
                        next: 'careful_shock'
                    }
                ]
            },
            {
                id: 'first_shock_peds',
                speaker: 'narrator',
                text: '50 joules delivered. Her tiny body convulses. Resume compressions.',
                next: 'continue_cpr'
            },
            {
                id: 'careful_shock',
                speaker: 'narrator',
                text: 'You physically move the father back. "I\'m clear, you\'re clear." Shock delivered.',
                next: 'continue_cpr'
            },
            {
                id: 'continue_cpr',
                speaker: 'narrator',
                text: 'Two minutes of CPR. She\'s so small. Your thumb and two fingers on her sternum.',
                voices: ['pediatric_care', 'composure'],
                next: 'water_removal'
            },
            {
                id: 'water_removal',
                speaker: 'narrator',
                text: 'Water in the airway. You suction, get a better seal with the BVM. Her color is still gray.',
                next: 'second_analysis'
            },
            {
                id: 'second_analysis',
                speaker: 'narrator',
                text: 'AED re-analyzing... "No shock advised."',
                voices: ['cardiology'],
                next: 'rhythm_change'
            },
            {
                id: 'rhythm_change',
                speaker: 'narrator',
                text: 'Check pulse. Carotid... you feel something. Weak, but there.',
                next: 'possible_rosc'
            },
            {
                id: 'possible_rosc',
                speaker: 'player',
                choices: [
                    {
                        text: '"I\'ve got a pulse! Maintain airway, prepare for transport!"',
                        style: 'confirmed',
                        skillCheck: { skill: 'pediatric_care', difficulty: 12 },
                        next: 'confirmed_rosc'
                    },
                    {
                        text: '*Continue CPR—don\'t trust a weak pulse*',
                        style: 'cautious',
                        next: 'continue_conservative'
                    }
                ]
            },
            {
                id: 'confirmed_rosc',
                speaker: 'narrator',
                text: 'Pulse is there—60, 70. She\'s back. Not breathing on her own yet, but her heart is working.',
                next: 'transport_peds'
            },
            {
                id: 'continue_conservative',
                speaker: 'narrator',
                text: 'You continue for another cycle. When you check again, the pulse is stronger. Definitely ROSC.',
                next: 'transport_peds'
            },
            {
                id: 'transport_peds',
                speaker: 'narrator',
                text: 'Into the ambulance. Continuous BVM ventilation. She needs a pediatric ICU—fast.',
                next: 'parent_transport'
            },
            {
                id: 'parent_transport',
                speaker: 'narrator',
                text: 'The mother rides with you. The father follows in the car. She\'s holding Lily\'s hand, whispering.',
                voices: ['empathy'],
                next: 'mother_dialogue'
            },
            {
                id: 'mother_dialogue',
                speaker: 'bystander',
                text: '"Please. Please, she\'s all we have. We tried for years to have her. Please."',
                next: 'response_to_mother'
            },
            {
                id: 'response_to_mother',
                speaker: 'player',
                choices: [
                    {
                        text: '"She\'s fighting. Her heart is beating."',
                        style: 'factual_hope',
                        next: 'hope_given'
                    },
                    {
                        text: '"We\'re doing everything we can."',
                        style: 'realistic',
                        next: 'realistic_response'
                    },
                    {
                        text: '*Focus on Lily, can\'t speak*',
                        style: 'silent',
                        next: 'silent_focus'
                    }
                ]
            },
            {
                id: 'hope_given',
                speaker: 'narrator',
                text: 'The mother nods, keeps whispering. You keep ventilating. Lily\'s color is improving.',
                next: 'hospital_arrival_peds'
            },
            {
                id: 'realistic_response',
                speaker: 'narrator',
                text: 'You won\'t make promises you can\'t keep. The mother understands.',
                next: 'hospital_arrival_peds'
            },
            {
                id: 'silent_focus',
                speaker: 'narrator',
                text: 'Your partner puts a hand on the mother\'s shoulder. You focus on the ventilations.',
                next: 'hospital_arrival_peds'
            },
            {
                id: 'hospital_arrival_peds',
                speaker: 'narrator',
                text: 'Pediatric trauma team meets you. They take over immediately. Lily is whisked away.',
                next: 'waiting_room'
            },
            {
                id: 'waiting_room',
                speaker: 'narrator',
                text: 'The parents disappear into the waiting room. You\'re left standing in the ambulance bay.',
                voices: ['self_awareness', 'dark_humor'],
                next: 'aftermath_choice'
            },
            {
                id: 'aftermath_choice',
                speaker: 'player',
                choices: [
                    {
                        text: '*Sit in the ambulance for a minute*',
                        style: 'process',
                        next: 'process_moment'
                    },
                    {
                        text: '"Let\'s get back in service."',
                        style: 'push_through',
                        next: 'back_in_service_peds'
                    },
                    {
                        text: '*Check on the parents before leaving*',
                        style: 'compassionate',
                        skillCheck: { skill: 'empathy', difficulty: 8 },
                        next: 'check_parents'
                    }
                ]
            },
            {
                id: 'process_moment',
                speaker: 'narrator',
                text: 'Your partner sits with you. Neither of you speak. Sometimes that\'s enough.',
                effects: [{ type: 'relationship', partner: 'current', amount: 3 }],
                next: 'end'
            },
            {
                id: 'back_in_service_peds',
                speaker: 'narrator',
                text: 'Back to work. The calls don\'t stop for processing. They never do.',
                next: 'end'
            },
            {
                id: 'check_parents',
                speaker: 'narrator',
                text: 'You find them in the waiting room. The mother looks up.',
                next: 'update_attempt'
            },
            {
                id: 'update_attempt',
                speaker: 'bystander',
                text: '"Any news? Do you know anything?"',
                next: 'final_response'
            },
            {
                id: 'final_response',
                speaker: 'player',
                text: '"The doctors are with her now. You got her out fast. You did good."',
                effects: [{ type: 'flag', flag: 'comforted_family', value: true }],
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: true,
                quality: 'good',
                message: 'Lily survives. Hypothermia from the cold water actually helped preserve brain function. She\'ll need therapy, but she\'ll be okay. Not all pediatric calls end like Emily.',
                xp: 50,
                stressChange: 15
            },
            partial: {
                survived: true,
                quality: 'adequate',
                message: 'She\'s alive but the outcome is uncertain. Anoxic brain injury is possible. The waiting is its own kind of torture.',
                xp: 35,
                stressChange: 25
            },
            failure: {
                survived: false,
                quality: 'poor',
                message: 'Down time was too long. She was underwater too long before dad found her. Another small body that won\'t go home.',
                xp: 20,
                stressChange: 40,
                mentalStateRisk: 'dissociated'
            }
        }
    },

    // ============================================
    // PARTNER PERSONAL MISSIONS
    // ============================================

    partner_marcus_retirement: {
        id: 'partner_marcus_retirement',
        name: 'Twenty Years',
        category: 'partner_story',
        partner: 'marcus',
        requiredTrust: 60,
        dispatch: 'Cardiac arrest at downtown restaurant. Second unit requested.',
        district: 'downtown',
        scene: 'restaurant',
        difficulty: 13,
        timeLimit: 10,
        stressBase: 15,
        critical: true,

        patient: {
            name: 'Frank DeLuca',
            age: 62,
            gender: 'male',
            history: 'Marcus\'s former partner. 20+ years together.'
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'Upscale restaurant. Chaos at a back table. CPR in progress.',
                next: 'marcus_recognition'
            },
            {
                id: 'marcus_recognition',
                speaker: 'narrator',
                text: 'Marcus stops dead. His face goes white.',
                voices: ['observation', 'intuition'],
                next: 'marcus_frozen'
            },
            {
                id: 'marcus_frozen',
                speaker: 'marcus',
                text: '"That\'s... that\'s Frank. That\'s Frank DeLuca."',
                next: 'player_realizes'
            },
            {
                id: 'player_realizes',
                speaker: 'narrator',
                text: 'Frank DeLuca. Marcus\'s partner for twenty years. Retired last spring.',
                next: 'take_lead'
            },
            {
                id: 'take_lead',
                speaker: 'player',
                choices: [
                    {
                        text: '"I\'ve got this. Stay with me or don\'t, but I\'m working."',
                        style: 'decisive',
                        skillCheck: { skill: 'authority', difficulty: 11 },
                        next: 'player_leads'
                    },
                    {
                        text: '"Marcus. He needs you. Come on."',
                        style: 'motivating',
                        skillCheck: { skill: 'persuasion', difficulty: 10 },
                        next: 'motivate_marcus'
                    },
                    {
                        text: '"Maybe you should sit this one out."',
                        style: 'protecting',
                        next: 'bench_marcus'
                    }
                ]
            },
            {
                id: 'player_leads',
                speaker: 'narrator',
                text: 'You push forward. Marcus follows a moment later, on autopilot.',
                next: 'frank_assessment'
            },
            {
                id: 'motivate_marcus',
                speaker: 'narrator',
                text: 'Something snaps in him. He moves, and now he\'s the veteran you know.',
                effects: [{ type: 'relationship', partner: 'marcus', amount: 5 }],
                next: 'marcus_engaged'
            },
            {
                id: 'marcus_engaged',
                speaker: 'marcus',
                text: '"He\'s got history. MI three years ago. On plavix and metoprolol."',
                next: 'frank_assessment'
            },
            {
                id: 'bench_marcus',
                speaker: 'narrator',
                text: 'Marcus shakes his head. "I\'m not sitting out." He pushes past you.',
                effects: [{ type: 'relationship', partner: 'marcus', amount: -3 }],
                next: 'frank_assessment'
            },
            {
                id: 'frank_assessment',
                speaker: 'narrator',
                text: 'Pulseless, apneic. Bystander CPR was okay. AED pads on.',
                skillCheck: { skill: 'cardiology', difficulty: 12 },
                next: 'analyze_frank'
            },
            {
                id: 'analyze_frank',
                speaker: 'narrator',
                text: 'V-fib. Shockable rhythm. This is a save if you do it right.',
                next: 'treatment_sequence'
            },
            {
                id: 'treatment_sequence',
                speaker: 'narrator',
                text: 'Shock. Epi. CPR. The restaurant watches, silent.',
                next: 'marcus_compressions'
            },
            {
                id: 'marcus_compressions',
                speaker: 'narrator',
                text: 'Marcus is doing compressions. His form is perfect, but you can see his jaw clenching.',
                next: 'second_shock'
            },
            {
                id: 'second_shock',
                speaker: 'narrator',
                text: 'Second shock. Third. Amiodarone on board.',
                skillCheck: { skill: 'cardiology', difficulty: 13 },
                next: 'rhythm_check_frank'
            },
            {
                id: 'rhythm_check_frank',
                speaker: 'narrator',
                text: 'Check rhythm... Sinus tach. Pulse at the carotid.',
                next: 'rosc_frank'
            },
            {
                id: 'rosc_frank',
                speaker: 'narrator',
                text: 'ROSC. Frank\'s back.',
                next: 'marcus_reaction'
            },
            {
                id: 'marcus_reaction',
                speaker: 'narrator',
                text: 'Marcus lets out a breath he\'s been holding for five minutes.',
                next: 'frank_wakes'
            },
            {
                id: 'frank_wakes',
                speaker: 'patient',
                text: '"...Doc? That you?"',
                voices: ['empathy'],
                next: 'marcus_response'
            },
            {
                id: 'marcus_response',
                speaker: 'marcus',
                text: '"Yeah, you old bastard. It\'s me. Stop trying to make your retirement exciting."',
                next: 'transport_frank'
            },
            {
                id: 'transport_frank',
                speaker: 'narrator',
                text: 'Frank is loaded up. He wants Marcus to ride with him. You drive.',
                next: 'back_conversation'
            },
            {
                id: 'back_conversation',
                speaker: 'narrator',
                text: 'Through the window, you can see Marcus holding Frank\'s hand. Two old partners.',
                voices: ['empathy', 'self_awareness'],
                next: 'hospital_frank'
            },
            {
                id: 'hospital_frank',
                speaker: 'narrator',
                text: 'Frank goes to the cath lab. Marcus won\'t leave the waiting room.',
                next: 'marcus_moment'
            },
            {
                id: 'marcus_moment',
                speaker: 'narrator',
                text: 'You find him outside, smoking a cigarette he bummed from a nurse.',
                next: 'marcus_opens'
            },
            {
                id: 'marcus_opens',
                speaker: 'marcus',
                text: '"Twenty years. Twenty years we worked together. He retired to spend time with his grandkids. And I thought I lost him."',
                next: 'player_response_marcus'
            },
            {
                id: 'player_response_marcus',
                speaker: 'player',
                choices: [
                    {
                        text: '"But you didn\'t. He\'s alive because of you."',
                        style: 'reassuring',
                        next: 'marcus_deflects'
                    },
                    {
                        text: '"Is that what you\'re afraid of? Dying alone after retirement?"',
                        style: 'direct',
                        skillCheck: { skill: 'intuition', difficulty: 11 },
                        next: 'marcus_truth'
                    },
                    {
                        text: '"You did the job. That\'s what matters."',
                        style: 'professional',
                        next: 'marcus_shakes_head'
                    }
                ]
            },
            {
                id: 'marcus_deflects',
                speaker: 'marcus',
                text: '"Because of us. You did most of the work while I was freezing."',
                next: 'marcus_truth'
            },
            {
                id: 'marcus_truth',
                speaker: 'marcus',
                text: '"I don\'t know who I am without this job. Frank figured it out. Grandkids, hobbies, whatever. Me? I got nothing. Nothing but the bus."',
                voices: ['empathy', 'self_awareness'],
                next: 'core_conversation'
            },
            {
                id: 'marcus_shakes_head',
                speaker: 'marcus',
                text: '"The job. Always the job. But what\'s after the job?"',
                next: 'marcus_truth'
            },
            {
                id: 'core_conversation',
                speaker: 'player',
                choices: [
                    {
                        text: '"Then find something. Frank did. Your ex-wives aren\'t the only people in the world."',
                        style: 'tough_love',
                        effects: [{ type: 'flag', flag: 'marcus_confronted', value: true }],
                        next: 'marcus_pushed'
                    },
                    {
                        text: '"Maybe that\'s what retirement is for. Figuring it out."',
                        style: 'gentle',
                        next: 'marcus_considers'
                    },
                    {
                        text: '"You\'ve got time to figure it out. Frank just showed you that."',
                        style: 'practical',
                        next: 'marcus_realization'
                    }
                ]
            },
            {
                id: 'marcus_pushed',
                speaker: 'marcus',
                text: '"...you\'re not wrong. Damn, kid, when did you get smart?"',
                effects: [{ type: 'relationship', partner: 'marcus', amount: 5 }],
                next: 'end_marcus_story'
            },
            {
                id: 'marcus_considers',
                speaker: 'marcus',
                text: '"Maybe. Maybe I\'ll call my daughter when this shift is over. She\'s got kids I barely know."',
                effects: [{ type: 'flag', flag: 'marcus_growth', value: true }],
                next: 'end_marcus_story'
            },
            {
                id: 'marcus_realization',
                speaker: 'marcus',
                text: '"Time. Yeah. I\'ve been wasting it."',
                next: 'end_marcus_story'
            },
            {
                id: 'end_marcus_story',
                speaker: 'narrator',
                text: 'Marcus finishes his cigarette. Frank\'s surgery will go well—he\'ll walk his grandkids to school again. And Marcus... maybe he\'ll find something to walk toward too.',
                effects: [{ type: 'flag', flag: 'marcus_story_complete', value: true }],
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: true,
                quality: 'excellent',
                message: 'Frank survives. Marcus reconnects with his daughter. Sometimes saving a life saves more than one person.',
                xp: 60,
                stressChange: -5,
                partnerGrowth: true
            }
        }
    },

    partner_jenny_first_death: {
        id: 'partner_jenny_first_death',
        name: 'The First One',
        category: 'partner_story',
        partner: 'jenny',
        requiredTrust: 40,
        dispatch: '8-year-old male, bicycle vs. vehicle. Major trauma.',
        district: 'suburbs',
        scene: 'street',
        difficulty: 15,
        timeLimit: 8,
        stressBase: 35,
        critical: true,
        stressMultiplier: 2.5,

        patient: {
            name: 'Tyler',
            age: 8,
            gender: 'male',
            history: 'Healthy child. Wrong place, wrong time.'
        },

        dialogue: [
            {
                id: 'arrival',
                speaker: 'narrator',
                text: 'Quiet suburban street. A car at an angle on the sidewalk. A bicycle crumpled. A crowd gathered around something small.',
                next: 'jenny_reaction'
            },
            {
                id: 'jenny_reaction',
                speaker: 'narrator',
                text: 'Jenny is out of the ambulance before you\'ve stopped. She\'s running.',
                next: 'scene_severity'
            },
            {
                id: 'scene_severity',
                speaker: 'narrator',
                text: 'You see him as you approach. Eight years old. Massive head trauma. Blood pooling. He\'s not moving.',
                voices: ['trauma_assessment', 'composure'],
                next: 'assessment_grim'
            },
            {
                id: 'assessment_grim',
                speaker: 'narrator',
                text: 'Decerebrate posturing. Fixed and dilated pupils. Skull fracture visible. This is non-survivable.',
                next: 'jenny_working'
            },
            {
                id: 'jenny_working',
                speaker: 'jenny',
                text: '"Starting compressions! Get the bag, we need to—"',
                next: 'intervention_choice'
            },
            {
                id: 'intervention_choice',
                speaker: 'player',
                choices: [
                    {
                        text: '"Jenny. Stop."',
                        style: 'direct',
                        skillCheck: { skill: 'authority', difficulty: 12 },
                        next: 'stop_jenny'
                    },
                    {
                        text: '*Help her work the code*',
                        style: 'supportive',
                        next: 'work_together'
                    },
                    {
                        text: '"Let me assess him first."',
                        style: 'clinical',
                        skillCheck: { skill: 'trauma_assessment', difficulty: 11 },
                        next: 'own_assessment'
                    }
                ]
            },
            {
                id: 'stop_jenny',
                speaker: 'narrator',
                text: 'She looks up at you. "What? No, we have to—"',
                next: 'explain_reality'
            },
            {
                id: 'explain_reality',
                speaker: 'player',
                text: '"Look at him. The skull fracture. The posturing. He was gone before we got here."',
                next: 'jenny_denial'
            },
            {
                id: 'jenny_denial',
                speaker: 'jenny',
                text: '"No. No, we can—there\'s always a chance—"',
                next: 'harsh_truth_jenny'
            },
            {
                id: 'harsh_truth_jenny',
                speaker: 'player',
                choices: [
                    {
                        text: '"Not this time. I\'m sorry."',
                        style: 'gentle',
                        next: 'jenny_breaks'
                    },
                    {
                        text: '"Working a dead child in front of his mother won\'t help anyone."',
                        style: 'practical',
                        next: 'jenny_sees_mother'
                    },
                    {
                        text: '"You know the signs. You\'re trained. You know."',
                        style: 'teaching',
                        skillCheck: { skill: 'authority', difficulty: 10 },
                        next: 'jenny_accepts'
                    }
                ]
            },
            {
                id: 'work_together',
                speaker: 'narrator',
                text: 'You work the code. CPR, airway, the works. After ten minutes, even Jenny knows.',
                next: 'inevitable_conclusion'
            },
            {
                id: 'own_assessment',
                speaker: 'narrator',
                text: 'You do the assessment. It confirms what you already knew. This child is dead.',
                next: 'jenny_denial'
            },
            {
                id: 'jenny_breaks',
                speaker: 'narrator',
                text: 'Her hands drop. She\'s staring at the boy. At Tyler. She\'s not crying. She\'s not anything.',
                voices: ['empathy'],
                next: 'jenny_silence'
            },
            {
                id: 'jenny_sees_mother',
                speaker: 'narrator',
                text: 'Jenny looks up. The mother is there, held back by police. Screaming her son\'s name.',
                next: 'jenny_breaks'
            },
            {
                id: 'jenny_accepts',
                speaker: 'narrator',
                text: 'She stops. Her hands are shaking. "I know. I know, I just..."',
                next: 'jenny_silence'
            },
            {
                id: 'inevitable_conclusion',
                speaker: 'narrator',
                text: 'You call it. Time of death. Jenny hasn\'t said a word for five minutes.',
                next: 'jenny_silence'
            },
            {
                id: 'jenny_silence',
                speaker: 'narrator',
                text: 'You cover Tyler with a sheet. The mother\'s screams will haunt your dreams. Jenny is catatonic.',
                next: 'get_jenny_away'
            },
            {
                id: 'get_jenny_away',
                speaker: 'player',
                choices: [
                    {
                        text: '"Come on. Back to the bus. You don\'t need to see this."',
                        style: 'protective',
                        next: 'lead_jenny'
                    },
                    {
                        text: '"Take a minute. Then we need to talk to the mother."',
                        style: 'duty',
                        next: 'jenny_duty'
                    },
                    {
                        text: '*Let her process*',
                        style: 'space',
                        next: 'jenny_processes'
                    }
                ]
            },
            {
                id: 'lead_jenny',
                speaker: 'narrator',
                text: 'You guide her to the ambulance. She sits on the back step, staring at nothing.',
                next: 'jenny_speaks'
            },
            {
                id: 'jenny_duty',
                speaker: 'jenny',
                text: '"I can\'t. I can\'t talk to her. I can\'t tell her—"',
                next: 'lead_jenny'
            },
            {
                id: 'jenny_processes',
                speaker: 'narrator',
                text: 'She kneels there for a long moment. When she stands, something is different in her eyes.',
                next: 'jenny_speaks'
            },
            {
                id: 'jenny_speaks',
                speaker: 'jenny',
                text: '"He was eight. He was riding his bike and now he\'s dead and I couldn\'t—I couldn\'t do anything."',
                voices: ['empathy', 'self_awareness'],
                next: 'response_to_jenny'
            },
            {
                id: 'response_to_jenny',
                speaker: 'player',
                choices: [
                    {
                        text: '"No one could. Some injuries aren\'t survivable. That\'s not on you."',
                        style: 'factual',
                        next: 'jenny_processing_facts'
                    },
                    {
                        text: '"This is the job. It\'s brutal. And it doesn\'t get easier."',
                        style: 'honest',
                        next: 'jenny_processing_truth'
                    },
                    {
                        text: '"Feel it. Don\'t run from it. But don\'t let it break you."',
                        style: 'guiding',
                        skillCheck: { skill: 'empathy', difficulty: 10 },
                        next: 'jenny_processing_growth'
                    }
                ]
            },
            {
                id: 'jenny_processing_facts',
                speaker: 'jenny',
                text: '"I know. I know the medicine. But he was just a kid..."',
                next: 'jenny_question'
            },
            {
                id: 'jenny_processing_truth',
                speaker: 'jenny',
                text: '"Then how do you do it? How do you keep coming back?"',
                next: 'jenny_question'
            },
            {
                id: 'jenny_processing_growth',
                speaker: 'narrator',
                text: 'She nods slowly. Taking it in. Not running. That\'s important.',
                next: 'jenny_question'
            },
            {
                id: 'jenny_question',
                speaker: 'jenny',
                text: '"Does it... do you get used to it?"',
                next: 'final_answer'
            },
            {
                id: 'final_answer',
                speaker: 'player',
                choices: [
                    {
                        text: '"No. You just learn to carry it."',
                        style: 'honest',
                        effects: [{ type: 'flag', flag: 'jenny_taught_truth', value: true }],
                        next: 'jenny_understands'
                    },
                    {
                        text: '"You find ways to cope. Some healthy, some not."',
                        style: 'practical',
                        next: 'jenny_understands'
                    },
                    {
                        text: '"The day it doesn\'t affect you is the day you should quit."',
                        style: 'philosophical',
                        next: 'jenny_understands'
                    }
                ]
            },
            {
                id: 'jenny_understands',
                speaker: 'narrator',
                text: 'She sits with that. After a long moment, she wipes her eyes.',
                next: 'jenny_decision'
            },
            {
                id: 'jenny_decision',
                speaker: 'jenny',
                text: '"I need... I need to see my brother. After shift. He\'s the reason I do this. I need to remember that."',
                effects: [{ type: 'relationship', partner: 'jenny', amount: 5 }],
                next: 'end_jenny_story'
            },
            {
                id: 'end_jenny_story',
                speaker: 'narrator',
                text: 'She\'s changed. The unshakeable optimism is cracked. But she\'s not broken. Not yet. Maybe not ever.',
                effects: [{ type: 'flag', flag: 'jenny_story_complete', value: true }],
                next: 'end'
            }
        ],

        outcomes: {
            success: {
                survived: false,
                quality: 'tragic',
                message: 'Tyler was dead before you arrived. But Jenny survived. She\'ll carry this, and it\'ll make her stronger. Or it\'ll destroy her. Time will tell.',
                xp: 40,
                stressChange: 25,
                partnerGrowth: true
            }
        }
    }
};

// Merge with main data
if (typeof StoryCallsData !== 'undefined') {
    Object.assign(StoryCallsData, StoryCallsData2);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StoryCallsData2;
}
