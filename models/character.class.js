class Character extends MovableObject {
    x = 100;
    y = 150;
    height = 200;
    width = 200;
    speed = 3;
    interval = 1000 / 60;
    speedY = 0;
    accelerationY = 0.05;
    energy = 100;
    lastShot = 0;
    damageFromCollision = 5;
    hadFirstContact = false;

    offset = {
        top: 105,
        left: 40,
        right: 45,
        bottom: 50
    };

    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png',
    ];

    IMAGES_BUBBLE_TRAP = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    IMAGES_BUBBLE_TRAP_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];

    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];

    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];
    //hand over world variables
    world;
    level;


    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_BUBBLE_TRAP);
        this.loadImages(this.IMAGES_BUBBLE_TRAP_POISON);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        // this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.ArrowRight && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.world.statusBar.x += this.speed;
                this.world.poisonBar.x += this.speed;
                this.world.coinBar.x += this.speed;
                //Console!
                console.log("Sharkie x:" + this.x)
            if(this.x > Number(this.world.level.level_end_x - 500) && !this.hadFirstContact){
                setFinalEnemie(this.world, Number(this.world.level.level_end_x - 200));
                this.hadFirstContact = true;
            }
                this.otherDirection = false;
            }
            if (this.world.keyboard.ArrowLeft && this.x > -50) {
                this.x -= this.speed;
                this.world.statusBar.x -= this.speed;
                this.world.poisonBar.x -= this.speed;
                this.world.coinBar.x -= this.speed;
                //Console!
                // console.log("Sharkie" + this.x);
                this.otherDirection = true;
            }
            if (this.world.keyboard.ArrowUp && this.y > -80) {
                this.y -= this.speed;
                //Console!
                // console.log("Sharkie" + this.y)
            }
            if (this.world.keyboard.ArrowDown && this.y < 300) {
                this.y += this.speed;
                // Console!
                // console.log("Sharkie" + this.y)
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.world.keyboard.ArrowRight || this.world.keyboard.ArrowLeft || this.world.keyboard.ArrowUp || this.world.keyboard.ArrowDown) {
                //swim animation
                this.playAnimation(this.IMAGES_SWIMMING);
            } else if (this.world.keyboard.Space) {
                this.lastShot = new Date().getTime();
                // this.playAnimation(this.IMAGES_BUBBLE_TRAP);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);

        //id: 14
        setInterval(() => {

            if (this.isShooting() && this.currentShootImage < 8) {
                if (this.world.poisonBar.img.currentSrc == 'http://127.0.0.1:5500/img/4.%20Marcadores/green/poisoned%20bubbles/20_%20copia%203.png') {
                    this.playShootAnimation(this.IMAGES_BUBBLE_TRAP_POISON);
                } else {
                    this.playShootAnimation(this.IMAGES_BUBBLE_TRAP);
                }


            } else if (this.currentShootImage == 8) {
                this.bubbleShot();
                this.currentShootImage = 0;
            }

            //  
        }, 50);
    }

    isShooting() {
        let timeShotpassed = new Date().getTime() - this.lastShot; //Difference in ms
        timeShotpassed = timeShotpassed / 1000; //Difference in s
        return timeShotpassed < 0.4;
    }

    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveWaterSurface()) {
    //             this.y += this.speedY;
    //             this.speedY -= this.accelerationY;
    //         }
    //     }, 1000 / 25);
    // }

    isAboveWaterSurface() {
        console.log(this.y)
        return this.y > -75;
    }

    bubbleShot() {

        if (this.otherDirection == false) {
            //bubble shoot rh
            this.createShootableObject(160);
        } else if (this.otherDirection == true) {
            //bubble shoot lh
            this.createShootableObject(-10);
        }

    }

    finSlap() {

    }

    isDead() {
        return this.energy == 0;
    }
}