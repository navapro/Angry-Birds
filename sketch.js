function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);

  box1 = new Box(width / 1.5, (height - 20), 120, 160);
  box2 = new Box(width / 1.2, (height - 20), 120, 160);
  box3 = new Box(width / 1.333333, (height - 200), 180, 100);

  bird = new Bird(width / 3.5, height / 1.5, 40);
  minnionPig = new Pig(width / 1.33, height -20, 40);



  slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  // A fix for high pixel density displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  console.log(mConstraint)
  // World.add(world, mConstraint);
  World.remove(world, mConstraint);
}


function draw() {

  if (mouseX < width / 3 && mouseY > height / 2) {
    World.add(world, mConstraint);
    console.log('added')
  }
  else {
    console.log('removed')
    World.remove(world, mConstraint);
  }

  background(bkgImg);
  image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);
  Matter.Engine.update(engine);
  ground.show();

  push();
  rotate(.01)
  translate(width / 4, height / 1.48);
  imageMode(CENTER)

  image(slingShotBandFront, 0, 0, width / 15, width / 25);
  pop();



  box1.show();
  box2.show();
  box3.show();

  slingshot.show();
  bird.show();
  minnionPig.show();
  image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);
  push();
  rotate(.01)
  translate(width / 4.6, height / 1.48);
  image(slingShotBandBack, 0, 0, 100, width / 25);

  pop();

  if (mouseX < width / 3 && mouseY > height / 2) {
    World.add(world, mConstraint);
    console.log('added')
    slingShotRemoval = true;
  }
  else {
    console.log('removed')
    World.remove(world, mConstraint);
  }
}




function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(width / 3.5, height / 1.5, 40);
    slingshot.attach(bird.body);
  }

}

function mouseReleased() {
  if (slingShotRemoval){
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}
}
