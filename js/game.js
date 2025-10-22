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

document.addEventListener('DOMContentLoaded', () => {
    const infoButton = document.getElementById('infoButton');
    const infoOverlay = document.getElementById('infoOverlay');
    const closeInfo = document.getElementById('closeInfo');

    infoButton.addEventListener('click', () => {
        infoOverlay.classList.remove('hidden');
    });

    closeInfo.addEventListener('click', () => {
        infoOverlay.classList.add('hidden');
    });

    // Optional: Overlay schließen, wenn man außerhalb klickt
    infoOverlay.addEventListener('click', (e) => {
        if (e.target === infoOverlay) {
            infoOverlay.classList.add('hidden');
        }
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
// async function startGame() {
//     document.getElementById('startScreen').style.display = "none";
    
//     // Wenn Sound noch nicht läuft, starten wir ihn automatisch
//     if (soundManager) {
//         soundManager.stopTheme();
//     }
//     await startAudio('img/assets/audio/gameTheme.wav');

//     world = new World(canvas, keyboard);
//     this.world = world;

//     setinitialEnemies(world);
// }

async function startGame() {
    document.getElementById('startScreen').style.display = "none";

    // Falls alte Welt läuft → aufräumen
    if (world) {
        if (typeof world.cleanup === "function") world.cleanup();
        world = null;
        console.log("Alte Welt gelöscht");
    }

    // Musik vorbereiten
    if (soundManager) soundManager.stopTheme();
    await startAudio('img/assets/audio/gameTheme.wav');

    // 🆕 Neues Level erzeugen
    const level = createLevel1(); // Funktion aus level1.js

    // 🆕 Neue Welt mit Level starten
    world = new World(canvas, keyboard, level);
    this.world = world;

    // Gegner hinzufügen
    setinitialEnemies(world);
}

function showStartScreen() {
    // 🔹 1. Alte Welt stoppen
    if (typeof world !== 'undefined' && world) {
        console.log("Zurück ins Hauptmenü – alte Welt wird beendet.");
        if (typeof world.cleanup === 'function') world.cleanup();
        world = null;
    }

    // 🔹 2. Sound stoppen
    if (typeof soundManager !== 'undefined' && soundManager) {
        soundManager.stopTheme();
    }

    // 🔹 3. Canvas leeren
    const canvas = document.getElementById('canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // 🔹 4. Alle Overlays ausblenden
    hideOverlays();

    // 🔹 5. Startscreen anzeigen
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.style.display = "flex"; // oder "block" je nach CSS
    }

    // 🔹 6. Optional: Startscreen Musik
    if (typeof startAudio === 'function') {
        startAudio('img/assets/audio/openingTheme.wav'); // Menü-Theme
    }

    console.log("Startscreen angezeigt.");
}

// function resetLevel1() {
//     // Hintergrundobjekte komplett neu initialisieren
//     level1.backgroundObjects = [
//         new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),

//         new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 720),
//         new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 720),
//         new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 720),
//         new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 720),
//         new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720),

//         new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', -720),
//         new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', -720),
//         new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', -720),
//         new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', -720),
//         new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720),

//         new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 0),
//         new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),
//     ];

//     // Coins & Poison Bottles zurücksetzen
//     level1.coins.forEach(c => c.isCollected = false);
//     level1.poisonBottles.forEach(b => b.isCollected = false);
//     level1.shrinkingObjects = [];

//     // Kamera & Frame-Zustände zurücksetzen
//     if (world) {
//         world.camera_x = 0;
//         world.ctx.translate(0, 0);
//     }
// }




window.addEventListener('keydown', (event) => {
    // Unterdrücke Standardaktionen für deine Steuer-Tasten
    const keysToPrevent = [
        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
        "KeyW", "KeyA", "KeyS", "KeyD",
        "Space", "ControlLeft", "ControlRight"
    ];

    if (keysToPrevent.includes(event.code)) {
        event.preventDefault(); // verhindert Textmarkierung, Scrollen, etc.
    }

    keyboard[event.code] = true;
    toggleButtonActive(event.code, true);
    //event.code: Space, event.keyCode: 32
    //console.log(event.code);

});

window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
    toggleButtonActive(event.code, false);
});

window.addEventListener("load", () => {
    initTouchControls();
});

function initTouchControls() {
    const buttons = {
        ArrowUp: document.getElementById("arrowUp"),
        ArrowDown: document.getElementById("arrowDown"),
        ArrowLeft: document.getElementById("arrowLeft"),
        ArrowRight: document.getElementById("arrowRight"),
        Space: document.getElementById("spaceKey"),
        ControlLeft: document.getElementById("strgKey"),
        ControlRight: document.getElementById("strgKey"),
        KeyW: document.getElementById("arrowUp"),
        KeyS: document.getElementById("arrowDown"),
        KeyA: document.getElementById("arrowLeft"),
        KeyD: document.getElementById("arrowRight"),
    };

    // Hilfsfunktion: Button gedrückt
    const press = (key) => {
        keyboard[key] = true;
    };

    // Hilfsfunktion: Button losgelassen
    const release = (key) => {
        keyboard[key] = false;
    };

    // Für jedes Element Touch- und Mausklick-Events hinzufügen
    Object.entries(buttons).forEach(([key, btn]) => {
        if (!btn) return;

        // Touchstart → gedrückt
        btn.addEventListener("touchstart", (e) => {
            e.preventDefault(); // verhindert Scrollen auf Mobilgeräten
            press(key);
        });

        // Touchend → losgelassen
        btn.addEventListener("touchend", (e) => {
            e.preventDefault();
            release(key);
        });

        // Optional: auch Mausunterstützung (z. B. Desktop-Test)
        btn.addEventListener("mousedown", () => press(key));
        btn.addEventListener("mouseup", () => release(key));
        btn.addEventListener("mouseleave", () => release(key)); // falls Maus rausgeht
    });
}

function toggleButtonActive(code, isActive) {
    const keyMap = {
        ArrowLeft: "arrowLeft",
        ArrowRight: "arrowRight",
        ArrowUp: "arrowUp",
        ArrowDown: "arrowDown",
        Space: "spaceKey",
        ControlLeft: "strgKey",
        ControlRight: "strgKey",
        KeyW: "arrowUp",
        KeyS: "arrowDown",
        KeyA: "arrowLeft",
        KeyD: "arrowRight"
    };

    const btnId = keyMap[code];
    if (!btnId) return;

    const button = document.getElementById(btnId);
    if (!button) return;

    if (isActive) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

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

function showWinOverlay() {
    setTimeout(() => {
        document.getElementById('winOverlay').classList.remove('hidden');
    }, 1000);
}

function showLoseOverlay() {
    setTimeout(() => {
        document.getElementById('loseOverlay').classList.remove('hidden');
    }, 1000);
}

function hideOverlays() {
    document.getElementById('winOverlay').classList.add('hidden');
    document.getElementById('loseOverlay').classList.add('hidden');
    document.getElementById('infoOverlay').classList.add('hidden');
}

// function hideOverlays() {
//     const overlays = [
//         document.getElementById('winOverlay'),
//         document.getElementById('loseOverlay'),
//         document.getElementById('infoOverlay')
//     ];

//     overlays.forEach(overlay => {
//         if (overlay) overlay.style.display = "none";
//     });
// }

// Event Listeners für Buttons
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuButton');
    const restartWinBtn = document.getElementById('restartWinButton');
    const restartLoseBtn = document.getElementById('restartLoseButton');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            hideOverlays();
            showStartScreen(); // Funktion zum Zurückkehren ins Menü (du kannst sie anpassen)
        });
    }

    if (restartWinBtn) {
        restartWinBtn.addEventListener('click', () => {
            hideOverlays();
            startGame(); // deine vorhandene Spiel-Start-Funktion
        });
    }

    if (restartLoseBtn) {
        restartLoseBtn.addEventListener('click', () => {
            hideOverlays();
            startGame();
        });
    }
});

