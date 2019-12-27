function setup() {

  const canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(60);

  engine.positionIterations = 20;

  engine.velocityIterations = 20;

  for (let i = 0; i < 4; i++) {
    levels[i] = new Levels(width / 4 + i * width / 7, height / 2, width / 13, width / 13, i + 1);
  }

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
 
  Matter.Engine.update(engine);
  // backgroundMusic.play();

  

  if (state === "menu") {
    background(bkgImg);
    showMenu();
    checkIfButtonClicked();
    levelClicked = false;
    vv = 1;
    minnionPig1Die = minnionPig2Die = minnionPig3Die = true;

  }

  else if (state === "level") {
    if (collidePointCircle(mouseX, mouseY, width / 15, height / 10, width / 15) && mouseIsPressed) {
      clickSound.play();
      state = "menu";
      console.log(11);
    }
  
    background(bkgImg);
    levelWait++;
    galss3Wait = 0;


    for (let Levels of levels) {
      Levels.show();
    }

    levelClicked = false;
deleteObjects();
   push();
   imageMode(CENTER);
  image(backImg, width /15, height / 10, width / 15, width / 15);
pop();
    level2 = level3 = true;
    level1 = true;
  }
  else if (state === "game") {


    if (stateLevel === "level1") {
      
        if (currentLevel ===1){
        if (minnionPig) {
          World.remove(world, minnionPig.body);
        }
        ground = new Ground(width / 2, height - 10, width, 20);


        box1 = new Box(width / 1.5, height /1.1, width / 15 , width / 10, woodImg);
        box2 = new Box(width / 1.2, height /1.1, width / 15, width / 10, woodImg);
        box3 = new Box(width / 1.333334, height / 1.48, width / 8.2, width / 17, woodImg);

        bird = new Bird(width / 3.5, height / 1.5, 40);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.33, height - 40, 40);


        currentLevel = 0;

      }




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

      ground.show();


      let collitionForceY = minnionPig.body.positionImpulse.y;

      let collitionForce = collitionForceY;

      if (collitionForce !== 0) {
        World.remove(world, minnionPig.body);
        
        
        gameEnd = true;
        if (minnionPig1Die) {
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          coinCounter += 100;
          minnionPig1Die = false;
        }
      }
      else {
        gameEnd = false;
        minnionPig.show();
      }
      box1.show();
      box2.show();
      box3.show();


      slingshot.show();
      bird.show();
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);


      if (birdX < 270) {
        slingShotRemoval = true;
      }
      else {
        slingShotRemoval = false;
      }
      if (mouseX < width / 3 && mouseY > height / 2) {
        World.add(world, mConstraint);


      }
      else {

        World.remove(world, mConstraint);
      }
      image(coin, width / 100, width / 100, width / 20, width / 20);
      push();
      textSize(width / 25);
      fill(0);

      text(coinCounter, width / 12, width / 20);
      pop();
      image(goBack, width / 1.1, width / 100, width / 15, width / 15);

    }
    if (stateLevel === "level2") {
      if (currentLevel ===2){
        if (minnionPig) {
          World.remove(world, minnionPig.body);
          if (minnionPig2) {
            World.remove(world, minnionPig2.body);
          }
          if (minnionPig3) {
            World.remove(world, minnionPig3.body);
          }
        }
        ground = new Ground(width / 2, height - 10, width, 20);


        box1 = new Box(width / 1.5, height /1.1, width / 15 , width / 10, woodImg);
        box2 = new Box(width / 1.2, height /1.1, width / 15, width / 10, woodImg);
        box3 = new Box(width / 1.333334, height / 1.48, width / 8.2, width / 17, woodImg);

        metal1 = new Metal(width / 1.1, (height - 20), width / 20, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.7, (height - 20), width / 20, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.333333, height / 1.7, width / 2.7, width / 30, metalHorizontalImg);

        console.log(metal1);

        bird = new Bird(width / 3.5, height / 1.5, 40);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.33, height - 40, 40);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, 40);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, 40);
        counter = 0;
        currentLevel = 0;
      }




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
      // Matter.Engine.update(engine);
      ground.show();


      let collitionForceY = minnionPig.body.positionImpulse.y;

      let collitionForce1 = collitionForceY;
      let collitionForce2 = minnionPig2.body.positionImpulse.y;
      let collitionForce3 = minnionPig3.body.positionImpulse.y;

      if (collitionForce1 !== 0) {
        World.remove(world, minnionPig.body);
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig1Die = false;
        }

      }
      else {
        minnionPig.show();
        gameEnd = false;
      }
      if (collitionForce2 !== 0) {
        World.remove(world, minnionPig2.body);
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }

      }
      else {
        minnionPig2.show();
        gameEnd = false;
      }
      if (collitionForce3 !== 0) {
        World.remove(world, minnionPig3.body);
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }

      }
      else {
        minnionPig3.show();
        gameEnd = false;
      }
      if (counter === 3) {
        gameEnd = true;
      }


      box1.show();
      box2.show();
      box3.show();
      metal1.show();
      metal2.show();
      metal3.show();


      slingshot.show();
      bird.show();
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);


      if (birdX < 270) {
        slingShotRemoval = true;
      }
      else {
        slingShotRemoval = false;
      }
      if (mouseX < width / 3 && mouseY > height / 2) {
        World.add(world, mConstraint);


      }
      else {

        World.remove(world, mConstraint);
      }
      image(coin, width / 100, width / 100, width / 20, width / 20);
      push();
      textSize(width / 25);
      fill(0);

      text(coinCounter, width / 12, width / 20);
      pop();
      image(goBack, width / 1.1, width / 100, width / 15
        , width / 15
      );
    }
    if (stateLevel === "level3") {
      if (currentLevel ===3){
        if (minnionPig) {
          World.remove(world, minnionPig.body);
          if (minnionPig2) {
          World.remove(world, minnionPig2.body);
          }
          if (minnionPig3) {
          World.remove(world, minnionPig3.body);
          }
        }
        ground = new Ground(width / 2, height - 10, width, 20);


        box1 = new Box(width / 1.52, height/1.1, 120, 150, woodImg);
        box2 = new Box(width / 1.25, height/1.1, 120, 150, woodImg);
        box3 = new Box(width / 1.38, height / 1.35, width / 11, 90, woodImg);

        metal1 = new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.395, height / 1.7, width / 3.1, width / 40, metalHorizontalImg);

        glass1 = new Glass(width / 1.08, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg);
        glass2 = new Glass(width / 1.9, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg);
        glass3 = new Glass(width / 1.376, height / 1.8, width / 2.28, width / 40, glassHorizontalImg);

        glass1break= glass2break= glass3break = true;
        counter = 0;

        bird = new Bird(width / 3.5, height / 1.5, 40);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.37, height - 40, 40);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, 40);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, 40);

        currentLevel = 0;

      }

      //console.log()


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
      // Matter.Engine.update(engine);
      ground.show();

      let glass1CollitionForce = glass1.body.speed;
      let glass2CollitionForce = glass2.body.speed;
      let glass3CollitionForce = glass3.body.speed;




      if (glass1CollitionForce > 1) {
        World.remove(world, glass1.body);
        if ( glass1break){
          glassSound.play();
          glass1break = false;
       }
      }
      else {
        glass1.show();
      }
      if (glass2CollitionForce > 1) {
        World.remove(world, glass2.body);
        if ( glass2break){
          glassSound.play();
          glass2break = false;
       }

      }
      else {
        glass2.show();
      }
      if (glass3CollitionForce > 1) {
        if (galss3Wait > 10) {
          World.remove(world, glass3.body);
          if ( glass3break){
            glassSound.play();
            glass3break = false;
         }
        }


      }
      else {

        glass3.show();
      }
      galss3Wait++;
      let collitionForceY = minnionPig.body.positionImpulse.y;

      let collitionForce1 = collitionForceY;
      let collitionForce2 = minnionPig2.body.positionImpulse.y;
      let collitionForce3 = minnionPig3.body.positionImpulse.y;

      if (collitionForce1 !== 0) {
        World.remove(world, minnionPig.body);
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig1Die = false;
        }

      }
      else {
        minnionPig.show();
        gameEnd = false;
      }
      if (collitionForce2 !== 0) {
        World.remove(world, minnionPig2.body);
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }

      }
      else {
        minnionPig2.show();
        gameEnd = false;
      }
      if (collitionForce3 !== 0) {
        World.remove(world, minnionPig3.body);
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }

      }
      else {
        minnionPig3.show();
        gameEnd = false;
      }



      box1.show();
      box2.show();
      box3.show();
      metal1.show();
      metal2.show();
      metal3.show();


      slingshot.show();
      bird.show();
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);
      if (counter === 3) {
        gameEnd = true;
      }

      if (birdX < 270) {
        slingShotRemoval = true;
      }
      else {
        slingShotRemoval = false;
      }
      if (mouseX < width / 3 && mouseY > height / 2) {
        World.add(world, mConstraint);


      }
      else {

        World.remove(world, mConstraint);
      }
      image(coin, width / 100, width / 100, width / 20, width / 20);
      push();
      textSize(width / 25);
      fill(0);

      text(coinCounter, width / 12, width / 20);
      pop();
      image(goBack, width / 1.1, width / 100, width / 15, width / 15);
    }
    if (gameEnd ||pause) {
      pauseClicked =  false;
      push();
      
      imageMode(CENTER)
      let buttonSize = (width + height) / 17;
      image(gameEndImg, width / 2, height / 2, width / 2, height / 2);
      image(redo, width / 3, height / 1.4, buttonSize, buttonSize);
      image(goToLevels, width / 2, height / 1.4, buttonSize, buttonSize);
      image(next, width / 1.5, height / 1.4, buttonSize, buttonSize);
      if (pause){
      image(closeImg, width /1.35, height /3.8, buttonSize/2, buttonSize/2);
      }
      pop();
      push()
      fill(255)
      circle();

      pop()
      if (pause){
        if (collidePointCircle(mouseX, mouseY, width /1.35, height /3.8, buttonSize/2) && mouseIsPressed) {
          pause = false;
          clickSound.play();
        }
      }
      if (collidePointCircle(mouseX, mouseY, width / 2, height / 1.4, buttonSize-5) && mouseIsPressed) {
        state = "level";
        levelClicked = false;
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false; 
        clickSound.play();
      }
      if (collidePointCircle(mouseX, mouseY, width / 3, height / 1.4, buttonSize-5) && mouseIsPressed) {
        
        deleteObjects();
        currentLevel = int(stateLevel[5]);
        levelClicked = false;
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false;
        clickSound.play();
      }
      if (collidePointCircle(mouseX, mouseY, width / 1.5, height / 1.4, buttonSize-5) && mouseIsPressed) {
        
        deleteObjects();
        let temp = int(stateLevel[5]) +1;
        levelClicked = false;
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        stateLevel = "level"+temp;
       currentLevel = temp;
       pause = false;
       clickSound.play();
      }
    }
  }

  //Matter.Engine.update(engine);
}




function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(width / 3.5, height / 1.5, 40);
    slingshot.attach(bird.body);
  }

}
function mousePressed() {
  pauseClicked =  true;
  if (state === "level") {
    // level1 = true;
  }

}
function mouseReleased() {
  if (birdX < width / 4) {
    setTimeout(() => {
      slingshot.fly();
    }, 50);
  }

  if (levelWait > 30) {
    levelClicked = true
  }
  pauseClicked =  false;
}

// function windowResized() {
//   setup();
// }