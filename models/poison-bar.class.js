class PoisonBar extends MovableObject {
    percentage = 100;
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


    setPercentage(percentage) {
        if (percentage < 100) {
            let absoluteEnergy = Math.floor(percentage / 20);
            this.loadImage(this.IMAGES_POISONBAR[absoluteEnergy])
        } else if (percentage < 20 || percentage == 0) {
            this.loadImage(this.IMAGES_POISONBAR[0])
        }
    }
}