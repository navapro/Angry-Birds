
// Create a class for wood bodies.
class Wood {

  constructor(x, y, w, h, img) {

    this.w = w;
    this.h = h;
    this.img = img;

    // set the restitution of the body.
    const options = {
      restitution: .1
    }

    // create the wood's body, set its properties and label and add the body to the world.
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.Body.setMass(this.body, this.body.mass * 2);
    this.body.friction = .5;
    this.body.label = 'Wood';
    Matter.World.add(world, this.body);
  }

  show() {

    // draw the image at the body's position.

    const POS = this.body.position;
    const ANGLE = this.body.angle;
    push();
    translate(POS.x, POS.y);
    rotate(ANGLE);
    fill(255);
    rectMode(CENTER);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  }

  // delete the body from the world.
  delete() {
    Matter.World.remove(world, this.body);
  }
}