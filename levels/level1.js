level1 = new Level(
    [
        // new PufferFish(),
        // new PufferFish(),
        // new PufferFish(),
        // new Endboss(),
    ],
    [   //(x, y, height, width, img, offsetTop, offsetBottom, offsetLeft, offsetRight)s

        //Stange
        new Barrier(600, 280, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
        new Barrier(900, 0, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),

        //Wolke unten
        new Barrier(1400, 350, 130, 300, 'img/3. Background/Barrier/2.png', 50, 0, 20, 20),
        //Wolke oben
        new Barrier(1400, 0, 130, 300, 'img/assets/img/upper Barrier2.png', 0, 50, 20, 20),

        //Stange
        new Barrier(2100, 0, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
        new Barrier(2100, 280, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),

        //Stange
        new Barrier(2500, 0, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
        new Barrier(2700, 280, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
        new Barrier(2900, 0, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),

        new Barrier(3300, 0, 150, 500, 'img/assets/img/upper Barrier.png', 0, 50, 20, 20),
        new Barrier(3300, 330, 150, 500, 'img/assets/img/lower Barrier.png', 50, 0, 20, 20),
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
        new PoisonBottle(770, 50),
        new PoisonBottle(775, 320),

        new PoisonBottle(1500, 195),
        
        new PoisonBottle(1860, 195),

        new PoisonBottle(2315, 50),
        new PoisonBottle(2315, 320),

        new PoisonBottle(2715, 50),

        new PoisonBottle(3150, 50),
        new PoisonBottle(3150, 195),
        new PoisonBottle(3150, 335),
    ],
    [
        new Coin(520, 215),
        new Coin(625, 165),
        new Coin(730, 215),
        new Coin(825, 290),
        new Coin(925, 350),
        new Coin(1025, 290),
        new Coin(1120, 215),
        new Coin(1225, 165),
        new Coin(1330, 215),

        new Coin(1725, 220),
        new Coin(1775, 120),
        new Coin(1975, 120),
        new Coin(1875, 80),
        new Coin(1875, 360),
        new Coin(1975, 320),
        new Coin(1775, 320),
        new Coin(2025, 220),
    ],

);

function setinitialEnemies(world) {
    world.level.enemies = [
        //world, x, y, phase, speed
        new PufferFish(world, 800, 150, 1, 1),

        new PufferFish(world, 1200, 250, 1, 1),

        new PufferFish(world, 1800, 20, 1, 1),
        new PufferFish(world, 1800, 150, 1, 1),
        new PufferFish(world, 1800, 280, 1, 1),

        new JellyFish(world, 2500, 180, 10, 1),

        new PufferFish(world, 3000, 100, 10, 1),
        new PufferFish(world, 3000, 300, 10, 1),

        new PufferFish(world, 3700, 50, 10, 1),
        new PufferFish(world, 3700, 195, 10, 1),
        new PufferFish(world, 3700, 330, 10, 1),

        new JellyFish(world, 4100, 20, 1, 1),
        new JellyFish(world, 4200, 150, 1, 1),
        new JellyFish(world, 4300, 280, 1, 1),

        new PufferFish(world, 4600, 50, 10, 1),
        new PufferFish(world, 4700, 195, 10, 1),
        new PufferFish(world, 4800, 330, 10, 1),
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
