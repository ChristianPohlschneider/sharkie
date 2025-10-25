class Endboss extends MovableObject {
    x = 0;
    y = 70;
    height = 300;
    width = 300;
    amplitude = 0;
    frequency = 1;
    phase = 1;
    energy = 100;
    damageFromBubble = 5;
    damageFromFinSlap = 10;
    damageDueToCollision = 25;
    spawnID = 0;
    isSwimming = false;
    isAttacking = false;
    randomMoveID = 0;
    moved = 0;
    biteCounter = 0;
    world;
    audioBossThemePlayed = false;
    audioBossBite = new Audio('img/assets/audio/bossBite.flac');

    offset = {
        top: 150,
        left: 20,
        right: 25,
        bottom: 60
    };

    IMAGES_SPAWNING = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    ];

    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    IMAGES_DIE = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ];

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    constructor(world, bossSpawnCoordinateX) {
        super().loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_HURT);
        this.world = world;
        this.x = bossSpawnCoordinateX;
        this.speed = 0;
        this.animate();
    }

    animate() {
        this.world.setStoppableInterval(() => {
            if (this.isDead()) this.handleBossDeathState();
            else if (this.isHurt() && !this.isDead()) this.handleBossHurtState();
            else this.checkBossSpawn();
        }, 200);

        this.world.setStoppableInterval(() => {
            if (this.isSwimming && this.isAttacking == false && !this.isDead()) {
                this.randomMoveID = Math.floor(Math.random() * 5);
                this.randomAttack(this.randomMoveID);
            }
        }, 3000);
    }

    handleBossDeathState() {
        this.playDeathSound();
        this.playAnimation(this.IMAGES_DIE);
        const deadImageSrc = 'http://127.0.0.1:5500/img/2.Enemy/3%20Final%20Enemy/Dead/Mesa%20de%20trabajo%202%20copia%2010.png';
        if (this.img?.src === deadImageSrc) {
            this.handleDeath();
            showWinOverlay();
        }
    }

    playDeathSound() {
        if (typeof soundManager !== 'undefined') {
            soundManager.playEffect('img/assets/audio/bossDies.wav', 200);
        }
    }

    handleBossHurtState() {
        if (this.spawnID >= 8) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    async handleDeath() {
        setTimeout(async () => {
            if (soundManager) {
                soundManager.stopTheme();
                await soundManager.loadTheme('img/assets/audio/winScreen.mp3');
                soundManager.playTheme();
            }
        }, 800);
        this.world.stopGame();
    }

    async checkBossSpawn() {
        if (this.spawnID < 8) {
            await this.handleBossSpawnSequence();
        } else if (!this.isAttacking) {
            this.handleBossSwimmingState();
        }
        this.spawnID++;
    }

    async handleBossSpawnSequence() {
        if (!this.audioBossThemePlayed) {
            await this.playBossTheme();
        }
        this.playAnimation(this.IMAGES_SPAWNING);
    }

    async playBossTheme() {
        if (!soundManager) return;
        soundManager.stopTheme();
        await soundManager.loadTheme('img/assets/audio/bossTheme.wav');
        soundManager.playTheme();
        this.audioBossThemePlayed = true;
    }

    handleBossSwimmingState() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.isSwimming = true;
    }

    randomAttack(randomMoveID) {
        if (randomMoveID === 0) {
            this.performAttack(true, 'up');
        } else if (randomMoveID === 1) {
            this.performAttack(true, 'down');
        } else if (randomMoveID === 2) {
            this.performAttack(false, 'up');
        } else if (randomMoveID === 3) {
            this.performAttack(true, null);
        } else if (randomMoveID === 4) {
            this.performAttack(false, 'down');
        }
    }

    performAttack(playSound, direction) {
        if (playSound) {
            this.playBossBiteSound();
            this.attackMove();
        }
        if (direction === 'up') {
            this.verticalMoveUp();
        } else if (direction === 'down') {
            this.verticalMoveDown();
        }
    }

    playBossBiteSound() {
        if (typeof soundManager !== 'undefined') {
            soundManager.playEffect('img/assets/audio/bossBite.flac', 0);
        }
    }

    attackMove() {
        this.isAttacking = true;
        this.biteCounter = 0;
        const distance = -370;
        const speed = 23;
        let forward = true;
        const interval = setInterval(() => {
            if (forward) {
                this.handleAttackForward(speed, distance, () => (forward = false));
            } else {
                this.handleAttackBackward(speed, interval);
            }
        }, 50);
    }

    handleAttackForward(speed, distance, onTurnBack) {
        this.x -= speed;
        this.moved -= speed;
        if (this.biteCounter % 3 === 0 && !this.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
        this.biteCounter++;
        if (this.moved <= distance) {
            onTurnBack();
        }
    }

    handleAttackBackward(speed, interval) {
        this.x += speed;
        this.moved += speed;
        if (this.moved >= 0) {
            clearInterval(interval);
            this.isAttacking = false;
        }
    }

    verticalMoveDown() {
        this.handleVerticalMove(150, 9, 'down');
    }

    verticalMoveUp() {
        this.handleVerticalMove(200, 12, 'up');
    }

    handleVerticalMove(distance, speed, direction) {
        let moved = 0;
        let going = true;
        const interval = setInterval(() => {
            if (going) {
                this.updateVerticalPosition(speed, direction, 1);
                moved += speed;
                if (moved >= distance) going = false;
            } else {
                this.updateVerticalPosition(speed, direction, -1);
                moved -= speed;
                if (moved <= 0) clearInterval(interval);
            }
        }, 50);
    }

    updateVerticalPosition(speed, direction, factor) {
        if (direction === 'down') {
            this.y += speed * factor;
        } else {
            this.y -= speed * factor;
        }
    }

    isDead() {
        return this.energy == 0;
    }
}