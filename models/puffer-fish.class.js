class PufferFish extends MovableObject {
    x = 0;
    y = 180;
    height = 100;
    width = 100;
    interval = 1000 / 60;
    xIncrement = 0.5;
    amplitude = 0.5
    frequency = 1;
    phase = 1;
    // wave = Math.sin(x);
    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
        this.x = 700 + Math.random() * 500;
        this.animate();
        
    }
    animate() {
        this.phase = Math.random();
        setInterval(() => {
            this.x -= this.xIncrement;
            this.oscillate();
        }, this.interval)
    }
    oscillate() {
       
        this.y = this.y + this.amplitude * Math.sin(this.frequency/100 + 100* this.phase);
        this.frequency++;
    }

}