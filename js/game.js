let canvas;
let world;
let keyboard = new Keyboard();
let soundManager; // global, damit überall verfügbar
let fullscreenIsSet = false;

window.addEventListener("DOMContentLoaded", () => {
    const audioBtn = document.getElementById("audioButton");

    // pointerdown deckt Maus + Touch + Pen ab
    audioBtn.addEventListener("pointerdown", async (event) => {
        event.stopPropagation();
        event.preventDefault();
        await toggleGameSound();
    });
});

function init() {
    canvas = document.getElementById('canvas');
}

async function toggleGameSound() {
    if (!soundManager) {
        soundManager = new SoundManager();
        await soundManager.loadTheme('img/assets/audio/openingTheme.wav');
    }

    if (soundManager.audioCtx.state === "suspended") {
        await soundManager.audioCtx.resume();
    }

    const enabled = soundManager.toggleSound();
    const btn = document.getElementById("audioButton");
    btn.textContent = enabled ? "🔊" : "🔇";

    if (enabled) {
        soundManager.playTheme();
    } else {
        soundManager.stopTheme();
    }
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

window.addEventListener('keydown', (event) => {
    keyboard[event.code] = true;
    //event.code: Space, event.keyCode: 32
    // console.log(event.code);

});

window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
});

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (fullscreenIsSet == false) {
        enterFullscreen(fullscreen);
        document.getElementById('fullscreenButton').innerHTML = '✕';
        fullscreenIsSet = true;
    } else if (fullscreenIsSet == true) {
        exitFullscreen(fullscreen);
        document.getElementById('fullscreenButton').innerHTML = '⛶';
        fullscreenIsSet = false;
    }
    fullscreenButton.blur();
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11 (remove June 15, 2022) 
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { //iOS Safari 
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function checkOrientation() {
    const warning = document.getElementById('rotateWarning');
    
    // Prüfe, ob Hochformat aktiv ist
    if (window.innerHeight > window.innerWidth) {
        warning.style.display = 'flex'; // Overlay zeigen
    } else {
        warning.style.display = 'none'; // Overlay ausblenden
    }
}

// Reagiere auf Drehung oder Größenänderung
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

// Beim Laden prüfen
window.addEventListener('load', checkOrientation);
