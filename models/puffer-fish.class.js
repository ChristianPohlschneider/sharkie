class PufferFish extends MovableObject {
    x = 0;
    y = 180;
    height = 100;
    width = 100;
    interval = 1000 / 60;
    energy = 100;
    damageFromBubble = 50;
    damageFromFinSlap = 100;
    damageDueToCollision = 10;
    score = 50;
    world;
    spawnID = 8;
    lastHit = 0;
    hasDied = false;
    moveInterval = null;
    oscillateInterval = null;
    animationInterval = null;

    offset = {
        top: 10,
        left: 5,
        right: 10,
        bottom: 30
    };

    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    IMAGES_DIE = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',

    ];

    IMAGES_HURT = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ];

    constructor(world, x, y, phase, speed) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_HURT);
        this.world = world;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animate(phase);
    }

    /**
     * Starts the full animation and movement sequence for the enemy object.
     * 
     * This method sets up horizontal movement, vertical oscillation, and the animation loop.
     * It also handles resetting the enemy's position when it moves off-screen and updates
     * the animation based on the enemy's state (dead, hurt, or swimming).
     * 
     * @method animate
     * @param {number} phase - The initial phase used for oscillation calculations.
     */
    animate(phase) {
        this.phase = phase;
        this.moveInterval = this.moveLeft(this.speed, this.interval);
        this.world.setStoppableInterval(() => {
            if (this.x < -250) this.x = this.world.level.level_end_x + 400;
        }, 200);
        this.oscillateInterval = this.oscillate(this.phase);
        this.animationInterval = this.world.setStoppableInterval(() => {
            if (this.isDead()) this.handleDeath();
            else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            else this.playAnimation(this.IMAGES_SWIMMING);
        }, 200);
    }

    /**
     * Handles the death sequence of the enemy.
     * 
     * Plays the death sound effect, triggers the death animation, updates the total score,
     * stops movement and oscillation intervals, and schedules removal and shrinking of the object.
     * Ensures that the death sequence runs only once per enemy.
     * 
     * @method handleDeath
     */
    handleDeath() {
        if (this.hasDied) return;
        this.hasDied = true;
        soundManager?.playEffect('img/assets/audio/enemyDie.wav', 600);
        this.playAnimation(this.IMAGES_DIE);
        this.world.totalScore += this.score;
        clearInterval(this.moveInterval);
        clearInterval(this.oscillateInterval);
        setTimeout(() => this.removeAndShrink(), this.IMAGES_DIE.length * 200);
    }

    /**
     * Removes the enemy from the active enemies array and adds it to the
     * shrinking objects array, then starts the shrinking animation.
     * 
     * @method removeAndShrink
     */
    removeAndShrink() {
        const idx = this.world.level.enemies.indexOf(this);
        if (idx > -1) this.world.level.enemies.splice(idx, 1);
        this.world.level.shrinkingObjects.push(this);
        this.shrinkOut();
    }

    /**
     * Checks whether the enemy is dead.
     * 
     * @method isDead
     * @returns {boolean} - Returns true if the enemy's energy is 0 or less, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }
}