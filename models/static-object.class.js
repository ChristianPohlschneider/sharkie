class StaticObject {
    x = 120;
    y = 120;
    img;
    height = 300;
    width = 500;

    loadImage(path) {
        this.img = new Image(); //this.image = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

}