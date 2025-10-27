class Coin extends MovableObject {
    x = 100;
    y = 100;
    height = 50;
    width = 50;
    coinValue = 4;
    animationInterval;
    world;
    level;

    offset = {
        top: 4,
        left: 4,
        right: 5,
        bottom: 4
    };

    COIN_IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    constructor(x, y, level) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = y;
        this.level = level;
    }

    /**
     * Assigns the game world to the character and starts its animations.
     * 
     * This method sets the `world` property to the given `world` object and
     * immediately calls `animate()` to begin the character's update loops.
     * 
     * @method setWorld
     * @param {Object} world - The game world instance that the character belongs to.
     */
    setWorld(world) {
        this.world = world;
        this.animate();
    }

    /**
     * Starts the animation loop for the character or object.
     * 
     * This method uses the world's `setStoppableInterval` to repeatedly call
     * `playAnimation()` with `COIN_IMAGES` every 200 milliseconds.
     * The interval ID is stored in `animationInterval` to allow stopping it later.
     * 
     * @method animate
     */
    animate() {
        this.animationInterval = this.world.setStoppableInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 200);
    }
}