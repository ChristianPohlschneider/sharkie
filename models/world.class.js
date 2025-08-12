class World {
    character = new Character();
    level = level1;
    statusBar = new StatusBar();
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
    }

    //hand over world variables
    setWorld() {
        this.character.world = this;
    }

    setStoppableInterval(fn, interval) {
        let id = setInterval(fn, interval);
        this.intervalIds.push(id);
    }

    checkCollision() {
        //id: 16
        this.setStoppableInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.energy);
                    console.log(this.character.energy);
                }
            })
        }, 200)

        // setInterval(() => {
        //     this.level.enemies.forEach((enemy) => {
        //         if (this.character.isColliding(enemy)) {
        //             this.character.hit()
        //             console.log(this.character.energy);
        //         }
        //     })
        // }, 200);
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