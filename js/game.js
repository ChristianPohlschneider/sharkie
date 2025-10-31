let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;
let fullscreenIsSet = false;

/** 
 * Initializes the audio button and sound system once the DOM is loaded.
 * Sets the initial sound icon state via `initGameSoundUI()` and attaches
 * a `pointerdown` listener to toggle game sound after a user interaction.
 * 
 * @listens DOMContentLoaded - Ensures the audio button exists before attaching listeners.
 * @throws {Error} May propagate errors from `initGameSound()` or `toggleGameSound()`.
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
 * Fügt einen Klick-Listener auf den Info-Button hinzu, um das Info-Overlay anzuzeigen.
 * 
 * Beim Klick wird das Overlay dynamisch erzeugt, in das DOM eingefügt und sichtbar gemacht.
 * Das Overlay kann durch:
 * - Klick auf den Close-Button oder
 * - Klick auf den Hintergrund des Overlays
 * wieder entfernt werden.
 *
 * @function
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
 * This function retrieves the `<canvas>` element from the DOM using its ID (`canvas`)
 * and assigns it to the global variable `canvas`. 
 * It should be called before any rendering or drawing operations are performed.
 * 
 * @function init
 * @throws {TypeError} If the element with ID "canvas" is not found in the DOM.
 */
function init() {
    canvas = document.getElementById('canvas');
}

/** 
 * Initializes the visual state of the audio button based on the saved sound setting.
 * Retrieves the `soundEnabled` value from `localStorage` and updates the button icon accordingly.
 * 
 * @function initGameSoundUI
 * @throws {TypeError} If the audio button element cannot be found in the DOM.
 */
function initGameSoundUI() {
    const savedState = JSON.parse(localStorage.getItem('soundEnabled')) ?? true;
    const btn = document.getElementById("audioButton");
    if (btn) btn.textContent = savedState ? "🔊" : "🔇";
}

/** 
 * Initializes the game's sound system by creating the SoundManager if needed,
 * loading the theme audio, resuming the AudioContext, and playing or stopping
 * the theme based on the saved `soundEnabled` state from `localStorage`.
 * 
 * @async
 * @function initGameSound
 * @param {string} [src='img/assets/audio/openingTheme.wav'] - The path to the audio file to load as the theme.
 * @throws {Error} If loading the audio theme or resuming the AudioContext fails.
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
 * Toggles the game sound on or off, updates the audio button icon, 
 * saves the new state in `localStorage`, and starts or stops the theme accordingly.
 * 
 * @async
 * @function toggleGameSound
 * @throws {Error} If resuming the AudioContext or toggling the sound fails.
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
 * Starts or stops the game's theme and Sharkie's idle snoring sound
 * based on the `enabled` flag.
 *
 * @param {boolean} enabled - If true, plays the theme and idle sound (if Sharkie is idle); 
 *                            if false, stops all related sounds.
 * @param {Object} world - The game world object containing the character instance.
 * @returns {void}
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
 * Initializes the SoundManager (if needed), loads the specified audio theme,
 * resumes the AudioContext if suspended, and starts playing the theme.
 * 
 * @async
 * @function startAudio
 * @param {string} src - The path to the audio file to load and play.
 * @throws {Error} If loading the audio or resuming the AudioContext fails.
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
 * Starts the game by initializing the world, level, enemies, and audio.
 * 
 * This asynchronous function performs the following steps:
 * 1. Hides the start screen.
 * 2. Cleans up any existing `world` instance if present.
 * 3. Stops any currently playing theme via the `soundManager`.
 * 4. Starts the game's main theme using `startAudio()`.
 * 5. Creates the first level using `createLevel1()`.
 * 6. Initializes a new `World` instance with the canvas, keyboard, and level.
 * 7. Assigns the new world to the current context and sets up initial enemies.
 * 
 * @async
 * @function startGame
 * @throws {Error} If audio fails to start or if world initialization encounters an issue.
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
 * Displays the game's start screen and plays the opening theme.
 * 
 * This function performs the following steps:
 * 1. Calls `initshowStartScreen()` to initialize the start screen elements.
 * 2. Hides any active overlays using `hideOverlays()`.
 * 3. Makes the start screen visible by setting its `display` style to `flex`.
 * 4. Plays the opening audio theme by calling `startAudio()` if the function is available.
 * 
 * @function showStartScreen
 * @throws {Error} If the start screen element cannot be found or if audio playback fails.
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
 * Prepares the start screen by cleaning up any existing game world and stopping audio.
 * 
 * This function performs the following steps:
 * 1. Checks if a `world` instance exists; if so, calls its `cleanup()` method and sets `world` to `null`.
 * 2. Stops any currently playing theme via the `soundManager` if it exists.
 * 3. Initializes the start screen canvas by calling `initshowStartScreenCanvas()`.
 * 
 * @function initshowStartScreen
 * @throws {Error} If cleanup or canvas initialization fails.
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
 * Initializes the start screen canvas by clearing any previous drawings.
 * 
 * This function retrieves the `<canvas>` element with the ID `canvas` and,
 * if it exists, clears its 2D drawing context to prepare it for the start screen.
 * 
 * @function initshowStartScreenCanvas
 * @throws {Error} If the canvas element is not found or if the 2D context cannot be retrieved.
 */
function initshowStartScreenCanvas() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Handles keydown events to control the game and prevent default browser behavior.
 * 
 * This function listens for specific keyboard inputs used in the game:
 * - Arrow keys: "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"
 * - WASD keys: "KeyW", "KeyA", "KeyS", "KeyD"
 * - Action keys: "Space", "ControlLeft", "ControlRight"
 * 
 * When any of these keys are pressed:
 * 1. The default browser behavior is prevented (e.g., scrolling).
 * 2. The `keyboard` object is updated to reflect the key as pressed (`true`).
 * 3. The corresponding on-screen button (if any) is activated using `toggleButtonActive()`.
 * 
 * @listens keydown - Listens for keyboard input to control the game.
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
 * Handles keyup events to update the game input state and UI.
 * 
 * This function listens for all key releases:
 * 1. Marks the key as released (`false`) in the `keyboard` object.
 * 2. Deactivates the corresponding on-screen button (if any) using `toggleButtonActive()`.
 * 
 * @listens keyup - Tracks when a key is released to update the game state.
 * @param {KeyboardEvent} event - The keyup event object.
 */
window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
    toggleButtonActive(event.code, false);
});

/**
 * Initializes touch controls once the page has fully loaded.
 * 
 * This function waits for the `load` event, which fires when all assets
 * (images, scripts, styles, etc.) are fully loaded, and then calls
 * `initTouchControls()` to set up any mobile or touch-based input.
 * 
 * @listens load - Ensures all page resources are loaded before initializing touch controls.
 * @function
 */
window.addEventListener("load", () => {
    initTouchControls();
});

/**
 * Retrieves the DOM elements for all touch or on-screen control buttons.
 * 
 * This function returns an object mapping keyboard codes to their corresponding
 * touch button elements on the screen. This allows both arrow/WASD keys and
 * action keys (Space, Ctrl) to be controlled via touch input.
 * 
 * @function getTouchButtons
 * @returns {Object.<string, HTMLElement|null>} An object where the keys are keyboard codes
 *   (e.g., "ArrowUp", "KeyW", "Space") and the values are the corresponding button DOM elements.
 *   If an element is not found, the value will be `null`.
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
 * Creates handlers for pressing and releasing keys, updating both the keyboard state and UI.
 * 
 * This function returns an object containing two functions:
 * - `press(key)`: Marks the specified key as pressed (`true`) in the `keyboard` object
 *   and activates the corresponding on-screen button via `toggleButtonActive()`.
 * - `release(key)`: Marks the specified key as released (`false`) in the `keyboard` object
 *   and deactivates the corresponding on-screen button.
 * 
 * These handlers are typically used for touch or on-screen button input.
 * 
 * @function createPressReleaseHandlers
 * @returns {Object} An object with two methods:
 *   @property {function(string): void} press - Handles pressing a key.
 *   @property {function(string): void} release - Handles releasing a key.
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
 * 
 * This function iterates over a mapping of keyboard codes to DOM elements (`buttons`)
 * and attaches event listeners for each button:
 * - `touchstart` / `mousedown`: Calls the `press` handler for the key.
 * - `touchend` / `mouseup` / `mouseleave`: Calls the `release` handler for the key.
 * 
 * The `preventDefault()` method is used on touch events to avoid scrolling or
 * other default browser behavior when interacting with the buttons.
 * 
 * @function bindTouchEvents
 * @param {Object.<string, HTMLElement|null>} buttons - An object mapping keyboard codes to DOM button elements.
 * @param {function(string): void} press - Function to call when a key is pressed.
 * @param {function(string): void} release - Function to call when a key is released.
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
 * 
 * This function performs the following steps:
 * 1. Retrieves the DOM elements for all touch buttons using `getTouchButtons()`.
 * 2. Creates press and release handlers for updating the `keyboard` state and UI via `createPressReleaseHandlers()`.
 * 3. Binds touch and mouse events to the buttons using `bindTouchEvents()`.
 * 
 * This allows players to control the game via touch or mouse input, simulating keyboard events.
 * 
 * @function initTouchControls
 */
function initTouchControls() {
    const buttons = getTouchButtons();
    const { press, release } = createPressReleaseHandlers();
    bindTouchEvents(buttons, press, release);
}

/**
 * Maps a keyboard code to the corresponding on-screen button ID.
 * 
 * This function is used to identify which DOM element corresponds to
 * a given key code, including both arrow/WASD keys and action keys like
 * Space or Ctrl. It is useful for highlighting or toggling the active
 * state of touch or visual buttons.
 * 
 * @function getButtonId
 * @param {string} code - The keyboard code (e.g., "ArrowUp", "KeyW", "Space").
 * @returns {string|undefined} The ID of the corresponding button element, or `undefined` if not mapped.
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
 * 
 * This function returns the HTML element corresponding to the provided
 * button ID. If the ID is invalid or not provided, it returns `null`.
 * It is typically used to access on-screen buttons for touch or keyboard input.
 * 
 * @function getButtonElement
 * @param {string} btnId - The ID of the button element to retrieve.
 * @returns {HTMLElement|null} The DOM element with the given ID, or `null` if not found.
 */
function getButtonElement(btnId) {
    if (!btnId) return null;
    return document.getElementById(btnId);
}

/**
 * Toggles the "active" visual state of an on-screen button based on a key code.
 * 
 * This function performs the following steps:
 * 1. Maps the keyboard code to the corresponding button ID using `getButtonId()`.
 * 2. Retrieves the button DOM element using `getButtonElement()`.
 * 3. Adds the "active" class if `isActive` is `true`, or removes it if `false`.
 * 
 * This is used to visually indicate which keys are currently pressed,
 * supporting both keyboard and touch input.
 * 
 * @function toggleButtonActive
 * @param {string} code - The keyboard code (e.g., "ArrowUp", "KeyW", "Space").
 * @param {boolean} isActive - Whether the button should be marked as active (`true`) or inactive (`false`).
 */
function toggleButtonActive(code, isActive) {
    const btnId = getButtonId(code);
    const button = getButtonElement(btnId);
    if (!button) return;
    if (isActive) button.classList.add("active");
    else button.classList.remove("active");
}

/**
 * Toggles fullscreen mode for the game and updates the fullscreen button icon.
 * 
 * This function checks whether the document is currently in fullscreen:
 * - If not, it enters fullscreen mode for the element with ID `fullscreen` and
 *   changes the button icon to '✕'.
 * - If already in fullscreen, it exits fullscreen and changes the button icon to '⛶'.
 * 
 * The button loses focus after toggling to prevent accidental repeated activations.
 * 
 * @function fullscreen
 * @throws {Error} If entering or exiting fullscreen fails.
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
 * Requests fullscreen mode for a given DOM element.
 * 
 * This function attempts to make the specified element enter fullscreen
 * using standard and vendor-prefixed methods for cross-browser compatibility.
 * 
 * @function enterFullscreen
 * @param {HTMLElement} element - The DOM element to display in fullscreen.
 * @throws {Error} If the browser does not support fullscreen for the element.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

/**
 * Exits fullscreen mode for the document.
 * 
 * This function attempts to exit fullscreen using standard and vendor-prefixed
 * methods for cross-browser compatibility.
 * 
 * @function exitFullscreen
 * @throws {Error} If the browser does not support exiting fullscreen.
 */
function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

/**
 * Updates the fullscreen button icon when the fullscreen state changes.
 * 
 * This function listens for the `fullscreenchange` event on the document:
 * - If the document enters fullscreen, it updates the button icon to '✕'.
 * - If the document exits fullscreen, it updates the button icon to '⛶'.
 * 
 * This ensures the button always reflects the current fullscreen state.
 * 
 * @listens fullscreenchange - Fires whenever the document enters or exits fullscreen.
 * @function
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
 * Checks the device orientation and displays a warning if in portrait mode.
 * 
 * This function compares the window's height and width:
 * - If the height is greater than the width (portrait), it shows the
 *   element with ID `rotateWarning` by setting `display: flex`.
 * - If in landscape mode, it hides the warning by setting `display: none`.
 * 
 * @function checkOrientation
 * @throws {Error} If the `rotateWarning` element cannot be found in the DOM.
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
 * Ensures the device orientation is checked and the rotate warning is updated
 * whenever the window size or orientation changes, or when the page loads.
 * 
 * Listens to the following events:
 * - `resize`: Fires when the window is resized.
 * - `orientationchange`: Fires when the device orientation changes.
 * - `load`: Fires when the page has fully loaded.
 * 
 * @listens resize
 * @listens orientationchange
 * @listens load
 * @function
 */
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('load', checkOrientation);

/**
 * Displays the win overlay with the player's total score after a short delay.
 * 
 * This function waits 1 second before:
 * 1. Retrieving the overlay element with ID `winOverlay`.
 * 2. Updating the text content of the `scoreDiv` element to show the `totalScore`.
 * 3. Making the overlay visible by removing the `hidden` class.
 * 
 * @function showWinOverlay
 * @param {number} totalScore - The player's total score to display on the overlay.
 * @throws {Error} If the `winOverlay` or `scoreDiv` elements cannot be found in the DOM.
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
 * Displays the lose overlay after a short delay.
 * 
 * This function waits 1 second before retrieving the element with ID `loseOverlay`
 * and making it visible by removing the `hidden` class.
 * 
 * @function showLoseOverlay
 * @throws {Error} If the `loseOverlay` element cannot be found in the DOM.
 */
function showLoseOverlay() {
    setTimeout(() => {
        document.getElementById('loseOverlay').classList.remove('hidden');
    }, 1000);
}

/**
 * Hides all game overlays by adding the "hidden" class.
 * Skips any overlay that does not exist in the DOM.
 *
 * @returns {void}
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
 * Retrieves the DOM elements for menu and restart buttons in win and lose overlays.
 * 
 * This function returns an object containing references to the following buttons:
 * - `menuWin`: Menu button on the win overlay.
 * - `menuLose`: Menu button on the lose overlay.
 * - `restartWin`: Restart button on the win overlay.
 * - `restartLose`: Restart button on the lose overlay.
 * 
 * @function getMenuButtons
 * @returns {Object.<string, HTMLElement|null>} An object mapping button identifiers
 *   to their corresponding DOM elements. If an element is not found, the value will be `null`.
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
 * 
 * This function attaches the provided callback to the `click` event of the
 * specified button element. If the button does not exist (`null` or `undefined`),
 * the function does nothing.
 * 
 * @function bindOverlayButton
 * @param {HTMLElement|null} btn - The button DOM element to bind the click event to.
 * @param {Function} callback - The function to execute when the button is clicked.
 */
function bindOverlayButton(btn, callback) {
    if (!btn) return;
    btn.addEventListener('click', callback);
}

/**
 * Handles the menu button click by hiding all overlays and showing the start screen.
 * 
 * This function is typically used for both win and lose overlays to return the player
 * to the start screen when they click the menu button.
 * 
 * @function onMenuButtonClick
 */
function onMenuButtonClick() {
    hideOverlays();
    showStartScreen();
}

/**
 * Handles the restart button click by hiding all overlays and starting a new game.
 * 
 * This function is typically used for both win and lose overlays to restart the game
 * when the player clicks the restart button.
 * 
 * @function onRestartButtonClick
 */
function onRestartButtonClick() {
    hideOverlays();
    startGame();
}

/**
 * Initializes the overlay buttons by binding their respective click event handlers.
 * 
 * This function performs the following bindings:
 * - Win and lose menu buttons → `onMenuButtonClick()`
 * - Win and lose restart buttons → `onRestartButtonClick()`
 * 
 * It uses `getMenuButtons()` to retrieve the button elements and `bindOverlayButton()`
 * to attach the event listeners. This ensures the overlays respond correctly to user input.
 * 
 * @function initOverlayButtons
 */
function initOverlayButtons() {
    const buttons = getMenuButtons();
    bindOverlayButton(buttons.menuWin, onMenuButtonClick);
    bindOverlayButton(buttons.menuLose, onMenuButtonClick);
    bindOverlayButton(buttons.restartWin, onRestartButtonClick);
    bindOverlayButton(buttons.restartLose, onRestartButtonClick);
}

/**
 * Initializes overlay buttons once the DOM content is fully loaded.
 * 
 * This function waits for the `DOMContentLoaded` event and then calls
 * `initOverlayButtons()` to set up event handlers for menu and restart buttons
 * in the win and lose overlays.
 * 
 * @listens DOMContentLoaded - Ensures the overlay buttons are initialized after the DOM is ready.
 * @function
 */
document.addEventListener('DOMContentLoaded', () => {
    initOverlayButtons();
});

/**
 * Opens the burger menu by sliding it into view and enabling click detection outside the menu.
 *
 * This function:
 * - Selects the burger menu (`#burgerMenu`) and the overlay element (`#burgerOverlay`).
 * - Creates the overlay dynamically if it does not yet exist and appends it to the fullscreen container.
 * - Adds the `.active` class to both elements to trigger their visible/animated state via CSS.
 * - Registers a click listener on the overlay so that clicking outside the menu will close it.
 *
 * @function openBurgerMenu
 * @returns {void} This function does not return a value.
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
 * Closes the burger menu and removes its active visual state.
 *
 * This function:
 * - Selects the burger menu (`#burgerMenu`) and overlay (`#burgerOverlay`) elements.
 * - Removes the `.active` class from both elements, triggering the CSS transition
 *   that slides the menu out of view.
 * - Uses optional chaining (`?.`) to safely handle the case where the overlay
 *   might not exist in the DOM.
 *
 * @function closeBurgerMenu
 * @returns {void} This function does not return a value.
 */
function closeBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const overlay = document.getElementById('burgerOverlay');
    burgerMenu.classList.remove('active');
    overlay?.classList.remove('active');
}

/**
 * Initializes event listeners for the burger menu buttons after the DOM is fully loaded.
 *
 * This code:
 * - Waits for the `DOMContentLoaded` event to ensure all elements are available in the DOM.
 * - Selects the open button (`#openBurgerMenu`) and close button (`#closeBurgerMenu`).
 * - Attaches click event listeners to open and close the burger menu using the
 *   `openBurgerMenu` and `closeBurgerMenu` functions.
 *
 * @event DOMContentLoaded
 * @returns {void} This setup code does not return a value.
 */
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBurgerMenu');
    const closeBtn = document.getElementById('closeBurgerMenu');
    openBtn.addEventListener('click', openBurgerMenu);
    closeBtn.addEventListener('click', closeBurgerMenu);
});

/**
 * Fügt einen Klick-Listener auf den "Legal Notice"-Button hinzu, 
 * um das Legal-Overlay anzuzeigen. 
 * 
 * Das Overlay wird dynamisch ins DOM eingefügt, 
 * scrollt den Textcontainer nach oben und kann durch:
 * - Klick auf den "Back to Game"-Button oder
 * - Klick auf den Hintergrund
 * wieder geschlossen werden.
 *
 * @function
 * @returns {void}
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