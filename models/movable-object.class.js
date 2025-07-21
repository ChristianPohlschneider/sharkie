class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 100;
    width = 100;
    currentImage = 0;
    imageCache = {};

    loadImage(path) {
        this.img = new Image(); //this.image = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) =>{
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        })
    }
    
    moveRight() {
        console.log('Moving right');
        
    }

    moveLeft(){
        
    }
}