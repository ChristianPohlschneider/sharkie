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
    //event.code: Space, event.keyCode: 32
    console.log(event.code);
    
});

window.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
});