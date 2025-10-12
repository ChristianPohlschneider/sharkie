class SoundManager {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.themeBuffer = null;
        this.source = null;
    }

    async loadTheme(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.themeBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    }

    async playTheme() {
        if (!this.themeBuffer) return;

        // AudioContext ggf. resume
        if (this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }

        this.stopTheme(); // Vorherige Musik stoppen

        this.source = this.audioCtx.createBufferSource();
        this.source.buffer = this.themeBuffer;
        this.source.loop = true;
        this.source.connect(this.audioCtx.destination);
        this.source.start(0);
    }

    stopTheme() {
        if (this.source) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = null;
        }
    }
}
