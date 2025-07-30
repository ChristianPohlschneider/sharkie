class Bubble extends ShootedObject {
    x = 100;
    y = 150;
    height = 50;
    width = 50;
    speed = 3;

    IMAGES_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',
    ];
    world;


    constructor() {
        super().loadImage('');
        this.loadImages(this.IMAGES_BUBBLE);
        // this.animate();
    }

    animate() {
        setInterval(() => {
            // if (this.world.keyboard.Space) {
                this.playAnimation(this.IMAGES_BUBBLE);
            // }
        }, 200);
    }
}