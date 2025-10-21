class Endboss extends MovableObject {
    x = 0;
    y = 70;
    height = 300;
    width = 300;
    amplitude = 0;
    frequency = 1;
    phase = 1;
    energy = 100;
    damageFromBubble = 5;
    damageFromFinSlap = 10;
    damageDueToCollision = 25;
    spawnID = 0;
    isSwimming = false;
    isAttacking = false;
    randomMoveID = 0;
    moved = 0;
    biteCounter = 0;
    world;
    audioBossThemePlayed = false;
    // audioBossDies = new Audio('img/assets/audio/bossDies.wav');
    // audioBossTheme = new Audio('img/assets/audio/bossTheme.wav');
    audioBossBite = new Audio('img/assets/audio/bossBite.flac');

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

        this.world.setStoppableInterval(() => {
            if (this.isDead()) {
                // Sound als Effekt über SoundManager mit 200ms Verzögerung
                if (soundManager) {
                    soundManager.playEffect('img/assets/audio/bossDies.wav', 200);
                }

                // Tod-Animation abspielen
                this.playAnimation(this.IMAGES_DIE);

                // Wenn das letzte Bild erreicht ist, handle Death aufrufen
                const deadImageSrc = 'http://127.0.0.1:5500/img/2.Enemy/3%20Final%20Enemy/Dead/Mesa%20de%20trabajo%202%20copia%2010.png';
                if (this.img.src === deadImageSrc) {
                    this.handleDeath();
                    showWinOverlay();
                }

            } else if (this.isHurt() && !this.isDead()) {
                if (this.spawnID >= 8) {
                    this.playAnimation(this.IMAGES_HURT);
                }
                // Bei spawnID < 8 nichts tun
            } else {
                this.checkBossSpawn();
            }
        }, 200);

        this.world.setStoppableInterval(() => {
            if (this.isSwimming && this.isAttacking == false && !this.isDead()) {
                this.randomMoveID = Math.floor(Math.random() * 5);
                this.randomAttack(this.randomMoveID);
            }
        }, 3000);
    }

    async handleDeath() {
        // 800 ms warten, bevor der Win-Screen Sound startet
        setTimeout(async () => {
            if (soundManager) {
                // Aktuelle Musik stoppen
                soundManager.stopTheme();

                // Win-Screen Musik laden und starten
                await soundManager.loadTheme('img/assets/audio/winScreen.mp3');
                soundManager.playTheme();
            }
        }, 800);

        // Spiel stoppen
        this.world.stopGame();
    }

    async checkBossSpawn() {
        if (this.spawnID < 8) {
            // Boss-Theme nur einmal abspielen
            if (!this.audioBossThemePlayed && soundManager) {
                soundManager.stopTheme(); // aktuelle Musik stoppen

                await soundManager.loadTheme('img/assets/audio/bossTheme.wav');
                soundManager.playTheme();

                this.audioBossThemePlayed = true;
            }

            // Spawn-Animation abspielen
            this.playAnimation(this.IMAGES_SPAWNING);

        } else if (!this.isAttacking) {
            // Schwimm-Animation, wenn nicht angreifend
            this.playAnimation(this.IMAGES_SWIMMING);
            this.isSwimming = true;
        }

        this.spawnID++;
        // console.log(this.spawnID);
    }

    randomAttack(randomMoveID) {
        // randomMoveID = 2;
        // console.log("randomID: " + randomMoveID);
        if (randomMoveID == 0) {
            // console.log("randomID = 0: " + randomMoveID);
            //enemy attackes and moves fast forward, this.x - 400 and then back
            if (soundManager) soundManager.playEffect('img/assets/audio/bossBite.flac', 0);
            this.attackMove();
            this.verticalMoveUp();
        } else if (randomMoveID == 1) {
            if (soundManager) soundManager.playEffect('img/assets/audio/bossBite.flac', 0);
            // console.log("randomID = 1: " + randomMoveID);
            this.attackMove();
            //enemy moves this.y down -400 and then back
            this.verticalMoveDown();
        } else if (randomMoveID == 2) {
            // console.log("randomID = 2: " + randomMoveID);
            //enemy moves this.y down -400 and then back
            this.verticalMoveUp();
        } else if (randomMoveID == 3) {
            if (soundManager) soundManager.playEffect('img/assets/audio/bossBite.flac', 0);
            // console.log("randomID = 3: " + randomMoveID);
            //enemy moves this.y down -400 and then back
            this.attackMove();
        } else if (randomMoveID == 4) {
            // console.log("randomID = 4: " + randomMoveID);
            //enemy moves this.y down -400 and then back
            this.verticalMoveDown();
        }

    }

    // Bewegung 1: Angriff vorwärts und zurück
    attackMove() {
        this.isAttacking = true;
        const distance = -370;
        const speed = 23; // Geschwindigkeit

        let forward = true;
        this.biteCounter = 0;

        const interval = setInterval(() => {
            if (forward) {
                this.x -= speed;
                this.moved -= speed;

                // Animation nur während forward
                if (this.biteCounter % 3 == 0 && !this.isHurt()) {
                    this.playAnimation(this.IMAGES_ATTACK);
                }
                this.biteCounter++
                // console.log(this.biteCounter);
                // console.log(this.moved);
                // console.log(this.img.src);


                if (this.moved <= distance) {
                    forward = false; // Richtung umkehren
                }
            } else {
                // Rückwärtsbewegung ohne Animation
                this.x += speed;
                this.moved += speed;

                if (this.moved >= 0) {
                    clearInterval(interval); // Bewegung abgeschlossen
                    this.isAttacking = false;
                }
            }
        }, 50);

    }

    // Bewegung 2: nach unten und zurück
    verticalMoveDown() {
        // this.playAnimation(this.IMAGES_SWIMMING);

        const startY = this.y;
        const distance = 150;
        const speed = 9;
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
        // this.playAnimation(this.IMAGES_SWIMMING);

        const startY = this.y;
        // const distance = 200;
        const distance = 200;
        // const speed = 20;
        const speed = 12;
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