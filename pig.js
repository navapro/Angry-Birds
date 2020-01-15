class Pig {

  constructor(x, y, r) {
    this.r = r;

    // set the restitution of the body.
    const options = {
      restitution: .59
    }

    // create the pig's body set its properties ,label and add the body to the world.
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.body.label = 'Pig';
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);
  }


  // draw the pig's image at the body's position.
  show() {
    const POS = this.body.position;
    push();
    translate(POS.x, POS.y);
    imageMode(CENTER);
    image(minnionPigImg, 0, 0, this.r * 2, this.r * 2);
    pop();

  }

  // delete the body from the world.
  delete() {
    Matter.World.remove(world, this.body);
  }
}