class Levels {

    constructor(x, y, w, h,level) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.level = level;
    }

    show() {

        fill(255);
        image(levelBackground,this.x, this.y, this.w, this.h);
        text(this.level, this.x, this.y, this.w, this.h);
    }

}