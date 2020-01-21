// Create a class for Metals.

class Metal {

  constructor(x, y, w, h, img) {

    this.w = w;
    this.h = h;
    this.img = img;

    // set the restitution of the body.
    const options = {
      restitution: 0
    }

    // create the Metal's body set its properties and label and add the body to the world.

    this.body = Matter.Bodies.rectangle(x, y, w, h);
    Matter.Body.setMass(this.body, this.body.mass * 5);
    this.body.density = 0.5;
    this.body.friction = .05;
    this.body.frictionAir = .002;
    this.body.label = 'Metal';
    Matter.World.add(world, this.body, options);
  }


  // display the metal.
  show() {

    // draw the metal's image at the body's position.
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