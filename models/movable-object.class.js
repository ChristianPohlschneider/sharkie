class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 100;
    width = 100;
    currentImage = 0;
    imageCache = {};
    interval = 1000 / 60;
    speed = 0.5;
    speedY = 0;
    speedX = 0;
    amplitude = 0.5;
    frequency = 1;
    phase = 1;
    otherDirection = false;
    energy = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    loadImage(path) {
        this.img = new Image(); //this.image = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    drawImages(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx, object) {
        if (this instanceof Character || this instanceof PufferFish || this instanceof Endboss) {
        //draw collision rectangle
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + object.offset.left, this.y + object.offset.top, this.width - object.offset.right - object.offset.left, this.height - object.offset.top - object.offset.bottom);
        ctx.stroke();
        }
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
        //überflüssige bubbles löschen bei x > level_end_x = 3600;
        let bubble = new ShootableObject(this.x + xCorrection, this.y + 95);
        this.world.shootableObject.push(bubble);
        this.world.shootableObject[this.shootcount].shoot(this.otherDirection);
        this.shootcount++;
    }

    isColliding(object) {
        return this.x + this.width - this.offset.right > object.x + object.offset.left &&
        this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
        this.x + this.offset.left < object.x + object.width - object.offset.right &&
        this.y + this.offset.top < object.y + object.height - object.offset.bottom  
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }
}