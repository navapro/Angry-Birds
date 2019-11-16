class Bird {
  
    constructor(x, y, r) {
      
      this.body = Matter.Bodies.circle(x, y,r);
      Matter.World.add(world, this.body);
        this.r =r;
    }
    
    show() {
      const POS = this.body.position;
      const ANGLE = this.body.angle;
      push();
      translate(POS.x, POS.y);
      rotate(ANGLE);
      fill(255);
      rectMode(CENTER);
      circle(0, 0, this.r*2);
      pop(); 
    }
    
  }

