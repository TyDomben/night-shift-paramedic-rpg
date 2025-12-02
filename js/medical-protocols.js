// Night Shift - Medical Protocol System
// Accurate medical protocols and decision trees

const MedicalProtocols = {
    // ============================================
    // PRIMARY ASSESSMENT (ABC)
    // ============================================

    primaryAssessment: {
        name: 'Primary Assessment',
        sequence: ['scene_safety', 'general_impression', 'airway', 'breathing', 'circulation'],

        scene_safety: {
            required: true,
            failure: 'Scene unsafe - you or your partner could be injured',
            checks: ['bsi', 'hazards', 'mechanism'],

            bsi: {
                name: 'Body Substance Isolation',
                required: ['gloves'],
                recommended: ['mask', 'eye_protection'],
                failure_consequence: 'exposure_risk'
            }
        },

        airway: {
            states: ['patent', 'partially_obstructed', 'completely_obstructed'],
            interventions: {
                snoring: { action: 'head_tilt_chin_lift', contraindication: 'c_spine' },
                gurgling: { action: 'suction', equipment: 'suction_unit' },
                stridor: { action: 'prepare_advanced_airway', critical: true },
                complete_obstruction: { action: 'heimlich_or_bvm', critical: true }
            }
        },

        breathing: {
            assessment: ['rate', 'depth', 'rhythm', 'effort', 'sounds'],
            normal_adult: { rate: [12, 20], spo2: 94 },
            interventions: {
                hypoxic: { spo2_below: 94, action: 'oxygen_therapy', flow_rate: '15L_nrb' },
                apneic: { action: 'bvm_ventilation', rate: '10-12_per_min' },
                inadequate: { action: 'assisted_ventilation' }
            }
        },

        circulation: {
            assessment: ['pulse', 'skin', 'capillary_refill', 'bleeding'],
            shock_indicators: ['tachycardia', 'hypotension', 'cool_clammy_skin', 'altered_mental'],
            interventions: {
                no_pulse: { action: 'start_cpr', time_critical: true },
                weak_pulse: { action: 'treat_shock', position: 'supine' },
                major_bleeding: { action: 'direct_pressure', escalate: 'tourniquet' }
            }
        }
    },

    // ============================================
    // CARDIAC ARREST PROTOCOL (ACLS)
    // ============================================

    cardiac_arrest: {
        name: 'Cardiac Arrest Management',

        initial_actions: {
            sequence: [
                { step: 'verify_pulseless', time: 10 }, // 10 seconds max
                { step: 'start_cpr', immediate: true },
                { step: 'apply_monitor', during_cpr: true },
                { step: 'establish_airway', timing: 'after_2min_cpr' }
            ]
        },

        cpr_standards: {
            adult: {
                compression_depth: { min: 2.0, max: 2.4, unit: 'inches' },
                compression_rate: { min: 100, max: 120, unit: 'bpm' },
                ratio: '30:2', // compressions:breaths (single rescuer)
                ratio_two_rescuer: '30:2', // Still 30:2 for adults
                allow_full_recoil: true,
                minimize_interruptions: { max: 10, unit: 'seconds' }
            },
            child: {
                compression_depth: { min: 2.0, max: 2.4, unit: 'inches' },
                compression_rate: { min: 100, max: 120, unit: 'bpm' },
                ratio: '30:2', // single rescuer
                ratio_two_rescuer: '15:2' // Two rescuers for child
            }
        },

        rhythm_analysis: {
            shockable: ['vfib', 'pulseless_vtach'],
            non_shockable: ['asystole', 'pea'],

            vfib: {
                treatment: 'defibrillation',
                energy: { adult: [200, 300, 360], child: '2j_per_kg' },
                post_shock: 'immediate_cpr_2min'
            },

            pea: {
                treatment: 'cpr_and_reversible_causes',
                reversible_h_and_t: [
                    'hypovolemia', 'hypoxia', 'hydrogen_ion_acidosis', 'hypo_hyperkalemia', 'hypothermia',
                    'tension_pneumothorax', 'tamponade', 'toxins', 'thrombosis_coronary', 'thrombosis_pulmonary'
                ]
            }
        },

        medications: {
            epinephrine: {
                dose: { adult: 1, unit: 'mg' },
                route: 'IV_or_IO',
                timing: 'every_3_to_5_min',
                dilution: '1:10000'
            },
            amiodarone: {
                dose: { adult: 300, unit: 'mg' },
                route: 'IV_or_IO',
                timing: 'after_3rd_shock',
                second_dose: { amount: 150, unit: 'mg' }
            }
        },

        termination_criteria: {
            continue_if: ['shockable_rhythm', 'rosc', 'reversible_cause_identified'],
            consider_termination_if: [
                'asystole_20_min_with_proper_acls',
                'no_rosc_after_adequate_trial',
                'unwitnessed_prolonged_downtime',
                'medical_futility'
            ],
            do_not_terminate_if: ['hypothermia', 'drug_overdose', 'pediatric']
        },

        post_rosc: {
            immediate: ['pulse_check', 'bp_measurement', 'adjust_ventilation'],
            ongoing: ['12_lead_ecg', 'targeted_temp_management', 'treat_hypotension'],
            transport: 'cath_lab_if_stemi'
        }
    },

    // ============================================
    // TRAUMA ASSESSMENT (MARCH)
    // ============================================

    trauma: {
        name: 'Trauma Assessment',
        algorithm: 'MARCH', // Massive hemorrhage, Airway, Respirations, Circulation, Hypothermia

        massive_hemorrhage: {
            priority: 1,
            assessment: 'visual_scan_for_bleeding',
            interventions: {
                arterial: {
                    first: 'direct_pressure',
                    if_failed: 'tourniquet',
                    location: '2-3_inches_above_wound',
                    time_application: { note: true, critical: true }
                },
                venous: {
                    first: 'direct_pressure',
                    elevation: true,
                    pressure_point: 'if_needed'
                },
                internal: {
                    signs: ['distended_abdomen', 'mechanism', 'shock_without_external'],
                    treatment: 'rapid_transport',
                    fluid_resuscitation: 'permissive_hypotension'
                }
            }
        },

        spinal_precautions: {
            indications: ['altered_mental_status', 'neuro_deficit', 'midline_pain',
                         'mechanism_suggests', 'intoxication', 'distracting_injury'],
            equipment: ['cervical_collar', 'backboard_or_vacuum_mattress'],
            application: 'manual_inline_then_collar',
            clearance_criteria: 'not_in_field_scope'
        },

        shock_management: {
            recognition: {
                compensated: ['tachycardia', 'pale', 'delayed_capillary_refill', 'anxiety'],
                decompensated: ['hypotension', 'altered_mental', 'weak_pulse']
            },
            treatment: {
                position: 'supine',
                oxygen: 'high_flow',
                fluid_resuscitation: {
                    trauma: 'permissive_hypotension', // Target SBP 90
                    medical: 'normal_resuscitation'
                },
                keep_warm: true
            }
        }
    },

    // ============================================
    // MEDICATION ADMINISTRATION
    // ============================================

    medications: {
        aspirin: {
            indications: ['chest_pain_cardiac', 'stemi'],
            dose: { adult: 324, unit: 'mg' },
            route: 'chewed',
            contraindications: ['allergy', 'active_gi_bleed', 'recent_stroke'],
            verification: 'five_rights' // Right patient, drug, dose, route, time
        },

        nitroglycerin: {
            indications: ['chest_pain_cardiac'],
            dose: { adult: 0.4, unit: 'mg' },
            route: 'sublingual',
            max_doses: 3,
            interval: 5, // minutes
            contraindications: [
                'sbp_below_100',
                'viagra_within_24h',
                'cialis_within_48h',
                'right_ventricular_infarct',
                'severe_aortic_stenosis'
            ],
            reassess: 'after_each_dose'
        },

        narcan: {
            name: 'Naloxone',
            indications: ['opioid_overdose', 'respiratory_depression'],
            dose: {
                adult: { intranasal: 2, iv: 0.4, unit: 'mg' },
                child: { dose_per_kg: 0.1, max: 2, unit: 'mg' }
            },
            route: ['intranasal', 'iv', 'im'],
            onset: { intranasal: '2-3_min', iv: '1-2_min' },
            duration: '30-90_min',
            warnings: [
                'may_precipitate_withdrawal',
                'patient_may_become_combative',
                'repeat_dose_may_be_needed',
                'duration_shorter_than_opioid'
            ],
            reassess: 'continuous',
            transport: 'always_even_if_improved'
        },

        epinephrine_anaphylaxis: {
            indications: ['anaphylaxis', 'severe_allergic_reaction'],
            dose: {
                adult: { amount: 0.3, unit: 'mg' },
                child: { amount: 0.15, unit: 'mg' }
            },
            concentration: '1:1000',
            route: 'IM_lateral_thigh',
            repeat: '5-15_min_if_needed',
            transport: 'always_monitor_biphasic_reaction'
        }
    },

    // ============================================
    // DECISION MAKING FRAMEWORK
    // ============================================

    clinical_decision_making: {
        load_and_go_criteria: [
            'airway_compromised',
            'inadequate_breathing',
            'shock',
            'altered_mental_status',
            'time_sensitive_condition' // STEMI, stroke, trauma
        ],

        stay_and_play_appropriate: [
            'stable_patient',
            'critical_intervention_needed_before_transport',
            'long_transport_time_requires_stabilization'
        ],

        transport_destination: {
            trauma_center_criteria: [
                'gcs_less_than_14',
                'sbp_less_than_90',
                'respiratory_rate_abnormal',
                'penetrating_trauma_torso_head_neck',
                'flail_chest',
                'two_or_more_proximal_long_bone_fractures',
                'crushed_degloved_mangled_extremity',
                'amputation_proximal_to_wrist_ankle',
                'pelvic_fracture',
                'open_depressed_skull_fracture',
                'paralysis'
            ],

            stemi_center: [
                'st_elevation_on_12_lead',
                'symptom_onset_within_12_hours'
            ],

            stroke_center: [
                'suspected_stroke_within_window',
                'positive_cincinnati_stroke_scale'
            ]
        },

        refusal_criteria: {
            patient_can_refuse_if: [
                'decision_making_capacity',
                'understands_risks',
                'not_altered',
                'not_intoxicated',
                'not_threat_to_self_or_others'
            ],
            document: [
                'full_assessment_performed',
                'risks_explained',
                'patient_verbalized_understanding',
                'encouraged_to_call_back_if_worsens'
            ]
        }
    },

    // ============================================
    // REALISTIC COMPLICATIONS
    // ============================================

    complications: {
        cpr_complications: {
            expected: ['rib_fractures', 'sternum_fracture', 'bruising'],
            serious: ['pneumothorax', 'liver_laceration', 'gastric_distention'],
            when_to_continue: 'benefits_outweigh_risks'
        },

        iv_complications: {
            immediate: ['hematoma', 'arterial_stick', 'nerve_damage'],
            delayed: ['infiltration', 'phlebitis', 'infection'],
            prevention: 'proper_technique_and_monitoring'
        },

        medication_errors: {
            types: ['wrong_dose', 'wrong_route', 'wrong_patient', 'wrong_drug', 'wrong_time'],
            prevention: 'five_rights_check',
            if_occurs: 'immediate_disclosure_and_treatment'
        }
    },

    // Helper function to get protocol by condition
    getProtocol(condition) {
        const protocols = {
            'cardiac_arrest': this.cardiac_arrest,
            'trauma': this.trauma,
            'primary_assessment': this.primaryAssessment
        };
        return protocols[condition] || null;
    },

    // Validate treatment choice
    validateTreatment(condition, treatment, patientState) {
        const protocol = this.getProtocol(condition);
        if (!protocol) return { valid: false, reason: 'Unknown condition' };

        // Check contraindications for medications
        if (this.medications[treatment]) {
            const med = this.medications[treatment];
            if (med.contraindications) {
                for (const contraindication of med.contraindications) {
                    if (patientState[contraindication]) {
                        return {
                            valid: false,
                            reason: `Contraindicated: ${contraindication}`,
                            severity: 'critical'
                        };
                    }
                }
            }
        }

        return { valid: true };
    },

    // Calculate appropriate medication dose
    calculateDose(medication, patientWeight, age) {
        const med = this.medications[medication];
        if (!med) return null;

        const dose = {
            medication: medication,
            amount: 0,
            unit: med.dose.unit,
            route: med.route
        };

        // Pediatric dosing
        if (age < 18 && med.dose.child) {
            if (med.dose.child.dose_per_kg) {
                dose.amount = patientWeight * med.dose.child.dose_per_kg;
                if (med.dose.child.max) {
                    dose.amount = Math.min(dose.amount, med.dose.child.max);
                }
            } else {
                dose.amount = med.dose.child.amount || med.dose.child;
            }
        } else {
            // Adult dosing
            dose.amount = med.dose.adult.amount || med.dose.adult;
        }

        return dose;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedicalProtocols;
}
