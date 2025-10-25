class World {
    character;
    level;
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
    animationFrameId = null;
    camera_xWidthModulo = 0;
    totalScore = 0;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
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

    setWorld() {
        this.character.world = this;
        this.level.coins.forEach(coin => coin.setWorld(this));
        this.level.poisonBottles.forEach(bottle => bottle.setWorld(this));
    }

    setStoppableInterval(fn, interval) {
        let id = setInterval(fn, interval);
        this.intervalIds.push(id);
        return id;
    }

    checkCollision() {
        this.setStoppableInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (!this.character.isColliding(enemy)) return;
                if (this.character.isSlapping && enemy.damageFromFinSlap) {
                    enemy.hit(enemy.damageFromFinSlap);
                }
                if (!this.character.isSlapping || enemy instanceof JellyFish) {
                    if (!this.character.isDead())
                        soundManager.playEffect('img/assets/audio/hurtSharky.wav', 0);
                    this.character.hit(enemy.damageDueToCollision);
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }, 200);
    }

    checkCollisionBubbleBarrier() {
        this.setStoppableInterval(() => {
            for (let i = this.shootableObject.length - 1; i >= 0; i--) {
                const bubble = this.shootableObject[i];
                const collided = this.level.barriers.some(barrier => barrier.isColliding(bubble));
                if (collided && !bubble.isShrinking) bubble.shrinkOut();
                if (bubble.isCollected) this.shootableObject.splice(i, 1);
            }
        }, 50);
    }

    checkCollisionFromBubble() {
        this.setStoppableInterval(() => {
            this.shootableObject = this.shootableObject.filter(bubble => {
                let hit = false;
                this.level.enemies.forEach(enemy => {
                    if (enemy.isColliding(bubble) && enemy.spawnID >= 8) {
                        this.handleBubbleHit(bubble, enemy);
                        hit = true;
                    }
                });
                return !hit;
            });
        }, 200);
    }

    handleBubbleHit(bubble, enemy) {
        const dmg = decodeURIComponent(bubble.img.src.split('/').pop()).includes('Poisoned Bubble')
            ? 2 * enemy.damageFromBubble
            : enemy.damageFromBubble;
        enemy.hit(dmg);
        if (soundManager) soundManager.playEffect('img/assets/audio/hit.wav', 0);
    }

    checkBubbleOutOfRange() {
        this.setStoppableInterval(() => {
            for (let i = this.shootableObject.length - 1; i >= 0; i--) {
                const bubble = this.shootableObject[i];
                if ((bubble.x > bubble.maxRange || bubble.x < bubble.minRange) && !bubble.isShrinking) {
                    bubble.shrinkOut();
                }
                if (bubble.isCollected) {
                    this.shootableObject.splice(i, 1);
                }
            }
        }, 50);
    }

    checkCollisionWithCoin() {
        this.setStoppableInterval(() => {
            this.level.coins = this.level.coins.filter(coin => {
                if (this.character.isColliding(coin)) {
                    this.handleCoinCollision(coin);
                    return false;
                }
                return true;
            });
        }, 200);
    }

    handleCoinCollision(coin) {
        this.coinBar.coinCount(coin.coinValue);
        this.coinBar.setWalletAmount(this.coinBar.wallet);
        if (soundManager) soundManager.playEffect('img/assets/audio/coin.wav', 0);
        this.totalScore += this.coinBar.score;
        coin.shrinkOut();
        this.level.shrinkingObjects.push(coin);
    }

    checkCollisionWithPoisonBottle() {
        this.setStoppableInterval(() => {
            this.level.poisonBottles = this.level.poisonBottles.filter(poisonBottle => {
                if (this.character.isColliding(poisonBottle)) {
                    this.handlePoisonBottleCollision(poisonBottle);
                    return false;
                }
                return true;
            });
        }, 200);
    }

    handlePoisonBottleCollision(poisonBottle) {
        this.poisonBar.poisonCount(poisonBottle.poisonValue);
        this.poisonBar.setPoisonAmount(this.poisonBar.venomSac);
        if (soundManager) soundManager.playEffect('img/assets/audio/acid.wav', 0);
        this.totalScore += this.poisonBar.score;
        poisonBottle.shrinkOut();
        this.level.shrinkingObjects.push(poisonBottle);
    }

    checkCollisionWithBarrier() {
        this.isCollidingBarrier = this.level.barriers.some(barrier =>
            this.character.isColliding(barrier)
        );
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.camera_xWidthModulo = Math.floor(-this.camera_x / 720);
        this.drawBackground();
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawHUD();
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }

    drawBackground() {
        if (this.camera_xWidthModulo % 2 === 0) this.gameLoopFrame2(this.camera_xWidthModulo);
        else this.gameLoopFrame1(this.camera_xWidthModulo);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObject);
        this.addShrinkingObjectsToMap(this.level.coins);
        this.addShrinkingObjectsToMap(this.level.poisonBottles);
        this.addObjectsToMap(this.level.barriers);
        this.level.shrinkingObjects = this.addShrinkingObjectsToMap(this.level.shrinkingObjects);
    }

    drawHUD() {
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
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
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    addShrinkingObjectsToMap(objects) {
        if (!objects) return [];
        let visibleObjects = objects.filter(o => !o.isCollected);
        visibleObjects.forEach(o => o.drawShrinkingObjects(this.ctx));
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

    gameLoopFrame1(camera_xWidthModulo) {
        for (let backgroundLoopIndex = 0; backgroundLoopIndex < 5; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = 720 + camera_xWidthModulo * 720;
        }
        for (let backgroundLoopIndex = 15; backgroundLoopIndex < this.level.backgroundObjects.length; backgroundLoopIndex++) {
            this.level.backgroundObjects[backgroundLoopIndex].x = -720 + camera_xWidthModulo * 720;
        }
    }

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
        this.intervalIds = [];
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    cleanup() {
        this.stopGame();
    }
}