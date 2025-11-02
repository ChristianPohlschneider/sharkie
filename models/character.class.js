class Character extends MovableObject {
    x = 100;
    y = 150;
    height = 200;
    width = 200;
    speed = 3;
    interval = 1000 / 60;
    speedY = 0;
    accelerationY = 0.05;
    energy = 100;
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
     * Starts all character animation intervals (movement, state, and actions).
     */
    animate() {
        this.startMovementInterval();
        this.startStateInterval();
        this.startActionInterval();
    }

    /**
     * Starts the interval that updates character movement and handles collisions.
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
            if (this.isSlapping || this.canSlap()) {
                this.handleSlapAction();
            }
        }, 80);
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
     * Checks if the character collides with any barriers at (x, y).
     *
     * @method collidesAt
     * @param {number} x - X-coordinate to check.
     * @param {number} y - Y-coordinate to check.
     * @returns {boolean} True if a collision occurs, else false.
     */
    collidesAt(x, y) {
        return this.world.level.barriers.some(barrier => this.isColliding(barrier, x, y));
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

    /**
     * Checks if the character can shoot.
     *
     * @method canShoot
     * @returns {boolean} True if shooting is possible, else false.
     */
    canShoot() {
        return this.isShooting && !this.isHurt() && !this.isDead();
    }

    /**
     * Checks if the character can perform a slap action.
     *
     * @method canSlap
     * @returns {boolean} True if slapping is possible, else false.
     */
    canSlap() {
        const kb = this.world.keyboard;
        return (kb.ControlLeft || kb.ControlRight) && !this.isHurt() && !this.isDead();
    }

    /**
     * Handles the character's shooting animation and logic per frame.
     *
     * @method handleShootingAction
     * @returns {void}
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
     * Plays the bubble sound effect depending on the character's venom state.
     *
     * @method playBubbleSound
     * @returns {void}
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
     * Finalizes the character's shooting action.
     * Calls `bubbleShot()`, resets shooting flags and counters.
     *
     * @method finishShooting
     * @returns {void}
     */
    finishShooting() {
        this.bubbleShot();
        this.isShooting = false;
        this.currentShootImage = 0;
        this.shootFrameCounter = 0;
        this.hasPlayedBubbleSound = false;
    }

    /**
     * Executes the Fin-Slap action: plays sound, animates, and triggers `finSlap()`.
     *
     * @function
     * @returns {void}
     */
    handleSlapAction() {
        if (!this.isSlapping) {
            this.isSlapping = true;
            this.slapAnimationFrame = 0;
            this.hasPlayedSlapSound = false;
        }
        if (!this.hasPlayedSlapSound) this.playSlapSound();
        this.playAnimation(this.IMAGES_FINSLAP);
        this.finSlap();
        this.slapAnimationFrame++;
        if (this.slapAnimationFrame >= this.IMAGES_FINSLAP.length) {
            this.finishSlap();
        }
    }

    /**
     * Plays the slap sound and marks it as played to avoid repetition.
     *
     * @method playSlapSound
     */
    playSlapSound() {
        soundManager.playEffect('img/assets/audio/slap.m4a', 0);
        this.hasPlayedSlapSound = true;
    }

    /**
     * Ends the slap action, resets animation and sound flags, and restores offsets.
     *
     * @method finishSlap
     */
    finishSlap() {
        this.isSlapping = false;
        this.slapAnimationFrame = 0;
        this.hasPlayedSlapSound = false;
        this.resetOffsets();
    }

    /**
     * Resets the character's slap state, animation, sound flag, and offsets.
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
     * Restores the character's positional offsets to default values.
     * 
     * @method resetOffsets
     */
    resetOffsets() {
        this.offset.right = 45;
        this.offset.left = 40;
    }

    /**
     * Initiates shooting if Space is pressed and cooldown allows.
     *
     * @method handleShooting
     * @param {number} now - Current timestamp to enforce cooldown.
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
     * Handles the character's death:
     * - Plays death sound and animation.
     * - Stops the game and shows the lose overlay when final frame is reached.
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
     * Plays the hurt animation if the character is hurt and alive.
     *
     * @method handleHurtState
     */
    handleHurtState() {
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
        }
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
     * Checks if the character is actively shooting based on cooldown timing.
     * Returns true if less than 0.4 seconds have passed since the last shot.
     *
     * @method isShooting
     * @returns {boolean} True if the character is currently shooting, otherwise false.
     */
    isShooting() {
        let timeShotpassed = new Date().getTime() - this.lastShot;
        timeShotpassed = timeShotpassed / 1000;
        return timeShotpassed < 0.4;
    }

    /**
     * Shoots a bubble in the character's facing direction.
     * Calls `createShootableObject` with offset 160 (right) or -10 (left).
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
     * Applies the fin slap effect on frames 5–7:
     * - Activates `isSlapping`.
     * - Resets offsets (`right` or `left`) based on facing direction.
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
     * Returns whether the character is dead (energy ≤ 0).
     *
     * @method isDead
     * @returns {boolean} `true` if dead, else `false`.
     */
    isDead() {
        return this.energy <= 0;
    }
}