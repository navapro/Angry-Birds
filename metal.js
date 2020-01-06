class Metal {
  
    constructor(x, y, w, h,img) {
      const options = {
        restitution:0
      }    
      this.body = Matter.Bodies.rectangle(x, y, w, h);
      Matter.Body.setMass(this.body, this.body.mass*5);
      this.body.density=  1;
      this.body.friction =  .3;
      this.body.frictionAir =  .2;
      Matter.World.add(world, this.body,options);
      this.w = w;
      this.h = h;
      this.img = img;
    }
    
    show() {
      World.remove(world, mConstraint);
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(255);
      rectMode(CENTER);
      imageMode(CENTER);
      image(this.img, 0, 0, this.w, this.h);
      pop(); 
    }
    delete(){
      Matter.World.remove(world, this.body);
    }
  }