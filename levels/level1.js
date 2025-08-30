level1 = new Level(
    [
        // new PufferFish(),
        // new PufferFish(),
        // new PufferFish(),
        // new Endboss(),
    ],
    [
        new Barrier(),
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
    new PufferFish(world),
    new PufferFish(world),
    new PufferFish(world),
    
]
}

function setFinalEnemie(world, bossSpawnCoordinateX) {
    world.level.enemies.push(new Endboss(world, bossSpawnCoordinateX));
}
