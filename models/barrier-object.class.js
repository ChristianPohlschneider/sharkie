class Barrier extends MovableObject {
    x = 700;
    y = 0;
    height = 480;
    width = 720;
    interval = 1000 / 60;
    xIncrement = 1;
    offset = {
        top: 200,
        left: 5,
        right: 10,
        bottom: 200
    };

    constructor() {
        super().loadImage('img/3. Background/Barrier/1.png');

    }



}