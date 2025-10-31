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
     * Starts the animation and behavior loops for the boss character.
     * 
     * This method sets up two stoppable intervals:
     * 1. Every 200ms:
     *    - Checks if the boss is dead and handles death state via `handleBossDeathState()`.
     *    - If hurt but not dead, handles hurt state via `handleBossHurtState()`.
     *    - Otherwise, checks whether the boss should spawn using `checkBossSpawn()`.
     * 2. Every 3000ms (3 seconds):
     *    - If the boss is swimming, not attacking, and not dead, selects a random movement ID
     *      and triggers `randomAttack(randomMoveID)`.
     * 
     * @method animate
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
     * Handles the death state of the boss enemy.
     *
     * This method manages the sequence that occurs when the boss dies:
     * - Plays the death sound once.
     * - Displays the death animation.
     * - Adds the boss's score to the total world score.
     * - Checks if the current image corresponds to the "dead" sprite, and if so:
     *   - Triggers the boss's death handler.
     *   - Displays the win overlay with the updated total score.
     *
     * @method handleBossDeathState
     * @returns {void} This function does not return a value.
     */
    handleBossDeathState() {
        if (!this.audioBossDeathPlayed) {
            this.playDeathSound();
        }
        this.playAnimation(this.IMAGES_DIE);
        this.world.totalScore += this.score;
        const deadImageSrc = 'http://127.0.0.1:5500/img/2.Enemy/3%20Final%20Enemy/Dead/Mesa%20de%20trabajo%202%20copia%2010.png';
        if (this.img?.src === deadImageSrc) {
            this.handleDeath();
            showWinOverlay(world.totalScore);
        }
    }

    /**
     * Plays the boss death sound effect once using the global SoundManager.
     *
     * This method ensures that the boss death audio is played only a single time.
     * It checks the `audioBossDeathPlayed` flag to prevent repeated playback.
     * The sound is played via the `SoundManager` to maintain consistent
     * audio control (volume, mute state, etc.) throughout the game.
     *
     * @method playDeathSound
     * @returns {void} This function does not return a value.
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
     * 
     * This method checks if the boss's `spawnID` is 8 or higher, and if so,
     * plays the hurt animation (`IMAGES_HURT`).
     * 
     * @method handleBossHurtState
     */
    handleBossHurtState() {
        if (this.spawnID >= 8) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * Handles the final death sequence of the boss.
     * 
     * This asynchronous method performs the following:
     * 1. Stops the current game using `world.stopGame()`.
     * 2. After a delay of 800ms, stops the current audio theme if `soundManager` exists,
     *    loads the win screen theme (`winScreen.mp3`), and plays it.
     * 
     * @async
     * @method handleDeath
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
     * Checks whether the boss should spawn or switch to swimming state.
     * 
     * This asynchronous method performs the following:
     * 1. If `spawnID` is less than 8, it calls `handleBossSpawnSequence()` to manage the spawn animation.
     * 2. If `spawnID` is 8 or higher and the boss is not attacking, it calls `handleBossSwimmingState()`.
     * 3. Increments the `spawnID` counter after checking.
     * 
     * @async
     * @method checkBossSpawn
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
     * 
     * This asynchronous method performs the following:
     * 1. Checks if the boss theme audio has already been played (`audioBossThemePlayed`).
     *    If not, it asynchronously plays the boss theme via `playBossTheme()`.
     * 2. Plays the boss spawning animation (`IMAGES_SPAWNING`).
     * 
     * @async
     * @method handleBossSpawnSequence
     */
    async handleBossSpawnSequence() {
        if (!this.audioBossThemePlayed) {
            await this.playBossTheme();
        }
        this.playAnimation(this.IMAGES_SPAWNING);
    }

    /**
     * Plays the boss theme music.
     * 
     * This asynchronous method performs the following:
     * 1. Returns immediately if `soundManager` is not defined.
     * 2. Stops any currently playing theme.
     * 3. Loads the boss theme audio file (`bossTheme.wav`) asynchronously.
     * 4. Plays the loaded boss theme.
     * 5. Marks `audioBossThemePlayed` as `true` to avoid replaying the theme.
     * 
     * @async
     * @method playBossTheme
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
     * 
     * This method performs the following:
     * 1. Plays the swimming animation (`IMAGES_SWIMMING`).
     * 2. Sets `isSwimming` to `true` to indicate the boss is in the swimming state.
     * 
     * @method handleBossSwimmingState
     */
    handleBossSwimmingState() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.isSwimming = true;
    }

    /**
     * Executes a randomized attack pattern based on the provided move ID.
     * 
     * This method maps `randomMoveID` (0–4) to specific attack behaviors using `performAttack()`:
     * - 0: attack with `up` direction
     * - 1: attack with `down` direction
     * - 2: attack without swimming, `up` direction
     * - 3: attack with swimming, no specific direction
     * - 4: attack without swimming, `down` direction
     * 
     * @method randomAttack
     * @param {number} randomMoveID - An integer (0–4) representing the random attack pattern.
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
     * Performs a boss attack with optional sound and directional movement.
     * 
     * This method performs the following based on the parameters:
     * 1. If `playSound` is true, it plays the boss bite sound via `playBossBiteSound()` and triggers `attackMove()`.
     * 2. If `direction` is `'up'`, the boss moves vertically up via `verticalMoveUp()`.
     * 3. If `direction` is `'down'`, the boss moves vertically down via `verticalMoveDown()`.
     * 
     * @method performAttack
     * @param {boolean} playSound - Whether to play the attack sound.
     * @param {('up'|'down'|null)} direction - The vertical movement direction for the attack.
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
     * 
     * This method checks if `soundManager` is defined and, if so,
     * plays the audio file `'img/assets/audio/bossBite.flac'` at volume 0.
     * 
     * @method playBossBiteSound
     */
    playBossBiteSound() {
        if (typeof soundManager !== 'undefined') {
            soundManager.playEffect('img/assets/audio/bossBite.flac', 0);
        }
    }

    /**
     * Initiates the boss's attack movement sequence.
     * 
     * This method performs the following:
     * 1. Sets `isAttacking` to `true` and resets `biteCounter` to 0.
     * 2. Defines the attack distance (`-370`) and movement speed (`23`).
     * 3. Starts a `setInterval` loop every 50ms to move the boss:
     *    - If moving forward, calls `handleAttackForward()` and switches direction when complete.
     *    - If moving backward, calls `handleAttackBackward()` and clears the interval when done.
     * 
     * @method attackMove
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
     * Handles the forward movement phase of the boss's attack.
     * 
     * This method performs the following:
     * 1. Moves the boss left by `speed` and updates the `moved` distance.
     * 2. Plays the attack animation (`IMAGES_ATTACK`) every 3 frames if the boss is not hurt.
     * 3. Increments the `biteCounter`.
     * 4. Calls the `onTurnBack` callback when the boss has moved the specified `distance`.
     * 
     * @method handleAttackForward
     * @param {number} speed - The speed at which the boss moves forward.
     * @param {number} distance - The distance the boss should move before turning back (negative value).
     * @param {Function} onTurnBack - Callback function invoked when the boss reaches the forward distance limit.
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
     * Handles the backward movement phase of the boss's attack.
     * 
     * This method performs the following:
     * 1. Moves the boss right by `speed` and updates the `moved` distance.
     * 2. Checks if the boss has returned to the original position (`moved >= 0`):
     *    - Clears the attack interval.
     *    - Sets `isAttacking` to `false` to indicate the attack has finished.
     * 
     * @method handleAttackBackward
     * @param {number} speed - The speed at which the boss moves backward.
     * @param {number} interval - The interval ID controlling the attack movement, which will be cleared when done.
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
     * Moves the boss downward vertically during an attack.
     * 
     * This method delegates the movement to `handleVerticalMove()` with preset parameters:
     * - Maximum distance: 150
     * - Speed: 9
     * - Direction: 'down'
     * 
     * @method verticalMoveDown
     */
    verticalMoveDown() {
        this.handleVerticalMove(150, 9, 'down');
    }

    /**
     * Moves the boss upward vertically during an attack.
     * 
     * This method delegates the movement to `handleVerticalMove()` with preset parameters:
     * - Maximum distance: 200
     * - Speed: 12
     * - Direction: 'up'
     * 
     * @method verticalMoveUp
     */
    verticalMoveUp() {
        this.handleVerticalMove(200, 12, 'up');
    }

    /**
     * Handles vertical movement of the boss during an attack.
     * 
     * This method animates vertical movement in a specified `direction` over a given `distance` at a defined `speed`.
     * The movement is performed using a `setInterval` loop:
     * - Moves forward until the total distance is reached.
     * - Reverses the movement back to the starting position.
     * - Clears the interval once the movement completes.
     * 
     * @method handleVerticalMove
     * @param {number} distance - The maximum distance to move vertically.
     * @param {number} speed - The speed of each vertical step.
     * @param {('up'|'down')} direction - The vertical direction to move the boss.
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
     * 
     * This method moves the boss along the Y-axis based on the given `speed`, `direction`, and `factor`.
     * - If `direction` is `'down'`, the Y-coordinate increases.
     * - If `direction` is `'up'`, the Y-coordinate decreases.
     * - `factor` allows reversing or scaling the movement.
     * 
     * @method updateVerticalPosition
     * @param {number} speed - The base movement speed.
     * @param {('up'|'down')} direction - The vertical direction of movement.
     * @param {number} factor - Multiplier to apply to the speed (1 or -1 for direction control).
     */
    updateVerticalPosition(speed, direction, factor) {
        if (direction === 'down') {
            this.y += speed * factor;
        } else {
            this.y -= speed * factor;
        }
    }

    /**
     * Checks whether the boss is dead.
     * 
     * This method returns `true` if the boss's `energy` is 0, otherwise `false`.
     * 
     * @method isDead
     * @returns {boolean} - `true` if the boss has no energy left, otherwise `false`.
     */
    isDead() {
        return this.energy == 0;
    }
}