// Create a class for Ground using inheritance from wood.
class Ground extends Wood {

  constructor(x, y, w, h) {
    
    super(x, y, w, h);

    // make the body static so it doesnt move and change its label.
    this.body.isStatic = true;
    this.body.label = 'Ground';
  }

 // display the ground.
  show() {
    const POS = this.body.position;
    const ANGLE = this.body.angle;
    push();
    translate(POS.x, POS.y);
    rotate(ANGLE);
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }

}