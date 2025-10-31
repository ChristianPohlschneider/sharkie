class Character extends MovableObject {
    x = 100;
    y = 150;
    height = 200;
    width = 200;
    speed = 3;
    interval = 1000 / 60;
    speedY = 0;
    accelerationY = 0.05;
    energy = 1000;
    isShooting = false;
    lastShot = 0;
    shootFrameCounter = 0;
    shootCooldown = 1200;
    damageFromCollision = 5;
    isSlapping = false;
    hadFirstContact = false;
    cameraFrozen = false;
    deathSoundPlayed = false;
    hasPlayedBubbleSound = false;
    slapAnimationFrame = 0;
    hasPlayedSlapSound = false;
    idleAnimationFrame = 0;
    hasPlayedIdleSound = false;
    lastIdleTime = null;
    isLongIdlePlayed = false;
    currentSharkyAnimation = null;

    offset = {
        top: 105,
        left: 40,
        right: 45,
        bottom: 50
    };

    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png',
    ];

    IMAGES_BUBBLE_TRAP = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    IMAGES_BUBBLE_TRAP_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];

    IMAGES_FINSLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ]

    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];

    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];
    world;
    level;

    constructor(world) {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_BUBBLE_TRAP);
        this.loadImages(this.IMAGES_BUBBLE_TRAP_POISON);
        this.loadImages(this.IMAGES_FINSLAP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.animate();
    }

    /**
     * Starts the animation and game logic loops for the character.
     * 
     * This method sets up multiple stoppable intervals within the world:
     * 1. **Movement and collision loop (≈60 FPS)** – Checks if the character is dead,
     *    handles collisions with barriers, and updates movement in all directions
     *    based on screen limits.
     * 2. **State and action loop (every 200ms)** – Handles shooting, death state,
     *    hurt state, and switches between movement or idle animations.
     * 3. **Action loop (every 80ms)** – Processes shooting and slap actions if possible,
     *    and resets the slap state if the action cannot be performed.
     * 
     * This function keeps the character responsive to both player input and game world
     * interactions.
     * 
     * @method animate
     */
    animate() {
        this.world.setStoppableInterval(() => {
            if (this.isDead()) return;
            this.world.checkCollisionWithBarrier();
            const { leftLimit, rightLimit } = this.getScreenLimits();
            this.handleRightMovement(rightLimit);
            this.handleLeftMovement(leftLimit);
            this.handleUpMovement();
            this.handleDownMovement();
        }, 1000 / 60);

        this.world.setStoppableInterval(() => {
            const now = Date.now();
            this.handleShooting(now);
            this.handleDeathState();
            this.handleHurtState();
            this.handleMovementOrIdle(now);
        }, 200);

        this.world.setStoppableInterval(() => {
            // if (this.canShoot()) this.handleShootingAction();
            // if (this.canSlap()) this.handleSlapAction();
            // else this.resetSlapState();

            // Handle shooting normally

            if (this.canShoot()) this.handleShootingAction();

            // Wenn gerade Slap läuft → weiter animieren
            if (this.isSlapping) {
                this.handleSlapAction();
                return;
            }

            // Wenn Taste gedrückt und kein Slap aktiv → Slap starten
            if (this.canSlap() && !this.isSlapping) {
                this.handleSlapAction();
                return;
            }
        }, 80);
    }

    /**
     * Calculates the horizontal movement limits for the character based on camera state.
     * 
     * This method returns an object containing:
     * - `leftLimit`: The minimum X-coordinate the character can move to.
     * - `rightLimit`: The maximum X-coordinate the character can move to.
     * 
     * If the camera is frozen, the limits are adjusted relative to the freeze point
     * near the end of the level; otherwise, they extend from -50 to the level's end X-coordinate.
     * 
     * @method getScreenLimits
     * @returns {Object} An object with `leftLimit` and `rightLimit` properties.
     * @returns {number} return.leftLimit - The minimum allowed X-coordinate for the character.
     * @returns {number} return.rightLimit - The maximum allowed X-coordinate for the character.
     */
    getScreenLimits() {
        const freezePoint = this.world.level.level_end_x - 450;
        return {
            leftLimit: this.cameraFrozen ? freezePoint - 130 : -50,
            rightLimit: this.cameraFrozen ? freezePoint + 450 : this.world.level.level_end_x
        };
    }

    /**
     * Handles the character's movement to the right.
     * 
     * This method checks for rightward input (ArrowRight or KeyD), ensures the character
     * does not exceed the `rightLimit`, and verifies collision conditions with barriers.
     * If movement is allowed:
     * - The character's X-coordinate is increased by `speed`.
     * - The camera is updated based on the current position relative to the freeze point.
     * - The speed is reset to 3.
     * - Any final enemies that should spawn are triggered.
     * - The character's direction state (`otherDirection`) is set to `false`.
     * 
     * @method handleRightMovement
     * @param {number} rightLimit - The maximum X-coordinate the character can move to.
     */
    handleRightMovement(rightLimit) {
        const freezePoint = this.world.level.level_end_x - 450;
        const kb = this.world.keyboard;
        if ((kb.ArrowRight || kb.KeyD) && this.x < rightLimit && (!this.world.isCollidingBarrier || this.otherDirection)) {
            this.x += this.speed;
            this.updateCameraOnMove(freezePoint, false);
            this.speed = 3;
            this.triggerFinalEnemies();
            this.otherDirection = false;
        }
    }

    /**
     * Handles the character's movement to the left.
     * 
     * This method checks for leftward input (ArrowLeft or KeyA), ensures the character
     * does not go below the `leftLimit`, and verifies collision conditions with barriers.
     * If movement is allowed:
     * - The character's X-coordinate is decreased by `speed`.
     * - The camera is updated based on the current position relative to the freeze point.
     * - The speed is reset to 3.
     * - The character's direction state (`otherDirection`) is set to `true`.
     * 
     * @method handleLeftMovement
     * @param {number} leftLimit - The minimum X-coordinate the character can move to.
     */
    handleLeftMovement(leftLimit) {
        const freezePoint = this.world.level.level_end_x - 450;
        const kb = this.world.keyboard;
        if ((kb.ArrowLeft || kb.KeyA) && this.x > leftLimit && (!this.world.isCollidingBarrier || !this.otherDirection)) {
            this.x -= this.speed;
            this.updateCameraOnMove(freezePoint, true);
            this.speed = 3;
            this.otherDirection = true;
        }
    }

    /**
     * Updates the camera position based on the character's movement.
     * 
     * This method adjusts `world.camera_x` depending on the character's X-coordinate
     * and whether the camera is frozen:
     * - If the camera is not frozen, the character has reached the freeze point,
     *   and is moving right, the camera is frozen near the end of the level.
     * - Otherwise, the camera follows the character with a horizontal offset of 100.
     * 
     * @method updateCameraOnMove
     * @param {number} freezePoint - The X-coordinate near the end of the level where the camera should freeze.
     * @param {boolean} movingLeft - Indicates whether the character is moving left.
     */
    updateCameraOnMove(freezePoint, movingLeft) {
        if (!this.cameraFrozen && this.x >= freezePoint && !movingLeft) {
            this.world.camera_x = -freezePoint + 100;
            this.cameraFrozen = true;
        } else if (!this.cameraFrozen) {
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Handles the character's upward movement.
     * 
     * This method checks for upward input (ArrowUp or KeyW) and ensures:
     * - The character's Y-coordinate stays above -80.
     * - There is no collision at the target position above the character.
     * 
     * If movement is allowed, the character's Y-coordinate is decreased by `speed`.
     * 
     * @method handleUpMovement
     */
    handleUpMovement() {
        const kb = this.world.keyboard;
        if ((kb.ArrowUp || kb.KeyW) && this.y > -80 && !this.collidesAt(this.x, this.y - this.speed)) {
            this.y -= this.speed;
        }
    }

    /**
     * Handles the character's downward movement.
     * 
     * This method checks for downward input (ArrowDown or KeyS) and ensures:
     * - The character's Y-coordinate does not exceed 300.
     * - There is no collision at the target position below the character.
     * 
     * If movement is allowed, the character's Y-coordinate is increased by `speed`.
     * 
     * @method handleDownMovement
     */
    handleDownMovement() {
        const kb = this.world.keyboard;
        if ((kb.ArrowDown || kb.KeyS) && this.y < 300 && !this.collidesAt(this.x, this.y + this.speed)) {
            this.y += this.speed;
        }
    }

    /**
     * Checks if the character would collide with any barriers at a given position.
     * 
     * This method iterates through all barriers in the current level and uses
     * `isColliding` to determine if the character would collide at the specified
     * `x` and `y` coordinates.
     * 
     * @method collidesAt
     * @param {number} x - The X-coordinate to check for potential collisions.
     * @param {number} y - The Y-coordinate to check for potential collisions.
     * @returns {boolean} `true` if the character would collide with any barrier, otherwise `false`.
     */
    collidesAt(x, y) {
        return this.world.level.barriers.some(barrier => this.isColliding(barrier, x, y));
    }

    /**
     * Triggers the final enemies when the character reaches near the end of the level.
     * 
     * This method checks if the character's X-coordinate is past the trigger point
     * (level end minus 450) and ensures this trigger has not occurred before (`hadFirstContact`).
     * If conditions are met:
     * - The final boss is added using `setFinalEnemie()`.
     * - Other existing enemies are removed behind the player using `deleteOtherEnemies()`.
     * - The `hadFirstContact` flag is set to `true` to prevent retriggering.
     * 
     * @method triggerFinalEnemies
     */
    triggerFinalEnemies() {
        const levelEnd = this.world.level.level_end_x;
        if (this.x > levelEnd - 450 && !this.hadFirstContact) {
            setFinalEnemie(this.world, levelEnd - 150);
            deleteOtherEnemies(this.world, levelEnd - 720);
            this.hadFirstContact = true;
        }
    }

    /**
     * Determines whether the character is currently able to shoot.
     * 
     * This method returns `true` if all of the following conditions are met:
     * - The character is in a shooting state (`isShooting`).
     * - The character is not hurt (`isHurt()` returns false).
     * - The character is not dead (`isDead()` returns false).
     * 
     * @method canShoot
     * @returns {boolean} `true` if the character can shoot, otherwise `false`.
     */
    canShoot() {
        return this.isShooting && !this.isHurt() && !this.isDead();
    }

    /**
     * Determines whether the character is currently able to perform a slap action.
     * 
     * This method returns `true` if all of the following conditions are met:
     * - The player is pressing either the left or right Control key.
     * - The character is not hurt (`isHurt()` returns false).
     * - The character is not dead (`isDead()` returns false).
     * 
     * @method canSlap
     * @returns {boolean} `true` if the character can perform a slap, otherwise `false`.
     */
    canSlap() {
        const kb = this.world.keyboard;
        return (kb.ControlLeft || kb.ControlRight) && !this.isHurt() && !this.isDead();
    }

    /**
     * Handles the character's shooting animation and logic for each frame.
     * 
     * This method performs the following actions:
     * 1. Increments the `shootFrameCounter`.
     * 2. Plays the bubble sound once if it hasn't been played yet.
     * 3. Chooses the correct shooting image set depending on whether the character
     *    has poison available (`IMAGES_BUBBLE_TRAP_POISON` or `IMAGES_BUBBLE_TRAP`).
     * 4. Plays the shooting animation using the selected images.
     * 5. Increments the `currentShootImage` index.
     * 6. Calls `finishShooting()` if the last image in the sequence has been displayed.
     * 
     * @method handleShootingAction
     */
    handleShootingAction() {
        this.shootFrameCounter++;
        if (!this.hasPlayedBubbleSound) this.playBubbleSound();
        const isPoison = this.world.poisonBar.venomSac > 0;
        const shootImages = isPoison ? this.IMAGES_BUBBLE_TRAP_POISON : this.IMAGES_BUBBLE_TRAP;
        this.playShootAnimation(shootImages);
        this.currentShootImage++;
        if (this.currentShootImage >= shootImages.length) this.finishShooting();
    }

    /**
     * Plays the appropriate bubble sound effect based on the character's venom state.
     * 
     * This method checks if the character has venom available (`venomSac > 0`) and
     * selects the corresponding sound file:
     * - Poison bubble sound if venom is available.
     * - Regular bubble sound otherwise.
     * 
     * The sound is played via the `soundManager` with a volume of 200, and
     * `hasPlayedBubbleSound` is set to `true` to prevent replay during the same action.
     * 
     * @method playBubbleSound
     */
    playBubbleSound() {
        const hasVenom = this.world.poisonBar.venomSac > 0;
        const soundPath = hasVenom
            ? 'img/assets/audio/poisonBubble.wav'
            : 'img/assets/audio/bubble.wav';
        soundManager.playEffect(soundPath, 200);
        this.hasPlayedBubbleSound = true;
    }

    /**
     * Finalizes the shooting action for the character.
     * 
     * This method performs the following steps:
     * 1. Calls `bubbleShot()` to create or launch the bubble projectile.
     * 2. Sets `isShooting` to `false` to indicate the shooting action has ended.
     * 3. Resets `currentShootImage` and `shootFrameCounter` to prepare for the next shot.
     * 4. Resets `hasPlayedBubbleSound` to allow the bubble sound to play on the next shot.
     * 
     * @method finishShooting
     */
    finishShooting() {
        this.bubbleShot();
        this.isShooting = false;
        this.currentShootImage = 0;
        this.shootFrameCounter = 0;
        this.hasPlayedBubbleSound = false;
    }


    // handleSlapAction() {
    //     if (!this.isSlapping) {
    //         this.isSlapping = true;
    //         this.slapAnimationFrame = 0;
    //         this.hasPlayedSlapSound = false;
    //     }
    //     if (!this.hasPlayedSlapSound) this.playSlapSound();
    //     this.playAnimation(this.IMAGES_FINSLAP);
    //     this.finSlap();
    //     this.slapAnimationFrame++;
    //     if (this.slapAnimationFrame >= this.IMAGES_FINSLAP.length) this.finishSlap();
    // }
    handleSlapAction() {
        // Start der Animation
        if (!this.isSlapping) {
            this.isSlapping = true;
            this.slapAnimationFrame = 0;
            this.hasPlayedSlapSound = false;
        }

        // Sound nur einmal pro Schlag
        if (!this.hasPlayedSlapSound) this.playSlapSound();

        // Animation abspielen
        this.playAnimation(this.IMAGES_FINSLAP);
        this.finSlap();

        this.slapAnimationFrame++;

        // Ende erreicht? -> Animation abschließen
        if (this.slapAnimationFrame >= this.IMAGES_FINSLAP.length) {
            this.finishSlap();
        }
    }

    /**
     * Plays the slap sound effect for the character.
     * 
     * This method triggers the slap audio via `soundManager` and sets
     * `hasPlayedSlapSound` to `true` to prevent replay during the same slap action.
     * 
     * @method playSlapSound
     */
    playSlapSound() {
        soundManager.playEffect('img/assets/audio/slap.m4a', 0);
        this.hasPlayedSlapSound = true;
    }

    /**
     * Finalizes the slap action for the character.
     * 
     * This method performs the following steps:
     * 1. Sets `isSlapping` to `false` to indicate the slap action has ended.
     * 2. Resets the slap animation frame counter (`slapAnimationFrame`) to 0.
     * 3. Resets `hasPlayedSlapSound` to allow the slap sound to play on the next action.
     * 4. Calls `resetOffsets()` to restore any temporary position or visual offsets applied during the slap.
     * 
     * @method finishSlap
     */
    // finishSlap() {
    //     this.isSlapping = false;
    //     this.slapAnimationFrame = 0;
    //     this.hasPlayedSlapSound = false;
    //     this.resetOffsets();
    // }
    finishSlap() {
        this.isSlapping = false;
        this.slapAnimationFrame = 0;
        this.hasPlayedSlapSound = false;
        this.resetOffsets();
    }

    /**
     * Resets the character's slap state to its default values.
     * 
     * This method ensures that the slap action is completely cleared, including:
     * 1. Setting `isSlapping` to `false`.
     * 2. Resetting the slap animation frame counter (`slapAnimationFrame`) to 0.
     * 3. Resetting `hasPlayedSlapSound` to allow the slap sound to play again.
     * 4. Calling `resetOffsets()` to restore any temporary position or visual offsets.
     * 
     * This method is useful for canceling a slap action or ensuring a clean state.
     * 
     * @method resetSlapState
     */
    resetSlapState() {
        this.isSlapping = false;
        this.slapAnimationFrame = 0;
        this.hasPlayedSlapSound = false;
        this.resetOffsets();
    }

    /**
     * Resets the character's visual or positional offsets to their default values.
     * 
     * This method sets:
     * - `offset.right` to 45
     * - `offset.left` to 40
     * 
     * It is typically used after actions like slapping to restore the character's
     * sprite alignment or collision offsets.
     * 
     * @method resetOffsets
     */
    resetOffsets() {
        this.offset.right = 45;
        this.offset.left = 40;
    }

    /**
     * Handles initiating the shooting action based on player input and cooldown.
     * 
     * This method checks if the Space key is pressed, the character is not already shooting,
     * and the cooldown period since the last shot has passed. If all conditions are met:
     * - Sets `isShooting` to `true`.
     * - Resets the shooting animation frame counter (`currentShootImage`) and `shootFrameCounter`.
     * - Updates `lastShot` to the current timestamp (`now`) to enforce the cooldown.
     * 
     * @method handleShooting
     * @param {number} now - The current timestamp used to check shooting cooldown.
     */
    handleShooting(now) {
        const kb = this.world.keyboard;
        if (kb.Space && !this.isShooting && (now - this.lastShot >= this.shootCooldown)) {
            this.isShooting = true;
            this.currentShootImage = 0;
            this.shootFrameCounter = 0;
            this.lastShot = now;
        }
    }

    /**
     * Handles the character's death state and triggers related effects.
     * 
     * This method performs the following actions when the character is dead:
     * 1. Plays the death sound effect once (`sharkyDies.mp3`) if it hasn't been played yet.
     * 2. Plays the death animation (`IMAGES_DEAD`).
     * 3. Checks if the final death frame is reached (image ends with '/12.png'):
     *    - Stops the game via `world.stopGame()`.
     *    - Clears the animation interval.
     *    - Shows the losing overlay using `showLoseOverlay()`.
     * 
     * @method handleDeathState
     */
    handleDeathState() {
        if (!this.isDead()) return;
        if (!this.deathSoundPlayed && typeof soundManager !== 'undefined') {
            soundManager.playEffect('img/assets/audio/sharkyDies.mp3', 0);
            this.deathSoundPlayed = true;
        }
        this.playAnimation(this.IMAGES_DEAD);
        if (this.img.src.endsWith('/12.png')) {
            this.world.stopGame();
            clearInterval(this.animationInterval);
            showLoseOverlay();
        }
    }

    /**
     * Handles the character's hurt state and plays the hurt animation.
     * 
     * This method checks if the character is currently hurt (`isHurt()`) and not dead.
     * If both conditions are met, it plays the hurt animation (`IMAGES_HURT`).
     * 
     * @method handleHurtState
     */
    handleHurtState() {
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    // handleMovementOrIdle(now) {
    //     const kb = this.world.keyboard;
    //     const isMoving =
    //         kb.ArrowRight || kb.ArrowLeft || kb.ArrowUp || kb.ArrowDown ||
    //         kb.KeyW || kb.KeyA || kb.KeyS || kb.KeyD;
    //     if (this.isDead() || this.isHurt() || this.isShooting) return;
    //     if (kb.ControlLeft || kb.ControlRight) return;
    //     if (isMoving) {
    //         this.stopIdleSnoringSound();
    //         this.handleMovementAnimation();
    //     } else {
    //         this.handleIdleAnimation(now);
    //     }
    // }
    handleMovementOrIdle(now) {
        // Verhindere Idle-/Movement-Animation während des Slaps
        if (this.isSlapping) return;

        const kb = this.world.keyboard;
        const isMoving =
            kb.ArrowRight || kb.ArrowLeft || kb.ArrowUp || kb.ArrowDown ||
            kb.KeyW || kb.KeyA || kb.KeyS || kb.KeyD;

        if (this.isDead() || this.isHurt() || this.isShooting) {
            this.stopIdleSnoringSound();
            this.lastIdleTime = null;
            this.isLongIdlePlayed = false;
            return;
        }

        if (isMoving) {
            this.stopIdleSnoringSound();
            this.handleMovementAnimation();
        } else {
            this.handleIdleAnimation(now);
        }
    }

    // stopIdleSnoringSound() {
    //     if (this.snoringSource) {
    //         try {
    //             this.snoringSource.stop(0);
    //             this.snoringSource.disconnect();
    //         } catch (e) {
    //             // source might already be stopped
    //         }
    //         this.snoringSource = null;
    //     }
    //     this.hasPlayedIdleSound = false;
    // }
    stopIdleSnoringSound() {
        if (this.snoringSource) {
            this.snoringSource.stop(0);
            this.snoringSource.disconnect();
            this.snoringSource = null;
            this.hasPlayedIdleSound = false;
        }
    }

    /**
     * Plays the character's swimming/movement animation.
     * 
     * This method performs the following actions:
     * 1. Plays the swimming animation (`IMAGES_SWIMMING`).
     * 2. Resets `lastIdleTime` to null to indicate the character is no longer idle.
     * 3. Sets `isLongIdlePlayed` to false to allow long idle animations to trigger later.
     * 
     * @method handleMovementAnimation
     */
    handleMovementAnimation() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.lastIdleTime = null;
        this.isLongIdlePlayed = false;
    }


    // handleIdleAnimation(now) {
    //     if (this.lastIdleTime === null) {
    //         this.lastIdleTime = now;
    //         this.isLongIdlePlayed = false;
    //     }
    //     const idleDuration = now - this.lastIdleTime;
    //     if (idleDuration >= 10000) {
    //         this.playAnimation(this.IMAGES_LONG_IDLE);
    //         this.isLongIdlePlayed = true;
    //         if (!this.hasPlayedIdleSound) this.playIdleSnoringSound();

    //         this.idleAnimationFrame++;
    //         if (this.idleAnimationFrame >= Number(this.IMAGES_LONG_IDLE.length * 4)) {
    //             this.finishSnoringSound();
    //         }
    //     } else {
    //         this.playAnimation(this.IMAGES_IDLE);
    //     }
    // }
    /**
     * Handles Sharkie's idle and long idle animations.
     *
     * Sharkie stays in long idle mode (with snoring sound) indefinitely
     * until he moves, gets hurt, or dies.
     *
     * @param {number} now - The current timestamp (from Date.now()).
     * @returns {void}
     */
    handleIdleAnimation(now) {
        if (this.lastIdleTime === null) {
            this.lastIdleTime = now;
            this.isLongIdlePlayed = false;
        }

        const idleDuration = now - this.lastIdleTime;

        // Long idle after 10 seconds
        if (idleDuration >= 10000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.isLongIdlePlayed = true;

            // Schnarch-Sound nur starten, wenn Sound global an
            if (!this.hasPlayedIdleSound && soundManager?.enabled) {
                this.playIdleSnoringSound();
            } else if (!soundManager?.enabled) {
                // globaler Sound aus → alte Quelle sofort stoppen
                this.stopIdleSnoringSound();
            }

            this.idleAnimationFrame++;
            if (this.idleAnimationFrame >= this.IMAGES_LONG_IDLE.length * 4) {
                this.idleAnimationFrame = 0;
            }
        } else {
        // Normale Idle-Animation
        this.playAnimation(this.IMAGES_IDLE);

        // Reset Long-Idle-Flags, damit es beim nächsten Mal wieder triggern kann
        this.isLongIdlePlayed = false;
        this.hasPlayedIdleSound = false;
    }
    }


    // playIdleSnoringSound() {
    // // Prüfen, ob globaler Sound erlaubt
    // if (!soundManager?.enabled) return;

    // if (!this.snoringAudio) {
    //     this.snoringAudio = new Audio('img/assets/audio/snoring.wav');
    //     this.snoringAudio.loop = true;
    //     this.snoringAudio.play();
    //     this.hasPlayedIdleSound = true;
    // }
    async playIdleSnoringSound() {
        // Prüfen, ob globaler Sound an ist
        if (!soundManager?.enabled) return;

        // Alte Quelle sofort stoppen, bevor neue erstellt wird
        if (this.snoringSource) {
            this.stopIdleSnoringSound();
        }

        // Neue Quelle erstellen
        const source = await soundManager.playEffect(
            'img/assets/audio/snoring.wav',
            0,
            true // loop
        );

        // Prüfen, ob Sound während des await ausgeschaltet wurde
        if (!soundManager.enabled) {
            source.stop();
            return;
        }

        this.snoringSource = source;
        this.hasPlayedIdleSound = true;
    }


    /**
     * Resets the idle snoring sound state.
     * 
     * This method is called after the long idle animation completes
     * or when the snoring sound should be allowed to play again.
     * It resets the animation frame counter and marks the sound
     * as not played, so it can be triggered the next time the character
     * is idle for a long period.
     * 
     * @returns {void}
     */
    finishSnoringSound() {
        this.idleAnimationFrame = 0;
        this.hasPlayedIdleSound = false;
    }

    /**
     * Determines whether the character is currently in a shooting state based on the last shot time.
     * 
     * This method calculates the time elapsed since `lastShot` in seconds and returns `true`
     * if less than 0.4 seconds have passed, indicating the character is actively shooting.
     * 
     * @method isShooting
     * @returns {boolean} `true` if the character is shooting, otherwise `false`.
     */
    isShooting() {
        let timeShotpassed = new Date().getTime() - this.lastShot;
        timeShotpassed = timeShotpassed / 1000;
        return timeShotpassed < 0.4;
    }

    /**
     * Creates a bubble projectile based on the character's facing direction.
     * 
     * This method checks the `otherDirection` flag to determine which direction
     * the bubble should be shot:
     * - If `otherDirection` is false, the bubble is created with an offset of 160 (right).
     * - If `otherDirection` is true, the bubble is created with an offset of -10 (left).
     * 
     * The actual projectile creation is handled by `createShootableObject(offset)`.
     * 
     * @method bubbleShot
     */
    bubbleShot() {
        if (this.otherDirection == false) {
            this.createShootableObject(160);
        } else if (this.otherDirection == true) {
            this.createShootableObject(-10);
        }
    }

    /**
     * Applies the fin slap effect during specific animation frames.
     * 
     * This method checks if the current image (`img.currentSrc`) corresponds to
     * the critical slap frames (frames 5, 6, or 7). If so:
     * - Sets `isSlapping` to `true`.
     * - Adjusts the character's offsets to properly align the slap hitbox:
     *   - `offset.right = 0` if facing right (`otherDirection == false`).
     *   - `offset.left = 0` if facing left (`otherDirection == true`).
     * 
     * @method finSlap
     */
    finSlap() {
        if (this.img.currentSrc == 'http://127.0.0.1:5500/img/1.Sharkie/4.Attack/Fin%20slap/5.png' || this.img.currentSrc == 'http://127.0.0.1:5500/img/1.Sharkie/4.Attack/Fin%20slap/6.png' || this.img.currentSrc == 'http://127.0.0.1:5500/img/1.Sharkie/4.Attack/Fin%20slap/7.png') {
            this.isSlapping = true;
            if (this.otherDirection == false) {
                this.offset.right = 0;
            } else if (this.otherDirection == true) {
                this.offset.left = 0;
            }
        }
    }

    /**
     * Checks if the character is dead.
     * 
     * This method returns `true` if the character's energy is 0 or below,
     * indicating that the character has no remaining health.
     * 
     * @method isDead
     * @returns {boolean} `true` if the character is dead, otherwise `false`.
     */
    isDead() {
        return this.energy <= 0;
    }
}