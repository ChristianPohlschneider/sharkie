class PoisonBottle extends MovableObject {
    x = 100;
    y = 100;
    height = 75;
    width = 75;
    poisonValue = 10;
    world;
    level;

    offset = {
        top: 35,
        left: 15,
        right: 15,
        bottom: 3
    };

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

    constructor(x, y, level) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.POISONBOTTLE_IMAGES);
        this.x = x;
        this.y = y;
        this.level = level;
    }

    /**
     * Sets the game world for this object and starts its animation loop.
     * 
     * @method setWorld
     * @param {Object} world - The game world instance this object belongs to.
     */
    setWorld(world) {
        this.world = world;
        this.animate();
    }

    /**
     * Starts the animation loop for the poison bottle object.
     * 
     * Continuously cycles through the images defined in `POISONBOTTLE_IMAGES`
     * at an interval of 200 milliseconds.
     * 
     * @method animate
     */
    animate() {
        this.world.setStoppableInterval(() => {
            this.playAnimation(this.POISONBOTTLE_IMAGES);
        }, 200);
    }
}