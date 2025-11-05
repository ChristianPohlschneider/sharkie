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
    score = 500;
    spawnID = 0;
    isSwimming = false;
    isAttacking = false;
    randomMoveID = 0;
    moved = 0;
    biteCounter = 0;
    world;
    audioBossThemePlayed = false;
    audioBossDeathPlayed = false;
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

    /**
     * Starts the boss animation and behavior loops.
     * Sets up intervals for checking death/hurt states and triggering random attacks.
     */
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

    /**
     * Handles the boss's death state.
     * Plays death sound, shows animation, updates score, and triggers win overlay if dead.
     */
    handleBossDeathState() {
        if (!this.audioBossDeathPlayed) {
            this.playDeathSound();
        }
        this.playAnimation(this.IMAGES_DIE);
        this.world.totalScore += this.score;
        const src = this.img?.src || '';
        if (src.includes('img/2.Enemy/3%20Final%20Enemy/Dead/Mesa%20de%20trabajo%202%20copia%2010.png')) {
            this.handleDeath();
            showWinOverlay(this.world.totalScore);
        }
    }

    /**
     * Plays the boss death sound once via the SoundManager.
     * Checks `audioBossDeathPlayed` to prevent repeated playback.
     */
    playDeathSound() {
        if (!this.audioBossDeathPlayed) {
            if (typeof soundManager !== 'undefined') {
                soundManager.playEffect('img/assets/audio/bossDies.wav');
            }
            this.audioBossDeathPlayed = true;
        }
    }

    /**
     * Handles the boss's hurt state.
     * Plays the hurt animation if `spawnID` is 8 or higher.
     */
    handleBossHurtState() {
        if (this.spawnID >= 8) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * Handles the boss's final death sequence.
     * Stops the game, then after 800ms switches to the win screen theme.
     *
     * @async
     */
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

    /**
     * Checks if the boss should spawn or switch to swimming.
     * Calls spawn or swimming handlers based on `spawnID` and increments the counter.
     *
     * @async
     */
    async checkBossSpawn() {
        if (this.spawnID < 8) {
            await this.handleBossSpawnSequence();
        } else if (!this.isAttacking) {
            this.handleBossSwimmingState();
        }
        this.spawnID++;
    }

    /**
     * Handles the boss spawn animation sequence.
     * Plays the boss theme if not already played and shows the spawning animation.
     *
     * @async
     */
    async handleBossSpawnSequence() {
        if (!this.audioBossThemePlayed) {
            await this.playBossTheme();
        }
        this.playAnimation(this.IMAGES_SPAWNING);
    }

    /**
     * Plays the boss theme music.
     * Stops any current theme, loads and plays `bossTheme.wav`, and sets `audioBossThemePlayed`.
     *
     * @async
     */
    async playBossTheme() {
        if (!soundManager) return;
        soundManager.stopTheme();
        await soundManager.loadTheme('img/assets/audio/bossTheme.wav');
        soundManager.playTheme();
        this.audioBossThemePlayed = true;
    }

    /**
     * Handles the boss's swimming state.
     * Plays the swimming animation and sets `isSwimming` to true.
     */
    handleBossSwimmingState() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.isSwimming = true;
    }

    /**
     * Executes a randomized boss attack based on `randomMoveID`.
     * Maps IDs 0–4 to specific attack behaviors via `performAttack()`.
     *
     * @param {number} randomMoveID - Integer (0–4) representing the attack pattern.
     */
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

    /**
     * Performs a boss attack with optional sound and vertical movement.
     * Plays bite sound if `playSound` is true and moves up or down based on `direction`.
     *
     * @param {boolean} playSound - Whether to play the attack sound.
     * @param {('up'|'down'|null)} direction - Vertical movement direction for the attack.
     */
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

    /**
     * Plays the boss bite sound effect.
     * Uses `soundManager` to play `'img/assets/audio/bossBite.flac'` at volume 0.
     */
    playBossBiteSound() {
        if (typeof soundManager !== 'undefined') {
            soundManager.playEffect('img/assets/audio/bossBite.flac', 0);
        }
    }

    /**
     * Initiates the boss's attack movement sequence.
     * Sets `isAttacking`, resets `biteCounter`, and moves the boss forward/backward in intervals.
     */
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

    /**
     * Handles the boss's forward attack movement.
     * Moves left, updates animation and `biteCounter`, and calls `onTurnBack` when distance is reached.
     *
     * @param {number} speed - Forward movement speed.
     * @param {number} distance - Distance to move before turning back (negative value).
     * @param {Function} onTurnBack - Callback when forward distance is reached.
     */
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

    /**
     * Handles the boss's backward attack movement.
     * Moves right and stops the attack when the original position is reached.
     *
     * @param {number} speed - Backward movement speed.
     * @param {number} interval - Interval ID controlling the attack, cleared when done.
     */
    handleAttackBackward(speed, interval) {
        this.x += speed;
        this.moved += speed;
        if (this.moved >= 0) {
            clearInterval(interval);
            this.isAttacking = false;
        }
    }

    /**
     * Moves the boss downward during an attack.
     * Calls `handleVerticalMove()` with distance 150, speed 9, direction 'down'.
     */
    verticalMoveDown() {
        this.handleVerticalMove(150, 9, 'down');
    }

    /**
     * Moves the boss upward during an attack.
     * Calls `handleVerticalMove()` with distance 200, speed 12, direction 'up'.
     */
    verticalMoveUp() {
        this.handleVerticalMove(200, 12, 'up');
    }

    /**
     * Handles the boss's vertical movement during an attack.
     * Moves up or down by `distance` at `speed` and returns to the start position.
     *
     * @param {number} distance - Maximum vertical distance to move.
     * @param {number} speed - Movement speed per step.
     * @param {('up'|'down')} direction - Vertical movement direction.
     */
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
        }, 50);}

    /**
     * Updates the boss's vertical position.
     * Moves along Y-axis by `speed` and `factor` in the specified `direction`.
     *
     * @param {number} speed - Base movement speed.
     * @param {('up'|'down')} direction - Vertical movement direction.
     * @param {number} factor - Multiplier for speed/direction control.
     */
    updateVerticalPosition(speed, direction, factor) {
        if (direction === 'down') {
            this.y += speed * factor;
        } else {
            this.y -= speed * factor;
        }
    }

    /**
     * Checks if the boss is dead.
     * Returns `true` if `energy` is 0, otherwise `false`.
     *
     * @returns {boolean} - `true` if boss has no energy, else `false`.
     */
    isDead() {
        return this.energy == 0;
    }
}