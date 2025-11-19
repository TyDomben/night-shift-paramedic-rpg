// Night Shift - UI System

const UI = {
    // Cache DOM elements
    elements: {},

    // UI state
    state: {
        currentScreen: 'main-menu',
        activeModal: null,
        textSpeed: 30,
        isTyping: false
    },

    // Initialize UI
    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadOptions();
    },

    // Cache commonly used elements
    cacheElements() {
        this.elements = {
            // Screens
            mainMenu: document.getElementById('main-menu'),
            characterCreation: document.getElementById('character-creation'),
            gameScreen: document.getElementById('game-screen'),
            loadingScreen: document.getElementById('loading-screen'),

            // Menu buttons
            btnNewGame: document.getElementById('btn-new-game'),
            btnContinue: document.getElementById('btn-continue'),
            btnOptions: document.getElementById('btn-options'),
            btnCredits: document.getElementById('btn-credits'),
            btnBackMenu: document.getElementById('btn-back-menu'),
            btnStartGame: document.getElementById('btn-start-game'),

            // Character creation
            playerName: document.getElementById('player-name'),
            backgroundOptions: document.getElementById('background-options'),
            archetypeOptions: document.getElementById('archetype-options'),
            skillAllocation: document.getElementById('skill-allocation'),
            remainingPoints: document.getElementById('remaining-points'),

            // HUD
            hudName: document.getElementById('hud-name'),
            hudShift: document.getElementById('hud-shift'),
            hudTime: document.getElementById('hud-time'),
            hudDate: document.getElementById('hud-date'),
            stressFill: document.getElementById('stress-fill'),
            stressValue: document.getElementById('stress-value'),
            energyFill: document.getElementById('energy-fill'),
            energyValue: document.getElementById('energy-value'),

            // Game area
            sceneImage: document.getElementById('scene-image'),
            sceneDescription: document.getElementById('scene-description'),
            dialogueContainer: document.getElementById('dialogue-container'),
            speakerName: document.getElementById('speaker-name'),
            dialogueText: document.getElementById('dialogue-text'),
            dialogueChoices: document.getElementById('dialogue-choices'),
            dialogueContinue: document.getElementById('dialogue-continue'),
            skillCheckDisplay: document.getElementById('skill-check-display'),

            // Action buttons
            btnInventory: document.getElementById('btn-inventory'),
            btnCharacter: document.getElementById('btn-character'),
            btnPartner: document.getElementById('btn-partner'),
            btnMenuIngame: document.getElementById('btn-menu-ingame'),

            // Modals
            characterModal: document.getElementById('character-modal'),
            partnerModal: document.getElementById('partner-modal'),
            equipmentModal: document.getElementById('equipment-modal'),
            optionsModal: document.getElementById('options-modal'),
            ingameMenuModal: document.getElementById('ingame-menu-modal'),

            // Modal content
            characterSheetContent: document.getElementById('character-sheet-content'),
            partnerSheetContent: document.getElementById('partner-sheet-content'),
            partnerNameDisplay: document.getElementById('partner-name-display'),
            equipmentContent: document.getElementById('equipment-content'),

            // Options
            textSpeed: document.getElementById('text-speed'),
            autoSave: document.getElementById('auto-save'),
            contentWarnings: document.getElementById('content-warnings'),

            // Notifications
            notificationContainer: document.getElementById('notification-container')
        };
    },

    // Bind event listeners
    bindEvents() {
        // Menu buttons
        this.elements.btnNewGame?.addEventListener('click', () => Game.newGame());
        this.elements.btnContinue?.addEventListener('click', () => Game.continueGame());
        this.elements.btnOptions?.addEventListener('click', () => this.showModal('options'));
        this.elements.btnBackMenu?.addEventListener('click', () => this.showScreen('main-menu'));
        this.elements.btnStartGame?.addEventListener('click', () => Game.startGame());

        // In-game buttons
        this.elements.btnInventory?.addEventListener('click', () => this.showEquipment());
        this.elements.btnCharacter?.addEventListener('click', () => this.showCharacterSheet());
        this.elements.btnPartner?.addEventListener('click', () => this.showPartnerSheet());
        this.elements.btnMenuIngame?.addEventListener('click', () => this.showModal('ingame-menu'));

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Modal backdrop click to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
        });

        // In-game menu buttons
        document.getElementById('btn-save')?.addEventListener('click', () => Game.saveGame());
        document.getElementById('btn-load')?.addEventListener('click', () => Game.loadGame());
        document.getElementById('btn-options-ingame')?.addEventListener('click', () => this.showModal('options'));
        document.getElementById('btn-quit')?.addEventListener('click', () => Game.quitToMenu());

        // Dialogue continue click
        this.elements.dialogueContinue?.addEventListener('click', () => Game.continueDialogue());
        this.elements.dialogueText?.addEventListener('click', () => {
            if (this.state.isTyping) {
                this.skipTyping();
            } else if (!this.elements.dialogueContinue.classList.contains('hidden')) {
                Game.continueDialogue();
            }
        });

        // Options changes
        this.elements.textSpeed?.addEventListener('input', (e) => {
            this.state.textSpeed = 60 - (e.target.value * 10);
            this.saveOptions();
        });

        // Check for saved game
        if (Utils.hasSave('night_shift_save')) {
            this.elements.btnContinue.disabled = false;
        }
    },

    // Show a screen
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
            this.state.currentScreen = screenId;
        }
    },

    // Show a modal
    showModal(modalId) {
        const modal = document.getElementById(`${modalId}-modal`);
        if (modal) {
            modal.classList.remove('hidden');
            this.state.activeModal = modalId;
        }
    },

    // Close current modal
    closeModal() {
        if (this.state.activeModal) {
            const modal = document.getElementById(`${this.state.activeModal}-modal`);
            if (modal) {
                modal.classList.add('hidden');
            }
            this.state.activeModal = null;
        }
    },

    // Show notification
    showNotification(message, type = 'default', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        this.elements.notificationContainer.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, duration);

        // Play sound
        AudioSystem.playNotification(type);
    },

    // Update HUD
    updateHUD(gameState) {
        const char = gameState.character;
        if (!char) return;

        // Player info
        this.elements.hudName.textContent = char.name;
        this.elements.hudShift.textContent = `Shift ${char.shiftsCompleted + 1}`;

        // Time
        this.elements.hudTime.textContent = Utils.formatTime(gameState.time);
        this.elements.hudDate.textContent = Utils.getDayName(gameState.day);

        // Stress bar
        const stressPercent = char.stress;
        this.elements.stressFill.style.width = `${stressPercent}%`;
        this.elements.stressFill.style.backgroundColor = Utils.getStressColor(char.stress);
        this.elements.stressValue.textContent = Math.round(char.stress);

        // Energy bar
        const energyPercent = char.energy;
        this.elements.energyFill.style.width = `${energyPercent}%`;
        this.elements.energyFill.style.backgroundColor = Utils.getEnergyColor(char.energy);
        this.elements.energyValue.textContent = Math.round(char.energy);

        // Apply mental state CSS class
        const gameArea = document.getElementById('game-area');
        gameArea.className = '';
        if (char.mentalState !== 'normal') {
            const state = MentalHealthSystem.mentalStates[char.mentalState];
            if (state && state.cssClass) {
                gameArea.classList.add(state.cssClass);
            }
        }
    },

    // Set scene
    setScene(description, imageUrl = null) {
        this.elements.sceneDescription.textContent = description;

        if (imageUrl) {
            this.elements.sceneImage.style.backgroundImage = `url(${imageUrl})`;
        } else {
            this.elements.sceneImage.style.backgroundImage = 'none';
            this.elements.sceneImage.style.backgroundColor = 'var(--bg-tertiary)';
        }
    },

    // Display dialogue
    async displayDialogue(speaker, text, speakerInfo = null) {
        // Set speaker name
        if (speakerInfo) {
            this.elements.speakerName.textContent = speakerInfo.name;
            this.elements.speakerName.style.color = speakerInfo.color;
            this.elements.speakerName.style.fontStyle = speakerInfo.style;
            this.elements.speakerName.className = speakerInfo.isSkillVoice ? 'skill-voice' : '';
        } else {
            this.elements.speakerName.textContent = speaker;
        }

        // Clear choices and show continue prompt
        this.elements.dialogueChoices.innerHTML = '';
        this.elements.dialogueContinue.classList.add('hidden');

        // Type out text
        this.state.isTyping = true;
        await this.typeText(this.elements.dialogueText, text, this.state.textSpeed);
        this.state.isTyping = false;

        // Show continue prompt
        this.elements.dialogueContinue.classList.remove('hidden');
    },

    // Display choices
    displayChoices(choices, onSelect) {
        this.elements.dialogueChoices.innerHTML = '';
        this.elements.dialogueContinue.classList.add('hidden');

        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = `dialogue-choice ${choice.style || ''}`;

            if (!choice.available) {
                button.classList.add('locked');
            }

            let choiceText = choice.text;

            // Add skill requirement display
            if (choice.skillRequirement) {
                const skillName = Utils.snakeToTitle(choice.skillRequirement.skill);
                choiceText += ` <span class="skill-requirement">[${skillName} ${choice.skillRequirement.minimum}]</span>`;
            }

            // Add skill check indicator
            if (choice.skillCheck) {
                const skillName = Utils.snakeToTitle(choice.skillCheck.skill);
                const difficulty = choice.skillCheck.difficulty;
                choiceText += ` <span class="skill-requirement">[${skillName} - ${this.getDifficultyName(difficulty)}]</span>`;
            }

            button.innerHTML = choiceText;

            if (choice.available) {
                button.addEventListener('click', () => onSelect(choice, index));
            }

            this.elements.dialogueChoices.appendChild(button);
        });
    },

    // Get difficulty name
    getDifficultyName(difficulty) {
        if (difficulty <= 6) return 'Trivial';
        if (difficulty <= 8) return 'Easy';
        if (difficulty <= 10) return 'Medium';
        if (difficulty <= 12) return 'Challenging';
        if (difficulty <= 14) return 'Hard';
        return 'Legendary';
    },

    // Display skill check result
    async displaySkillCheck(checkResult) {
        const display = this.elements.skillCheckDisplay;
        display.classList.remove('hidden');

        document.getElementById('skill-check-name').textContent = checkResult.skillName;
        document.getElementById('skill-check-difficulty').textContent = `Difficulty: ${this.getDifficultyName(checkResult.difficulty)}`;
        document.getElementById('skill-check-modifier').textContent = `Your skill: ${checkResult.result.target}`;

        const resultEl = document.getElementById('skill-check-result');
        resultEl.textContent = checkResult.result.success ? 'SUCCESS' : 'FAILURE';
        resultEl.className = checkResult.result.success ? 'success' : 'failure';

        // Play sound
        AudioSystem.playSkillCheckResult(checkResult.result.success);

        // Wait then hide
        await Utils.sleep(1500);
        display.classList.add('hidden');

        return checkResult.result.success;
    },

    // Type text animation
    async typeText(element, text, speed = 30) {
        element.textContent = '';
        this.currentTypingText = text;
        this.skipRequested = false;

        for (let i = 0; i < text.length; i++) {
            if (this.skipRequested) {
                element.textContent = text;
                return;
            }

            element.textContent += text[i];

            // Pause longer on punctuation
            let delay = speed;
            if (['.', '!', '?'].includes(text[i])) {
                delay = speed * 3;
            } else if ([',', ';', ':'].includes(text[i])) {
                delay = speed * 2;
            } else if (text[i] === ' ') {
                delay = speed * 0.5;
            }

            await Utils.sleep(delay);
        }
    },

    // Skip current typing animation
    skipTyping() {
        this.skipRequested = true;
        if (this.currentTypingText) {
            this.elements.dialogueText.textContent = this.currentTypingText;
        }
        this.state.isTyping = false;
    },

    // Render character creation options
    renderCharacterCreation() {
        // Render backgrounds
        this.elements.backgroundOptions.innerHTML = '';
        for (const id in CharacterSystem.backgrounds) {
            const bg = CharacterSystem.backgrounds[id];
            const card = this.createOptionCard(id, bg.name, bg.desc, 'background');
            this.elements.backgroundOptions.appendChild(card);
        }

        // Render archetypes
        this.elements.archetypeOptions.innerHTML = '';
        for (const id in CharacterSystem.archetypes) {
            const arch = CharacterSystem.archetypes[id];
            const card = this.createOptionCard(id, arch.name, arch.desc, 'archetype');
            this.elements.archetypeOptions.appendChild(card);
        }

        // Render skill allocation
        this.renderSkillAllocation();
    },

    // Create option card
    createOptionCard(id, name, desc, type) {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.dataset.id = id;
        card.dataset.type = type;

        card.innerHTML = `
            <h4>${name}</h4>
            <p>${desc}</p>
        `;

        card.addEventListener('click', () => {
            // Deselect others of same type
            document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(c => {
                c.classList.remove('selected');
            });
            card.classList.add('selected');

            // Update game state
            if (type === 'background') {
                Game.creationState.background = id;
            } else if (type === 'archetype') {
                Game.creationState.archetype = id;
            }

            // Re-render skills if background changed
            if (type === 'background') {
                this.renderSkillAllocation();
            }
        });

        return card;
    },

    // Render skill allocation
    renderSkillAllocation() {
        this.elements.skillAllocation.innerHTML = '';

        const allSkills = CharacterSystem.getAllSkills();

        allSkills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skill-item';

            const baseValue = Game.creationState.skillValues[skill.id] || 5;

            item.innerHTML = `
                <span class="skill-name" title="${skill.desc}">${skill.name}</span>
                <div class="skill-controls">
                    <button class="decrease" data-skill="${skill.id}">-</button>
                    <span class="skill-value">${baseValue}</span>
                    <button class="increase" data-skill="${skill.id}">+</button>
                </div>
            `;

            // Decrease button
            item.querySelector('.decrease').addEventListener('click', (e) => {
                const skillId = e.target.dataset.skill;
                if (Game.creationState.skillValues[skillId] > 1) {
                    Game.creationState.skillValues[skillId]--;
                    Game.creationState.remainingPoints++;
                    this.updateSkillDisplay(item, skillId);
                    this.elements.remainingPoints.textContent = Game.creationState.remainingPoints;
                }
            });

            // Increase button
            item.querySelector('.increase').addEventListener('click', (e) => {
                const skillId = e.target.dataset.skill;
                if (Game.creationState.remainingPoints > 0 && Game.creationState.skillValues[skillId] < 15) {
                    Game.creationState.skillValues[skillId]++;
                    Game.creationState.remainingPoints--;
                    this.updateSkillDisplay(item, skillId);
                    this.elements.remainingPoints.textContent = Game.creationState.remainingPoints;
                }
            });

            this.elements.skillAllocation.appendChild(item);
        });
    },

    // Update skill display
    updateSkillDisplay(item, skillId) {
        const value = Game.creationState.skillValues[skillId];
        item.querySelector('.skill-value').textContent = value;
    },

    // Show character sheet
    showCharacterSheet() {
        const char = Game.state.character;
        if (!char) return;

        let html = '';

        // Basic info
        html += `
            <div class="character-info">
                <p><strong>Background:</strong> ${CharacterSystem.backgrounds[char.background].name}</p>
                <p><strong>Archetype:</strong> ${CharacterSystem.archetypes[char.archetype].name}</p>
                <p><strong>Level:</strong> ${char.level} (${char.experience} XP)</p>
                <p><strong>Mental State:</strong> ${Utils.snakeToTitle(char.mentalState)}</p>
            </div>
        `;

        // Skills by category
        for (const category in CharacterSystem.skills) {
            const cat = CharacterSystem.skills[category];
            html += `<div class="skill-category"><h4>${cat.name}</h4><div class="skill-list">`;

            for (const skillId in cat.skills) {
                const skill = cat.skills[skillId];
                const value = CharacterSystem.getSkillValue(char, skillId);
                html += `
                    <div class="skill-display">
                        <span>${skill.name}</span>
                        <span class="value">${value}</span>
                    </div>
                `;
            }

            html += '</div></div>';
        }

        this.elements.characterSheetContent.innerHTML = html;
        this.showModal('character');
    },

    // Show partner sheet
    showPartnerSheet() {
        const partnerId = Game.state.currentPartner;
        if (!partnerId) {
            this.showNotification('No partner assigned', 'warning');
            return;
        }

        const partner = PartnerSystem.partners[partnerId];
        const relationship = Game.state.character.relationships[partnerId];
        const info = PartnerSystem.getPartnerInfo(partnerId, relationship);

        this.elements.partnerNameDisplay.textContent = partner.name;

        let html = `
            <div class="partner-info">
                <p>${partner.description}</p>
                <p><strong>Years on job:</strong> ${partner.yearsOnJob}</p>
                <p><strong>Relationship:</strong> ${info.relationshipLevel}</p>
            </div>
            <div class="relationship-bar">
                <label>Trust</label>
                <div class="bar">
                    <div class="bar-fill" style="width: ${info.trust}%"></div>
                </div>
            </div>
            <div class="partner-stats">
        `;

        // Show some of partner's key skills
        const keySkills = ['composure', 'empathy', 'trauma_assessment', 'dark_humor'];
        keySkills.forEach(skill => {
            if (partner.skills[skill]) {
                html += `
                    <div class="partner-stat">
                        ${Utils.snakeToTitle(skill)}: ${partner.skills[skill]}
                    </div>
                `;
            }
        });

        html += '</div>';

        // What they teach
        html += `<p style="margin-top: 1rem; font-style: italic; color: var(--text-secondary);">"${partner.teaches}"</p>`;

        this.elements.partnerSheetContent.innerHTML = html;
        this.showModal('partner');
    },

    // Show equipment
    showEquipment() {
        const equipment = Game.state.character?.equipment;
        if (!equipment) return;

        let html = '';

        for (const category in equipment) {
            html += `<div class="equipment-category"><h4>${Utils.capitalize(category)}</h4>`;

            for (const item in equipment[category]) {
                const quantity = equipment[category][item];
                html += `
                    <div class="equipment-item">
                        <span>${Utils.snakeToTitle(item)}</span>
                        <span class="quantity">${quantity}</span>
                    </div>
                `;
            }

            html += '</div>';
        }

        this.elements.equipmentContent.innerHTML = html;
        this.showModal('equipment');
    },

    // Save options
    saveOptions() {
        Utils.save('night_shift_options', {
            textSpeed: this.state.textSpeed,
            autoSave: this.elements.autoSave?.checked,
            contentWarnings: this.elements.contentWarnings?.checked
        });
    },

    // Load options
    loadOptions() {
        const options = Utils.load('night_shift_options');
        if (options) {
            this.state.textSpeed = options.textSpeed || 30;
            if (this.elements.textSpeed) {
                this.elements.textSpeed.value = (60 - this.state.textSpeed) / 10;
            }
            if (this.elements.autoSave) {
                this.elements.autoSave.checked = options.autoSave ?? true;
            }
            if (this.elements.contentWarnings) {
                this.elements.contentWarnings.checked = options.contentWarnings ?? true;
            }
        }
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
