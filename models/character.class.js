class Character extends MovableObject {
    x = 0;
    y = 150;
    height = 200;
    width = 200;
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