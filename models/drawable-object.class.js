class DrawableObject {
    x = 120;
    y = 250;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    isCollected = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            if (!this.imageCache[path]) {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            }
        });
    }

    drawImages(ctx) {
        if (!this.img) return;
        try {
            this.prepareCanvas(ctx);
            this.renderImage(ctx);
            ctx.restore();
        } catch (error) {
            this.handleDrawError(error);
        }
    }

    prepareCanvas(ctx) {
        ctx.save();
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(this.scale || 1, this.scale || 1);
    }

    renderImage(ctx) {
        ctx.drawImage(
            this.img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
    }

    handleDrawError(error) {
        console.warn('Error loading image', error);
        if (this.img?.src) {
            console.log('Could not load image:', this.img.src);
        }
    }

    drawFrame(ctx, object) {
        if (this instanceof Character || this instanceof Barrier) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + object.offset.left, this.y + object.offset.top, this.width - object.offset.right - object.offset.left, this.height - object.offset.top - object.offset.bottom);
            ctx.stroke();
        }
    }

    drawShrinkingObjects(ctx) {
        if (this.isCollected) return;
        const img = this.img || this.imageCache[this.COIN_IMAGES[0]];
        const w = this.width * this.scale;
        const h = this.height * this.scale;
        ctx.clearRect(this.x, this.y, this.size, this.size);
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
    }
}