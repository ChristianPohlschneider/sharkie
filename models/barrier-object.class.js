class Barrier extends StaticObject {
    x = 700;
    y = 0;
    height = 480;
    width = 720;
    interval = 1000 /60;
    xIncrement = 1;
    constructor() {
        super().loadImage('img/3. Background/Barrier/1.png');

        this.animate();
        


    }
    animate() {
        setInterval( () => {
    this.x -= this.xIncrement;
    }, this.interval)
}
}