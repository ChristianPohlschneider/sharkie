class World {
    character = new Character();
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


    constructor(canvas, keyboard) {//hand over variables to world
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.checkCollisionFromBubble();
        this.checkBubbleOutOfRange();
        this.checkCollisionWithCoin();
        this.checkCollisionWithPoisonBottle();
    }

    //hand over world variables
    setWorld() {
        this.character.world = this;
    }

    setStoppableInterval(fn, interval) {
        let id = setInterval(fn, interval);
        this.intervalIds.push(id);
        return id;
    }

    checkCollision() {
        //id: 16
        this.setStoppableInterval(() => {
            
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && this.character.isSlapping) {
                    enemy.hit(enemy.damageFromFinSlap); 
                } else if (this.character.isColliding(enemy) && !this.character.isSlapping) {
                    this.character.hit(this.character.damageFromCollision);
                    this.statusBar.setPercentage(this.character.energy);
                    // console log
                    // console.log(this.character.energy);
                }
            })
        }, 200)
    }

    checkCollisionFromBubble() {
        this.setStoppableInterval(() => {
            this.shootableObject.forEach((bubble) => {
                this.level.enemies.forEach((enemy) => {
                    if (enemy.isColliding(bubble)) {
                        if (bubble.img.currentSrc == 'http://127.0.0.1:5500/img/1.Sharkie/4.Attack/Bubble%20trap/Poisoned%20Bubble%20(for%20whale).png') {
                            enemy.hit(2 * enemy.damageFromBubble);
                        } else {
                            enemy.hit(enemy.damageFromBubble);
                        }
                        // console log
                        // console.log(enemy.energy);
                    }
                });
            });
        }, 200);
    }

checkBubbleOutOfRange() {
    this.setStoppableInterval(() => {
        for (let i = this.shootableObject.length - 1; i >= 0; i--) {
            const bubble = this.shootableObject[i];
            if (bubble.x > bubble.maxRange || bubble.x < bubble.minRange) {
                //Console Log
                // console.log(bubble.x);
                // console.log(this.character.x);
                bubble.shrinkOut();
                this.shootableObject.splice(i, 1);
            }
        }
    }, 200);
}

    checkCollisionWithCoin() {
        this.setStoppableInterval(() => {
            this.level.coins = this.level.coins.filter((coin) => {
                if (this.character.isColliding(coin)) {
                    this.coinBar.coinCount(coin.coinValue);
                    this.coinBar.setWalletAmount(this.coinBar.wallet);
                    coin.shrinkOut(); // startet Shrink-Animation
                    this.level.shrinkingObjects.push(coin); // 👉 hierhin verschieben
                    return false; // 👉 Coin sofort aus dem Array entfernen
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
                    poisonBottle.shrinkOut(); // Standard-Animation stoppt, Shrink startet
                    this.level.shrinkingObjects.push(poisonBottle); // 👉 hierhin verschieben
                    return false;
                }
                return true;
            });
        }, 200);
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
        this.addObjectsToMap(this.level.barriers);
        this.addObjectsToMap(this.shootableObject);

        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);

        this.addShrinkingObjectsToMap(this.level.coins);

        this.addShrinkingObjectsToMap(this.level.poisonBottles);

        // this.addShrinkingObjectsToMap(this.level.enemies);

        this.level.shrinkingObjects = this.addShrinkingObjectsToMap(this.level.shrinkingObjects);

        this.ctx.translate(-this.camera_x, 0);

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