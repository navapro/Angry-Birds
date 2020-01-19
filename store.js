// creating a class for bird skin store.
class StoreBird {
    constructor(x, y, w, h, bird) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bird = bird;
    }

    // displaying the bird's skins.
    show() {

        fill(0);
        push();
        imageMode(CENTER);

        // if this bird is selected then add glow to it's outline.
        // if not then display the regular background.

        if (this.bird === birdImgID) {
            image(levelBackgroundGlow, this.x, this.y, this.w + this.w / 5, this.h + this.h / 5);
        } else {
            image(levelBackground, this.x, this.y, this.w, this.h);
        }

        // display the current bird's skin.
        image(birdImgList[this.bird], this.x, this.y, this.w / 1.5, this.h / 1.5);
        pop();

        // check if the current bird is clicked.
        if (collidePointRect(mouseX, mouseY, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h) && mouseIsPressed) {
            storeSound = birdImg;
            birdImg = birdImgList[this.bird];
            birdImgID = this.bird;

            // play click sound.
            if (storeSound !== birdImg) {
                clickSound.play();
            }
        }
    }
}
