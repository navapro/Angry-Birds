class Pig {

    constructor(x, y, r) {
      const options = {
        restitution: .59
      }
      this.body = Matter.Bodies.circle(x, y, r, options);
      Matter.Body.setMass(this.body, this.body.mass*4);
      Matter.World.add(world, this.body);
      this.r = r;
    }
  
    show() {
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      //rotate(angle);
      imageMode(CENTER);
      image(minnionPigImg, 0, 0, this.r * 2, this.r * 2);
      pop();
  
    }
    delete(){
      Matter.World.remove(world, this.body);
    }
  }