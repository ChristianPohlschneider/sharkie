class Endboss extends MovableObject {
    x = 0;
    y = 70;
    height = 300;
    width = 300;
    amplitude = 0;
    frequency = 1;
    phase = 1;
    interval = 1000 / 60;
    energy = 100;
    damageFromBubble = 5;
    damageFromFinSlap = 10;
    isSwimming = false;
    randomMoveID = 0;
    world;

    offset = {
        top: 150,
        left: 20,
        right: 25,
        bottom: 60
    };

    IMAGES_SPAWNING = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    ];

    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    IMAGES_DIE = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',

    ];

    constructor(world, bossSpawnCoordinateX) {
        
        super().loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_HURT);
        this.world = world;
        this.x = bossSpawnCoordinateX;
        this.speed = 0;
        this.animate();
        
    }

    animate() {
        this.moveLeft(this.speed, this.interval);
        let spawnID = 0;
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DIE);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                
                if (spawnID < 8) {
                    this.playAnimation(this.IMAGES_SPAWNING);
                } else {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.isSwimming = true;
                }
                 spawnID++
            }      
        }, 200);

        this.world.setStoppableInterval(() => {
        if (this.isSwimming) {
            this.randomMoveID = Math.floor(Math.random() * 4);
            this.randomAttack(this.randomMoveID);
        }
         }, 10000);
    }

    randomAttack(randomMoveID) {
        if (randomMoveID == 1) {
            console.log("randomID = 1: " + randomMoveID);
        } else if (randomMoveID == 2) {
            console.log("randomID = 2: " + randomMoveID);
        } else if (randomMoveID == 3) {
            console.log("randomID = 3: " + randomMoveID);
        }

    }

    isDead() {
        return this.energy == 0;
    }

}