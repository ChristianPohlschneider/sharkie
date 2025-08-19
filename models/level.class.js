class Level {
    enemies;
    barriers;
    backgroundObjects;
    poisonBottles
    coins;
    level_end_x = 3600;

    constructor (enemies, barriers, backgroundObjects, poisonBottles, coins){
        this.enemies = enemies;
        this.barriers = barriers;
        this.backgroundObjects = backgroundObjects;
        this.poisonBottles = poisonBottles;
        this.coins = coins;
    }
}