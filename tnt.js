// Create a class tnt.
class TNT {

  constructor(x, y, w, h, img) {

    this.w = w;
    this.h = h;
    this.img = img;

    // set the restitution of the body.
    const options = {
      restitution: .1
    }

    // create the TNT's body, set its properties and label and add the body to the world.
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.Body.setMass(this.body, this.body.mass * 2);
    this.body.friction = .5;
    this.body.label = 'Tnt';
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

  // Apply force to all the bodies to simulate explotion.
  explosion() {

    // get the list of bodies in the world.
    let v = Matter.Composite.allBodies(world);

    // get the x and y of the body.
    let tempX = this.body.position.x;
    let tempY = this.body.position.y;

    // loop through the body array and apply varing amount of force depending on the distance away from the tnt body.
    for (let i = 0; i < v.length; i++) {
      tempX = (v[i].position.x - this.body.position.x) / 300;
      tempY = (this.body.position.y - v[i].position.y) / 300;
      Matter.Body.applyForce(v[i], { x: v[i].position.x, y: v[i].position.y }, { x: tempX, y: tempY });
    }

  }
}