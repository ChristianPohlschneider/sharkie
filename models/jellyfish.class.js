class JellyFish extends MovableObject {
    x = 0;
    y = 180;
    height = 100;
    width = 100;
    interval = 1000 / 60;
    energy = 100;
    damageFromBubble = 25;
    damageFromFinSlap = 0;
    damageDueToCollision = 20;
    world;
    spawnID = 8;
    isDeadID = 0;
    lastHit = 0;
    hasDied = false;
    moveInterval = null;
    oscillateInterval = null;
    animationInterval = null;

    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 5
    };

    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
    ];

    IMAGES_DIE = [
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png',
    ];

    IMAGES_HURT = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];

    constructor(world, x, y, phase, speed) {
        super().loadImage('img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_HURT);
        this.world = world;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animate(phase);
    }

    animate(phase) {
        this.phase = phase;
        this.startMove();
        this.startPositionReset();
        this.startOscillation();
        this.startAnimationLoop();
    }

    startMove() {
        this.moveInterval = this.moveLeft(this.speed, this.interval);
    }

    startPositionReset() {
        this.world.setStoppableInterval(() => {
            if (this.x < -250) this.x = this.world.level.level_end_x + 400;
        }, 200);
    }

    startOscillation() {
        this.oscillateInterval = this.oscillate(this.phase);
    }

    startAnimationLoop() {
        this.animationInterval = this.world.setStoppableInterval(() => {
            if (this.isDead() && this.isDeadID < 4) this.handleDeath();
            else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            else this.playAnimation(this.IMAGES_SWIMMING);
        }, 200);
    }

    handleDeath() {
        if (this.hasDied) return;
        this.hasDied = true;
        if (soundManager) soundManager.playEffect('img/assets/audio/enemyDie.wav', 400);
        clearInterval(this.moveInterval);
        clearInterval(this.oscillateInterval);
        clearInterval(this.animationInterval);
        this.isDeadID = 0;
        this.startDeathAnimation();
    }

    startDeathAnimation() {
        const dieInterval = setInterval(() => {
            this.loadImage(this.IMAGES_DIE[this.isDeadID]);
            this.isDeadID++;
            if (this.isDeadID >= this.IMAGES_DIE.length) {
                clearInterval(dieInterval);
                this.removeFromLevel();
            }
        }, 200);
    }

    removeFromLevel() {
        this.world.level.enemies.splice(this.world.level.enemies.indexOf(this), 1);
        this.world.level.shrinkingObjects.push(this);
        this.shrinkOut();
    }

    isDead() {
        return this.energy <= 0;
    }
}