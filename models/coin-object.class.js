class Coin extends MovableObject {
    x = 100;
    y = 100;
    height = 50;
    width = 50;
    COIN_IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];
    world;
    level;

    constructor(x, y, level) {

        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = y;
        this.level = level;
        this.animate();

    }

    animate() {

    setInterval(() => {
        this.playAnimation(this.COIN_IMAGES);
    }, 200);

    }
}