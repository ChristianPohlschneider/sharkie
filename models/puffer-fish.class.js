class PufferFish extends MovableObject {
    x = 0;
    y = 180;
    height = 100;
    width = 100;
    interval = 1000 / 60;

    offset = {
        top: 10,
        left: 5,
        right: 10,
        bottom: 30
    };

    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 700 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();

    }
    animate() {
        this.phase = Math.random();
        this.moveLeft(this.speed, this.interval);
        this.oscillate(this.phase);
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 100);
    }




}