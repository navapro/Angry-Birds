
// create a class and assign variables.
class Run {
    constructor(animation, x, y, speed) {
        this.animation = animation;
        this.speed = speed;
        this.counter = 0;
        this.len = this.animation.length;
        this.x = x;
        this.y = y;

    }


    //  display the image array and slowly run through the array.
    show() {

        // round the counter and then use modulo to loop through the array.
        let runSpeed = floor(this.counter) % this.len;

        // translate and scale the image so that it can be fliped for going backwards.
        push();
        translate(this.x, this.y);
        scale(heroFacing, 1);

        // looping through the array.
        image(this.animation[runSpeed], 0, 0, 300, 300);

        // assign a global variable for x and y of the hero.
        heroX = this.x;
        heroY = this.y;
        pop();
    }

    // increse the x value by a multiple of speed and increse te counter to switch image.
    moveForward() {
        this.counter += this.speed;
        if (this.x < windowWidth / 1.5) {// this is fine/1.2
            this.x += this.speed * 15;
        }

        // hero facing is set to 1 for facing forward and colition box doesn't need to be adjusted.
        heroFacing = 1;
        collideVariable = 0;

    }

    // decrease the x value by a multiple of speed and increse te counter to switch image.
    moveBackward() {
        this.counter += this.speed;
        if (this.x > 0) {
            this.x += this.speed * -15;
        }

        // hero facing is set to -1 for facing backward and colition box need to be adjusted by 250.
        heroFacing = -1;
        collideVariable = 250;
    }

    // decrease the y value  if the hero is under a certain limit.
    jump() {
        if (this.y > windowHeight / 500) {
            this.y -= 20;
        }


    }

    // increse the y value simulating gravity till it reaches a certain height.
    gravity() {
        if (this.y < windowHeight / 2) {
            this.y += 4;
        }
    }

}

// create a class and assign variables.
class Attack {
    constructor(animation, speed) {
        this.animation = animation;
        this.counter = 0;
        this.len = this.animation.length;
        this.speed = speed;
    }

    hit() {

        // translate and scale the image so that it can be fliped for attacking backwards.
        push();
        translate(heroX, heroY);
        scale(heroFacing, 1);


        // increse the counter by adding speed then round the counter and use modulo to loop through the array.
        this.counter += this.speed;
        let runSpeed = floor(this.counter) % this.len
        image(this.animation[runSpeed], 0, 0, 350, 308);
        pop();
    }

    // increse the y value simulating gravity till it reaches a certain height.
    gravity() {
        if (heroY < windowHeight / 2) {
            heroY += 4;
        }
    }
}
