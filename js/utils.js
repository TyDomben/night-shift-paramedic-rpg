// Night Shift - Utility Functions

const Utils = {
    // Random number between min and max (inclusive)
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Roll dice (e.g., "2d6" = roll 2 six-sided dice)
    rollDice(notation) {
        const [count, sides] = notation.split('d').map(Number);
        let total = 0;
        for (let i = 0; i < count; i++) {
            total += this.random(1, sides);
        }
        return total;
    },

    // Skill check - returns { success: boolean, roll: number, target: number }
    skillCheck(skillValue, difficulty, modifiers = 0) {
        const roll = this.rollDice('1d20');
        const target = skillValue + modifiers;
        const success = roll <= target + (20 - difficulty);
        return {
            success,
            roll,
            target,
            difficulty,
            margin: target + (20 - difficulty) - roll
        };
    },

    // Weighted random selection
    weightedRandom(items, weights) {
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) return items[i];
        }
        return items[items.length - 1];
    },

    // Shuffle array
    shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    },

    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    // Deep clone object
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Format time (minutes to HH:MM)
    formatTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60) % 24;
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    },

    // Get day name
    getDayName(dayIndex) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayIndex % 7];
    },

    // Typewriter effect for text
    async typeText(element, text, speed = 30) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            if (text[i] !== ' ') {
                await this.sleep(speed);
            }
        }
    },

    // Sleep function for async/await
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Save to localStorage
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    },

    // Load from localStorage
    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Load failed:', e);
            return null;
        }
    },

    // Delete from localStorage
    deleteSave(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Delete failed:', e);
            return false;
        }
    },

    // Check if save exists
    hasSave(key) {
        return localStorage.getItem(key) !== null;
    },

    // Interpolate string with variables
    interpolate(template, variables) {
        return template.replace(/\{(\w+)\}/g, (match, key) => {
            return variables.hasOwnProperty(key) ? variables[key] : match;
        });
    },

    // Calculate percentage
    percentage(value, max) {
        return Math.round((value / max) * 100);
    },

    // Lerp (linear interpolation)
    lerp(start, end, t) {
        return start + (end - start) * t;
    },

    // Get stress color based on value
    getStressColor(stress) {
        if (stress < 30) return 'var(--stress-low)';
        if (stress < 70) return 'var(--stress-medium)';
        return 'var(--stress-high)';
    },

    // Get energy color based on value
    getEnergyColor(energy) {
        if (energy > 50) return 'var(--energy-full)';
        return 'var(--energy-low)';
    },

    // Parse medical time (for protocols)
    parseProtocolTime(minutes) {
        if (minutes < 60) return `${minutes} minutes`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
    },

    // Check if night time
    isNightShift(time) {
        const hour = Math.floor(time / 60);
        return hour >= 19 || hour < 7;
    },

    // Get time period description
    getTimePeriod(time) {
        const hour = Math.floor(time / 60);
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    },

    // Capitalize first letter
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // Convert snake_case to Title Case
    snakeToTitle(str) {
        return str.split('_').map(word => this.capitalize(word)).join(' ');
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
