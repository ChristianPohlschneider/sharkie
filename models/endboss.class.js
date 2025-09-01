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

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    constructor(world, bossSpawnCoordinateX) {
        super().loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ATTACK);
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
        }, 4000);
    }

    randomAttack(randomMoveID) {
        randomMoveID = 1
        if (randomMoveID == 1) {
            console.log("randomID = 1: " + randomMoveID);


            //enemy attackes and moves fast forward, this.x - 400 and then back
            this.attackMove();

        } else if (randomMoveID == 2) {
            console.log("randomID = 2: " + randomMoveID);


            //enemy moves this.y down -400 and then back
            this.verticalMoveDown();

        } else if (randomMoveID == 3) {
            console.log("randomID = 3: " + randomMoveID);


            //enemy moves this.y down -400 and then back
            this.verticalMoveUp();

        }

    }

    // Bewegung 1: Angriff vorwärts und zurück
attackMove() {
    const distance = -400;
    const speed = 15; // Geschwindigkeit
    let moved = 0;
    let forward = true;

    const interval = setInterval(() => {
        if (forward) {
            this.x -= speed;
            moved -= speed;

            // Animation nur während forward
            
            this.playAnimation(this.IMAGES_ATTACK);

            if (moved <= distance) {
                forward = false; // Richtung umkehren
            }
        } else {
            // Rückwärtsbewegung ohne Animation
            this.x += speed;
            moved += speed;

            if (moved >= 0) {
                clearInterval(interval); // Bewegung abgeschlossen
            }
        }
    }, 50);
    
}

    // Bewegung 2: nach unten und zurück
    verticalMoveDown() {
        this.playAnimation(this.IMAGES_SWIMMING);

        const startY = this.y;
        const distance = 200;
        const speed = 20;
        let moved = 0;
        let down = true;

        const interval = setInterval(() => {
            if (down) {
                this.y += speed;
                moved += speed;
                if (moved >= distance) down = false;
            } else {
                this.y -= speed;
                moved -= speed;
                if (moved <= 0) clearInterval(interval);
            }
        }, 50);
    }

    // Bewegung 3: nach oben und zurück
    verticalMoveUp() {
        this.playAnimation(this.IMAGES_SWIMMING);

        const startY = this.y;
        const distance = 200;
        const speed = 20;
        let moved = 0;
        let up = true;

        const interval = setInterval(() => {
            if (up) {
                this.y -= speed;
                moved += speed;
                if (moved >= distance) up = false;
            } else {
                this.y += speed;
                moved -= speed;
                if (moved <= 0) clearInterval(interval);
            }
        }, 50);
    }

    isDead() {
        return this.energy == 0;
    }

}