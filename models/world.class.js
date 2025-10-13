class World {
    character;
    level = level1;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    shootableObject = [];
    intervalIds = [];
    isCollidingBarrier = false;
    // audioCoin = new Audio('img/assets/audio/coin.wav');
    // audioBubble = new Audio('img/assets/audio/bubble.wav');
    // audioHit = new Audio('img/assets/audio/hit.wav');
    // audioAcid = new Audio('img/assets/audio/acid.wav');
    // audioHurtSharky = new Audio('img/assets/audio/hurtSharky.wav');
    // audioGameTheme = new Audio('img/assets/audio/gameTheme.wav');


    constructor(canvas, keyboard) {//hand over variables to world
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.character = new Character(this);

        this.draw();
        this.setWorld();
        this.checkCollision();
        this.checkCollisionBubbleBarrier();
        this.checkCollisionFromBubble();
        this.checkBubbleOutOfRange();
        this.checkCollisionWithCoin();
        this.checkCollisionWithPoisonBottle();
        this.checkCollisionWithBarrier();
    }

    //hand over world variables
    setWorld() {
        this.character.world = this;
        this.level.coins.forEach(coin => coin.setWorld(this));
        this.level.poisonBottles.forEach(bottle => bottle.setWorld(this));
        // this.audioGameTheme.loop = true;
        // this.audioGameTheme.currentTime = 0;
        // this.audioGameTheme.play();

        // soundManager.stopTheme();
        // await soundManager.loadTheme('img/assets/audio/gameTheme.wav');
        // soundManager.playTheme();
    }

    setStoppableInterval(fn, interval) {
        let id = setInterval(fn, interval);
        this.intervalIds.push(id);
        return id;
    }

    checkCollision() {
        // id: 16
        this.setStoppableInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    if (this.character.isSlapping && enemy.damageFromFinSlap != 0) {
                        enemy.hit(enemy.damageFromFinSlap);
                    } else if (!this.character.isSlapping) {
                        if (!this.character.isDead()) {
                            soundManager.playEffect('img/assets/audio/hurtSharky.wav', 0);
                        }
                        this.character.hit(enemy.damageDueToCollision);
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            });
        }, 200);
    }

    //     checkCollisionBubbleBarrier() {
    //     this.setStoppableInterval(() => {
    //         this.shootableObject = this.shootableObject.filter((bubble) => {
    //             let hit = false;

    //             this.level.barriers.forEach((barrier) => {
    //                 if (barrier.isColliding(bubble)) {
    //                     hit = true; // Bubble soll gelöscht werden
    //                 }
    //             });

    //             return !hit; // nur Bubbles behalten, die NICHT getroffen haben
    //         });
    //     }, 200);
    // }

    checkCollisionBubbleBarrier() {
        this.setStoppableInterval(() => {
            for (let i = this.shootableObject.length - 1; i >= 0; i--) {
                const bubble = this.shootableObject[i];

                let collided = false;
                this.level.barriers.forEach((barrier) => {
                    if (barrier.isColliding(bubble)) {
                        collided = true;
                    }
                });

                if (collided && !bubble.isShrinking) {
                    bubble.shrinkOut(); // Animation starten
                }

                // Bubble erst entfernen, wenn Animation fertig ist
                if (bubble.isCollected) {
                    this.shootableObject.splice(i, 1);
                }
            }
        }, 50); // kleineres Intervall für flüssigere Animation
    }


    checkCollisionFromBubble() {
        this.setStoppableInterval(() => {
            this.shootableObject = this.shootableObject.filter((bubble) => {
                let hit = false;

                this.level.enemies.forEach((enemy) => {
                    if (enemy.isColliding(bubble) && enemy.spawnID >= 8) {

                        // Nur den Dateinamen extrahieren, nicht den kompletten URL-Pfad
                        const filename = bubble.img.src.split('/').pop();
                        // URL-Decoding für Sonderzeichen
                        const decodedFilename = decodeURIComponent(filename);
                        const isPoisoned = decodedFilename.includes('Poisoned Bubble');

                        // Schaden berechnen
                        const damage = isPoisoned ? 2 * enemy.damageFromBubble : enemy.damageFromBubble;
                        enemy.hit(damage);

                        console.log(decodedFilename, damage);

                        // Sound
                        if (soundManager) {
                            soundManager.playEffect('img/assets/audio/hit.wav', 0);
                        }

                        hit = true; // Bubble soll gelöscht werden
                    }
                });

                return !hit; // nur Bubbles behalten, die NICHT getroffen haben
            });
        }, 200);
    }




    // checkBubbleOutOfRange() {
    //     this.setStoppableInterval(() => {
    //         for (let i = this.shootableObject.length - 1; i >= 0; i--) {
    //             const bubble = this.shootableObject[i];
    //             if (bubble.x > bubble.maxRange || bubble.x < bubble.minRange) {
    //                 //Console Log
    //                 // console.log(bubble.x);
    //                 // console.log(this.character.x);
    //                 bubble.shrinkOut();
    //                 this.shootableObject.splice(i, 1);
    //             }
    //         }
    //     }, 200);
    // }

    checkBubbleOutOfRange() {
        this.setStoppableInterval(() => {
            for (let i = this.shootableObject.length - 1; i >= 0; i--) {
                const bubble = this.shootableObject[i];

                if ((bubble.x > bubble.maxRange || bubble.x < bubble.minRange) && !bubble.isShrinking) {
                    bubble.shrinkOut(); // Animation starten
                }

                // Bubble erst entfernen, wenn Animation fertig ist
                if (bubble.isCollected) {
                    this.shootableObject.splice(i, 1);
                }
            }
        }, 50); // Intervall kürzer, damit Animation flüssiger sichtbar ist
    }


    checkCollisionWithCoin() {
        this.setStoppableInterval(() => {
            this.level.coins = this.level.coins.filter((coin) => {
                if (this.character.isColliding(coin)) {
                    this.coinBar.coinCount(coin.coinValue);
                    this.coinBar.setWalletAmount(this.coinBar.wallet);

                    // Sound über SoundManager abspielen
                    if (soundManager) {
                        soundManager.playEffect('img/assets/audio/coin.wav', 0); // optional: Delay in ms
                    }

                    coin.shrinkOut();
                    this.level.shrinkingObjects.push(coin);
                    return false; // Coin wurde eingesammelt
                }
                return true; // Coin bleibt erhalten
            });
        }, 200);
    }

    checkCollisionWithPoisonBottle() {
        this.setStoppableInterval(() => {
            this.level.poisonBottles = this.level.poisonBottles.filter((poisonBottle) => {
                if (this.character.isColliding(poisonBottle)) {
                    this.poisonBar.poisonCount(poisonBottle.poisonValue);
                    this.poisonBar.setPoisonAmount(this.poisonBar.venomSac);

                    // Sound über SoundManager abspielen
                    if (soundManager) {
                        soundManager.playEffect('img/assets/audio/acid.wav', 0); // optional: Delay in ms
                    }

                    poisonBottle.shrinkOut(); // Shrink-Animation starten
                    this.level.shrinkingObjects.push(poisonBottle); // Objekt merken
                    return false; // PoisonBottle wurde eingesammelt
                }
                return true; // PoisonBottle bleibt erhalten
            });
        }, 200);
    }

    // checkCollisionWithBarrier() {

    //         this.level.barriers.forEach((barrier) => {
    //             if (this.character.isColliding(barrier)) {

    //                 return this.isCollidingBarrier = true;
    //             } else {
    //                 return this.isCollidingBarrier = false;
    //             }
    //         });

    // }

    checkCollisionWithBarrier() {
        this.isCollidingBarrier = this.level.barriers.some(barrier =>
            this.character.isColliding(barrier)
        );
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //scroll world in opposite direction of sharkie
        this.ctx.translate(this.camera_x, 0);
        let camera_xWidthModulo = Math.floor(-this.camera_x / 720);
        // console.log(camera_xWidthModulo);

        if (camera_xWidthModulo % 2 == 0) {
            // console.log("Frame1");
            this.gameLoopFrame2(camera_xWidthModulo);
            this.addObjectsToMap(this.level.backgroundObjects);
        } else if ((camera_xWidthModulo + 1) % 2 == 0) {
            // console.log("Frame2");
            this.gameLoopFrame1(camera_xWidthModulo);
            this.addObjectsToMap(this.level.backgroundObjects);
        }

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.shootableObject);

        this.addShrinkingObjectsToMap(this.level.coins);

        this.addShrinkingObjectsToMap(this.level.poisonBottles);

        this.addObjectsToMap(this.level.barriers);

        this.level.shrinkingObjects = this.addShrinkingObjectsToMap(this.level.shrinkingObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);

        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.drawImages(this.ctx);
        object.drawFrame(this.ctx, object);
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    addShrinkingObjectsToMap(objects) {
        if (!objects) return []; // array existiert nicht -> leere Rückgabe

        let visibleObjects = objects.filter(o => !o.isCollected);
        visibleObjects.forEach(o => o.drawShrinkingObjects(this.ctx));
        visibleObjects.forEach(o => o.drawFrame(this.ctx, o));
        return visibleObjects;
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    //Modulo uneven
    gameLoopFrame1(camera_xWidthModulo) {
        for (let backgroundLoopIndex = 0; backgroundLoopIndex < 5; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = 720 + camera_xWidthModulo * 720;
        }
        for (let backgroundLoopIndex = 15; backgroundLoopIndex < this.level.backgroundObjects.length; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = -720 + camera_xWidthModulo * 720;
        }
    }
    //Modulo even     
    gameLoopFrame2(camera_xWidthModulo) {
        for (let backgroundLoopIndex = 5; backgroundLoopIndex < 10; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = 720 + camera_xWidthModulo * 720;
        }
        for (let backgroundLoopIndex = 10; backgroundLoopIndex < 15; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = -720 + camera_xWidthModulo * 720;
        }
    }

    stopGame() {
        this.intervalIds.forEach(clearInterval);
    }
}