class Character extends MovableObject {
    x = 100;
    y = 150;
    height = 200;
    width = 200;
    interval = 1000 / 60;
    speed = 3;
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
    }

    /**
     * Checks collision with barriers at the given position.
     * @param {number} x - X position.
     * @param {number} y - Y position.
     * @returns {boolean} True if collision detected.
     */
    collidesAt(x, y) {
        return this.world.level.barriers.some(barrier => this.isColliding(barrier, x, y));
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
     * Ends shooting: triggers bubbleShot and resets state.
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
     * Handles death: plays sound/animation and ends the game when done.
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
        const src = this.img.currentSrc;
        if (src.includes('img/1.Sharkie/4.Attack/Fin%20slap/5.png') || 
            src.includes('img/1.Sharkie/4.Attack/Fin%20slap/6.png') || 
            src.includes('img/1.Sharkie/4.Attack/Fin%20slap/7.png')) {
            this.isSlapping = true;
            if (!this.otherDirection) {
                this.offset.right = 0;
            } else {
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