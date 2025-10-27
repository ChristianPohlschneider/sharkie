let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;
let fullscreenIsSet = false;

/**
 * * This function attaches a "pointerdown" event listener to the button with the ID "audioButton".
 * When the button is pressed, the event's default behavior is prevented,
 * propagation is stopped, and the asynchronous function `toggleGameSound()` is called
 * to toggle the game's sound on or off.
 * 
 * @listens DOMContentLoaded - Waits for the HTML document to be fully loaded before adding the button listener.
 * @listens pointerdown - Handles pointer events (e.g., mouse, touch, stylus) on the audio button.
 * @throws {Error} Propagates any error thrown by `toggleGameSound()` if it fails.
 */
window.addEventListener("DOMContentLoaded", () => {
    const audioBtn = document.getElementById("audioButton");
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
    handleInfoOverlay();
});

function handleInfoOverlay() {
    infoButton.addEventListener('click', () => {
        infoOverlay.classList.remove('hidden');
    });
    closeInfo.addEventListener('click', () => {
        infoOverlay.classList.add('hidden');
    });
    infoOverlay.addEventListener('click', (e) => {
        if (e.target === infoOverlay) {
            infoOverlay.classList.add('hidden');
        }
    });
}

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
    handleGameSoundThemePlay(enabled);
}

function handleGameSoundThemePlay(enabled) {
    if (enabled) {
        soundManager.playTheme();
    } else {
        soundManager.stopTheme();
    }
}

async function startAudio(src) {
    if (!soundManager) {
        soundManager = new SoundManager();
    }
    await soundManager.loadTheme(src);
    if (soundManager.audioCtx.state === 'suspended') {
        await soundManager.audioCtx.resume();
    }
    soundManager.playTheme();
}

async function startGame() {
    document.getElementById('startScreen').style.display = "none";
    if (world) {
        if (typeof world.cleanup === "function") world.cleanup();
        world = null;
    }
    if (soundManager) soundManager.stopTheme();
    await startAudio('img/assets/audio/gameTheme.wav');
    const level = createLevel1();
    world = new World(canvas, keyboard, level);
    this.world = world;
    setinitialEnemies(world);
}

function showStartScreen() {
    initshowStartScreen();
    hideOverlays();
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.style.display = "flex";
    }
    if (typeof startAudio === 'function') {
        startAudio('img/assets/audio/openingTheme.wav');
    }
}

function initshowStartScreen() {
    if (typeof world !== 'undefined' && world) {
        if (typeof world.cleanup === 'function') world.cleanup();
        world = null;
    }
    if (typeof soundManager !== 'undefined' && soundManager) {
        soundManager.stopTheme();
    }
    initshowStartScreenCanvas();
}

function initshowStartScreenCanvas() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

window.addEventListener('keydown', (event) => {
    const keysToPrevent = [
        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
        "KeyW", "KeyA", "KeyS", "KeyD",
        "Space", "ControlLeft", "ControlRight"
    ];
    if (keysToPrevent.includes(event.code)) {
        event.preventDefault();
    }
    keyboard[event.code] = true;
    toggleButtonActive(event.code, true);
});

window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
    toggleButtonActive(event.code, false);
});

window.addEventListener("load", () => {
    initTouchControls();
});

function getTouchButtons() {
    return {
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
        KeyD: document.getElementById("arrowRight")
    };
}

function createPressReleaseHandlers() {
    const press = (key) => {
        keyboard[key] = true;
        toggleButtonActive(key, true);
    };
    const release = (key) => {
        keyboard[key] = false;
        toggleButtonActive(key, false);
    };
    return { press, release };
}

function bindTouchEvents(buttons, press, release) {
    Object.entries(buttons).forEach(([key, btn]) => {
        if (!btn) return;
        btn.addEventListener("touchstart", (e) => { e.preventDefault(); press(key); });
        btn.addEventListener("touchend", (e) => { e.preventDefault(); release(key); });
        btn.addEventListener("mousedown", () => press(key));
        btn.addEventListener("mouseup", () => release(key));
        btn.addEventListener("mouseleave", () => release(key));
    });
}

function initTouchControls() {
    const buttons = getTouchButtons();
    const { press, release } = createPressReleaseHandlers();
    bindTouchEvents(buttons, press, release);
}

function getButtonId(code) {
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
    return keyMap[code];
}

function getButtonElement(btnId) {
    if (!btnId) return null;
    return document.getElementById(btnId);
}

function toggleButtonActive(code, isActive) {
    const btnId = getButtonId(code);
    const button = getButtonElement(btnId);
    if (!button) return;
    if (isActive) button.classList.add("active");
    else button.classList.remove("active");
}

function fullscreen() {
    const fsElement = document.getElementById('fullscreen');
    const button = document.getElementById('fullscreenButton');

    if (!document.fullscreenElement) {
        enterFullscreen(fsElement);
        button.innerHTML = '✕';
    } else {
        exitFullscreen();
        button.innerHTML = '⛶';
    }
    button.blur();
}

function enterFullscreen(element) {
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

document.addEventListener('fullscreenchange', () => {
    const button = document.getElementById('fullscreenButton');
    if (document.fullscreenElement) {
        button.innerHTML = '✕';
    } else {
        button.innerHTML = '⛶';
    }
});

function checkOrientation() {
    const warning = document.getElementById('rotateWarning');
    if (window.innerHeight > window.innerWidth) {
        warning.style.display = 'flex';
    } else {
        warning.style.display = 'none';
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);

function showWinOverlay(totalScore) {
    setTimeout(() => {
        const overlay = document.getElementById('winOverlay');
        const scoreDiv = document.getElementById('scoreDiv');
        scoreDiv.textContent = `Your Score is: ${totalScore}`;
        overlay.classList.remove('hidden');
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

function getMenuButtons() {
    return {
        menuWin: document.getElementById('menuButton'),
        menuLose: document.getElementById('menuButtonLose'),
        restartWin: document.getElementById('restartWinButton'),
        restartLose: document.getElementById('restartLoseButton')
    };
}

function bindOverlayButton(btn, callback) {
    if (!btn) return;
    btn.addEventListener('click', callback);
}

function onMenuButtonClick() {
    hideOverlays();
    showStartScreen();
}

function onRestartButtonClick() {
    hideOverlays();
    startGame();
}

function initOverlayButtons() {
    const buttons = getMenuButtons();
    bindOverlayButton(buttons.menuWin, onMenuButtonClick);
    bindOverlayButton(buttons.menuLose, onMenuButtonClick);
    bindOverlayButton(buttons.restartWin, onRestartButtonClick);
    bindOverlayButton(buttons.restartLose, onRestartButtonClick);
}

document.addEventListener('DOMContentLoaded', () => {
    initOverlayButtons();
});