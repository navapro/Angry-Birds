class SlingShot {
  constructor(x, y, body) {

    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.02,
      length: 20
    }
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
    
  }

  fly() {
    
    this.sling.bodyB = null;
    
  }

  show() {
    if (this.sling.bodyB) {
      stroke(0);
      strokeWeight(4);
      const posA = this.sling.pointA;
      const posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
      birdFlying = false;
      
    }
    else{
      birdFlying = true;
    }
  }
  
  attach(body) {
    this.sling.bodyB = body; 
  }

  delete(){
    Matter.World.remove(world, this.sling);
  }
}