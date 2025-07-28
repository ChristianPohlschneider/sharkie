class Character extends MovableObject {
    x = 100;
    y = 150;
    height = 200;
    width = 200;
    speed = 3;
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    //hand over world variables
    world;


    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.ArrowRight) {
                this.x += this.speed;
                console.log("Sharkie" + this.x);
                
                this.otherDirection = false;
            }
            if (this.world.keyboard.ArrowLeft && this.x > -50) {
                this.x -= this.speed;

                console.log("Sharkie" + this.x);
                this.otherDirection = true;
            }
            if (this.world.keyboard.ArrowUp) {
                this.y -= this.speed;
            }
            if (this.world.keyboard.ArrowDown) {
                this.y += this.speed;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.ArrowRight || this.world.keyboard.ArrowLeft|| this.world.keyboard.ArrowUp|| this.world.keyboard.ArrowDown) {
                //walk animation
                let i = this.currentImage % this.IMAGES_SWIMMING.length;
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 200);
    }

    finSlap() {

    }
}