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
    score = 100;
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

    /**
     * Starts the animation sequence for the object in the specified phase.
     * 
     * This method performs the following:
     * 1. Sets the current phase.
     * 2. Initiates movement via `startMove()`.
     * 3. Starts automatic position resets with `startPositionReset()`.
     * 4. Begins oscillation effect using `startOscillation()`.
     * 5. Starts the main animation loop via `startAnimationLoop()`.
     * 
     * @method animate
     * @param {number} phase - The current animation phase or stage.
     */
    animate(phase) {
        this.phase = phase;
        this.startMove();
        this.startPositionReset();
        this.startOscillation();
        this.startAnimationLoop();
    }

    /**
     * Starts the object's movement to the left.
     * 
     * This method initializes the movement by calling `moveLeft()` with the object's
     * configured `speed` and `interval`, and stores the returned interval ID in `moveInterval`.
     * 
     * @method startMove
     */
    startMove() {
        this.moveInterval = this.moveLeft(this.speed, this.interval);
    }

    /**
     * Starts an automatic position reset for the object.
     * 
     * This method periodically checks the object's X-coordinate every 200ms.
     * If the object moves past the left boundary (`x < -250`), it resets its position
     * to just beyond the right end of the level (`level_end_x + 400`).
     * 
     * @method startPositionReset
     */
    startPositionReset() {
        this.world.setStoppableInterval(() => {
            if (this.x < -250) this.x = this.world.level.level_end_x + 400;
        }, 200);
    }

    /**
     * Starts the oscillation effect for the object.
     * 
     * This method calls the `oscillate()` function with the current `phase` and
     * stores the returned interval ID in `oscillateInterval`.
     * 
     * @method startOscillation
     */
    startOscillation() {
        this.oscillateInterval = this.oscillate(this.phase);
    }

    /**
     * Starts the main animation loop for the object.
     * 
     * This method sets up a repeated interval (every 200ms) that:
     * 1. Calls `handleDeath()` if the object is dead and `isDeadID < 4`.
     * 2. Plays the hurt animation (`IMAGES_HURT`) if the object is hurt.
     * 3. Otherwise, plays the swimming animation (`IMAGES_SWIMMING`).
     * 
     * The interval ID is stored in `animationInterval` for later clearing if needed.
     * 
     * @method startAnimationLoop
     */
    startAnimationLoop() {
        this.animationInterval = this.world.setStoppableInterval(() => {
            if (this.isDead() && this.isDeadID < 4) this.handleDeath();
            else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            else this.playAnimation(this.IMAGES_SWIMMING);
        }, 200);
    }

    /**
     * Handles the death sequence for the object.
     * 
     * This method performs the following actions:
     * 1. Prevents repeated execution if the object has already died (`hasDied` flag).
     * 2. Plays the death sound effect if `soundManager` is available.
     * 3. Adds the object's score to the world's total score.
     * 4. Clears all active intervals (`moveInterval`, `oscillateInterval`, `animationInterval`).
     * 5. Resets the `isDeadID` counter.
     * 6. Starts the death animation by calling `startDeathAnimation()`.
     * 
     * @method handleDeath
     */
    handleDeath() {
        if (this.hasDied) return;
        this.hasDied = true;
        if (soundManager) soundManager.playEffect('img/assets/audio/enemyDie.wav', 400);
        this.world.totalScore += this.score;
        clearInterval(this.moveInterval);
        clearInterval(this.oscillateInterval);
        clearInterval(this.animationInterval);
        this.isDeadID = 0;
        this.startDeathAnimation();
    }

    /**
     * Starts the death animation sequence for the object.
     * 
     * This method performs the following:
     * 1. Uses a `setInterval` to iterate through the `IMAGES_DIE` frames every 200ms.
     * 2. Loads each frame using `loadImage()` and increments the `isDeadID` counter.
     * 3. Clears the interval and removes the object from the level once all frames are displayed.
     * 
     * @method startDeathAnimation
     */
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

    /**
     * Removes the object from the level's active enemies and starts the shrink-out effect.
     * 
     * This method performs the following:
     * 1. Removes the object from the `enemies` array of the current level.
     * 2. Adds the object to the `shrinkingObjects` array for visual shrink-out animation.
     * 3. Calls `shrinkOut()` to animate the object disappearing from the level.
     * 
     * @method removeFromLevel
     */
    removeFromLevel() {
        this.world.level.enemies.splice(this.world.level.enemies.indexOf(this), 1);
        this.world.level.shrinkingObjects.push(this);
        this.shrinkOut();
    }

    /**
     * Checks whether the object is dead based on its energy level.
     * 
     * @method isDead
     * @returns {boolean} - Returns `true` if the object's `energy` is 0 or less, otherwise `false`.
     */
    isDead() {
        return this.energy <= 0;
    }
}