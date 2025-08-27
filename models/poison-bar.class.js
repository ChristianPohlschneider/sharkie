class PoisonBar extends MovableObject {
    venomSac = 0;
    world;

    IMAGES_POISONBAR = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
    ];

    constructor() {
        super();
        this.x = 20;
        this.y = 50;
        this.height = 60;
        this.width = 200;

        this.loadImage('img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png');
        this.loadImages(this.IMAGES_POISONBAR);

    }

    setPoisonAmount(poisonInVenomSac) {
        if (poisonInVenomSac < 100) {
            let absolutePoisonAmount = Math.floor(poisonInVenomSac / 20);
            this.loadImage(this.IMAGES_POISONBAR[absolutePoisonAmount])
        } else if (poisonInVenomSac > 80 || poisonInVenomSac == 100) {
            this.loadImage(this.IMAGES_POISONBAR[5])
        }
    }

    poisonCount(poisonValue) {
        this.venomSac += poisonValue;
        if (this.venomSac < 0) {
            this.venomSac = 0;
        } else if (this.venomSac >= 100) {
            this.venomSac = 100;
        }
    }

    getVenomSac() {
        return this.venomSac;
    }
}