let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    //hand over variables to world
    world = new World(canvas, keyboard)
}

window.addEventListener('keydown', (event) => {
    keyboard[event.code] = true;
});

window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
});