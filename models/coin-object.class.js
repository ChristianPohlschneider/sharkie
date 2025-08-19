class Coin extends MovableObject {
    height = 50;
    width = 50;
    COIN_IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];
    world;

    constructor(x, y) {

        // super().loadImage('img/4. Marcadores/1. Coins/1.png');
        super();
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = y;

        this.animate();

    }

    animate() {
        setInterval(() => {
            
            level1.coins.forEach(element => {
                element.playAnimation(this.COIN_IMAGES);
            });
            
        }, 1000);
    }
}