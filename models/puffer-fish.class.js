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
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 700 + Math.random() * 500;
        this.animate();
        
    }
    animate() {
            
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length;
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    
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