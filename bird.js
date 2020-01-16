
// Create a class for the bird.

class Bird {

  constructor(x, y, r) {

    this.r = r;

    // set the restitution of the body.
    const options = {
      restitution: .1
    }

    // create the bird's body set its mass,label and add the body to the world.

    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, this.body.mass * 2);
    this.body.label = 'Bird';
    Matter.World.add(world, this.body);
  }

  // display the bird.
  show() {

    World.remove(world, mConstraint);
    const POS = this.body.position;
    const ANGLE = this.body.angle;

    // limit the maximum speed of the bird.

    if (this.body.velocity.x > 60) {
      Matter.Body.setVelocity(this.body, {
        x: 60,
        y: this.body.velocity.y
      });
    }
    if (this.body.velocity.y < -10) {
      Matter.Body.setVelocity(this.body, {
        x: this.body.velocity.x,
        y: -10
      });
    }

    // draw the bird's image at the body's position.

    push();
    translate(POS.x, POS.y);
    birdX = POS.x;
    birdY = POS.y;
    rotate(ANGLE);
    imageMode(CENTER);
    image(birdImg, 0, 0, this.r * 2, this.r * 2);
    pop();

  }

  // delete the body from the world.
  delete() {
    Matter.World.remove(world, this.body);
  }
}