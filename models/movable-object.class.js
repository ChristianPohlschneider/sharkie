class MovableObject extends DrawableObject {
    x = 120;
    y = 250;
    height = 100;
    width = 100;
    interval = 1000 / 60;
    speed = 0.5;
    speedY = 0;
    speedX = 0;
    amplitude = 0.5;
    frequency = 1;
    phase = 1;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    currentShootImage = 0;
    scale = 1;
    isShrinking = false;
    world;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Plays an animation sequence by cycling through an array of image paths.
     * 
     * This method performs the following:
     * 1. Checks if the provided `images` array is different from the current animation; if so, it resets `currentImage`.
     * 2. Selects the current frame using modulo indexing.
     * 3. Sets `this.img` to the corresponding cached image from `imageCache`.
     * 4. Increments the `currentImage` counter for the next frame.
     * 
     * @method playAnimation
     * @param {string[]} images - An array of image paths representing the animation frames.
     */
    playAnimation(images) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0;
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the shooting animation sequence by cycling through an array of image paths.
     * 
     * This method performs the following:
     * 1. Checks if the provided `images` array is different from the current animation; if so, it resets `currentShootImage`.
     * 2. Sets `this.img` to the current frame from the `imageCache`.
     * 3. Increments the `currentShootImage` counter for the next frame.
     * 
     * @method playShootAnimation
     * @param {string[]} images - An array of image paths representing the shooting animation frames.
     */
    playShootAnimation(images) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentShootImage = 0;
        }
        let path = images[this.currentShootImage];
        this.img = this.imageCache[path];
        this.currentShootImage++
    }

    /**
     * Moves the object to the right at a specified speed and interval.
     * 
     * This method uses `world.setStoppableInterval()` to repeatedly increment the object's
     * `x` coordinate by the given `speed` every `interval` milliseconds.
     * 
     * @method moveRight
     * @param {number} speed - The amount to move the object on each interval.
     * @param {number} interval - The time in milliseconds between each movement step.
     * @returns {number} - The interval ID returned by `setStoppableInterval`, which can be used to stop the movement.
     */
    moveRight(speed, interval) {
        return this.world.setStoppableInterval(() => {
            this.x += speed;
        }, interval);
    }

    /**
     * Moves the object to the left at a specified speed and interval.
     * 
     * This method uses `world.setStoppableInterval()` to repeatedly decrement the object's
     * `x` coordinate by the given `speed` every `interval` milliseconds.
     * 
     * @method moveLeft
     * @param {number} speed - The amount to move the object on each interval.
     * @param {number} interval - The time in milliseconds between each movement step.
     * @returns {number} - The interval ID returned by `setStoppableInterval`, which can be used to stop the movement.
     */
    moveLeft(speed, interval) {
        return this.world.setStoppableInterval(() => {
            this.x -= speed;
        }, interval);
    }

    /**
     * Starts a vertical oscillation for the object based on a sine wave.
     * 
     * This method repeatedly updates the object's `y` position using the formula:
     * `y + amplitude * sin(frequency / 100 * phase)` at a set interval.
     * Each interval increments the `frequency` counter.
     * 
     * @method oscillate
     * @param {number} phase - The phase offset for the sine wave oscillation.
     * @returns {number} - The interval ID returned by `setStoppableInterval`, which can be used to stop the oscillation.
     */
    oscillate(phase) {
        return this.world.setStoppableInterval(() => {
            this.y = this.y + this.amplitude * Math.sin(this.frequency / 100 * phase);
            this.frequency++;
        }, this.interval);
    }

    /**
     * Creates a new shootable object (e.g., a bubble) and adds it to the world's shootable objects.
     * 
     * This method performs the following:
     * 1. Instantiates a new `ShootableObject` at the current object's position plus an `xCorrection`.
     * 2. Adds the new object to the `world.shootableObject` array.
     * 3. Calls the `shoot()` method on the new object, passing the current `otherDirection` state.
     * 
     * @method createShootableObject
     * @param {number} xCorrection - The horizontal offset to adjust the spawn position of the shootable object.
     */
    createShootableObject(xCorrection) {
        let bubble = new ShootableObject(this.x + xCorrection, this.y + 95, this.world.poisonBar);
        this.world.shootableObject.push(bubble);
        this.world.shootableObject[this.world.shootableObject.length - 1].shoot(this.otherDirection);
    }

    /**
     * Checks if this object is colliding with another object, taking offsets into account.
     * 
     * @method isColliding
     * @param {Object} object - The object to check collision against. Must have `x`, `y`, `width`, `height`, and `offset` properties.
     * @param {number} [x=this.x] - Optional x-coordinate of this object for the collision check.
     * @param {number} [y=this.y] - Optional y-coordinate of this object for the collision check.
     * @returns {boolean} - Returns `true` if the bounding boxes of this object and the target object overlap, otherwise `false`.
     */
    isColliding(object, x = this.x, y = this.y) {
        return x + this.width - this.offset.right > object.x + object.offset.left &&
            y + this.height - this.offset.bottom > object.y + object.offset.top &&
            x + this.offset.left < object.x + object.width - object.offset.right &&
            y + this.offset.top < object.y + object.height - object.offset.bottom;
    }

    /**
     * Applies damage to the object when it is hit.
     * 
     * This method decreases the object's `energy` by the specified damage amount. 
     * If the resulting energy falls below zero, it is set to zero. Otherwise, it updates 
     * `lastHit` with the current timestamp to track when the object was last damaged.
     * 
     * @method hit
     * @param {number} damageFromCollision - The amount of damage to apply to the object.
     */
    hit(damageFromCollision) {
        if (this.hasDied) return;
        this.energy -= damageFromCollision;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Determines whether the object is currently in a hurt state.
     * 
     * The object is considered hurt if less than 1 second has passed since the last hit.
     * 
     * @method isHurt
     * @returns {boolean} - Returns `true` if the object was hit within the last second, otherwise `false`.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Gradually shrinks the object until it disappears.
     * 
     * This method reduces the `scale` of the object in 10 steps, with a 10ms delay between each step.
     * Once the shrink animation is complete, `isCollected` is set to `true` to mark the object as removed.
     * Any ongoing animation interval is cleared to prevent conflicts.
     * 
     * @method shrinkOut
     */
    shrinkOut() {
        if (this.isShrinking) return;
        this.isShrinking = true;
        clearInterval(this.animationInterval);
        let count = 0;
        const steps = 10;
        const interval = setInterval(() => {
            this.scale -= 0.1;
            if (++count >= steps) {
                clearInterval(interval);
                this.isCollected = true;
            }
        }, 10);
    }
}