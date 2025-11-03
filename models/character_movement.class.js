class CharacterMovement extends Character {

    constructor(world) {
        super(world);
        this.startStateInterval();
        this.startActionInterval();
        this.startMovementInterval();
    }

    /**
     * Starts the interval that updates character states (shooting, hurt/death, idle animations).
     */
    startStateInterval() {
        this.world.setStoppableInterval(() => {
            const now = Date.now();
            this.handleShooting(now);
            this.handleDeathState();
            this.handleHurtState();
            this.handleMovementOrIdle(now);
        }, 200);
    }

    /**
     * Starts the interval that updates character actions (shooting and slapping).
     */
    startActionInterval() {
        this.world.setStoppableInterval(() => {
            if (this.canShoot()) this.handleShootingAction();
            if (this.canSlap()) {
                this.handleSlapAction();
            }
            else if (this.isSlapping) {
                this.handleSlapAction();
            }
        }, 80);
    }

    /**
     * Starts the game loop interval for character movement.
     * Checks collisions and updates position based on keyboard input.
     */
    startMovementInterval() {
        this.world.setStoppableInterval(() => {
            if (this.isDead()) return;
            this.world.checkCollisionWithBarrier();
            const { leftLimit, rightLimit } = this.getScreenLimits();
            this.handleRightMovement(rightLimit);
            this.handleLeftMovement(leftLimit);
            this.handleUpMovement();
            this.handleDownMovement();
        }, 1000 / 60);
    }

    /**
     * Moves the character right if input is active and within `rightLimit`.
     * Updates camera, speed, enemy spawns, and direction state.
     *
     * @method handleRightMovement
     * @param {number} rightLimit - Maximum allowed X-coordinate.
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
     * Moves the character left if input is active and above `leftLimit`.
     * Updates camera, speed, and direction state.
     *
     * @method handleLeftMovement
     * @param {number} leftLimit - Minimum allowed X-coordinate.
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
     * Updates camera position based on character movement and freeze state.
     *
     * @method updateCameraOnMove
     * @param {number} freezePoint - X-coordinate where the camera freezes near level end.
     * @param {boolean} movingLeft - True if the character is moving left.
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
     * Moves the character up if input is active, above -80, and no collision occurs.
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
     * Moves the character down if input is active, below 300, and no collision occurs.
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
     * Calculates horizontal movement limits for the character based on camera state.
     *
     * @method getScreenLimits
     * @returns {{leftLimit: number, rightLimit: number}} Min and max X-coordinates.
     */
    getScreenLimits() {
        const freezePoint = this.world.level.level_end_x - 450;
        return {
            leftLimit: this.cameraFrozen ? freezePoint - 130 : -50,
            rightLimit: this.cameraFrozen ? freezePoint + 450 : this.world.level.level_end_x
        };
    }

    /**
     * Updates character animation between movement and idle, unless slapping.
     *
     * @param {number} now - Current timestamp.
     * @function
     */
    handleMovementOrIdle(now) {
        if (this.isSlapping) return;
        if (this.isIncapacitated()) return;
        this.handleMovementOrIdleState(now);
    }

    /**
     * Checks if the character is incapacitated (dead, hurt, or shooting).
     * Stops the idle snoring sound and resets idle states if necessary.
     *
     * @function
     * @returns {boolean} True if the character is incapacitated.
     */
    isIncapacitated() {
        if (this.isDead() || this.isHurt() || this.isShooting) {
            this.stopIdleSnoringSound();
            this.lastIdleTime = null;
            this.isLongIdlePlayed = false;
            return true;
        }
        return false;
    }

    /**
     * Updates character animation based on movement or idle state.
     * Chooses between moving, idle, or long-idle animations.
     *
     * @param {number} now - Current timestamp.
     * @function
     */
    handleMovementOrIdleState(now) {
        const kb = this.world.keyboard;
        const isMoving = kb.ArrowRight || kb.ArrowLeft || kb.ArrowUp || kb.ArrowDown ||
            kb.KeyW || kb.KeyA || kb.KeyS || kb.KeyD;
        if (isMoving) {
            this.stopIdleSnoringSound();
            this.handleMovementAnimation();
        } else {
            this.handleIdleAnimation(now);
        }
    }

    /**
     * Stops the character's snoring sound and resets related audio state.
     *
     * @function
     */
    stopIdleSnoringSound() {
        if (this.snoringSource) {
            this.snoringSource.stop(0);
            this.snoringSource.disconnect();
            this.snoringSource = null;
            this.hasPlayedIdleSound = false;
        }
    }

    /**
     * Plays the character's swimming/movement animation and resets idle timers.
     *
     * @method handleMovementAnimation
     */
    handleMovementAnimation() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.lastIdleTime = null;
        this.isLongIdlePlayed = false;
    }

    /**
     * Initializes the character's idle state if it hasn't been set.
     *
     * @param {number} now - Current timestamp.
     * @function
     */
    initializeIdle(now) {
        if (this.lastIdleTime === null) {
            this.lastIdleTime = now;
            this.isLongIdlePlayed = false;
        }
    }

    /**
     * Returns the duration the character has been idle.
     *
     * @param {number} now - Current timestamp.
     * @function
     * @returns {number} Idle duration in milliseconds.
     */
    getIdleDuration(now) {
        return now - this.lastIdleTime;
    }

    /**
     * Handles the long idle state and animation.
     *
     * @function
     * @returns {void}
     */
    handleLongIdle() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.isLongIdlePlayed = true;
        if (!this.hasPlayedIdleSound && soundManager?.enabled) {
            this.playIdleSnoringSound();
        } else if (!soundManager?.enabled) {
            this.stopIdleSnoringSound();
        }
        this.idleAnimationFrame++;
        if (this.idleAnimationFrame >= this.IMAGES_LONG_IDLE.length * 4) {
            this.idleAnimationFrame = 0;
        }
    }

    /**
     * Handles normal idle state and animation.
     *
     * @function
     * @returns {void}
     */
    handleNormalIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.isLongIdlePlayed = false;
        this.hasPlayedIdleSound = false;
    }

    /**
     * Main function to handle idle animation depending on duration.
     *
     * @param {number} now - Current timestamp.
     * @function
     * @returns {void}
     */
    handleIdleAnimation(now) {
        this.initializeIdle(now);
        const idleDuration = this.getIdleDuration(now);
        if (idleDuration >= 10000) {
            this.handleLongIdle();
        } else {
            this.handleNormalIdle();
        }
    }

    /**
     * Plays the character's snoring sound if sound is enabled, stopping any previous snore.
     * The sound loops until explicitly stopped.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    async playIdleSnoringSound() {
        if (!soundManager?.enabled) return;
        if (this.snoringSource) {
            this.stopIdleSnoringSound();
        }
        const source = await soundManager.playEffect(
            'img/assets/audio/snoring.wav', 0, true
        );
        if (!soundManager.enabled) {
            source.stop();
            return;}
        this.snoringSource = source;
        this.hasPlayedIdleSound = true;
    }

    /**
     * Resets the long-idle snoring sound state and frame counter,
     * allowing the snore to play again on the next long idle.
     *
     * @function
     * @returns {void}
     */
    finishSnoringSound() {
        this.idleAnimationFrame = 0;
        this.hasPlayedIdleSound = false;
    }
    
    /**
     * Triggers final enemies when the character nears the level end.
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
}