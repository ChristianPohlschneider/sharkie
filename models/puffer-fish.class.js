class PufferFish extends MovableObject {
    x = 0;
    y = 180;
    height = 100;
    width = 100;
    interval = 1000 / 60;
    energy = 100;
    damageFromBubble = 50;
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
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
       
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

    // animate() {
    //     this.phase = Math.random();
    //     this.moveLeft(this.speed, this.interval);
    //     this.oscillate(this.phase);

    //     this.world.setStoppableInterval(() => {
    //         this.animationID = this.world.intervalIds[this.world.intervalIds.length - 1];

    //         if (this.isDead() && !this.hasDied) {
    //             this.hasDied = true;
    //             this.playAnimation(this.IMAGES_DIE);

    //             // Bewegung stoppen
    //             clearInterval(this.animationID);

    //             // Nach der Animationsdauer entfernen
    //             setTimeout(() => {
    //                 let index = this.world.level.enemies.indexOf(this);
    //                 if (index > -1) {
    //                     this.world.level.enemies.splice(index, 1);
    //                 }
    //             }, this.IMAGES_DIE.length * 200); // 200ms pro Frame wie in deinem Intervall
    //         } 
    //         else if (!this.isDead()) {
    //             if (this.isHurt()) {
    //                 this.playAnimation(this.IMAGES_HURT);
    //             } else {
    //                 this.playAnimation(this.IMAGES_SWIMMING);
    //             }
    //         }

    //     }, 200);
    // }

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

            // nach Animation entfernen
            setTimeout(() => {
                let index = this.world.level.enemies.indexOf(this);
                if (index > -1) {
                    this.world.level.enemies.splice(index, 1);
                }
            }, this.IMAGES_DIE.length * 200);
        }
    }

    stopMoving() {
        // Hilfsfunktion: stoppt NUR Bewegung
        // z. B. wenn moveLeft/oscillate Intervalle in world.intervalIds registriert sind:
        this.world.intervalIds.forEach(id => clearInterval(id));
    }

    isDead() {
        return this.energy <= 0;
    }



}