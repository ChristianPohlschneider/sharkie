class DrawableObject {
        x = 120;
    y = 250;
        height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;




    loadImage(path) {
        this.img = new Image(); //this.image = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

        drawImages(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    }