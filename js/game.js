let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;
let fullscreenIsSet = false;

/**
 * Initializes the game sound button after DOM load.
 * Sets the initial icon and toggles sound on user interaction.
 *
 * @listens DOMContentLoaded
 * @throws {Error} From initGameSound() or toggleGameSound().
 */
window.addEventListener("DOMContentLoaded", () => {
    const audioBtn = document.getElementById("audioButton");
    initGameSoundUI();
    audioBtn.addEventListener("pointerdown", async (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (!soundManager) {
            await initGameSound();
        }
        await toggleGameSound();
    });
});

/**
 * Adds a click listener to show an info overlay.
 * Creates, displays, and removes it via close button or background click.
 *
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    const infoButton = document.getElementById('infoButton');
    infoButton.addEventListener('click', () => {
        const html = renderInfoOverlay();
        document.getElementById('fullscreen').insertAdjacentHTML('beforeend', html);
        const infoOverlay = document.getElementById('infoOverlay');
        const closeInfo = document.getElementById('closeInfo');
        infoOverlay.classList.remove('hidden');
        closeInfo.addEventListener('click', () => {
            infoOverlay.remove();
        });
        infoOverlay.addEventListener('click', (e) => {
            if (e.target === infoOverlay) infoOverlay.remove();
        });});});

/**
 * Retrieves the `<canvas>` element and assigns it to the global variable.
 * Must be called before rendering.
 *
 * @throws {TypeError} If the "canvas" element is missing.
 */
function init() {
    canvas = document.getElementById('canvas');
}

/**
 * Sets the audio button icon based on the saved sound setting.
 * Reads `soundEnabled` from localStorage and updates the UI.
 *
 * @throws {TypeError} If the audio button is missing.
 */
function initGameSoundUI() {
    const savedState = JSON.parse(localStorage.getItem('soundEnabled')) ?? true;
    const btn = document.getElementById("audioButton");
    if (btn) btn.textContent = savedState ? "🔊" : "🔇";
}

/**
 * Initializes the sound system and theme audio.
 * Creates SoundManager, resumes AudioContext, and plays or stops based on `soundEnabled`.
 *
 * @async
 * @param {string} [src='img/assets/audio/openingTheme.wav'] - Theme audio path.
 * @throws {Error} If audio loading or context resume fails.
 */
async function initGameSound(src = 'img/assets/audio/openingTheme.wav') {
    if (!soundManager) {
        soundManager = new SoundManager();
        await soundManager.loadTheme(src);
    }
    const savedState = JSON.parse(localStorage.getItem('soundEnabled')) ?? true;
    if (soundManager.audioCtx.state === 'suspended') {
        await soundManager.audioCtx.resume();
    }
    handleGameSoundThemePlay(savedState);
}

/**
 * Toggles game sound, updates the icon, and saves state in localStorage.
 * Starts or stops the theme as needed.
 *
 * @async
 * @throws {Error} If audio context or toggle fails.
 */
async function toggleGameSound() {
    if (!soundManager) return;
    if (soundManager.audioCtx.state === "suspended") {
        await soundManager.audioCtx.resume();
    }
    const enabled = soundManager.toggleSound();
    localStorage.setItem('soundEnabled', JSON.stringify(enabled));
    const btn = document.getElementById("audioButton");
    if (btn) btn.textContent = enabled ? "🔊" : "🔇";
    handleGameSoundThemePlay(enabled);
}

/**
 * Plays or stops the theme and Sharkie’s idle snore based on `enabled`.
 *
 * @param {boolean} enabled - True to play, false to stop.
 * @param {Object} world - Game world with the character instance.
 */
function handleGameSoundThemePlay(enabled, world) {
    if (!soundManager) return;
    const sharkie = world?.character;
    if (enabled) {
        soundManager.playTheme();
        if (sharkie) {
            const now = Date.now();
            const idleDuration = now - (sharkie.lastIdleTime || now);
            if (idleDuration >= 10000) {sharkie.playIdleSnoringSound();}
        }
    } else {
        soundManager.stopTheme();
        if (sharkie) {sharkie.stopIdleSnoringSound();}
    }}


/**
 * Initializes SoundManager, loads the theme, resumes AudioContext, and plays it.
 *
 * @async
 * @param {string} src - Path to the audio file.
 * @throws {Error} If audio load or context resume fails.
 */
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

/**
 * Starts the game by setting up world, level, enemies, and audio.
 * Hides the start screen, cleans up old instances, and initializes a new world.
 *
 * @async
 * @throws {Error} If audio or world setup fails.
 */
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

/**
 * Shows the start screen and plays the opening theme.
 * Initializes UI, hides overlays, and displays the start screen.
 *
 * @throws {Error} If the element is missing or audio fails.
 */
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

/**
 * Prepares the start screen by cleaning up the world and stopping audio.
 * Initializes the start screen canvas.
 *
 * @throws {Error} If cleanup or canvas setup fails.
 */
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

/**
 * Initializes the start screen canvas by clearing previous drawings.
 * Retrieves the canvas and clears its 2D context.
 *
 * @throws {Error} If the canvas or its context is missing.
 */
function initshowStartScreenCanvas() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Handles keydown events to control the game and prevent default browser actions.
 * Updates the `keyboard` state and toggles on-screen buttons as needed.
 *
 * @listens keydown
 * @param {KeyboardEvent} event - The keydown event object.
 */
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

/**
 * Handles keyup events to update game input and UI.
 * Marks keys as released and deactivates corresponding on-screen buttons.
 *
 * @listens keyup
 * @param {KeyboardEvent} event - The keyup event object.
 */
window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
    toggleButtonActive(event.code, false);
});

/**
 * Initializes touch controls after the page fully loads.
 * Calls `initTouchControls()` for mobile or touch input setup.
 *
 * @listens load
 */
window.addEventListener("load", () => {
    initTouchControls();
});

/**
 * Retrieves all touch/on-screen control buttons.
 * Returns an object mapping keyboard codes to their corresponding DOM elements.
 *
 * @returns {Object.<string, HTMLElement|null>} Keys are keyboard codes; values are button elements or `null`.
 */
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
    };}

/**
 * Creates handlers to press and release keys, updating keyboard state and UI.
 * Returns `press` and `release` functions for touch or on-screen buttons.
 *
 * @returns {Object} { press(key), release(key) } methods.
 */
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

/**
 * Binds touch and mouse events to on-screen buttons to simulate keyboard input.
 * Calls `press` on start and `release` on end/leave, preventing default browser actions.
 *
 * @param {Object.<string, HTMLElement|null>} buttons - Keyboard code to button mapping.
 * @param {function(string): void} press - Called when a key is pressed.
 * @param {function(string): void} release - Called when a key is released.
 */
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

/**
 * Initializes touch and on-screen controls for mobile or touch devices.
 * Retrieves buttons, creates handlers, and binds events to simulate keyboard input.
 */
function initTouchControls() {
    const buttons = getTouchButtons();
    const { press, release } = createPressReleaseHandlers();
    bindTouchEvents(buttons, press, release);
}

/**
 * Maps a keyboard code to the corresponding on-screen button ID.
 * Used for highlighting or toggling touch/visual buttons.
 *
 * @param {string} code - Keyboard code (e.g., "ArrowUp", "KeyW", "Space").
 * @returns {string|undefined} The button ID, or `undefined` if not mapped.
 */
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
    }; return keyMap[code]; }

/**
 * Retrieves a DOM element by its button ID.
 * Returns the element or `null` if not found, typically for touch/keyboard buttons.
 *
 * @param {string} btnId - ID of the button element.
 * @returns {HTMLElement|null} The DOM element or `null`.
 */
function getButtonElement(btnId) {
    if (!btnId) return null;
    return document.getElementById(btnId);
}

/**
 * Toggles the "active" state of an on-screen button based on a key code.
 * Maps the code to a button and adds/removes the "active" class.
 *
 * @param {string} code - Keyboard code (e.g., "ArrowUp", "KeyW", "Space").
 * @param {boolean} isActive - True to activate, false to deactivate.
 */
function toggleButtonActive(code, isActive) {
    const btnId = getButtonId(code);
    const button = getButtonElement(btnId);
    if (!button) return;
    if (isActive) button.classList.add("active");
    else button.classList.remove("active");
}

/**
 * Toggles fullscreen mode and updates the fullscreen button icon.
 * Enters or exits fullscreen and removes button focus to prevent repeat clicks.
 *
 * @throws {Error} If fullscreen toggle fails.
 */
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

/**
 * Requests fullscreen mode for a given element.
 * Uses standard and vendor-prefixed methods for cross-browser support.
 *
 * @param {HTMLElement} element - Element to display in fullscreen.
 * @throws {Error} If fullscreen is not supported.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

/**
 * Exits fullscreen mode for the document.
 * Uses standard and vendor-prefixed methods for cross-browser support.
 *
 * @throws {Error} If exiting fullscreen is not supported.
 */
function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

/**
 * Updates the fullscreen button icon on fullscreen state changes.
 * Listens for `fullscreenchange` and sets the icon accordingly.
 *
 * @listens fullscreenchange
 */
document.addEventListener('fullscreenchange', () => {
    const button = document.getElementById('fullscreenButton');
    if (document.fullscreenElement) {
        button.innerHTML = '✕';
    } else {
        button.innerHTML = '⛶';
    }
});

/**
 * Checks device orientation and shows a warning in portrait mode.
 * Displays or hides the `rotateWarning` element based on screen dimensions.
 *
 * @throws {Error} If the `rotateWarning` element is missing.
 */
function checkOrientation() {
    const warning = document.getElementById('rotateWarning');
    if (window.innerHeight > window.innerWidth) {
        warning.style.display = 'flex';
    } else {
        warning.style.display = 'none';
    }
}

/**
 * Updates the rotate warning on window resize, orientation change, or page load.
 * Ensures the warning reflects the current device orientation.
 *
 * @listens resize
 * @listens orientationchange
 * @listens load
 */
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);

/**
 * Shows the win overlay with the player's total score after a 1-second delay.
 * Updates the `scoreDiv` and makes the `winOverlay` visible.
 *
 * @param {number} totalScore - Player's total score to display.
 * @throws {Error} If the overlay or score elements are missing.
 */
function showWinOverlay(totalScore) {
    setTimeout(() => {
        const overlay = document.getElementById('winOverlay');
        const scoreDiv = document.getElementById('scoreDiv');
        scoreDiv.textContent = `Your Score is: ${totalScore}`;
        overlay.classList.remove('hidden');
    }, 1000);
}

/**
 * Shows the lose overlay after a 1-second delay.
 * Retrieves the element and makes it visible.
 *
 * @throws {Error} If the `loseOverlay` element is missing.
 */
function showLoseOverlay() {
    setTimeout(() => {
        document.getElementById('loseOverlay').classList.remove('hidden');
    }, 1000);
}

/**
 * Hides all game overlays by adding the "hidden" class.
 * Skips overlays that do not exist.
 */
function hideOverlays() {
    const winOverlay = document.getElementById('winOverlay');
    if (winOverlay) winOverlay.classList.add('hidden');
    const loseOverlay = document.getElementById('loseOverlay');
    if (loseOverlay) loseOverlay.classList.add('hidden');
    const infoOverlay = document.getElementById('infoOverlay');
    if (infoOverlay) infoOverlay.classList.add('hidden');
}

/**
 * Retrieves DOM elements for menu and restart buttons in win/lose overlays.
 * Returns an object mapping button IDs to their elements, or `null` if missing.
 *
 * @returns {Object.<string, HTMLElement|null>} Button ID to element mapping.
 */
function getMenuButtons() {
    return {
        menuWin: document.getElementById('menuButton'),
        menuLose: document.getElementById('menuButtonLose'),
        restartWin: document.getElementById('restartWinButton'),
        restartLose: document.getElementById('restartLoseButton')
    };
}

/**
 * Binds a click event to a given overlay button.
 * Does nothing if the button is missing.
 *
 * @param {HTMLElement|null} btn - Button element to bind.
 * @param {Function} callback - Function to call on click.
 */
function bindOverlayButton(btn, callback) {
    if (!btn) return;
    btn.addEventListener('click', callback);
}

/**
 * Handles menu button click by hiding overlays and showing the start screen.
 * Used for win and lose overlays to return the player to the start screen.
 */
function onMenuButtonClick() {
    hideOverlays();
    showStartScreen();
}

/**
 * Handles restart button click by hiding overlays and starting a new game.
 * Used for win and lose overlays to restart the game.
 */
function onRestartButtonClick() {
    hideOverlays();
    startGame();
}

/**
 * Initializes overlay buttons by binding their click handlers.
 * Menu buttons call `onMenuButtonClick()`, restart buttons call `onRestartButtonClick()`.
 */
function initOverlayButtons() {
    const buttons = getMenuButtons();
    bindOverlayButton(buttons.menuWin, onMenuButtonClick);
    bindOverlayButton(buttons.menuLose, onMenuButtonClick);
    bindOverlayButton(buttons.restartWin, onRestartButtonClick);
    bindOverlayButton(buttons.restartLose, onRestartButtonClick);
}

/**
 * Initializes overlay buttons after the DOM content is loaded.
 * Calls `initOverlayButtons()` to bind menu and restart button handlers.
 *
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initOverlayButtons();
});

/**
 * Opens the burger menu and enables click detection outside it.
 * Creates overlay if missing, adds `.active` class, and sets up overlay click to close.
 */
function openBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    let overlay = document.getElementById('burgerOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'burgerOverlay';
        document.getElementById('fullscreen').appendChild(overlay);
    }
    burgerMenu.classList.add('active');
    overlay.classList.add('active');
    overlay.addEventListener('click', closeBurgerMenu);
}

/**
 * Closes the burger menu and removes its active state.
 * Removes `.active` from menu and overlay, safely handling missing elements.
 */
function closeBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const overlay = document.getElementById('burgerOverlay');
    burgerMenu.classList.remove('active');
    overlay?.classList.remove('active');
}

/**
 * Sets up burger menu button event listeners after the DOM is loaded.
 * Binds `openBurgerMenu` and `closeBurgerMenu` to the respective buttons.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBurgerMenu');
    const closeBtn = document.getElementById('closeBurgerMenu');
    openBtn.addEventListener('click', openBurgerMenu);
    closeBtn.addEventListener('click', closeBurgerMenu);
});

/**
 * Adds a click listener to show the legal notice overlay.
 * Inserts the overlay, scrolls to top, and allows closing via button or background.
 */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("legalButton")?.addEventListener("click", () => {
        document.getElementById("fullscreen")?.insertAdjacentHTML("beforeend", renderLegalNotice());
        const overlay = document.getElementById("legalOverlay");
        const back = document.getElementById("backToGame");
        overlay?.classList.replace("hidden", "show");
        overlay?.querySelector('.txtContainer')?.scrollTo(0, 0);
        const close = () => overlay?.classList.replace("show", "hidden");
        back?.addEventListener("click", (e) => { close(); e.stopPropagation(); });
        overlay?.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    });
});