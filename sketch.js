function setup() {

  const canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;



  // Matter.Engine.run(engine);
  // ground = new Ground(width / 2, height - 10, width, 20);


  // box1 = new Box(width / 1.5, (height - 20), 120, 160, woodImg);
  // box2 = new Box(width / 1.2, (height - 20), 120, 160, woodImg);
  // box3 = new Box(width / 1.333333, height / 1.345, width / 9, 100, woodImg);

  // bird = new Bird(width / 3.5, height / 1.5, 40);
  // slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
  // minnionPig = new Pig(width / 1.33, height - 40, 40);
  // collitionForce = minnionPig.body.torque

  // console.log(collitionForce);

  for (let i = 0; i < 4; i++) {
    levels[i] = new Levels(width / 4 + i * width / 7, height / 2, width / 13, width / 13, i + 1);
    // levels = new Levels (width / 1.333333, (height - 200), 180, 100);
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
  //frameRate(240);
  woodWidth = width / 15;

  if (state === "menu") {
    background(bkgImg);
    showMenu();
    checkIfButtonClicked();
    levelClicked = false;
    vv = 1;
    minnionPig1Die = minnionPig2Die = minnionPig3Die = true;

  }

  else if (state === "level") {
    background(bkgImg);
    levelWait++;


    for (let Levels of levels) {
      Levels.show();
    }

    levelClicked = false;

    if (ground) {
      ground.delete()
      ground = null;

      box1.delete();
      box1 = null;
      box2.delete();
      box2 = null;

      box3.delete();
      box3 = null;

      bird.delete();
      bird = null;
      slingshot.delete();
      slingshot = null;
      World.remove(world, minnionPig.body);


      if (metal1) {
        metal1.delete();
        metal1 = null;
        metal2.delete();
        metal2 = null;
        metal3.delete();
        metal3 = null;
      }
      if (glass1) {
         glass1.delete();
         glass1 = null;
         glass2.delete();
         glass2 = null;
         glass3.delete();
         glass3 = null;
       
      }
      console.log('yaayay');
    }

    level2 = level3 = true;
    level1 = true;
  }
  else if (state === "game") {


    if (stateLevel === "level1") {
      if (level1) {
        if (minnionPig) {
          World.remove(world, minnionPig.body);
        }
        ground = new Ground(width / 2, height - 10, width, 20);


        box1 = new Box(width / 1.5, (height - 20), woodWidth, width / 10, woodImg);
        box2 = new Box(width / 1.2, (height - 20), woodWidth, width / 10, woodImg);
        box3 = new Box(width / 1.333334, height / 1.345, width / 8.2, width / 17, woodImg);

        bird = new Bird(width / 3.5, height / 1.5, 40);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.33, height - 40, 40);


        level1 = false;

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
        if (minnionPig1Die) {
          coinCounter += 100;
          minnionPig1Die = false;
        }
      }
      else {
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
      image(goBack, width / 1.1, width / 100, woodWidth, woodWidth);
    }
    if (stateLevel === "level2") {
      if (level2) {
        if (minnionPig) {
          World.remove(world, minnionPig.body);
          World.remove(world, minnionPig2.body);
          World.remove(world, minnionPig3.body);
        }
        ground = new Ground(width / 2, height - 10, width, 20);


        box1 = new Box(width / 1.5, (height - 20), 120, 160, woodImg);
        box2 = new Box(width / 1.2, (height - 20), 120, 160, woodImg);
        box3 = new Box(width / 1.333333, height / 1.345, width / 9, 100, woodImg);

        metal1 = new Metal(width / 1.1, (height - 20), width / 20, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.7, (height - 20), width / 20, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.333333, height / 1.7, width / 2.7, width / 30, metalHorizontalImg);

        bird = new Bird(width / 3.5, height / 1.5, 40);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.33, height - 40, 40);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, 40);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, 40);

        level2 = false;

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
          minnionPig1Die = false;
        }

      }
      else {
        minnionPig.show();
      }
      if (collitionForce2 !== 0) {
        World.remove(world, minnionPig2.body);
        if (minnionPig2Die) {
          coinCounter += 100;
          minnionPig2Die = false;
        }

      }
      else {
        minnionPig2.show();
      }
      if (collitionForce3 !== 0) {
        World.remove(world, minnionPig3.body);
        if (minnionPig3Die) {
          coinCounter += 100;
          minnionPig3Die = false;
        }

      }
      else {
        minnionPig3.show();
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
      image(goBack, width / 1.1, width / 100, woodWidth, woodWidth);
    }
    if (stateLevel === "level3") {
      if (level3) {
        if (minnionPig) {
          World.remove(world, minnionPig.body);
          World.remove(world, minnionPig2.body);
          World.remove(world, minnionPig3.body);
        }
        ground = new Ground(width / 2, height - 10, width, 20);


        box1 = new Box(width / 1.52, (height - 20), 120, 150, woodImg);
        box2 = new Box(width / 1.25, (height - 20), 120, 150, woodImg);
        box3 = new Box(width / 1.4, height / 1.345, width / 10, 90, woodImg);

        metal1 = new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.37, height / 1.7, width / 3, width / 40, metalHorizontalImg);
        
        glass1 = new Glass(width / 1.09, height/1.25, width / 25, height / 2.7 + width / 40, glassImg);
        glass2 = new Glass(width / 1.8, height/1.25, width / 25, height / 2.7 + width / 40, glassImg);
        glass3 = new Glass(width / 1.37, height / 1.8, width / 2.41, width / 40, glassHorizontalImg);

        

        bird = new Bird(width / 3.5, height / 1.5, 40);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.37, height - 40, 40);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, 40);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, 40);

        level3 = false;

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
      
      let glass1CollitionForce = glass1.body.positionImpulse.x;
      let glass2CollitionForce = glass2.body.positionImpulse.x;
      let glass3CollitionForce = glass3.body.positionImpulse.x;
      
     
      

      if (glass1CollitionForce > .5) {
        World.remove(world, glass1.body);
       

      }
      else {
        glass1.show();
      }
      if (glass2CollitionForce >.5) {
        World.remove(world, glass2.body);
        

      }
      else {
        glass2.show();
      }
      if (glass3CollitionForce >.5) {
        World.remove(world, glass3.body);
        

      }
      else {
        glass3.show();
      }

      let collitionForceY = minnionPig.body.positionImpulse.y;

      let collitionForce1 = collitionForceY;
      let collitionForce2 = minnionPig2.body.positionImpulse.y;
      let collitionForce3 = minnionPig3.body.positionImpulse.y;

      if (collitionForce1 !== 0) {
        World.remove(world, minnionPig.body);
        if (minnionPig1Die) {
          coinCounter += 100;
          minnionPig1Die = false;
        }

      }
      else {
        minnionPig.show();
      }
      if (collitionForce2 !== 0) {
        World.remove(world, minnionPig2.body);
        if (minnionPig2Die) {
          coinCounter += 100;
          minnionPig2Die = false;
        }

      }
      else {
        minnionPig2.show();
      }
      if (collitionForce3 !== 0) {
        World.remove(world, minnionPig3.body);
        if (minnionPig3Die) {
          coinCounter += 100;
          minnionPig3Die = false;
        }

      }
      else {
        minnionPig3.show();
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
      image(goBack, width / 1.1, width / 100, woodWidth, woodWidth);
    }
  }

 Matter.Engine.update(engine);
}




function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(width / 3.5, height / 1.5, 40);
    slingshot.attach(bird.body);
  }

}
function mousePressed() {
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

}

