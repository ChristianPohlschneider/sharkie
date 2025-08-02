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

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof PufferFish || this instanceof Endboss) {
        //draw collision rectangle
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
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
        return this.x + this.width > object.x &&
        this.y + this.height > object.y &&
        this.x < object.x &&
        this.y < object.y + object.height   
    }
}