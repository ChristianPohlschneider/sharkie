class Coin extends MovableObject {
    x = 100;
    y = 100;
    height = 50;
    width = 50;
    coinValue = 1;
    COIN_IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

   
    animationInterval;
    world;
    level;

    offset = {
        top: 4,
        left: 4,
        right: 5,
        bottom: 4
    };

    constructor(x, y, level) {

        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = y;
        this.level = level;
        this.animate();

    }

   animate() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 200);
    }

}