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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playShootAnimation(images) {
        let path = images[this.currentShootImage];
        this.img = this.imageCache[path];
        this.currentShootImage++
        // let i = this.currentImage % images.length;

    }

    moveRight(speed, interval) {
        setInterval(() => {
            this.x += speed;
        }, interval);
    }

    moveLeft(speed, interval) {
        setInterval(() => {
            this.x -= speed;
        }, interval);
    }

    oscillate(phase) {
        setInterval(() => {
            this.y = this.y + this.amplitude * Math.sin(this.frequency / 100 + 100 * phase);
            this.frequency++;
        }, this.interval);
    }

    createShootableObject(xCorrection) {
    let bubble = new ShootableObject(this.x + xCorrection, this.y + 95, this.world.poisonBar);
    this.world.shootableObject.push(bubble);
    this.world.shootableObject[this.world.shootableObject.length - 1].shoot(this.otherDirection);
}

    isColliding(object) {
        return this.x + this.width - this.offset.right > object.x + object.offset.left &&
            this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
            this.x + this.offset.left < object.x + object.width - object.offset.right &&
            this.y + this.offset.top < object.y + object.height - object.offset.bottom
    }

    hit(damageFromCollision) {
        this.energy -= damageFromCollision;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }

    // Schrumpf-Animation bei Kollision
    shrinkOut() {
        if (this.isShrinking) return;
        this.isShrinking = true;

        // Standard-Animation stoppen
        clearInterval(this.animationInterval);

        let steps = 10;
        let count = 0;
        let interval = setInterval(() => {
            this.scale -= 0.1; // kleiner werden
            count++;

            if (count >= steps) {
                clearInterval(interval);
                this.isCollected = true; // markiere Coin als entfernt
            }
        }, 10);
    }
}