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

function fullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    const fullscreenButton = document.getElementById('fullscreenButton');

    if (!fullscreenIsSet) {
        enterFullscreen(fullscreen);
        fullscreenButton.innerHTML = '✕';
        fullscreenIsSet = true;
        resizeCanvasWrapperForFullscreen();
    } else {
        exitFullscreen(fullscreen);
        fullscreenButton.innerHTML = '⛶';
        fullscreenIsSet = false;
        resetCanvasWrapperSize();
    }

    fullscreenButton.blur();
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }

    document.addEventListener('fullscreenchange', () => {
        const canvasWrapper = document.querySelector('.canvasWrapper');
        const canvas = document.getElementById('canvas');
        if (document.fullscreenElement) {
            resizeCanvasWrapperForFullscreen();
        } else {
            resetCanvasWrapperSize();
        }
    });
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/** 📏 Canvas + Wrapper proportional an Bildschirm anpassen */
function resizeCanvasWrapperForFullscreen() {
    if (!document.fullscreenElement) return; // ❌ JS nur bei Fullscreen

    const aspect = 4 / 3; 
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let newW, newH;

    if (screenW / screenH > aspect) {
        newH = screenH;
        newW = newH * aspect;
    } else {
        newW = screenW;
        newH = newW / aspect;
    }

    const canvasWrapper = document.querySelector('.canvasWrapper');
    const canvas = document.getElementById('canvas');

    canvasWrapper.style.width = `${newW}px`;
    canvasWrapper.style.height = `${newH}px`;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
}

/** 🔄 Wrapper + Canvas zurück auf Standardgröße */
function resetCanvasWrapperSize() {
    const canvasWrapper = document.querySelector('.canvasWrapper');
    const canvas = document.getElementById('canvas');

    canvasWrapper.style.width = '720px';
    canvasWrapper.style.height = '480px';

    canvas.style.width = '100%';
    canvas.style.height = '100%';
}
