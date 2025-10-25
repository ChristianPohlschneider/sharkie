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
            if (this.canShoot()) this.handleShootingAction();
            if (this.canSlap()) this.handleSlapAction();
            else this.resetSlapState();
        }, 80);
    }

    getScreenLimits() {
        const freezePoint = this.world.level.level_end_x - 450;
        return {
            leftLimit: this.cameraFrozen ? freezePoint - 130 : -50,
            rightLimit: this.cameraFrozen ? freezePoint + 450 : this.world.level.level_end_x
        };
    }

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

    updateCameraOnMove(freezePoint, movingLeft) {
        if (!this.cameraFrozen && this.x >= freezePoint && !movingLeft) {
            this.world.camera_x = -freezePoint + 100;
            this.cameraFrozen = true;
        } else if (!this.cameraFrozen) {
            this.world.camera_x = -this.x + 100;
        }
    }

    handleUpMovement() {
        const kb = this.world.keyboard;
        if ((kb.ArrowUp || kb.KeyW) && this.y > -80 && !this.collidesAt(this.x, this.y - this.speed)) {
            this.y -= this.speed;
        }
    }

    handleDownMovement() {
        const kb = this.world.keyboard;
        if ((kb.ArrowDown || kb.KeyS) && this.y < 300 && !this.collidesAt(this.x, this.y + this.speed)) {
            this.y += this.speed;
        }
    }

    collidesAt(x, y) {
        return this.world.level.barriers.some(barrier => this.isColliding(barrier, x, y));
    }

    triggerFinalEnemies() {
        const levelEnd = this.world.level.level_end_x;
        if (this.x > levelEnd - 450 && !this.hadFirstContact) {
            setFinalEnemie(this.world, levelEnd - 150);
            deleteOtherEnemies(this.world, levelEnd - 720);
            this.hadFirstContact = true;
        }
    }

    canShoot() {
        return this.isShooting && !this.isHurt() && !this.isDead();
    }

    canSlap() {
        const kb = this.world.keyboard;
        return (kb.ControlLeft || kb.ControlRight) && !this.isHurt() && !this.isDead();
    }

    handleShootingAction() {
        this.shootFrameCounter++;
        if (!this.hasPlayedBubbleSound) this.playBubbleSound();
        const isPoison = this.world.poisonBar.venomSac > 0;
        const shootImages = isPoison ? this.IMAGES_BUBBLE_TRAP_POISON : this.IMAGES_BUBBLE_TRAP;
        this.playShootAnimation(shootImages);
        this.currentShootImage++;
        if (this.currentShootImage >= shootImages.length) this.finishShooting();
    }

    playBubbleSound() {
        const hasVenom = this.world.poisonBar.venomSac > 0;
        const soundPath = hasVenom
            ? 'img/assets/audio/poisonBubble.wav'
            : 'img/assets/audio/bubble.wav';
        soundManager.playEffect(soundPath, 200);
        this.hasPlayedBubbleSound = true;
    }

    finishShooting() {
        this.bubbleShot();
        this.isShooting = false;
        this.currentShootImage = 0;
        this.shootFrameCounter = 0;
        this.hasPlayedBubbleSound = false;
    }

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
        if (this.slapAnimationFrame >= this.IMAGES_FINSLAP.length) this.finishSlap();
    }

    playSlapSound() {
        soundManager.playEffect('img/assets/audio/slap.m4a', 0);
        this.hasPlayedSlapSound = true;
    }

    finishSlap() {
        this.isSlapping = false;
        this.slapAnimationFrame = 0;
        this.hasPlayedSlapSound = false;
        this.resetOffsets();
    }

    resetSlapState() {
        this.isSlapping = false;
        this.slapAnimationFrame = 0;
        this.hasPlayedSlapSound = false;
        this.resetOffsets();
    }

    resetOffsets() {
        this.offset.right = 45;
        this.offset.left = 40;
    }

    handleShooting(now) {
        const kb = this.world.keyboard;
        if (kb.Space && !this.isShooting && (now - this.lastShot >= this.shootCooldown)) {
            this.isShooting = true;
            this.currentShootImage = 0;
            this.shootFrameCounter = 0;
            this.lastShot = now;
        }
    }

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

    handleHurtState() {
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    handleMovementOrIdle(now) {
        const kb = this.world.keyboard;
        const isMoving =
            kb.ArrowRight || kb.ArrowLeft || kb.ArrowUp || kb.ArrowDown ||
            kb.KeyW || kb.KeyA || kb.KeyS || kb.KeyD;
        if (this.isDead() || this.isHurt() || this.isShooting) return;
        if (kb.ControlLeft || kb.ControlRight) return; // reserviert für Spezialaktionen
        if (isMoving) {
            this.handleMovementAnimation();
        } else {
            this.handleIdleAnimation(now);
        }
    }

    handleMovementAnimation() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.lastIdleTime = null;
        this.isLongIdlePlayed = false;
    }

    handleIdleAnimation(now) {
        if (this.lastIdleTime === null) {
            this.lastIdleTime = now;
            this.isLongIdlePlayed = false;
        }
        const idleDuration = now - this.lastIdleTime;
        if (idleDuration >= 10000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.isLongIdlePlayed = true;
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
    
    isShooting() {
        let timeShotpassed = new Date().getTime() - this.lastShot;
        timeShotpassed = timeShotpassed / 1000;
        return timeShotpassed < 0.4;
    }

    isAboveWaterSurface() {
        console.log(this.y)
        return this.y > -75;
    }

    bubbleShot() {
        if (this.otherDirection == false) {
            this.createShootableObject(160);
        } else if (this.otherDirection == true) {
            this.createShootableObject(-10);
        }
    }

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

    isDead() {
        return this.energy <= 0;
    }
}