class StoreBird {

    constructor(x, y, w, h, bird) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bird = bird;

    }

    show() {

        fill(0);

        push();
        imageMode(CENTER);
        if (this.bird === birdImgID) {
            image(levelBackgroundGlow, this.x, this.y, this.w + this.w / 5, this.h + this.h / 5);
        }
        else {

            image(levelBackground, this.x, this.y, this.w, this.h);
        }
        image(birdImgList[this.bird], this.x, this.y, this.w / 1.5, this.h / 1.5);
        pop();


        if (collidePointRect(mouseX, mouseY, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)) {
            if (mouseIsPressed) {
                storeSound = birdImg;
                birdImg = birdImgList[this.bird];
                birdImgID = this.bird;
            
            if (storeSound !== birdImg ) {
                clickSound.play();
                
            }
        }
        }
    }

}