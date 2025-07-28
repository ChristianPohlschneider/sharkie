class World {
    character = new Character();
    enemies = level1.enemies;
    barriers = level1.barriers;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
   
    

    constructor(canvas, keyboard) {//hand over variables to world
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    //hand over world variables
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //scroll world in opposite direction of sharkie
        this.ctx.translate(this.camera_x, 0);
        let camera_xWidthModulo = Math.floor(-this.camera_x / 720);
        console.log(camera_xWidthModulo);
        
        if (camera_xWidthModulo % 2 == 0) {
            // console.log("Frame1");
            this.gameLoopFrame2(camera_xWidthModulo);
            this.addObjectsToMap(this.backgroundObjects);
        } else if ((camera_xWidthModulo + 1) % 2 == 0) {
            // console.log("Frame2");
            this.gameLoopFrame1(camera_xWidthModulo);
             this.addObjectsToMap(this.backgroundObjects);
        }

        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.barriers);

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
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.otherDirection) {
            object.x = object.x * -1;
            this.ctx.restore();
        }
    }
    //Modulo uneven
    gameLoopFrame1(camera_xWidthModulo) {
        for (let backgroundLoopIndex = 0; backgroundLoopIndex < 5; backgroundLoopIndex++) {
            this.backgroundObjects[backgroundLoopIndex].x = 720 + camera_xWidthModulo * 720;
        }
        for (let backgroundLoopIndex = 15; backgroundLoopIndex < this.backgroundObjects.length; backgroundLoopIndex++) {
            this.backgroundObjects[backgroundLoopIndex].x = -720 + camera_xWidthModulo * 720;
        }
    }
    //Modulo even     
    gameLoopFrame2(camera_xWidthModulo) {   
        for (let backgroundLoopIndex = 5; backgroundLoopIndex < 10; backgroundLoopIndex++) {
            this.backgroundObjects[backgroundLoopIndex].x = 720 + camera_xWidthModulo * 720;
        }
        for (let backgroundLoopIndex = 10; backgroundLoopIndex < 15; backgroundLoopIndex++) {
            this.backgroundObjects[backgroundLoopIndex].x = -720 + camera_xWidthModulo * 720;
        }
    }
}