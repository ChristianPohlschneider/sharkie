class SoundManager {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.themeBuffer = null;
        this.source = null;
        this.gainNode = null;
        this.enabled = false;
    }

    /**
     * Loads an audio theme from a given URL into the audio context buffer.
     * 
     * This function fetches the audio file, converts it into an ArrayBuffer,
     * decodes it into an AudioBuffer using the Web Audio API, and stores it
     * in the `themeBuffer` property for later playback.
     * 
     * @async
     * @param {string} url - The URL of the audio file to load.
     * @returns {Promise<void>} Resolves when the theme is fully loaded and decoded.
     */
    async loadTheme(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.themeBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    }

    /**
     * Plays the currently loaded theme audio buffer in a loop.
     * 
     * This function checks if a theme is loaded and if the audio context
     * is enabled. If the audio context is suspended, it resumes it.
     * Any previously playing theme is stopped before starting the new one.
     * The theme is played in a loop using a GainNode for volume control.
     * 
     * @async
     * @returns {Promise<void>} Resolves once the theme starts playing.
     */
    async playTheme() {
        if (!this.themeBuffer || !this.enabled) return;
        if (this.audioCtx.state === 'suspended') await this.audioCtx.resume();
        this.stopTheme();
        this.source = this.audioCtx.createBufferSource();
        this.source.buffer = this.themeBuffer;
        this.source.loop = true;
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.value = 1;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
        this.source.start(0);
    }

    /**
     * Stops the currently playing theme, if any.
     * 
     * This function stops the AudioBufferSourceNode, disconnects it from
     * the audio graph, and clears the reference to allow a new theme to be played.
     * 
     * @returns {void}
     */
    stopTheme() {
        if (this.source) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = null;
        }
    }

    /**
     * Toggles the global sound on or off.
     * 
     * If the audio context is suspended and sound is enabled, it resumes the context.
     * Also adjusts the gain of the currently connected gain node to mute or unmute audio.
     * 
     * @returns {boolean} The new state of the sound (`true` if enabled, `false` if muted).
     */
    toggleSound() {
        this.enabled = !this.enabled;
        if (this.audioCtx.state === "suspended" && this.enabled) {
            this.audioCtx.resume();
        }
        if (this.gainNode) {
            this.gainNode.gain.value = this.enabled ? 1 : 0;
        }
        return this.enabled;
    }

    /**
     * Plays a sound effect from a given URL, optionally with a delay.
     * 
     * This method fetches the audio file, decodes it into an AudioBuffer,
     * and plays it through the AudioContext. The sound plays only if 
     * the sound system is enabled.
     * 
     * @async
     * @param {string} url - The URL of the audio file to play.
     * @param {number} [delay=0] - Optional delay in milliseconds before the sound starts.
     */
    //     async playEffect(url, delay = 0) {
    //         if (!this.enabled) return;
    //         const response = await fetch(url);
    //         const arrayBuffer = await response.arrayBuffer();
    //         const buffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    //         const source = this.audioCtx.createBufferSource();
    //         source.buffer = buffer;
    //         source.connect(this.audioCtx.destination);
    //         if (delay > 0) {
    //             source.start(this.audioCtx.currentTime + delay / 1000);
    //         } else {
    //             source.start(0);
    //         }
    //     }

    /**
     * Plays a sound effect from a given URL, optionally with a delay and loop option.
     *
     * @async
     * @param {string} url - The URL of the audio file to play.
     * @param {number} [delay=0] - Optional delay in milliseconds before the sound starts.
     * @param {boolean} [loop=false] - Whether the sound should loop continuously.
     */
    async playEffect(url, delay = 0, loop = false) {
        if (!this.enabled) return;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await this.audioCtx.decodeAudioData(arrayBuffer);
        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;
        source.connect(this.audioCtx.destination);
        if (delay > 0) {
            source.start(this.audioCtx.currentTime + delay / 1000);
        } else {
            source.start(0);
        }
        return source; // ⬅ wichtig, um später stoppen zu können
    }
}
