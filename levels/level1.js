/**
 * Creates and returns the first level of the game.
 * 
 * This function initializes a `Level` instance with the following components:
 * 1. **Enemies** – currently empty; to be set later.
 * 2. **Barriers** – an array of `Barrier` objects defining obstacles and collision areas.
 * 3. **Background Objects** – an array of `BackgroundObject` instances for parallax layers.
 * 4. **Poison Bottles** – an array of `PoisonBottle` objects positioned within the level.
 * 5. **Coins** – an array of `Coin` objects for player collection.
 * 
 * Each component specifies position, size, image sources, and offsets where applicable.
 * 
 * @function createLevel1
 * @returns {Level} A fully initialized `Level` object representing the first level of the game.
 */
function createLevel1() {
    return new Level(
        [
            // enemies set later
        ],
        [
            new Barrier(600, 280, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
            new Barrier(900, 0, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
            new Barrier(1400, 350, 130, 300, 'img/3. Background/Barrier/2.png', 50, 0, 20, 20),
            new Barrier(1400, 0, 130, 300, 'img/assets/img/upper Barrier2.png', 0, 50, 20, 20),
            new Barrier(2100, 0, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
            new Barrier(2100, 280, 200, 100, 'img/3. Background/Barrier/3.png', 0, 0, 20, 20),
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
            new PoisonBottle(1010, 50),
            new PoisonBottle(720, 320),
            new PoisonBottle(1500, 195),
            new PoisonBottle(1862, 195),
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
            new Coin(2325, 215),
            new Coin(2422, 290),
            new Coin(2524, 350),
            new Coin(2626, 290),
            new Coin(2723, 215),
            new Coin(2810, 165),
            new Coin(2927, 215),
            new Coin(3029, 290),
        ],
    );
}

/**
 * Initializes the enemies for a given game world.
 * 
 * This function sets the `enemies` array of the world's current level with
 * instances of `PufferFish` and `JellyFish`, specifying their positions,
 * movement speed, and other parameters. This prepares the level for gameplay
 * with all enemy objects in place.
 * 
 * @function setinitialEnemies
 * @param {World} world - The game world whose level will have enemies initialized.
 */
function setinitialEnemies(world) {
    world.level.enemies = [
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

/**
 * Adds the final boss enemy to the current level of the game world.
 * 
 * This function creates a new `Endboss` instance at the specified X-coordinate
 * and appends it to the `enemies` array of the world's current level.
 * 
 * @function setFinalEnemie
 * @param {World} world - The game world whose level will have the final boss added.
 * @param {number} bossSpawnCoordinateX - The X-coordinate where the final boss will spawn.
 */
function setFinalEnemie(world, bossSpawnCoordinateX) {
    world.level.enemies.push(new Endboss(world, bossSpawnCoordinateX));
}

/**
 * Continuously removes enemies that have moved past a certain X-coordinate.
 * 
 * This function sets up a repeating interval (every 200ms) to filter the `enemies`
 * array of the world's current level. Any enemy whose X-coordinate is less than
 * `enemyDeleteCoordinateX` is removed, effectively clearing enemies that have been
 * passed by the player.
 * 
 * @function deleteOtherEnemies
 * @param {World} world - The game world whose level enemies will be filtered.
 * @param {number} enemyDeleteCoordinateX - The X-coordinate threshold; enemies with
 *   lower X values are removed.
 */
function deleteOtherEnemies(world, enemyDeleteCoordinateX) {
    this.world.setStoppableInterval(() => {
        world.level.enemies = world.level.enemies.filter(
            enemy => enemy.x >= enemyDeleteCoordinateX
        );
    }, 200);
}
