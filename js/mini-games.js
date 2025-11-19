// Night Shift - Medical Procedure Mini-Games
// Interactive skill-based mini-games for medical procedures

const MiniGames = {
    // Current mini-game state
    active: null,
    canvas: null,
    ctx: null,
    animationFrame: null,

    // ============================================
    // CPR RHYTHM GAME
    // Keep compressions at the right rate and depth
    // ============================================

    cpr: {
        name: 'CPR',
        description: 'Maintain compressions at 100-120 BPM with proper depth',

        // Game state
        state: {
            compressions: 0,
            goodCompressions: 0,
            lastCompressionTime: 0,
            currentDepth: 0,
            bpm: 0,
            timeElapsed: 0,
            targetZone: { min: 100, max: 120 }, // BPM
            depthZone: { min: 2, max: 2.4 }, // inches
            rhythm: [],
            feedback: '',
            score: 0,
            phase: 'ready' // ready, active, rest, complete
        },

        // Initialize the mini-game
        init(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.state = {
                compressions: 0,
                goodCompressions: 0,
                lastCompressionTime: 0,
                currentDepth: 0,
                bpm: 0,
                timeElapsed: 0,
                targetZone: { min: 100, max: 120 },
                depthZone: { min: 2, max: 2.4 },
                rhythm: [],
                feedback: '',
                score: 0,
                phase: 'ready'
            };
        },

        // Handle compression input (spacebar or click)
        compress(holdTime) {
            const now = Date.now();

            if (this.state.phase !== 'active') return;

            // Calculate depth based on hold time (100-400ms = good)
            const depth = Math.min(3, holdTime / 150); // inches
            this.state.currentDepth = depth;

            // Calculate BPM from interval
            if (this.state.lastCompressionTime > 0) {
                const interval = now - this.state.lastCompressionTime;
                this.state.bpm = Math.round(60000 / interval);
            }

            // Record this compression
            this.state.rhythm.push({
                time: now,
                depth: depth,
                bpm: this.state.bpm
            });

            // Check if it's a good compression
            const goodRate = this.state.bpm >= this.state.targetZone.min &&
                this.state.bpm <= this.state.targetZone.max;
            const goodDepth = depth >= this.state.depthZone.min &&
                depth <= this.state.depthZone.max;

            if (goodRate && goodDepth) {
                this.state.goodCompressions++;
                this.state.feedback = 'Good!';
            } else if (!goodRate && this.state.bpm > 0) {
                this.state.feedback = this.state.bpm < this.state.targetZone.min ? 'Faster!' : 'Slower!';
            } else if (!goodDepth) {
                this.state.feedback = depth < this.state.depthZone.min ? 'Push harder!' : 'Too deep!';
            }

            this.state.compressions++;
            this.state.lastCompressionTime = now;
        },

        // Start the mini-game
        start(duration = 30000) {
            this.state.phase = 'active';
            this.state.timeElapsed = 0;
            this.state.startTime = Date.now();
            this.duration = duration;

            // Start game loop
            this.gameLoop();
        },

        // Main game loop
        gameLoop() {
            if (this.state.phase !== 'active') return;

            const now = Date.now();
            this.state.timeElapsed = now - this.state.startTime;

            // Check for completion
            if (this.state.timeElapsed >= this.duration) {
                this.complete();
                return;
            }

            // Render
            this.render();

            // Continue loop
            requestAnimationFrame(() => this.gameLoop());
        },

        // Render the game
        render() {
            const ctx = this.ctx;
            const width = this.canvas.width;
            const height = this.canvas.height;

            // Clear
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, width, height);

            // Draw BPM meter
            this.drawBPMMeter(ctx, width / 2, 80, 150);

            // Draw depth indicator
            this.drawDepthIndicator(ctx, width - 60, height / 2, 80);

            // Draw rhythm visualization
            this.drawRhythm(ctx, 50, height - 100, width - 100, 60);

            // Draw stats
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '16px monospace';
            ctx.fillText(`Compressions: ${this.state.compressions}`, 20, 30);
            ctx.fillText(`Good: ${this.state.goodCompressions}`, 20, 50);
            ctx.fillText(`Time: ${Math.ceil((this.duration - this.state.timeElapsed) / 1000)}s`, 20, 70);

            // Draw feedback
            if (this.state.feedback) {
                ctx.font = '24px sans-serif';
                ctx.fillStyle = this.state.feedback === 'Good!' ? '#4a9a5a' : '#c44556';
                ctx.textAlign = 'center';
                ctx.fillText(this.state.feedback, width / 2, height / 2);
                ctx.textAlign = 'left';
            }

            // Draw instructions
            ctx.fillStyle = '#606060';
            ctx.font = '14px sans-serif';
            ctx.fillText('Press and HOLD Space/Click to compress', 20, height - 20);
        },

        // Draw BPM meter (circular gauge)
        drawBPMMeter(ctx, x, y, radius) {
            // Background arc
            ctx.beginPath();
            ctx.arc(x, y, radius, Math.PI * 0.75, Math.PI * 2.25);
            ctx.strokeStyle = '#2a2a3a';
            ctx.lineWidth = 20;
            ctx.stroke();

            // Target zone
            const minAngle = Math.PI * 0.75 + (this.state.targetZone.min / 200) * Math.PI * 1.5;
            const maxAngle = Math.PI * 0.75 + (this.state.targetZone.max / 200) * Math.PI * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, radius, minAngle, maxAngle);
            ctx.strokeStyle = '#2a5a3a';
            ctx.stroke();

            // Current BPM indicator
            if (this.state.bpm > 0) {
                const bpmAngle = Math.PI * 0.75 + (Math.min(200, this.state.bpm) / 200) * Math.PI * 1.5;
                ctx.beginPath();
                ctx.arc(x, y, radius - 15, bpmAngle - 0.1, bpmAngle + 0.1);
                ctx.strokeStyle = '#c44556';
                ctx.lineWidth = 10;
                ctx.stroke();
            }

            // BPM text
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '32px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.state.bpm || '--', x, y + 10);
            ctx.font = '14px sans-serif';
            ctx.fillText('BPM', x, y + 30);
            ctx.textAlign = 'left';
        },

        // Draw depth indicator (vertical bar)
        drawDepthIndicator(ctx, x, y, height) {
            const barWidth = 30;

            // Background
            ctx.fillStyle = '#2a2a3a';
            ctx.fillRect(x - barWidth / 2, y - height / 2, barWidth, height);

            // Target zone
            const targetTop = y - height / 2 + (height * (1 - this.state.depthZone.max / 3));
            const targetHeight = height * (this.state.depthZone.max - this.state.depthZone.min) / 3;
            ctx.fillStyle = '#2a5a3a';
            ctx.fillRect(x - barWidth / 2, targetTop, barWidth, targetHeight);

            // Current depth
            const depthY = y - height / 2 + (height * (1 - this.state.currentDepth / 3));
            ctx.fillStyle = '#c44556';
            ctx.fillRect(x - barWidth / 2 - 5, depthY - 3, barWidth + 10, 6);

            // Label
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Depth', x, y + height / 2 + 20);
            ctx.textAlign = 'left';
        },

        // Draw rhythm visualization
        drawRhythm(ctx, x, y, width, height) {
            // Background
            ctx.fillStyle = '#1e1e2e';
            ctx.fillRect(x, y, width, height);

            // Draw recent compressions as bars
            const recent = this.state.rhythm.slice(-20);
            const barWidth = width / 20;

            recent.forEach((comp, i) => {
                const barHeight = (comp.depth / 3) * height;
                const barX = x + i * barWidth;
                const barY = y + height - barHeight;

                // Color based on quality
                const goodRate = comp.bpm >= this.state.targetZone.min && comp.bpm <= this.state.targetZone.max;
                const goodDepth = comp.depth >= this.state.depthZone.min && comp.depth <= this.state.depthZone.max;

                if (goodRate && goodDepth) {
                    ctx.fillStyle = '#4a9a5a';
                } else {
                    ctx.fillStyle = '#8b5a35';
                }

                ctx.fillRect(barX + 2, barY, barWidth - 4, barHeight);
            });
        },

        // Complete the mini-game
        complete() {
            this.state.phase = 'complete';

            // Calculate final score
            const compressionScore = this.state.compressions > 0 ?
                (this.state.goodCompressions / this.state.compressions) * 100 : 0;

            this.state.score = Math.round(compressionScore);

            return {
                success: compressionScore >= 70,
                score: this.state.score,
                compressions: this.state.compressions,
                goodCompressions: this.state.goodCompressions,
                averageBPM: this.calculateAverageBPM()
            };
        },

        calculateAverageBPM() {
            if (this.state.rhythm.length < 2) return 0;
            const bpms = this.state.rhythm.slice(1).map(r => r.bpm);
            return Math.round(bpms.reduce((a, b) => a + b, 0) / bpms.length);
        }
    },

    // ============================================
    // IV PLACEMENT MINI-GAME
    // Find the vein and insert the needle correctly
    // ============================================

    iv: {
        name: 'IV Placement',
        description: 'Find a suitable vein and insert the needle at the correct angle',

        state: {
            phase: 'searching', // searching, inserting, complete
            veins: [],
            selectedVein: null,
            needlePosition: { x: 0, y: 0 },
            needleAngle: 15,
            insertionProgress: 0,
            flashback: false,
            score: 0,
            feedback: ''
        },

        init(canvas, difficulty = 'normal') {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');

            // Generate veins based on difficulty
            const veinCount = difficulty === 'easy' ? 5 : difficulty === 'hard' ? 2 : 3;
            this.state.veins = this.generateVeins(veinCount, difficulty);
            this.state.phase = 'searching';
            this.state.selectedVein = null;
            this.state.insertionProgress = 0;
            this.state.flashback = false;
        },

        generateVeins(count, difficulty) {
            const veins = [];
            const canvas = this.canvas;

            for (let i = 0; i < count; i++) {
                // Vein path (curved line)
                const startX = 50 + Math.random() * (canvas.width - 100);
                const startY = 50 + Math.random() * (canvas.height - 100);

                const vein = {
                    id: i,
                    path: [
                        { x: startX, y: startY },
                        { x: startX + (Math.random() - 0.5) * 100, y: startY + 50 + Math.random() * 30 },
                        { x: startX + (Math.random() - 0.5) * 80, y: startY + 100 + Math.random() * 30 }
                    ],
                    visibility: difficulty === 'easy' ? 0.8 : difficulty === 'hard' ? 0.3 : 0.5,
                    size: 3 + Math.random() * 4,
                    quality: Math.random(), // How good this vein is (0-1)
                    depth: 2 + Math.random() * 3 // mm under skin
                };

                veins.push(vein);
            }

            return veins;
        },

        // Mouse move handler
        onMouseMove(x, y) {
            this.state.needlePosition = { x, y };

            if (this.state.phase === 'searching') {
                // Check if over a vein
                this.state.selectedVein = this.findVeinAtPosition(x, y);
            }
        },

        // Find vein at position
        findVeinAtPosition(x, y) {
            for (const vein of this.state.veins) {
                for (const point of vein.path) {
                    const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
                    if (dist < vein.size + 10) {
                        return vein;
                    }
                }
            }
            return null;
        },

        // Adjust needle angle
        adjustAngle(delta) {
            this.state.needleAngle = Math.max(5, Math.min(45, this.state.needleAngle + delta));
        },

        // Start insertion
        startInsertion() {
            if (!this.state.selectedVein || this.state.phase !== 'searching') return;

            this.state.phase = 'inserting';
            this.state.insertionProgress = 0;
        },

        // Progress insertion (called while holding)
        progressInsertion(delta) {
            if (this.state.phase !== 'inserting') return;

            this.state.insertionProgress += delta;

            // Check for flashback (hit the vein)
            const targetProgress = this.state.selectedVein.depth * 10; // Simplified
            const tolerance = 5;

            if (Math.abs(this.state.insertionProgress - targetProgress) < tolerance) {
                // Good angle check
                const idealAngle = 15 + this.state.selectedVein.depth;
                const angleDiff = Math.abs(this.state.needleAngle - idealAngle);

                if (angleDiff < 10) {
                    this.state.flashback = true;
                    this.state.feedback = 'Flash! You\'re in!';
                }
            }

            // Too deep
            if (this.state.insertionProgress > targetProgress + 15) {
                this.state.feedback = 'Too deep - through and through!';
                this.complete(false);
            }
        },

        // Stop insertion and check result
        stopInsertion() {
            if (this.state.flashback) {
                this.complete(true);
            } else if (this.state.insertionProgress > 0) {
                this.state.feedback = 'Missed the vein. Try again.';
                this.state.phase = 'searching';
                this.state.insertionProgress = 0;
            }
        },

        // Render the game
        render() {
            const ctx = this.ctx;
            const width = this.canvas.width;
            const height = this.canvas.height;

            // Draw skin background
            ctx.fillStyle = '#d4a574';
            ctx.fillRect(0, 0, width, height);

            // Draw veins
            for (const vein of this.state.veins) {
                ctx.beginPath();
                ctx.moveTo(vein.path[0].x, vein.path[0].y);

                for (let i = 1; i < vein.path.length; i++) {
                    ctx.lineTo(vein.path[i].x, vein.path[i].y);
                }

                ctx.strokeStyle = `rgba(50, 80, 120, ${vein.visibility})`;
                ctx.lineWidth = vein.size;
                ctx.stroke();

                // Highlight selected vein
                if (vein === this.state.selectedVein) {
                    ctx.strokeStyle = 'rgba(74, 122, 171, 0.5)';
                    ctx.lineWidth = vein.size + 6;
                    ctx.stroke();
                }
            }

            // Draw needle
            this.drawNeedle(ctx);

            // Draw UI
            ctx.fillStyle = '#1e1e2e';
            ctx.fillRect(0, height - 60, width, 60);

            ctx.fillStyle = '#e0e0e0';
            ctx.font = '14px sans-serif';
            ctx.fillText(`Angle: ${this.state.needleAngle}° (↑/↓ to adjust)`, 20, height - 35);
            ctx.fillText(this.state.feedback, 20, height - 15);

            if (this.state.flashback) {
                ctx.fillStyle = '#c44556';
                ctx.font = '20px sans-serif';
                ctx.fillText('FLASHBACK!', width / 2 - 50, 30);
            }
        },

        drawNeedle(ctx) {
            const pos = this.state.needlePosition;
            const angle = this.state.needleAngle * Math.PI / 180;
            const length = 60 + this.state.insertionProgress;

            // Needle body
            ctx.save();
            ctx.translate(pos.x, pos.y);
            ctx.rotate(-angle);

            ctx.fillStyle = '#c0c0c0';
            ctx.fillRect(0, -2, length, 4);

            // Needle tip
            ctx.beginPath();
            ctx.moveTo(length, -3);
            ctx.lineTo(length + 10, 0);
            ctx.lineTo(length, 3);
            ctx.fillStyle = '#a0a0a0';
            ctx.fill();

            ctx.restore();
        },

        complete(success) {
            this.state.phase = 'complete';
            this.state.score = success ? 100 : 0;

            if (success && this.state.selectedVein) {
                // Bonus for vein quality
                this.state.score = Math.round(50 + this.state.selectedVein.quality * 50);
            }

            return {
                success,
                score: this.state.score,
                veinQuality: this.state.selectedVein?.quality || 0
            };
        }
    },

    // ============================================
    // DEFIBRILLATION TIMING GAME
    // Analyze rhythm and shock at the right moment
    // ============================================

    defibrillator: {
        name: 'Defibrillation',
        description: 'Analyze the rhythm and deliver shock at the optimal moment',

        state: {
            phase: 'analyzing', // analyzing, ready, charging, shocking, complete
            rhythm: 'vfib', // vfib, vtach, asystole, sinus
            ecgData: [],
            analyzeProgress: 0,
            chargeLevel: 0,
            shockDelivered: false,
            timing: 0, // How well-timed the shock was
            score: 0,
            feedback: ''
        },

        init(canvas, rhythm = 'vfib') {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.state.rhythm = rhythm;
            this.state.ecgData = this.generateECG(rhythm);
            this.state.phase = 'analyzing';
            this.state.analyzeProgress = 0;
            this.state.chargeLevel = 0;
        },

        generateECG(rhythm) {
            const data = [];
            const length = 200;

            for (let i = 0; i < length; i++) {
                let value;

                switch (rhythm) {
                    case 'vfib':
                        // Chaotic, irregular
                        value = Math.sin(i * 0.3) * 20 + Math.random() * 40 - 20;
                        break;
                    case 'vtach':
                        // Regular wide complexes
                        value = Math.sin(i * 0.5) * 50;
                        break;
                    case 'asystole':
                        // Flatline with noise
                        value = Math.random() * 5 - 2.5;
                        break;
                    case 'sinus':
                        // Normal rhythm
                        const phase = i % 30;
                        if (phase < 5) value = phase * 10;
                        else if (phase < 10) value = 50 - phase * 10;
                        else value = Math.sin(i * 0.1) * 5;
                        break;
                    default:
                        value = 0;
                }

                data.push(value);
            }

            return data;
        },

        // Progress the analysis
        analyze(delta) {
            if (this.state.phase !== 'analyzing') return;

            this.state.analyzeProgress += delta;

            if (this.state.analyzeProgress >= 100) {
                this.state.phase = 'ready';

                // Determine if shockable
                const shockable = this.state.rhythm === 'vfib' || this.state.rhythm === 'vtach';
                this.state.feedback = shockable ? 'Shock advised!' : 'No shock advised';
            }
        },

        // Start charging
        startCharge() {
            if (this.state.phase !== 'ready') return;

            const shockable = this.state.rhythm === 'vfib' || this.state.rhythm === 'vtach';
            if (!shockable) {
                this.state.feedback = 'No shock advised - do not charge!';
                return;
            }

            this.state.phase = 'charging';
            this.state.chargeLevel = 0;
        },

        // Progress charging
        charge(delta) {
            if (this.state.phase !== 'charging') return;

            this.state.chargeLevel += delta;

            if (this.state.chargeLevel >= 100) {
                this.state.chargeLevel = 100;
                this.state.feedback = 'Charged! Press shock when ready.';
            }
        },

        // Deliver shock
        shock() {
            if (this.state.phase !== 'charging' || this.state.chargeLevel < 100) {
                this.state.feedback = 'Not fully charged!';
                return;
            }

            this.state.phase = 'shocking';
            this.state.shockDelivered = true;

            // Calculate timing score based on ECG position
            // (Simplified - in reality you'd want to shock during refractory period)
            this.state.timing = 70 + Math.random() * 30;
            this.state.score = Math.round(this.state.timing);

            this.state.feedback = 'Shock delivered!';

            // Complete after brief delay
            setTimeout(() => this.complete(), 1000);
        },

        render() {
            const ctx = this.ctx;
            const width = this.canvas.width;
            const height = this.canvas.height;

            // Background
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, width, height);

            // Draw ECG
            this.drawECG(ctx, 0, 50, width, 150);

            // Draw status
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '16px monospace';

            const statusY = 220;
            ctx.fillText(`Phase: ${this.state.phase.toUpperCase()}`, 20, statusY);
            ctx.fillText(`Rhythm: ${this.state.rhythm.toUpperCase()}`, 20, statusY + 25);

            // Draw charge indicator
            if (this.state.phase === 'charging' || this.state.chargeLevel > 0) {
                ctx.fillStyle = '#2a2a3a';
                ctx.fillRect(20, statusY + 40, 200, 20);

                ctx.fillStyle = this.state.chargeLevel >= 100 ? '#c44556' : '#8b7a35';
                ctx.fillRect(20, statusY + 40, this.state.chargeLevel * 2, 20);

                ctx.fillStyle = '#e0e0e0';
                ctx.fillText(`${this.state.chargeLevel}%`, 230, statusY + 55);
            }

            // Feedback
            ctx.fillStyle = '#c44556';
            ctx.font = '18px sans-serif';
            ctx.fillText(this.state.feedback, 20, height - 30);

            // Instructions
            ctx.fillStyle = '#606060';
            ctx.font = '12px sans-serif';
            ctx.fillText('A: Analyze | C: Charge | S: Shock', 20, height - 10);
        },

        drawECG(ctx, x, y, width, height) {
            ctx.strokeStyle = '#4a9a5a';
            ctx.lineWidth = 2;
            ctx.beginPath();

            const dataLen = this.state.ecgData.length;
            const stepX = width / dataLen;

            for (let i = 0; i < dataLen; i++) {
                const px = x + i * stepX;
                const py = y + height / 2 - this.state.ecgData[i];

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }

            ctx.stroke();

            // Grid lines
            ctx.strokeStyle = '#1e1e2e';
            ctx.lineWidth = 1;

            for (let i = 0; i < 5; i++) {
                const gy = y + (height / 5) * i;
                ctx.beginPath();
                ctx.moveTo(x, gy);
                ctx.lineTo(x + width, gy);
                ctx.stroke();
            }
        },

        complete() {
            this.state.phase = 'complete';

            return {
                success: this.state.shockDelivered && (this.state.rhythm === 'vfib' || this.state.rhythm === 'vtach'),
                score: this.state.score,
                rhythm: this.state.rhythm,
                appropriate: this.state.shockDelivered === (this.state.rhythm === 'vfib' || this.state.rhythm === 'vtach')
            };
        }
    },

    // ============================================
    // MEDICATION DOSAGE CALCULATOR
    // Calculate correct dosage based on patient weight
    // ============================================

    medication: {
        name: 'Medication Dosage',
        description: 'Calculate the correct medication dose for the patient',

        state: {
            medication: null,
            patientWeight: 0,
            correctDose: 0,
            playerAnswer: '',
            attempts: 0,
            maxAttempts: 3,
            complete: false,
            success: false,
            feedback: ''
        },

        medications: {
            epinephrine: { name: 'Epinephrine', dose: 0.01, unit: 'mg/kg', max: 1, concentration: '1:10,000' },
            atropine: { name: 'Atropine', dose: 0.02, unit: 'mg/kg', max: 3, concentration: '0.1 mg/mL' },
            amiodarone: { name: 'Amiodarone', dose: 5, unit: 'mg/kg', max: 300, concentration: '50 mg/mL' },
            adenosine: { name: 'Adenosine', dose: 0.1, unit: 'mg/kg', max: 12, concentration: '3 mg/mL' },
            morphine: { name: 'Morphine', dose: 0.1, unit: 'mg/kg', max: 10, concentration: '10 mg/mL' }
        },

        init(medicationId = null, weight = null) {
            // Random medication if not specified
            if (!medicationId) {
                const meds = Object.keys(this.medications);
                medicationId = meds[Math.floor(Math.random() * meds.length)];
            }

            // Random weight if not specified (adult range)
            if (!weight) {
                weight = 50 + Math.floor(Math.random() * 60); // 50-110 kg
            }

            this.state.medication = this.medications[medicationId];
            this.state.patientWeight = weight;
            this.state.correctDose = Math.min(
                weight * this.state.medication.dose,
                this.state.medication.max
            );
            this.state.playerAnswer = '';
            this.state.attempts = 0;
            this.state.complete = false;
            this.state.success = false;
        },

        // Submit answer
        submitAnswer(answer) {
            const numAnswer = parseFloat(answer);

            if (isNaN(numAnswer)) {
                this.state.feedback = 'Please enter a valid number';
                return false;
            }

            this.state.attempts++;
            this.state.playerAnswer = answer;

            // Check if within 10% tolerance
            const tolerance = this.state.correctDose * 0.1;
            const diff = Math.abs(numAnswer - this.state.correctDose);

            if (diff <= tolerance) {
                this.state.success = true;
                this.state.complete = true;
                this.state.feedback = `Correct! ${this.state.correctDose.toFixed(2)} mg`;
                return true;
            } else {
                if (this.state.attempts >= this.state.maxAttempts) {
                    this.state.complete = true;
                    this.state.feedback = `Incorrect. Correct dose: ${this.state.correctDose.toFixed(2)} mg`;
                } else {
                    const hint = numAnswer < this.state.correctDose ? 'Too low' : 'Too high';
                    this.state.feedback = `${hint}. ${this.state.maxAttempts - this.state.attempts} attempts remaining`;
                }
                return false;
            }
        },

        getPrompt() {
            return `Patient weight: ${this.state.patientWeight} kg
Medication: ${this.state.medication.name}
Dose: ${this.state.medication.dose} ${this.state.medication.unit}
Max dose: ${this.state.medication.max} mg

Calculate the dose in mg:`;
        },

        getResult() {
            return {
                success: this.state.success,
                score: this.state.success ? Math.max(100 - (this.state.attempts - 1) * 25, 25) : 0,
                correctDose: this.state.correctDose,
                attempts: this.state.attempts
            };
        }
    },

    // ============================================
    // MAIN INTERFACE
    // ============================================

    // Start a mini-game
    start(gameType, canvas, options = {}) {
        const game = this[gameType];
        if (!game) {
            console.error(`Mini-game not found: ${gameType}`);
            return false;
        }

        this.active = gameType;
        game.init(canvas, options.difficulty || 'normal');

        if (game.start) {
            game.start(options.duration);
        }

        return true;
    },

    // Get current game state
    getState() {
        if (!this.active) return null;
        return this[this.active].state;
    },

    // Render current game
    render() {
        if (!this.active) return;
        this[this.active].render();
    },

    // Handle input
    handleInput(type, data) {
        if (!this.active) return;

        const game = this[this.active];

        switch (type) {
            case 'compress':
                if (game.compress) game.compress(data.holdTime);
                break;
            case 'mouseMove':
                if (game.onMouseMove) game.onMouseMove(data.x, data.y);
                break;
            case 'click':
                if (game.startInsertion) game.startInsertion();
                break;
            case 'keyDown':
                if (data.key === 'ArrowUp' && game.adjustAngle) game.adjustAngle(1);
                if (data.key === 'ArrowDown' && game.adjustAngle) game.adjustAngle(-1);
                if (data.key === 'a' && game.analyze) game.analyze(10);
                if (data.key === 'c' && game.startCharge) game.startCharge();
                if (data.key === 's' && game.shock) game.shock();
                break;
        }
    },

    // Get result and end game
    getResult() {
        if (!this.active) return null;

        const game = this[this.active];
        let result;

        if (game.complete) {
            result = game.complete();
        } else if (game.getResult) {
            result = game.getResult();
        }

        this.active = null;
        return result;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MiniGames;
}
