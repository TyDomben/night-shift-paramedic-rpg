// Night Shift - Audio System

const AudioSystem = {
    // Audio state
    enabled: true,
    musicVolume: 0.7,
    sfxVolume: 0.8,
    currentMusic: null,
    currentAmbience: null,

    // Sound effect definitions
    sounds: {
        // UI sounds
        ui_click: { src: 'audio/sfx/ui_click.mp3', volume: 0.5 },
        ui_hover: { src: 'audio/sfx/ui_hover.mp3', volume: 0.3 },
        ui_open: { src: 'audio/sfx/ui_open.mp3', volume: 0.4 },
        ui_close: { src: 'audio/sfx/ui_close.mp3', volume: 0.4 },
        notification: { src: 'audio/sfx/notification.mp3', volume: 0.6 },

        // Game sounds
        radio_static: { src: 'audio/sfx/radio_static.mp3', volume: 0.5 },
        radio_dispatch: { src: 'audio/sfx/radio_dispatch.mp3', volume: 0.6 },
        siren: { src: 'audio/sfx/siren.mp3', volume: 0.7, loop: true },
        heartbeat: { src: 'audio/sfx/heartbeat.mp3', volume: 0.5, loop: true },
        heart_monitor_steady: { src: 'audio/sfx/heart_monitor_steady.mp3', volume: 0.4, loop: true },
        heart_monitor_flatline: { src: 'audio/sfx/heart_monitor_flatline.mp3', volume: 0.6 },
        defibrillator: { src: 'audio/sfx/defibrillator.mp3', volume: 0.7 },

        // Ambient
        ambulance_interior: { src: 'audio/sfx/ambulance_interior.mp3', volume: 0.3, loop: true },
        hospital_ambient: { src: 'audio/sfx/hospital_ambient.mp3', volume: 0.3, loop: true },
        city_ambient: { src: 'audio/sfx/city_ambient.mp3', volume: 0.3, loop: true },
        rain: { src: 'audio/sfx/rain.mp3', volume: 0.4, loop: true },

        // Feedback
        skill_success: { src: 'audio/sfx/skill_success.mp3', volume: 0.5 },
        skill_failure: { src: 'audio/sfx/skill_failure.mp3', volume: 0.5 },
        stress_increase: { src: 'audio/sfx/stress_increase.mp3', volume: 0.4 },
        level_up: { src: 'audio/sfx/level_up.mp3', volume: 0.6 },

        // Psychological effects
        tinnitus: { src: 'audio/sfx/tinnitus.mp3', volume: 0.3, loop: true },
        muffled: { src: 'audio/sfx/muffled.mp3', volume: 0.5, loop: true },
        distorted: { src: 'audio/sfx/distorted.mp3', volume: 0.4, loop: true }
    },

    // Music tracks
    music: {
        menu: { src: 'audio/music/menu.mp3', loop: true },
        ambient_calm: { src: 'audio/music/ambient_calm.mp3', loop: true },
        ambient_tense: { src: 'audio/music/ambient_tense.mp3', loop: true },
        ambient_melancholy: { src: 'audio/music/ambient_melancholy.mp3', loop: true },
        action_low: { src: 'audio/music/action_low.mp3', loop: true },
        action_high: { src: 'audio/music/action_high.mp3', loop: true },
        emotional: { src: 'audio/music/emotional.mp3', loop: true },
        resolution: { src: 'audio/music/resolution.mp3', loop: false },
        trauma: { src: 'audio/music/trauma.mp3', loop: true }
    },

    // Loaded audio elements
    loadedSounds: {},
    loadedMusic: {},

    // Initialize audio system
    init() {
        // Note: In a real implementation, you would load actual audio files
        // For this demo, we'll create placeholder functionality
        console.log('Audio system initialized (placeholder mode)');

        // Load saved preferences
        this.loadPreferences();
    },

    // Load audio preferences from storage
    loadPreferences() {
        const prefs = Utils.load('audio_preferences');
        if (prefs) {
            this.enabled = prefs.enabled ?? true;
            this.musicVolume = prefs.musicVolume ?? 0.7;
            this.sfxVolume = prefs.sfxVolume ?? 0.8;
        }
    },

    // Save audio preferences
    savePreferences() {
        Utils.save('audio_preferences', {
            enabled: this.enabled,
            musicVolume: this.musicVolume,
            sfxVolume: this.sfxVolume
        });
    },

    // Play a sound effect
    play(soundId) {
        if (!this.enabled) return;

        const sound = this.sounds[soundId];
        if (!sound) {
            console.warn(`Sound not found: ${soundId}`);
            return;
        }

        // In real implementation:
        // const audio = new Audio(sound.src);
        // audio.volume = sound.volume * this.sfxVolume;
        // audio.loop = sound.loop || false;
        // audio.play();
        // return audio;

        console.log(`Playing sound: ${soundId}`);
        return { soundId, playing: true };
    },

    // Stop a sound effect
    stop(soundId) {
        console.log(`Stopping sound: ${soundId}`);
    },

    // Play music
    playMusic(trackId, fadeIn = true) {
        if (!this.enabled) return;

        const track = this.music[trackId];
        if (!track) {
            console.warn(`Music track not found: ${trackId}`);
            return;
        }

        // Fade out current music
        if (this.currentMusic && this.currentMusic !== trackId) {
            this.fadeOutMusic();
        }

        this.currentMusic = trackId;
        console.log(`Playing music: ${trackId}`);

        // In real implementation, would create Audio element and handle fading
    },

    // Stop music
    stopMusic(fadeOut = true) {
        if (this.currentMusic) {
            console.log(`Stopping music: ${this.currentMusic}`);
            this.currentMusic = null;
        }
    },

    // Fade out current music
    fadeOutMusic(duration = 1000) {
        console.log('Fading out music');
    },

    // Set ambient sound
    setAmbience(ambienceId) {
        if (this.currentAmbience === ambienceId) return;

        if (this.currentAmbience) {
            this.stop(this.currentAmbience);
        }

        this.currentAmbience = ambienceId;
        if (ambienceId) {
            this.play(ambienceId);
        }
    },

    // Get appropriate music for game state
    getMusicForState(gameState, character) {
        // During calls
        if (gameState.currentCall) {
            const call = gameState.currentCall;
            if (call.critical) {
                return 'action_high';
            }
            if (call.phase === 'scene') {
                return 'action_low';
            }
            return 'ambient_tense';
        }

        // Based on stress level
        if (character.stress > 70) {
            return 'trauma';
        }
        if (character.stress > 40) {
            return 'ambient_tense';
        }

        // Based on mental state
        if (character.mentalState === 'depressed') {
            return 'ambient_melancholy';
        }

        return 'ambient_calm';
    },

    // Apply audio effects based on mental state
    applyMentalStateEffects(mentalState) {
        // Stop any current effects
        this.stop('tinnitus');
        this.stop('muffled');
        this.stop('distorted');

        switch (mentalState) {
            case 'dissociated':
                this.play('muffled');
                break;
            case 'hypervigilant':
                this.play('tinnitus');
                break;
            case 'adrenaline_rush':
                // Increase tempo/intensity of current music
                break;
        }
    },

    // Play skill check result sound
    playSkillCheckResult(success) {
        this.play(success ? 'skill_success' : 'skill_failure');
    },

    // Play notification sound
    playNotification(type = 'default') {
        const sounds = {
            default: 'notification',
            stress: 'stress_increase',
            dispatch: 'radio_dispatch',
            levelup: 'level_up'
        };
        this.play(sounds[type] || sounds.default);
    },

    // Set master volume
    setMusicVolume(volume) {
        this.musicVolume = Utils.clamp(volume, 0, 1);
        this.savePreferences();
    },

    // Set SFX volume
    setSfxVolume(volume) {
        this.sfxVolume = Utils.clamp(volume, 0, 1);
        this.savePreferences();
    },

    // Toggle audio on/off
    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopMusic();
            this.setAmbience(null);
        }
        this.savePreferences();
        return this.enabled;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioSystem;
}
