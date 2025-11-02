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