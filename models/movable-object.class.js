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

    moveRight() {
        //Console!
        console.log('Moving right');

    }

    moveLeft() {
        this.phase = Math.random();
        setInterval(() => {
            this.x -= this.speed;
            this.oscillate();
        }, this.interval);
    }

    oscillate() {
        this.y = this.y + this.amplitude * Math.sin(this.frequency / 100 + 100 * this.phase);
        this.frequency++;
    }

    playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    }
}