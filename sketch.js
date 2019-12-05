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

  collitionForce = minnionPig.body.torque

  console.log(collitionForce);

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
  
  if (state === "menu") {
    background(bkgImg);
    showMenu();
    checkIfButtonClicked();
  }
  else if (state === "level"){
    background(levelList);
    image(levelBackground, width / 3.5, height / 1.53, width / 15, width / 15);

  }
  else if (state === "game"){
    
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

//   push();
//   rotate(.01)
//   translate(birdX, height / 1.4);
  
// //width / 3.6
//   image(slingShotBandFront, 0, 0, width / 15 + birdX*1, height /20 );

//   pop();

  let collitionForceX = minnionPig.body.positionImpulse.x;
  let collitionForceY = minnionPig.body.positionImpulse.y;

  let collitionForce = collitionForceY;

if (collitionForce !== 0){
  World.remove(world, minnionPig.body);
  coinCounter = 100;
  //image(killPoint,minnionPig.body.position.x, height/1.5, width / 8, width / 8);
}
else{
  minnionPig.show();
}
  box1.show();
  box2.show();
  box3.show();

  slingshot.show();
  bird.show();

  image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);
  // push();
  // rotate(.01)
  // translate(width / 4.6, height / 1.48);
  // image(slingShotBandBack, 0, 0, 100, width / 25);

  // pop();

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

}

function showMenu() {
  image(play, width / 2.7, height / 2, width / 5,height /4.5);
}

// check if mouse is clicked and if the mouse pointer is inside the playbutton.
function checkIfButtonClicked() {

  if (mouseIsPressed) {
  click = collidePointRect(mouseX,mouseY,width/2.7, height/2,  width / 5,height /4.5);

  // if the mouse pointer is inside the play button then switch the state to game.
  if(click === true){
    state = "level";
  }
}
}
function checkIfMenuIsClicked(){
  if (mouseIsPressed) {
  menuClicked = collidePointCircle(mouseX,mouseY,width / 1.059,  width / 24, width / 15)

  }
  if (menuClicked){
    World.add(world, minnionPig.body);
    state = "menu";
  }
}