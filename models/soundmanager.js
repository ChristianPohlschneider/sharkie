class SoundManager {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.themeBuffer = null;
        this.source = null;
        this.gainNode = null;
        this.enabled = false;
    }

    async loadTheme(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.themeBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    }

    async playTheme() {
        if (!this.themeBuffer || !this.enabled) return;
        if (this.audioCtx.state === 'suspended') await this.audioCtx.resume();
        this.stopTheme();
        this.source = this.audioCtx.createBufferSource();
        this.source.buffer = this.themeBuffer;
        this.source.loop = true;
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.value = 1; // kein ternary nötig
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
        this.source.start(0);
    }

    stopTheme() {
        if (this.source) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = null;
        }
    }

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

    async playEffect(url, delay = 0) {
        if (!this.enabled) return;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await this.audioCtx.decodeAudioData(arrayBuffer);
        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioCtx.destination);
        if (delay > 0) {
            source.start(this.audioCtx.currentTime + delay / 1000); // Delay in Sekunden
        } else {
            source.start(0);
        }
    }
}
