function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);

  
  box1 = new Box(width / 1.5, (height - 20), 120, 160,woodImg);
  box2 = new Box(width / 1.2, (height - 20), 120, 160,woodImg);
  box3 = new Box(width / 1.333333, (height - 300), width/9, 100,woodImg);
  
  
  bird = new Bird(width / 3.5, height / 1.5, 40);
  slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
  minnionPig = new Pig(width / 1.33, height -20, 40);
  
  collitionForce = minnionPig.body.torque
  
  console.log(collitionForce);
  
  
  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
    
    
  }
  for (let i = 0; i < 4; i++) {
    levels[i] = new Levels(width/4 + i *width/7, height/2, width/13,width/13,i+1);
    // levels = new Levels (width / 1.333333, (height - 200), 180, 100);
  }
  
  // A fix for high pixel density displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  console.log(mConstraint)
  // World.add(world, mConstraint);
  World.remove(world, mConstraint);
  
  
  
}



function draw() {
  
  if (state === "menu") {
    background(bkgImg);
    showMenu();
    checkIfButtonClicked();
    levelClicked = false;
  }
  else if (state === "level"){
    background(bkgImg);
    levelWait ++;
    
    
    for (let Levels of levels){
      Levels.show();
    }
    levelClicked = false;
  }
  else if (state === "game"){
    levelClicked = false;
    checkIfMenuIsClicked();

  if (mouseX < width / 3 && mouseY > height / 2) {
    World.add(world, mConstraint);
    // console.log('added')
  }
  else {
    // console.log('removed')
    World.remove(world, mConstraint);
  }

  background(bkgImg);
  image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);
  Matter.Engine.update(engine);
  ground.show();



  let collitionForceX = minnionPig.body.positionImpulse.x;
  let collitionForceY = minnionPig.body.positionImpulse.y;

  let collitionForce = collitionForceY;
if (stateLevel === "level1"){
if (collitionForce !== 0){
  World.remove(world, minnionPig.body);
  coinCounter = 100;
  
}
else{
  minnionPig.show();
}
  box1.show();
  box2.show();
  box3.show();

}
slingshot.show();
bird.show();
  image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);
  

 if (birdX < 270){
  slingShotRemoval =true;
  }
  else{
    slingShotRemoval = false;
  }
  if (mouseX < width / 3 && mouseY > height / 2) {
    World.add(world, mConstraint);
    
   
  }
  else {
    
    World.remove(world, mConstraint);
  }
  image(coin,width / 100 , width / 100, width / 20, width / 20);
  push();
  textSize(width / 25);
  fill(0);
  
  text(coinCounter, width / 12, width / 20);
  pop();
  image(goBack,width / 1.1,  width / 100, width / 15, width / 15);
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
 if (birdX < width / 4){
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

if (levelWait >30){
  levelClicked = true
 }

}

