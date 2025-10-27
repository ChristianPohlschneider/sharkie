class World {
    character;
    level;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    shootableObject = [];
    intervalIds = [];
    isCollidingBarrier = false;
    animationFrameId = null;
    camera_xWidthModulo = 0;
    totalScore = 0;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.character = new Character(this);
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.checkCollisionBubbleBarrier();
        this.checkCollisionFromBubble();
        this.checkBubbleOutOfRange();
        this.checkCollisionWithCoin();
        this.checkCollisionWithPoisonBottle();
        this.checkCollisionWithBarrier();
    }

    /**
     * Assigns this World instance to all relevant game objects.
     * 
     * This allows the character, coins, and poison bottles to reference 
     * the world, enabling interactions and access to shared properties 
     * and methods.
     */
    setWorld() {
        this.character.world = this;
        this.level.coins.forEach(coin => coin.setWorld(this));
        this.level.poisonBottles.forEach(bottle => bottle.setWorld(this));
    }

    /**
     * Creates a stoppable interval and keeps track of its ID.
     * 
     * This method wraps `setInterval` and stores the returned interval ID
     * in `this.intervalIds` so that all intervals can later be cleared
     * with a single call if needed.
     *
     * @param {Function} fn - The function to execute repeatedly.
     * @param {number} interval - The time in milliseconds between executions.
     * @returns {number} The ID of the created interval.
     */
    setStoppableInterval(fn, interval) {
        let id = setInterval(fn, interval);
        this.intervalIds.push(id);
        return id;
    }

    /**
     * Continuously checks for collisions between the character and enemies.
     * 
     * If a collision occurs:
     * - Applies damage from the character's fin slap if slapping and the enemy can be hit.
     * - Otherwise, plays a hurt sound and applies collision damage to the character.
     * - Updates the status bar with the character's current energy.
     *
     * The collision check runs repeatedly every 200ms using `setStoppableInterval`.
     *
     * @returns {void}
     */
    checkCollision() {
        this.setStoppableInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (!this.character.isColliding(enemy)) return;
                if (this.character.isSlapping && enemy.damageFromFinSlap) {
                    enemy.hit(enemy.damageFromFinSlap);
                }
                if (!this.character.isSlapping || enemy instanceof JellyFish) {
                    if (!this.character.isDead())
                        soundManager.playEffect('img/assets/audio/hurtSharky.wav', 0);
                    this.character.hit(enemy.damageDueToCollision);
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }, 200);
    }

    /**
     * Continuously checks for collisions between shootable objects (bubbles) and level barriers.
     * 
     * For each bubble:
     * - If it collides with a barrier and is not already shrinking, triggers the `shrinkOut` animation.
     * - If the bubble has been collected (finished shrinking), it is removed from the `shootableObject` array.
     *
     * The collision check runs repeatedly every 50ms using `setStoppableInterval`.
     *
     * @returns {void}
     */
    checkCollisionBubbleBarrier() {
        this.setStoppableInterval(() => {
            for (let i = this.shootableObject.length - 1; i >= 0; i--) {
                const bubble = this.shootableObject[i];
                const collided = this.level.barriers.some(barrier => barrier.isColliding(bubble));
                if (collided && !bubble.isShrinking) bubble.shrinkOut();
                if (bubble.isCollected) this.shootableObject.splice(i, 1);
            }
        }, 50);
    }

    /**
     * Continuously checks for collisions between the player's shootable objects (bubbles) and enemies.
     *
     * For each bubble:
     * - Iterates through all enemies in the level.
     * - If a bubble collides with an enemy whose `spawnID` is 8 or higher, it triggers `handleBubbleHit` for that enemy.
     * - The bubble is removed from `shootableObject` if it hits any enemy.
     *
     * The collision check runs repeatedly every 200ms using `setStoppableInterval`.
     *
     * @returns {void}
     */
    checkCollisionFromBubble() {
        this.setStoppableInterval(() => {
            this.shootableObject = this.shootableObject.filter(bubble => {
                let hit = false;
                this.level.enemies.forEach(enemy => {
                    if (enemy.isColliding(bubble) && enemy.spawnID >= 8) {
                        this.handleBubbleHit(bubble, enemy);
                        hit = true;
                    }
                });
                return !hit;
            });
        }, 200);
    }

    /**
     * Handles the effect of a bubble hitting an enemy.
     *
     * Determines the damage based on whether the bubble is poisoned:
     * - Poisoned bubbles deal double the enemy's normal bubble damage.
     * - Regular bubbles deal normal bubble damage.
     * 
     * Applies the damage to the enemy and plays a hit sound effect if the `soundManager` is available.
     *
     * @param {Object} bubble - The bubble object that collided with the enemy. Expected to have an `img` property.
     * @param {Object} enemy - The enemy object that was hit. Expected to have `damageFromBubble` and `hit()` method.
     * @returns {void}
     */
    handleBubbleHit(bubble, enemy) {
        const dmg = decodeURIComponent(bubble.img.src.split('/').pop()).includes('Poisoned Bubble')
            ? 2 * enemy.damageFromBubble
            : enemy.damageFromBubble;
        enemy.hit(dmg);
        if (soundManager) soundManager.playEffect('img/assets/audio/hit.wav', 0);
    }

    /**
     * Checks if any shootable bubble has moved beyond its allowed range.
     *
     * Iterates through all active shootable objects (bubbles) and:
     * - Shrinks bubbles that exceed their `maxRange` or fall below `minRange` if they are not already shrinking.
     * - Removes bubbles from the `shootableObject` array if they are marked as collected.
     *
     * This function is called repeatedly using a stoppable interval (every 50ms).
     *
     * @returns {void}
     */
    checkBubbleOutOfRange() {
        this.setStoppableInterval(() => {
            for (let i = this.shootableObject.length - 1; i >= 0; i--) {
                const bubble = this.shootableObject[i];
                if ((bubble.x > bubble.maxRange || bubble.x < bubble.minRange) && !bubble.isShrinking) {
                    bubble.shrinkOut();
                }
                if (bubble.isCollected) {
                    this.shootableObject.splice(i, 1);
                }
            }
        }, 50);
    }

    /**
     * Checks for collisions between the character and coins in the level.
     *
     * Iterates through all active coins and:
     * - If the character collides with a coin, calls `handleCoinCollision(coin)` and removes the coin from the level.
     * - Keeps coins that are not collected in the `level.coins` array.
     *
     * This function runs repeatedly using a stoppable interval (every 200ms).
     *
     * @returns {void}
     */
    checkCollisionWithCoin() {
        this.setStoppableInterval(() => {
            this.level.coins = this.level.coins.filter(coin => {
                if (this.character.isColliding(coin)) {
                    this.handleCoinCollision(coin);
                    return false;
                }
                return true;
            });
        }, 200);
    }

    /**
     * Handles the effects when the character collides with a coin.
     *
     * This function performs the following actions:
     * 1. Updates the coin count in the coin bar by the coin's value.
     * 2. Updates the wallet display based on the current coin count.
     * 3. Plays a coin collection sound effect (if the sound manager is available).
     * 4. Adds the coin's score to the total score.
     * 5. Triggers the coin's shrinking animation and adds it to the level's shrinking objects array.
     *
     * @param {Object} coin - The coin object that the character has collided with.
     * @param {number} coin.coinValue - The value of the coin to add to the coin bar.
     * @returns {void}
     */
    handleCoinCollision(coin) {
        this.coinBar.coinCount(coin.coinValue);
        this.coinBar.setWalletAmount(this.coinBar.wallet);
        if (soundManager) soundManager.playEffect('img/assets/audio/coin.wav', 0);
        this.totalScore += this.coinBar.score;
        coin.shrinkOut();
        this.level.shrinkingObjects.push(coin);
    }

    /**
     * Continuously checks for collisions between the character and poison bottles in the level.
     *
     * This function sets a stoppable interval that runs every 200ms. For each poison bottle:
     * 1. If the character collides with the poison bottle, it calls `handlePoisonBottleCollision` on that bottle.
     * 2. Removes the collided poison bottle from the level's poisonBottles array.
     *
     * @returns {void}
     */
    checkCollisionWithPoisonBottle() {
        this.setStoppableInterval(() => {
            this.level.poisonBottles = this.level.poisonBottles.filter(poisonBottle => {
                if (this.character.isColliding(poisonBottle)) {
                    this.handlePoisonBottleCollision(poisonBottle);
                    return false;
                }
                return true;
            });
        }, 200);
    }

    /**
     * Handles the logic when the character collides with a poison bottle.
     *
     * Actions performed:
     * 1. Increases the character's poison amount by the bottle's `poisonValue`.
     * 2. Updates the poison bar display to reflect the new venomSac value.
     * 3. Plays an acid sound effect if the sound manager is available.
     * 4. Adds the poison bar's score to the total score.
     * 5. Shrinks the poison bottle and moves it to the level's shrinkingObjects array.
     *
     * @param {Object} poisonBottle - The poison bottle object that the character collided with.
     * @param {number} poisonBottle.poisonValue - The amount of poison in the bottle.
     * @returns {void}
     */
    handlePoisonBottleCollision(poisonBottle) {
        this.poisonBar.poisonCount(poisonBottle.poisonValue);
        this.poisonBar.setPoisonAmount(this.poisonBar.venomSac);
        if (soundManager) soundManager.playEffect('img/assets/audio/acid.wav', 0);
        this.totalScore += this.poisonBar.score;
        poisonBottle.shrinkOut();
        this.level.shrinkingObjects.push(poisonBottle);
    }

    /**
     * Checks whether the character is currently colliding with any barrier in the level.
     *
     * Sets the `isCollidingBarrier` flag to `true` if a collision with any barrier is detected,
     * otherwise sets it to `false`.
     *
     * @returns {void}
     */
    checkCollisionWithBarrier() {
        this.isCollidingBarrier = this.level.barriers.some(barrier =>
            this.character.isColliding(barrier)
        );
    }

    /**
     * Draws the entire game scene for the current frame.
     *
     * This method performs the following steps:
     * 1. Clears the canvas to prepare for a new frame.
     * 2. Translates the canvas context based on the camera's X position.
     * 3. Updates `camera_xWidthModulo` for background tiling calculations.
     * 4. Draws the background and all game objects.
     * 5. Resets the canvas translation for HUD drawing.
     * 6. Draws the HUD (e.g., health bars, scores).
     * 7. Requests the next animation frame to continuously update the scene.
     *
     * @returns {void}
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.camera_xWidthModulo = Math.floor(-this.camera_x / 720);
        this.drawBackground();
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawHUD();
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws the background for the current frame, handling parallax or tiling.
     *
     * This method performs the following actions:
     * 1. Chooses a background frame based on the camera's horizontal position modulo (`camera_xWidthModulo`):
     *    - Even modulo → `gameLoopFrame2`
     *    - Odd modulo → `gameLoopFrame1`
     * 2. Adds static background objects from `level.backgroundObjects` to the map.
     *
     * @returns {void}
     */
    drawBackground() {
        if (this.camera_xWidthModulo % 2 === 0) this.gameLoopFrame2(this.camera_xWidthModulo);
        else this.gameLoopFrame1(this.camera_xWidthModulo);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    /**
     * Draws all game objects onto the canvas for the current frame.
     *
     * This method performs the following actions in order:
     * 1. Draws the player character (`this.character`).
     * 2. Draws all enemies in the current level.
     * 3. Draws all active shootable objects (e.g., bubbles).
     * 4. Draws coins and poison bottles that are shrinking (collected or disappearing).
     * 5. Draws level barriers.
     * 6. Updates and draws any other shrinking objects in the level.
     *
     * @returns {void}
     */
    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObject);
        this.addShrinkingObjectsToMap(this.level.coins);
        this.addShrinkingObjectsToMap(this.level.poisonBottles);
        this.addObjectsToMap(this.level.barriers);
        this.level.shrinkingObjects = this.addShrinkingObjectsToMap(this.level.shrinkingObjects);
    }

    /**
     * Draws the Heads-Up Display (HUD) elements on the canvas.
     *
     * This includes:
     * 1. The player's status bar (`this.statusBar`), showing health or energy.
     * 2. The poison bar (`this.poisonBar`), indicating collected poison/venom.
     * 3. The coin bar (`this.coinBar`), showing the current coin count.
     *
     * HUD elements are drawn on top of the game world and are not affected
     * by camera movement.
     *
     * @returns {void}
     */
    drawHUD() {
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
    }

    /**
     * Adds multiple objects to the canvas for rendering.
     *
     * Iterates over an array of game objects and calls `addToMap` on each,
     * which handles drawing them to the canvas.
     *
     * @param {Array<Object>} objects - An array of objects to render.
     * Each object is expected to have a `draw` or `drawImages` method.
     *
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Draws a single object on the canvas, handling horizontal flipping if necessary.
     *
     * If the object has `otherDirection` set to true, its image is flipped horizontally
     * before drawing and flipped back afterward to maintain canvas state.
     *
     * @param {Object} object - The object to render on the canvas. Expected to have:
     *   - {boolean} otherDirection - Indicates if the object should be drawn flipped.
     *   - {function} drawImages(ctx) - Function that draws the object on the given canvas context.
     *
     * @returns {void}
     */
    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.drawImages(this.ctx);
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    /**
     * Draws shrinking objects on the canvas and filters out collected ones.
     *
     * Only objects that have not been collected (`isCollected === false`) are drawn.
     * Returns a new array containing only the visible (not collected) objects.
     *
     * @param {Array<Object>} objects - Array of objects to draw. Each object is expected to have:
     *   - {boolean} isCollected - Whether the object has been collected.
     *   - {function} drawShrinkingObjects(ctx) - Function to draw the object on the canvas.
     *
     * @returns {Array<Object>} Array of objects that were drawn (not collected).
     */
    addShrinkingObjectsToMap(objects) {
        if (!objects) return [];
        let visibleObjects = objects.filter(o => !o.isCollected);
        visibleObjects.forEach(o => o.drawShrinkingObjects(this.ctx));
        return visibleObjects;
    }

    /**
     * Flips an object horizontally on the canvas.
     *
     * This is typically used to draw objects facing the opposite direction.
     * It transforms the canvas context and modifies the object's x-coordinate.
     *
     * @param {Object} object - The object to flip. Expected to have:
     *   - {number} width - Width of the object for translation.
     *   - {number} x - Current x-coordinate of the object.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * Restores the canvas after a horizontal flip and resets the object's x-coordinate.
     *
     * This should be called after `flipImage` to draw the object normally again.
     *
     * @param {Object} object - The object to unflip. Expected to have:
     *   - {number} x - Current x-coordinate of the object (flipped previously).
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * Updates the x-positions of the background objects for the first looping frame.
     *
     * This function is used to create a continuous background scrolling effect.
     * Objects with indices 0–4 are positioned to the right of the viewport,
     * while objects with indices 15 and higher are positioned to the left.
     *
     * @param {number} camera_xWidthModulo - The modulo value based on the camera's x position
     *   used to determine the current background loop offset.
     */
    gameLoopFrame1(camera_xWidthModulo) {
        for (let backgroundLoopIndex = 0; backgroundLoopIndex < 5; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = 720 + camera_xWidthModulo * 720;
        }
        for (let backgroundLoopIndex = 15; backgroundLoopIndex < this.level.backgroundObjects.length; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = -720 + camera_xWidthModulo * 720;
        }
    }

    /**
     * Updates the x-positions of the background objects for the second looping frame.
     *
     * This function is used to create a continuous background scrolling effect.
     * Objects with indices 5–9 are positioned to the right of the viewport,
     * while objects with indices 10–14 are positioned to the left.
     *
     * @param {number} camera_xWidthModulo - The modulo value based on the camera's x position
     *   used to determine the current background loop offset.
     */
    gameLoopFrame2(camera_xWidthModulo) {
        for (let backgroundLoopIndex = 5; backgroundLoopIndex < 10; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = 720 + camera_xWidthModulo * 720;
        }
        for (let backgroundLoopIndex = 10; backgroundLoopIndex < 15; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = -720 + camera_xWidthModulo * 720;
        }
    }

    /**
     * Stops the game by clearing all active intervals and cancelling the animation frame.
     *
     * This function:
     * 1. Iterates over all interval IDs stored in `this.intervalIds` and clears them.
     * 2. Resets the `intervalIds` array to empty.
     * 3. Cancels the main game animation frame if one exists and resets `animationFrameId` to null.
     *
     * @method stopGame
     */
    stopGame() {
        this.intervalIds.forEach(clearInterval);
        this.intervalIds = [];
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * Cleans up the game by stopping all intervals and animations.
     *
     * This method is a wrapper around `stopGame` and ensures that
     * all ongoing game loops and animations are halted.
     *
     * @method cleanup
     */
    cleanup() {
        this.stopGame();
    }
}