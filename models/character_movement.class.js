class CharacterMovement extends Character {
    world;
    level;

    constructor(world) {
        this.world = world;
    }
    animate() {
        this.startMovementInterval();
        // this.startStateInterval();
        // this.startActionInterval();
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
}