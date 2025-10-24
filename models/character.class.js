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

        const freezePoint = this.world.level.level_end_x - 450;


        this.world.setStoppableInterval(() => {


            // Bewegung nur erlauben, wenn Sharky nicht tot ist
            if (this.isDead()) return;

            this.world.checkCollisionWithBarrier();

            const leftScreenLimit = this.cameraFrozen ? freezePoint - 130 : -50;
            const rightScreenLimit = this.cameraFrozen ? freezePoint + 450 : this.world.level.level_end_x;

            if ((this.world.keyboard.ArrowRight || this.world.keyboard.KeyD)
                && this.x < rightScreenLimit
                && (!this.world.isCollidingBarrier || this.otherDirection)) {
                // if (this.world.keyboard.ShiftLeft) {
                //     this.speed = 5;
                // }
                this.x += this.speed;

                if (!this.cameraFrozen && this.x >= freezePoint) {
                    // Kamera einfrieren
                    this.world.camera_x = -freezePoint + 100;
                    this.cameraFrozen = true;
                } else if (!this.cameraFrozen) {
                    // Kamera folgt Spieler
                    this.world.camera_x = -this.x + 100;
                }

                this.speed = 3;
                //Console!
                // console.log("Sharkie x:" + this.x)
                // console.log(freezePoint)
                if (this.x > Number(this.world.level.level_end_x - 450) && !this.hadFirstContact) {
                    setFinalEnemie(this.world, Number(this.world.level.level_end_x - 150));
                    deleteOtherEnemies(this.world, Number(this.world.level.level_end_x - 720));
                    this.hadFirstContact = true;
                }
                this.otherDirection = false;
            }
            if ((this.world.keyboard.ArrowLeft || this.world.keyboard.KeyA)
                && this.x > leftScreenLimit
                && (!this.world.isCollidingBarrier || !this.otherDirection)) {
                // if (this.world.keyboard.ShiftLeft) {
                //     this.speed = 5;
                // }
                this.x -= this.speed;

                // Kamera-Logik bleibt unverändert, wenn eingefroren
                if (!this.cameraFrozen && this.x < freezePoint) {
                    this.world.camera_x = -this.x + 100;
                } else if (!this.cameraFrozen) {
                    this.world.camera_x = -this.x + 100;
                } // sonst Kamera bleibt eingefroren

                this.speed = 3;
                //Console!
                // console.log("Sharkie" + this.x);

                this.otherDirection = true;
            }
            if ((this.world.keyboard.ArrowUp || this.world.keyboard.KeyW)
                && this.y > -80
                && !this.world.level.barriers.some(barrier =>
                    this.isColliding(barrier, this.x, this.y - this.speed))) {

                this.y -= this.speed;
            }
            if ((this.world.keyboard.ArrowDown || this.world.keyboard.KeyS)
                && this.y < 300
                && !this.world.level.barriers.some(barrier =>
                    this.isColliding(barrier, this.x, this.y + this.speed))) {

                this.y += this.speed;
            }
            // this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.world.setStoppableInterval(() => {
            const now = new Date().getTime();
            if (this.world.keyboard.Space) {
                // const now = new Date().getTime();
                if (!this.isShooting && (now - this.lastShot >= this.shootCooldown)) {
                    this.isShooting = true;
                    this.currentShootImage = 0;
                    this.shootFrameCounter = 0;
                    this.lastShot = now; // Zeitpunkt des Schusses speichern
                }
            }
            if (this.isDead()) {

                if (!this.deathSoundPlayed) {
                    // Sound über SoundManager abspielen
                    if (soundManager) {
                        soundManager.playEffect('img/assets/audio/sharkyDies.mp3', 0); // Delay optional
                    }

                    this.deathSoundPlayed = true; // verhindert mehrfaches Abspielen
                }

                this.playAnimation(this.IMAGES_DEAD);

                if (this.img.src == 'http://127.0.0.1:5500/img/1.Sharkie/6.dead/1.Poisoned/12.png') {
                    this.world.stopGame();
                    clearInterval(this.animationInterval);
                    showLoseOverlay();
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);

            } else if (this.isShooting) {
                // Shoot-Loop übernimmt Animation, nichts hier
            } else if ((this.world.keyboard.ControlLeft || this.world.keyboard.ControlRight) && !this.isHurt() && !this.isDead()) {
                // Fin Slap placeholder
            } else if (this.world.keyboard.ArrowRight || this.world.keyboard.ArrowLeft ||
                this.world.keyboard.ArrowUp || this.world.keyboard.ArrowDown ||
                this.world.keyboard.KeyW || this.world.keyboard.KeyS ||
                this.world.keyboard.KeyA || this.world.keyboard.KeyD) {
                this.playAnimation(this.IMAGES_SWIMMING);

                // Idle-Timer zurücksetzen
                this.lastIdleTime = null;
                this.isLongIdlePlayed = false;
            } else {
                if (this.lastIdleTime === null) {
                    this.lastIdleTime = now;
                    this.isLongIdlePlayed = false;
                }

                const idleDuration = now - this.lastIdleTime;

                if (idleDuration >= 10000) {
                    // Long-Idle regelmäßig aufrufen, solange Sharky idle ist
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                    this.isLongIdlePlayed = true;
                } else {
                    // Normale Idle-Animation regelmäßig aufrufen
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 200);

        // Shoot-Loop
        this.world.setStoppableInterval(() => {
            if (this.isShooting && !this.isHurt() && !this.isDead()) {
                this.shootFrameCounter++;

                // Bubble Sound nur einmal pro Schuss abspielen
                if (!this.hasPlayedBubbleSound) {
                    let soundPath;
                    if (this.world.poisonBar.venomSac > 0) {
                        soundPath = 'img/assets/audio/poisonBubble.wav';
                    } else {
                        soundPath = 'img/assets/audio/bubble.wav';
                    }

                    // Verzögerung 200ms, SoundManager übernimmt Prüfung, ob Sound an ist
                    soundManager.playEffect(soundPath, 200);

                    this.hasPlayedBubbleSound = true;
                }

                // Animation abspielen
                if (this.world.poisonBar.venomSac > 0) {
                    this.playShootAnimation(this.IMAGES_BUBBLE_TRAP_POISON);
                } else {
                    this.playShootAnimation(this.IMAGES_BUBBLE_TRAP);
                }


                this.currentShootImage++;

                // Wenn Animation fertig, Schuss zurücksetzen
                if (this.currentShootImage >= this.IMAGES_BUBBLE_TRAP.length) {
                    this.bubbleShot();
                    this.isShooting = false;       // Animation fertig
                    this.currentShootImage = 0;
                    this.shootFrameCounter = 0;
                    this.hasPlayedBubbleSound = false; // Flag für nächsten Schuss zurücksetzen
                }
            }

            // Fin Slap
            if ((this.world.keyboard.ControlLeft || this.world.keyboard.ControlRight) && !this.isHurt() && !this.isDead()) {
                if (!this.isSlapping) {
                    this.isSlapping = true;
                    this.slapAnimationFrame = 0;
                    this.hasPlayedSlapSound = false;
                }

                // Sound nur einmal
                if (!this.hasPlayedSlapSound) {
                    soundManager.playEffect('img/assets/audio/slap.m4a', 0);
                    this.hasPlayedSlapSound = true;
                }

                this.playAnimation(this.IMAGES_FINSLAP);
                this.finSlap();
                this.slapAnimationFrame++;

                if (this.slapAnimationFrame >= this.IMAGES_FINSLAP.length) {
                    this.isSlapping = false;          // Animation beendet
                    this.slapAnimationFrame = 0;
                    this.hasPlayedSlapSound = false;
                    this.offset.right = 45;
                    this.offset.left = 40;
                }
            } else {
                this.isSlapping = false;
                this.slapAnimationFrame = 0;
                this.hasPlayedSlapSound = false;
                this.offset.right = 45;
                this.offset.left = 40;
            }
        }, 80);
    }



    isShooting() {
        let timeShotpassed = new Date().getTime() - this.lastShot; //Difference in ms
        timeShotpassed = timeShotpassed / 1000; //Difference in s
        return timeShotpassed < 0.4;
    }

    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveWaterSurface()) {
    //             this.y += this.speedY;
    //             this.speedY -= this.accelerationY;
    //         }
    //     }, 1000 / 25);
    // }

    isAboveWaterSurface() {
        console.log(this.y)
        return this.y > -75;
    }

    bubbleShot() {

        if (this.otherDirection == false) {
            //bubble shoot rh
            this.createShootableObject(160);
        } else if (this.otherDirection == true) {
            //bubble shoot lh
            this.createShootableObject(-10);
        }

    }

    finSlap() {
        if (this.img.currentSrc == 'http://127.0.0.1:5500/img/1.Sharkie/4.Attack/Fin%20slap/5.png' ||
            this.img.currentSrc == 'http://127.0.0.1:5500/img/1.Sharkie/4.Attack/Fin%20slap/6.png' ||
            this.img.currentSrc == 'http://127.0.0.1:5500/img/1.Sharkie/4.Attack/Fin%20slap/7.png') {
            this.isSlapping = true;
            if (this.otherDirection == false) {
                this.offset.right = 0;
            } else if (this.otherDirection == true) {
                this.offset.left = 0;
            }
        }
    }

    // resolveBarrierCollision(barrier) {
    //     if (this.x + this.width > barrier.x && this.x < barrier.x) {
    //         return
    //     }

    //     if (this.x < barrier.x + barrier.width && this.x > barrier.x) {
    //         this.x = barrier.x + barrier.width;
    //     }
    // }


    // (Optional auch für oben/unten erweitern, falls du Y-Kollision brauchst)

    isDead() {
        return this.energy <= 0;
    }
}