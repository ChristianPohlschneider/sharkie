class Statusbar extends MovableObject {
    x = 30;
    y = 150;
    height = 70;
    width = 300;
    percentage = 100;
    world;

    IMAGES_LIFE = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png',
    ];

    constructor() {
        super().loadImage('img/4. Marcadores/green/Life/100_  copia 2.png');
        this.loadImages(this.IMAGES_LIFE);

    }

    setPercentage(percentage) {
        if (percentage < 100) {
            let absoluteEnergy = Math.floor(percentage/20);
            this.loadImage(this.IMAGES_LIFE[absoluteEnergy])
        } else if (percentage < 20 || percentage == 0) {
            this.loadImage(this.IMAGES_LIFE[5])
        }
    }

}