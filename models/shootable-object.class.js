class ShootableObject extends MovableObject {
    height = 50;
    width = 50;
    maxRange = 0;
    minRange = 0;

    constructor(x, y, poisonBar) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.poisonBar = poisonBar;
        this.maxRange = x + 150;
        this.minRange = x - 150;
    }

    /**
     * Shoots a bubble from the character's current position.
     * 
     * Depending on whether the player has poison in the venom sac,
     * the function either shoots a normal bubble or a poisoned bubble.
     * Poison usage decreases the venom sac by 10 units and updates
     * the poison bar UI.
     * 
     * The bubble moves horizontally at a fixed speed.
     * 
     * @param {boolean} otherDirection - If true, the bubble moves to the left; otherwise, it moves to the right.
     * @returns {void}
     */
    shoot(otherDirection) {
        if (this.poisonBar.getVenomSac() > 0) {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
            this.poisonBar.poisonCount(-10);
            this.poisonBar.setPoisonAmount(this.poisonBar.venomSac);
        } else {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        }
        const speed = 20;
        setInterval(() => {
            this.x += otherDirection ? -speed : speed;
        }, 50);
    }

}
