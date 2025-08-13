class CoinBar extends MovableObject {
    percentage = 100;
    world;

    IMAGES_COINBAR = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png',
    ];

    constructor() {
        super();
        this.x = 20;
        this.y = 100;
        this.height = 60;
        this.width = 200;
        
        this.loadImage('img/4. Marcadores/green/Coin/100_ copia 4.png');
        this.loadImages(this.IMAGES_COINBAR);

    }


    setPercentage(percentage) {
        if (percentage < 100) {
            let absoluteEnergy = Math.floor(percentage / 20);
            this.loadImage(this.IMAGES_COINBAR[absoluteEnergy])
        } else if (percentage < 20 || percentage == 0) {
            this.loadImage(this.IMAGES_COINBAR[5])
        }
    }
}