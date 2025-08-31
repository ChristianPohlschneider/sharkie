class PufferFish extends MovableObject {
    x = 0;
    y = 180;
    height = 100;
    width = 100;
    interval = 1000 / 60;
    energy = 100;
    damageFromBubble = 50;
    damageFromFinSlap = 100;
    world;
    lastHit = 0;
    hasDied = false;
    moveInterval = null;
    oscillateInterval = null;
    animationInterval = null;

    offset = {
        top: 10,
        left: 5,
        right: 10,
        bottom: 30
    };

    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    IMAGES_DIE = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',

    ];

    IMAGES_HURT = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ];

    constructor(world) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_HURT);
        this.world = world;
        this.x = 700 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();

    }

    animate() {
        this.phase = Math.random();

        // eigene Bewegungsintervalle speichern
        this.moveInterval = this.moveLeft(this.speed, this.interval);
        this.oscillateInterval = this.oscillate(this.phase);

        // Animationsloop (nicht stoppen, solange Fisch lebt)
        this.animationInterval = this.world.setStoppableInterval(() => {
            if (this.isDead()) {
                this.handleDeath();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 200);
    }

    handleDeath() {
        if (!this.hasDied) {
            this.hasDied = true;
            this.playAnimation(this.IMAGES_DIE);

            // Nur eigene Bewegungsintervalle stoppen
            clearInterval(this.moveInterval);
            clearInterval(this.oscillateInterval);
            setTimeout(() => {
               
                this.shrinkOut();

            }, this.IMAGES_DIE.length * 200);
            // nach Animation entfernen
            setTimeout(() => {
                let index = this.world.level.enemies.indexOf(this);
                if (index > -1 && this.isCollected == true) {
                    this.world.level.enemies.splice(index, 1);
                    
                }
            }, this.IMAGES_DIE.length * 300);
        }
    }

    isDead() {
        return this.energy <= 0;
    }



}