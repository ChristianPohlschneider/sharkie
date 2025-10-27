class DrawableObject {
    x = 120;
    y = 250;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    isCollected = false;

    /**
     * Loads an image and assigns it to the object's `img` property.
     * 
     * This method creates a new `Image` object and sets its `src` to the given path.
     * It is typically used to update the character or object's current visual representation.
     * 
     * @method loadImage
     * @param {string} path - The URL or path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images and stores them in the `imageCache` for later use.
     * 
     * This method iterates over the given array of image paths. For each path:
     * - If the image is not already cached, it creates a new `Image` object.
     * - Sets its `src` to the given path.
     * - Stores the image in `imageCache` keyed by its path.
     * 
     * @method loadImages
     * @param {string[]} array - An array of image URLs or paths to preload.
     */
    loadImages(array) {
        array.forEach(path => {
            if (!this.imageCache[path]) {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            }
        });
    }

    /**
     * Draws the current image onto the canvas context.
     * 
     * This method performs the following steps:
     * 1. Checks if `img` exists; if not, returns immediately.
     * 2. Calls `prepareCanvas(ctx)` to set up the canvas for drawing.
     * 3. Calls `renderImage(ctx)` to actually draw the image.
     * 4. Restores the canvas state using `ctx.restore()`.
     * 5. Catches any errors during drawing and handles them with `handleDrawError(error)`.
     * 
     * @method drawImages
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the image on.
     */
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

    /**
     * Prepares the canvas for drawing the object by saving the context state,
     * translating to the object's center, and applying scaling.
     * 
     * This method performs the following steps:
     * 1. Saves the current canvas state with `ctx.save()`.
     * 2. Translates the canvas origin to the center of the object (`x + width/2`, `y + height/2`).
     * 3. Applies scaling based on the object's `scale` property (default is 1 if not set).
     * 
     * @method prepareCanvas
     * @param {CanvasRenderingContext2D} ctx - The canvas context to prepare.
     */
    prepareCanvas(ctx) {
        ctx.save();
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(this.scale || 1, this.scale || 1);
    }

    /**
     * Renders the object's current image onto the canvas at the origin defined by `prepareCanvas()`.
     * 
     * This method draws the image centered on the canvas using `drawImage()`:
     * - The top-left corner is offset by `-width/2` and `-height/2` to center the image.
     * - The image is scaled to the object's `width` and `height`.
     * 
     * @method renderImage
     * @param {CanvasRenderingContext2D} ctx - The canvas context to render the image on.
     */
    renderImage(ctx) {
        ctx.drawImage(
            this.img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
    }

    /**
     * Handles errors that occur during image drawing on the canvas.
     * 
     * This method logs a warning to the console with the error details.
     * If an image source exists, it also logs the source path that failed to load.
     * 
     * @method handleDrawError
     * @param {Error} error - The error object caught during the drawing process.
     */
    handleDrawError(error) {
        console.warn('Error loading image', error);
        if (this.img?.src) {
            console.log('Could not load image:', this.img.src);
        }
    }

    /**
     * Draws collectible objects (like coins) that shrink or disappear when collected.
     * 
     * This method performs the following:
     * 1. Skips drawing if the object has been collected (`isCollected` is true).
     * 2. Determines the image to draw, using either `img` or the first image in `COIN_IMAGES` from the cache.
     * 3. Calculates the scaled width and height using the object's `width`, `height`, and `scale`.
     * 4. Clears the area at the object's current position to prevent overlapping artifacts.
     * 5. Translates the canvas to the object's center and draws the image centered.
     * 6. Restores the canvas state after drawing.
     * 
     * @method drawShrinkingObjects
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the object on.
     */
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