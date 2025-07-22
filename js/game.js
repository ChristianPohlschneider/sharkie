let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    //hand over variables to world
    world = new World(canvas, keyboard)

    console.log('My Character is', world.character);

}

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    keyboard[event.code] = true;
    console.log(keyboard[event.code]);
});

window.addEventListener('keyup', (event) => {
    console.log(event.code);
    keyboard[event.code] = false;
    console.log(keyboard[event.code]);
});