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

    shoot(otherDirection) {
        if (this.poisonBar.getVenomSac() > 0) {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
            this.poisonBar.poisonCount(-20);
            this.poisonBar.setPoisonAmount(this.poisonBar.venomSac);
        } else {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png')
        }
        if (otherDirection == false) {
            setInterval(() => {
                this.x += 30;
            }, 50);
        } else if (otherDirection == true) {
            setInterval(() => {
                this.x -= 30;
            }, 50);
        }
    }

}
