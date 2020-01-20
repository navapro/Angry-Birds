// createing a class for levels and level selection.
class Levels {
    constructor(x, y, w, h, level) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.level = level;
    }

    show() {

        // display the level background.
        fill(0);
        image(levelBackground, this.x, this.y, this.w, this.h);
        push();
        textSize(this.h);
        fill(0);

        // display the levels.
        text(this.level, this.x + width / 55, this.y + width / 15.4);
        pop();

        // if a level is clicked then change its "state","stateLevel"and play sound.
        if (mouseIsPressed && levelWait > 30 && collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h)) {
            state = "game";
            stateLevel = "level" + this.level;
            currentLevel = this.level;
            clickSound.play();
        }
    }
}


