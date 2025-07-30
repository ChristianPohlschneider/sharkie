class Level {
    enemies;
    barriers;
    backgroundObjects;
    shootedObjects;
    level_end_x = 3600;

    constructor (enemies, barriers, backgroundObjects, shootedObjects){
        this.enemies = enemies;
        this.barriers = barriers;
        this.backgroundObjects = backgroundObjects;
        this.shootedObjects = shootedObjects;
    }
}