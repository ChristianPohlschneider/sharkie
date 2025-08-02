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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}