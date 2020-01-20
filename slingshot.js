// create a sling shot by using constraint (joint) in matter.js.
class SlingShot {
  constructor(x, y, body) {

    // setting properties of the constraint.
    let options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.03,
      length: 20
    }

    // Creating the slingshot (constraint) and adding it to the world.
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }


  // display the constraint as a line .
  show() {
    if (this.sling.bodyB) {
      push();
      stroke(0);
      strokeWeight(10);
      let posA = this.sling.pointA;
      let posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
      pop();

      // if sling shot is attached to the bird then set bird flying to false and vise versa.
      
      birdFlying = false;
    } else {
      birdFlying = true;
    }
  }

  // Detaching the bird from the constraint letting the bird fly.
  fly() {
    this.sling.bodyB = null;
  }
  // attach the bird to the constraint.
  attach(body) {
    this.sling.bodyB = body;
  }

  // delete the constraint body.
  delete() {
    Matter.World.remove(world, this.sling);
  }
}