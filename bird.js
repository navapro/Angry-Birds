class Bird {

  constructor(x, y, r) {
    const options = {
      restitution: .1
    }
    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, this.body.mass*2);
    Matter.World.add(world, this.body);
    this.r = r;

    // this.body.frictionAir = .05;
    this.body.label = 'Bird';
  }

  show() {
    World.remove(world, mConstraint);
    const pos = this.body.position;
    const angle = this.body.angle;
    
  if (this.body.velocity.x > 60){
    Matter.Body.setVelocity(this.body, {
      x: 60,
      y: this.body.velocity.y
    });
  }
  if (this.body.velocity.y < -50){
    Matter.Body.setVelocity(this.body, {
      x: this.body.velocity.x,
      y: -50
    });
  }
    push();
    translate(pos.x, pos.y);
    birdX = pos.x;
    birdY = pos.y;
    rotate(angle);
    imageMode(CENTER);
    image(birdImg, 0, 0, this.r * 2, this.r * 2);
    pop();

  }
  delete(){
    Matter.World.remove(world, this.body);
  }
}