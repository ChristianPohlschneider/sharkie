class ShootableObject extends MovableObject{
    height = 50;
    width = 50;


    constructor(x, y) {
        super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = x;
        this.y = y;
    }

    shoot() {
        setInterval(() => {
            this.x += 30;
        }, 50); 
    }
    
}
