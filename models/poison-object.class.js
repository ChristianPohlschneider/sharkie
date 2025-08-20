class PoisonBottle extends MovableObject {
    x = 100;
    y = 100;
    height = 75;
    width = 75;
    poisonValue = 20;
    POISONBOTTLE_IMAGES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',
    ];
    world;
    level;

    offset = {
        top: 35,
        left: 15,
        right: 15,
        bottom: 3
    };

    constructor(x, y, level) {

        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.POISONBOTTLE_IMAGES);
        this.x = x;
        this.y = y;
        this.level = level;
        this.animate();

    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.POISONBOTTLE_IMAGES);
        }, 200);

    }

}