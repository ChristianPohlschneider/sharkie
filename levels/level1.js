level1 = new Level(
    [
        // new PufferFish(),
        // new PufferFish(),
        // new PufferFish(),
        // new Endboss(),
    ],
    [   //(x, y, height, width, img, offsetTop, offsetBottom, offsetLeft, offsetRight)
        new Barrier(3300, 0, 150, 500, 'img/assets/img/upper Barrier.png', 0, 50, 20, 20),
        new Barrier(3300, 330, 150, 500, 'img/assets/img/lower Barrier.png', 50, 0, 20, 20),
        
        new Barrier(1400, 350, 130, 300, 'img/3. Background/Barrier/2.png', 50, 0, 20, 20),
        new Barrier(600, 280, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
        

    ],
    [
        new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),

        new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 720),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 720),
        new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720),

        new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', -720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', -720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', -720),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', -720),
        new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720),

        new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),
    ],
    [
        new PoisonBottle(525, 214),
        new PoisonBottle(775, 214),
        new PoisonBottle(1025, 214),
        new PoisonBottle(1275, 214),
        new PoisonBottle(1575, 114),
        new PoisonBottle(1575, 214),
        new PoisonBottle(1575, 314),
    ],
    [
        new Coin(400, 240),
        new Coin(650, 240),
        new Coin(900, 240),
        new Coin(1150, 240),
        new Coin(1400, 240),
    ],

);

function setinitialEnemies(world) {
    world.level.enemies = [
        //world, x, y, phase, speed
    new PufferFish(world, 800, 80, 1, 1),

    new PufferFish(world, 1200, 50, 1, 1),

    new JellyFish(world, 1000, 150, 10, 1),

    new PufferFish(world, 1500, 20, 1, 1),
    new PufferFish(world, 1500, 150, 1, 1),
    new PufferFish(world, 1500, 280, 1, 1),

    new PufferFish(world, 2500, 80, 10, 2),
    new PufferFish(world, 2500, 280, 10, 2),
    
    new PufferFish(world, 2500, 20, 10, 1),
    new PufferFish(world, 2500, 150, 10, 1),
    new PufferFish(world, 2500, 280, 10, 1),

    new PufferFish(world, 3500, 20, 1, 1),
    new PufferFish(world, 3600, 150, 1, 1),
    new PufferFish(world, 3700, 280, 1, 1),

    new PufferFish(world, 4600, 20, 10, 2),
    new PufferFish(world, 4700, 150, 10, 2),
    new PufferFish(world, 4800, 280, 10, 2),
]
}

function setFinalEnemie(world, bossSpawnCoordinateX) {
    world.level.enemies.push(new Endboss(world, bossSpawnCoordinateX));
}

function deleteOtherEnemies(world, enemyDeleteCoordinateX) {
    this.world.setStoppableInterval(() => {
        world.level.enemies = world.level.enemies.filter(
            enemy => enemy.x >= enemyDeleteCoordinateX
        );
    }, 200);
}
