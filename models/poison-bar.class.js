class PoisonBar extends MovableObject {
    venomSac = 0;
    score = 20;
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

    /**
     * Updates the poison bar display based on the current poison amount in the venom sac.
     * 
     * If the poison amount is less than 100, calculates an index to select the appropriate image
     * from `IMAGES_POISONBAR`. If the amount is greater than 80 or exactly 100, the last image
     * in the array is used.
     * 
     * @method setPoisonAmount
     * @param {number} poisonInVenomSac - The current poison amount in the venom sac.
     */
    setPoisonAmount(poisonInVenomSac) {
        if (poisonInVenomSac < 100) {
            let absolutePoisonAmount = Math.floor(poisonInVenomSac / 20);
            this.loadImage(this.IMAGES_POISONBAR[absolutePoisonAmount])
        } else if (poisonInVenomSac > 80 || poisonInVenomSac == 100) {
            this.loadImage(this.IMAGES_POISONBAR[5])
        }
    }

    /**
     * Adjusts the current amount of poison in the venom sac.
     * 
     * Adds the specified `poisonValueAmount` to `venomSac`. Ensures that the value
     * remains within the range of 0 to 100.
     * 
     * @method poisonCount
     * @param {number} poisonValueAmount - The amount of poison to add (can be negative to reduce).
     */
    poisonCount(poisonValueAmount) {
        this.venomSac += poisonValueAmount;
        if (this.venomSac < 0) {
            this.venomSac = 0;
        } else if (this.venomSac >= 100) {
            this.venomSac = 100;
        }
    }

    /**
     * Returns the current amount of poison in the venom sac.
     * 
     * @method getVenomSac
     * @returns {number} - The current poison amount in the venom sac (0 to 100).
     */
    getVenomSac() {
        return this.venomSac;
    }
}