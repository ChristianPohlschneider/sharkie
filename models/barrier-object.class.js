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

    resolveBarrierCollision(barrier) {
        // Prüfen, von welcher Seite der Character kommt
        if (this.character.x + this.character.width > barrier.x &&
            this.character.x < barrier.x) {
            // Von links gegen die Barrier gelaufen
            this.character.x = barrier.x - this.character.width;
        }

        if (this.character.x < barrier.x + barrier.width &&
            this.character.x > barrier.x) {
            // Von rechts gegen die Barrier gelaufen
            this.character.x = barrier.x + barrier.width;
        }

        // (Optional auch für oben/unten erweitern, falls du Y-Kollision brauchst)
    }

}