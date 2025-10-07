let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');

}

function startGame() {
    document.getElementById('startScreen').style.display = "none";
    world = new World(canvas, keyboard);
    this.world = world;
    setinitialEnemies(world);
}

window.addEventListener('keydown', (event) => {
    keyboard[event.code] = true;
    //event.code: Space, event.keyCode: 32
    // console.log(event.code);

});

window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
});