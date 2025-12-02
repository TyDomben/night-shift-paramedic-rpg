// Night Shift - Enhanced Skill Check System
// Meaningful pass/fail with real consequences

const SkillCheckSystem = {
    // Difficulty calibration
    difficulties: {
        trivial: 4,      // 95% success for trained paramedic
        easy: 7,         // 80% success
        medium: 10,      // 60% success
        challenging: 12, // 40% success
        hard: 14,        // 25% success
        very_hard: 16,   // 15% success
        legendary: 18    // 5% success
    },

    // Success tiers based on margin
    getSuccessTier(margin) {
        if (margin >= 10) return 'critical_success';
        if (margin >= 5) return 'success';
        if (margin >= 0) return 'marginal_success';
        if (margin >= -5) return 'marginal_failure';
        if (margin >= -10) return 'failure';
        return 'critical_failure';
    },

    // Perform skill check with consequences
    performCheck(character, skillId, difficulty, context = {}) {
        const skillValue = CharacterSystem.getSkillValue(character, skillId);
        const roll = Utils.rollDice('1d20');

        // Apply modifiers
        let totalMod = context.modifiers || 0;

        // Partner modifier
        if (context.partner) {
            totalMod += PartnerSystem.getPartnerModifier(context.partner, skillId);
        }

        // Equipment modifier
        if (context.equipment) {
            totalMod += this.getEquipmentModifier(character, context.equipment);
        }

        // Stress penalty (realistic - high stress degrades performance)
        if (character.stress > 70) {
            totalMod -= Math.floor((character.stress - 70) / 10);
        }

        // Fatigue penalty
        if (character.energy < 30) {
            totalMod -= Math.floor((30 - character.energy) / 15);
        }

        // Mental state modifiers
        const stateModifiers = CharacterSystem.getMentalStateModifiers(character.mentalState);
        if (stateModifiers[skillId]) {
            totalMod += stateModifiers[skillId];
        }

        // Calculate result
        const targetNumber = skillValue + totalMod;
        const margin = targetNumber - (difficulty + (20 - roll));
        const tier = this.getSuccessTier(margin);

        const result = {
            skill: skillId,
            skillValue: skillValue,
            roll: roll,
            modifiers: totalMod,
            targetNumber: targetNumber,
            difficulty: difficulty,
            margin: margin,
            tier: tier,
            success: margin >= 0,
            breakdown: {
                baseSkill: skillValue,
                roll: roll,
                modifiers: totalMod,
                stressPenalty: character.stress > 70 ? -Math.floor((character.stress - 70) / 10) : 0,
                fatiguePenalty: character.energy < 30 ? -Math.floor((30 - character.energy) / 15) : 0
            }
        };

        // Apply consequences based on tier
        result.consequences = this.getConsequences(tier, context);

        return result;
    },

    // Get equipment modifier
    getEquipmentModifier(character, requiredEquipment) {
        let modifier = 0;

        for (const item of requiredEquipment) {
            const category = this.getEquipmentCategory(item);
            const quantity = character.equipment[category]?.[item] || 0;

            if (quantity > 0) {
                modifier += 2; // Have the right tool
            } else {
                modifier -= 4; // Missing critical equipment
            }
        }

        return modifier;
    },

    getEquipmentCategory(item) {
        const categories = {
            medical: ['gloves', 'bandages', 'gauze', 'splints', 'cervical_collars', 'burn_sheets'],
            medications: ['epinephrine', 'narcan', 'aspirin', 'nitroglycerin', 'albuterol', 'glucose'],
            equipment: ['defibrillator', 'pulse_oximeter', 'blood_pressure_cuff', 'stethoscope', 'suction_unit']
        };

        for (const category in categories) {
            if (categories[category].includes(item)) return category;
        }
        return 'medical';
    },

    // Get consequences based on success tier
    getConsequences(tier, context) {
        const consequences = {
            critical_success: {
                description: 'Exceptional performance',
                effects: {
                    timeBonus: true,
                    stressReduction: 2,
                    patientStabilityBonus: 2,
                    xpBonus: 1.5
                }
            },
            success: {
                description: 'Competent execution',
                effects: {
                    patientStabilityBonus: 1,
                    xpBonus: 1.0
                }
            },
            marginal_success: {
                description: 'Barely adequate - complications possible',
                effects: {
                    complicationRisk: 0.3,
                    timeDelay: 'minor',
                    patientStabilityBonus: 0
                }
            },
            marginal_failure: {
                description: 'Suboptimal attempt - patient condition worsens slightly',
                effects: {
                    patientDeteriorates: 1,
                    complicationRisk: 0.6,
                    stressIncrease: 3,
                    retryPossible: true,
                    timeDelay: 'moderate'
                }
            },
            failure: {
                description: 'Failed attempt - significant consequences',
                effects: {
                    patientDeteriorates: 2,
                    complicationRisk: 0.8,
                    stressIncrease: 8,
                    equipmentWasted: true,
                    retryPossible: true,
                    timeDelay: 'major'
                }
            },
            critical_failure: {
                description: 'Catastrophic error',
                effects: {
                    patientDeteriorates: 4,
                    complication: 'guaranteed',
                    stressIncrease: 15,
                    equipmentWasted: true,
                    retryPossible: false, // Too much damage done
                    timeDelay: 'critical',
                    injuryRisk: context.dangerous ? 0.4 : 0
                }
            }
        };

        return consequences[tier];
    },

    // Contested check (e.g., de-escalating a violent patient)
    contestedCheck(character, skillId, opposedDifficulty, context = {}) {
        const playerCheck = this.performCheck(character, skillId, opposedDifficulty, context);

        // Determine if opposition succeeds
        const oppositionRoll = Utils.rollDice('1d20');
        const oppositionSucceeds = oppositionRoll > (20 - opposedDifficulty);

        playerCheck.contested = true;
        playerCheck.oppositionRoll = oppositionRoll;
        playerCheck.oppositionSucceeds = oppositionSucceeds;

        // Player must succeed AND beat opposition
        playerCheck.finalSuccess = playerCheck.success && !oppositionSucceeds;

        if (!playerCheck.finalSuccess && context.violenceRisk) {
            playerCheck.consequences.violence = true;
        }

        return playerCheck;
    },

    // Time-critical check (e.g., CPR, bleeding control)
    timeCriticalCheck(character, skillId, difficulty, timeRemaining, context = {}) {
        const check = this.performCheck(character, skillId, difficulty, context);

        // Time pressure increases difficulty
        if (timeRemaining < 5) {
            check.modifiers -= 4;
            check.description = 'CRITICAL TIME PRESSURE';
        } else if (timeRemaining < 10) {
            check.modifiers -= 2;
            check.description = 'Time pressure';
        }

        // Recalculate with time modifier
        check.margin = check.targetNumber - check.modifiers - (check.difficulty + (20 - check.roll));
        check.tier = this.getSuccessTier(check.margin);
        check.success = check.margin >= 0;

        // Time consequences
        check.timeConsequences = {
            timeSpent: check.success ?
                (check.tier === 'critical_success' ? 0.5 : 1.0) :
                (check.tier === 'critical_failure' ? 3.0 : 2.0),
            patientDeterioratesDuringAttempt: !check.success
        };

        return check;
    },

    // Group skill check (multiple checks needed for complex procedures)
    groupCheck(character, skillChecks, context = {}) {
        const results = {
            checks: [],
            overallSuccess: true,
            criticalFailures: 0,
            failures: 0,
            successes: 0
        };

        for (const checkData of skillChecks) {
            const result = this.performCheck(
                character,
                checkData.skill,
                checkData.difficulty,
                { ...context, ...checkData.context }
            );

            results.checks.push(result);

            if (result.tier === 'critical_failure') {
                results.criticalFailures++;
                results.overallSuccess = false; // One critical failure dooms the whole procedure
            } else if (!result.success) {
                results.failures++;
            } else {
                results.successes++;
            }
        }

        // Overall success requires majority success and no critical failures
        results.overallSuccess = results.overallSuccess &&
            (results.successes > results.failures);

        // Calculate compound consequences
        results.consequences = this.calculateCompoundConsequences(results);

        return results;
    },

    calculateCompoundConsequences(groupResults) {
        const consequences = {
            patientStability: 0,
            stressIncrease: 0,
            timeSpent: 0,
            complications: []
        };

        for (const check of groupResults.checks) {
            const checkConsequences = check.consequences.effects;

            if (checkConsequences.patientStabilityBonus) {
                consequences.patientStability += checkConsequences.patientStabilityBonus;
            }
            if (checkConsequences.patientDeteriorates) {
                consequences.patientStability -= checkConsequences.patientDeteriorates;
            }
            if (checkConsequences.stressIncrease) {
                consequences.stressIncrease += checkConsequences.stressIncrease;
            }

            // Complications accumulate
            if (checkConsequences.complicationRisk) {
                if (Math.random() < checkConsequences.complicationRisk) {
                    consequences.complications.push(this.generateComplication(check.skill));
                }
            }
            if (checkConsequences.complication === 'guaranteed') {
                consequences.complications.push(this.generateComplication(check.skill));
            }
        }

        return consequences;
    },

    // Generate realistic complications from failed checks
    generateComplication(skillId) {
        const complications = {
            cardiology: [
                'Rib fracture from compressions',
                'Gastric distention from over-ventilation',
                'Delay in defibrillation',
                'Medication error'
            ],
            airway_management: [
                'Esophageal intubation',
                'Vomiting during intubation',
                'Broken tooth',
                'Hypoxia during attempt',
                'Laryngospasm'
            ],
            trauma_assessment: [
                'Missed internal bleeding',
                'Inadequate spinal precautions',
                'Missed secondary injuries',
                'Tourniquet too loose'
            ],
            pharmacology: [
                'Wrong dose calculated',
                'Infiltrated IV',
                'Drug-drug interaction',
                'Allergic reaction'
            ],
            dexterity: [
                'Multiple IV attempts needed',
                'Hematoma at IV site',
                'Lost IV access',
                'Contaminated equipment'
            ],
            de_escalation: [
                'Patient becomes more agitated',
                'Physical altercation',
                'Patient refuses treatment',
                'Safety threat'
            ]
        };

        const skillComplications = complications[skillId] || [
            'Procedure delayed',
            'Equipment malfunction',
            'Patient comfort compromised'
        ];

        return skillComplications[Math.floor(Math.random() * skillComplications.length)];
    },

    // Check if retry is possible and calculate new difficulty
    canRetry(previousCheck, context = {}) {
        // Some critical failures can't be retried
        if (previousCheck.tier === 'critical_failure' &&
            !previousCheck.consequences.effects.retryPossible) {
            return {
                canRetry: false,
                reason: 'Damage done - retry would worsen condition'
            };
        }

        // Time limits may prevent retry
        if (context.timeRemaining !== undefined && context.timeRemaining < 2) {
            return {
                canRetry: false,
                reason: 'Insufficient time for another attempt'
            };
        }

        // Equipment may be exhausted
        if (previousCheck.consequences.effects.equipmentWasted && !context.hasBackup) {
            return {
                canRetry: false,
                reason: 'Equipment depleted'
            };
        }

        // Retry is harder (patient is more unstable, you're more stressed)
        return {
            canRetry: true,
            difficultyIncrease: 2,
            stressIncrease: 3,
            reason: 'Retry possible but more difficult'
        };
    },

    // Format check result for display
    formatResult(check) {
        const tierDescriptions = {
            critical_success: '**CRITICAL SUCCESS**',
            success: 'Success',
            marginal_success: 'Marginal Success',
            marginal_failure: 'Marginal Failure',
            failure: 'Failure',
            critical_failure: '**CRITICAL FAILURE**'
        };

        let display = `${tierDescriptions[check.tier]}\n`;
        display += `${Utils.snakeToTitle(check.skill)}: ${check.targetNumber} vs DC ${check.difficulty}\n`;
        display += `Roll: ${check.roll} (Margin: ${check.margin > 0 ? '+' : ''}${check.margin})\n`;

        if (check.breakdown) {
            display += `\nBreakdown:\n`;
            display += `- Base Skill: ${check.breakdown.baseSkill}\n`;
            display += `- Modifiers: ${check.breakdown.modifiers}\n`;
            if (check.breakdown.stressPenalty < 0) {
                display += `- Stress Penalty: ${check.breakdown.stressPenalty}\n`;
            }
            if (check.breakdown.fatiguePenalty < 0) {
                display += `- Fatigue Penalty: ${check.breakdown.fatiguePenalty}\n`;
            }
        }

        display += `\n${check.consequences.description}`;

        return display;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillCheckSystem;
}
