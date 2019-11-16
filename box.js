class Box {
  
    constructor(x, y, w, h) {
      
      this.body = Matter.Bodies.rectangle(x, y, w, h);
      Matter.World.add(world, this.body);
      this.w = w;
      this.h = h;
    }
    
    show() {
      const POS = this.body.position;
      const ANGLE = this.body.angle;
      push();
      translate(POS.x, POS.y);
      rotate(ANGLE);
      fill(255);
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
      pop(); 
    }
    
  }

