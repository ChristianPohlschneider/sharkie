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
        this.character = new CharacterMovement(this);
        this.setWorld();
        this.draw();
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
     * Enables characters, coins, and poison bottles to access world properties and methods.
     */
    setWorld() {
        this.character.world = this;
        this.level.coins.forEach(coin => coin.setWorld(this));
        this.level.poisonBottles.forEach(bottle => bottle.setWorld(this));
    }

    /**
     * Creates a stoppable interval and stores its ID.
     * Wraps `setInterval` so all intervals can be cleared later.
     *
     * @param {Function} fn - Function to execute repeatedly.
     * @param {number} interval - Time in ms between executions.
     * @returns {number} The interval ID.
     */
    setStoppableInterval(fn, interval) {
        let id = setInterval(fn, interval);
        this.intervalIds.push(id);
        return id;
    }

    /**
     * Continuously checks for collisions between the character and enemies.
     * Applies damage, plays hurt sounds, and updates the status bar as needed.
     */
    checkCollision() {
        this.setStoppableInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (!this.character.isColliding(enemy)) return;
                if (this.character.isSlapping && enemy.damageFromFinSlap) {
                    enemy.hit(enemy.damageFromFinSlap);}
                if (!this.character.isSlapping || enemy instanceof JellyFish) {
                    if (!this.character.isDead())
                        soundManager.playEffect('img/assets/audio/hurtSharky.wav', 0);
                    this.character.hit(enemy.damageDueToCollision);
                    this.statusBar.setPercentage(this.character.energy);}
            });
        }, 200);}

    /**
     * Continuously checks for collisions between bubbles and level barriers.
     * Shrinks collided bubbles and removes collected ones from `shootableObject`.
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
     * Continuously checks for collisions between bubbles and enemies.
     * Handles hits on enemies with `spawnID` ≥ 8 and removes affected bubbles.
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
     * Handles a bubble hitting an enemy.
     * Applies damage (double if poisoned) and plays a hit sound.
     *
     * @param {Object} bubble - The bubble object (with `img` property).
     * @param {Object} enemy - The enemy object (with `damageFromBubble` and `hit()`).
     */
    handleBubbleHit(bubble, enemy) {
        const dmg = decodeURIComponent(bubble.img.src.split('/').pop()).includes('Poisoned Bubble')
            ? 2 * enemy.damageFromBubble
            : enemy.damageFromBubble;
        enemy.hit(dmg);
        if (soundManager) soundManager.playEffect('img/assets/audio/hit.wav', 0);
    }

    /**
     * Checks if bubbles exceed their range and handles shrinking or removal.
     * Shrinks out-of-range bubbles and removes collected ones from `shootableObject`.
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
     * Checks for collisions between the character and coins.
     * Handles collected coins and keeps uncollected ones in `level.coins`.
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
     * Handles character collision with a coin.
     * Updates coin count, wallet, total score, plays sound, and triggers coin shrinking.
     *
     * @param {Object} coin - The coin object.
     * @param {number} coin.coinValue - Value of the coin.
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
     * Continuously checks for collisions between the character and poison bottles.
     * Handles collisions and removes affected bottles from `level.poisonBottles`.
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
     * Handles character collision with a poison bottle.
     * Updates poison amount, poison bar, score, plays sound, and triggers bottle shrinking.
     *
     * @param {Object} poisonBottle - The poison bottle object.
     * @param {number} poisonBottle.poisonValue - Poison amount in the bottle.
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
     * Checks if the character is colliding with any level barrier.
     * Sets `isCollidingBarrier` to true if a collision is detected, otherwise false.
     */
    checkCollisionWithBarrier() {
        this.isCollidingBarrier = this.level.barriers.some(barrier =>
            this.character.isColliding(barrier)
        );
    }

    /**
     * Draws the game scene for the current frame.
     * Clears canvas, translates for camera, draws background, objects, HUD, and requests next frame.
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
     * Draws the background for the current frame with parallax or tiling.
     * Chooses frame based on `camera_xWidthModulo` and adds static background objects.
     */
    drawBackground() {
        if (this.camera_xWidthModulo % 2 === 0) this.gameLoopFrame2(this.camera_xWidthModulo);
        else this.gameLoopFrame1(this.camera_xWidthModulo);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    /**
     * Draws all game objects for the current frame.
     * Renders the character, enemies, bubbles, shrinking coins/poison bottles, barriers, and other shrinking objects.
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
     * Draws the HUD elements on the canvas.
     * Renders status bar, poison bar, and coin bar on top of the game world.
     */
    drawHUD() {
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
    }

    /**
     * Adds multiple objects to the canvas for rendering.
     * Calls `addToMap` on each object in the array.
     *
     * @param {Array<Object>} objects - Objects to render (should have `draw` or `drawImages`).
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Draws a single object on the canvas, flipping horizontally if `otherDirection` is true.
     *
     * @param {Object} object - Object to render, with `otherDirection` and `drawImages(ctx)` method.
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
     * Draws shrinking objects and filters out collected ones.
     * Returns only objects with `isCollected === false`.
     *
     * @param {Array<Object>} objects - Objects with `isCollected` and `drawShrinkingObjects(ctx)`.
     * @returns {Array<Object>} Objects that were drawn (not collected).
     */
    addShrinkingObjectsToMap(objects) {
        if (!objects) return [];
        let visibleObjects = objects.filter(o => !o.isCollected);
        visibleObjects.forEach(o => o.drawShrinkingObjects(this.ctx));
        return visibleObjects;
    }

    /**
     * Flips an object horizontally on the canvas.
     * Adjusts the canvas context and the object's x-coordinate.
     *
     * @param {Object} object - Object with `width` and `x` properties.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * Restores the canvas after a horizontal flip and resets the object's x-coordinate.
     * Should be called after `flipImage`.
     *
     * @param {Object} object - Object with `x` property (previously flipped).
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * Updates x-positions of background objects for continuous scrolling.
     * Positions objects based on their index for the first looping frame.
     *
     * @param {number} camera_xWidthModulo - Modulo of camera x position for loop offset.
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
     * Updates x-positions of background objects for the second looping frame.
     * Positions objects based on their index for continuous scrolling.
     *
     * @param {number} camera_xWidthModulo - Modulo of camera x position for loop offset.
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
     * Stops the game by clearing all intervals and cancelling the animation frame.
     * Resets `intervalIds` and `animationFrameId`.
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
     * Wrapper around `stopGame` to halt all loops and animations.
     */
    cleanup() {
        this.stopGame();
    }
}