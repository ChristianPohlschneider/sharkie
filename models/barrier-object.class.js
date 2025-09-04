class Barrier extends MovableObject {
    x = 700;
    y = 0;
    height = 480;
    width = 720;
    interval = 1000 / 60;
    xIncrement = 1;
    offset = {
        top: 0,
        left: 5,
        right: 10,
        bottom: 0
    };

    constructor(x, y, height, width, img, offsetTop, offsetBottom, offsetLeft, offsetRight) {
        super().loadImage(img);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.offset.top = offsetTop;
        this.offset.bottom = offsetBottom;
        this.offset.left = offsetLeft;
        this.offset.right = offsetRight
    }



}