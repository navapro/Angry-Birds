class Levels {

    constructor(x, y, w, h, level) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.level = level;

    }

    show() {

        fill(0);
        image(levelBackground, this.x, this.y, this.w, this.h);
        
        push();
        textSize(this.h);
        fill(0);
        
        text(this.level, this.x+ width/55, this.y+ width/15.4);
        pop();
        if (levelClicked) {
        if (levelWait >30){
        if (collidePointRect(mouseX,mouseY,this.x, this.y, this.w, this.h)){
            state = "game";
            stateLevel = "level"+this.level;
            currentLevel = this.level;
            clickSound.play();
        }
    }
    }
    }

}