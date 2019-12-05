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
        rect(this.x, this.y, this.w, this.h);
        text(level, this.x, this.y, this.w, this.h);
    }

}