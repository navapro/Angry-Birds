 
 // create a class and assign variables.
 class zombieRun {
    constructor(animation, x, y, speed) {
        this.animation = animation;
        this.speed = speed;
        this.counter = 0;
        this.len = this.animation.length;
        this.x = x;
        this.y = y;
        this.resetX = x;
        this.resetY = y;
    }

    //  display the image array and slowly run through the array.
    show() {

        // round the counter and then use modulo to loop through the array.
        push();
        let img = floor(this.counter) % this.len;
        image(this.animation[img], this.x, this.y, 250, 250);
        pop();

        // assign the x and y to a global variable.
        zombieX = this.x;
        zombieY = this.y;
    }

    // increse the x value by a multiple of speed and increse te counter to switch image.
    moveForward() {
        this.counter += this.speed;
        this.x += this.speed * -50;
    }

    // reset the x and y value.
    reset(){
        this.x = this.resetX;
        this.y = this.resetY;
    }

}

// create a class and assign variables.
class ZombieDead {
    constructor(animation, speed) {
        this.animation = animation;
        this.counter = 0;
        this.len = this.animation.length;
        this.speed = speed;
    }

    // animation for dying zombie.
    dead() {

        // increse the counter by adding speed then round the counter and use modulo to loop through the array.
        this.counter += this.speed;
        let runSpeed = floor(this.counter) % this.len;
        image(this.animation[runSpeed], zombieX, zombieY,  225, 225);
    }

}