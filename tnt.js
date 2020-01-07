class TNT {
  
    constructor(x, y, w, h,img) {
      const options = {
        restitution:.1
      }    
      this.body = Matter.Bodies.rectangle(x, y, w, h, options);
      Matter.Body.setMass(this.body, this.body.mass*2);
      this.body.friction =  .5;
      Matter.World.add(world, this.body);
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
  

explosion(){
    let v =  Matter.Composite.allBodies(world);
  

    for (let i = 0; i < v.length; i++) {
        

 Body.applyForce( v[i], {x: v[i].position.x, y: v[i].position.y}, {x: 0.05, y: 0});
 }
}
}