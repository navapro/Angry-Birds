class TNT {
  
    constructor(x, y, w, h,img) {

      this.w = w;
      this.h = h;
      this.img = img;

      const options = {
        restitution:.1
      }    

      this.body = Matter.Bodies.rectangle(x, y, w, h, options);
      Matter.Body.setMass(this.body, this.body.mass*2);
      this.body.friction =  .5;
      Matter.World.add(world, this.body);
      this.body.label = 'Tnt';
    }
    
    show() {
     
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
    delete(){
      Matter.World.remove(world, this.body);
    }
  

explosion(){
    let v =  Matter.Composite.allBodies(world);
  
   let tempX = this.body.position.x;
   let tempY =  this.body.position.y;
  

    for (let i = 0; i < v.length; i++) {
        
       tempX = ( v[i].position.x -this.body.position.x )/300 ;
       tempY =  (this.body.position.y - v[i].position.y)/300;
  Matter.Body.applyForce( v[i], {x: v[i].position.x, y: v[i].position.y}, {x: tempX, y: tempY});
 }

}

}