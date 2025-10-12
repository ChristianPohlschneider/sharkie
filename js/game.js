let canvas;
let world;
let keyboard = new Keyboard();
let soundManager; // global, damit überall verfügbar

function init() {
    canvas = document.getElementById('canvas');
}
// Funktion zum Starten der Opening-Musik
async function startAudio(src) {
    if (!soundManager) {
        soundManager = new SoundManager();
    }

    await soundManager.loadTheme(src);

    if (soundManager.audioCtx.state === 'suspended') {
        await soundManager.audioCtx.resume();
    }

    soundManager.playTheme();
    //console log
    // console.log('AudioContext gestartet, Opening Theme läuft');
}


// Startet das Spiel und ggf. die Musik
async function startGame() {
    document.getElementById('startScreen').style.display = "none";

    // Wenn Sound noch nicht läuft, starten wir ihn automatisch
    if (soundManager) {
        soundManager.stopTheme();
    }
    await startAudio('img/assets/audio/gameTheme.wav');

    world = new World(canvas, keyboard);
    this.world = world;
    setinitialEnemies(world);
}

// async function playOpeningTheme() {
//     this.soundManager = new SoundManager();
//     await this.soundManager.loadTheme('img/assets/audio/openingTheme.wav');
//     this.soundManager.playTheme();
// }

// function startGame() {
//     document.getElementById('startScreen').style.display = "none";
//     world = new World(canvas, keyboard);
//     this.world = world;
//     setinitialEnemies(world);

//     // bei Neustart wieder auf false setzen:
//     // this.deathSoundPlayed = false;
// }

window.addEventListener('keydown', (event) => {
    keyboard[event.code] = true;
    //event.code: Space, event.keyCode: 32
    // console.log(event.code);

});

window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
});