function setup() {

  const canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(60);
pigAndBirdSize = width /40;

  for (let i = 0; i < 5; i++) {
    levels[i] = new Levels(width / 6 + i * width / 7, height / 2, width / 13, width / 13, i + 1);
  }

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  // Matter.Events.on(engine, "afterUpdate", callback);
  
  // A fix for high pixel density displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
 
  // World.add(world, mConstraint);
  World.remove(world, mConstraint);
  backgroundMusic.loop();



  birdImgList = [birdImg1, birdImg2, birdImg3, birdImg4];
  for (let i = 0; i < 4; i++) {
    birds[i] = new StoreBird(width / 5 + i * width / 5, height / 2, width / 8, width / 8, i);
  }

  birdImg = birdImgList[0];


  volumeSlider = createSlider(0, 1, 0.1, 0.01);
  volumeSlider2 = createSlider(0, 10, 1, 0.01);

  volumeSlider.position(width / 2, -height / 2);
  volumeSlider2.position(width / 2, -height / 2);
  birdImgID = 0;

   Matter.Events.on(engine,"collisionStart",collision);

}



function draw() {

  Matter.Engine.update(engine);
  backgroundMusic.setVolume(volumeSlider.value());
  clickSound.setVolume(volumeSlider2.value());
  glassSound.setVolume(volumeSlider2.value());
  metalSound.setVolume(volumeSlider2.value()/1.5);
  pigDieSound.setVolume(volumeSlider2.value());
  woodSound.setVolume(volumeSlider2.value()/1.5);
 


  if (state === "menu") {
    levelWait = 0;

    background(bkgImg);
    if (!settings) {
      showMenu();
      checkIfButtonClicked();
    }
    levelClicked = false;
    vv = 1;
    minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
    image(settingsImg, width / 1.1, width / 100, width / 15, width / 15);
    if (!settingsTemp) {
      if (mouseIsPressed && collidePointCircle(mouseX, mouseY, width / 1.059, width / 24, width / 15)) {
        settingsTemp = true;
        settingsSound++;
      }
    }
    if (settingsSound === 1) {
      clickSound.play();
    }
    if (settingsTemp) {
      showSettings();
    }


    push();
    imageMode(CENTER);
    image(storeImg, width / 1.059, height / 1.1, width / 15, width / 15);
    pop();

    if (mouseIsPressed && collidePointCircle(mouseX, mouseY, width / 1.059, height / 1.1, width / 15)) {
      storeSound++;
      if (storeSound === 1) {
        clickSound.play();
      }
      state = 'store';
    }
    // birdImg = birdImgList[0];




  }



  if (state === "store") {
    storeSound = 0;
    background(bkgImg);
    for (let Birds of birds) {
      Birds.show();
    }
    if (collidePointCircle(mouseX, mouseY, width / 15, height / 10, width / 15) && mouseIsPressed) {
      clickSound.play();
      state = "menu";

    }
    push();
    imageMode(CENTER);
    image(backImg, width / 15, height / 10, width / 15, width / 15);
    pop();
  }


  else if (state === "level") {
    if (collidePointCircle(mouseX, mouseY, width / 15, height / 10, width / 15) && mouseIsPressed) {
      clickSound.play();
      state = "menu";

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
    image(backImg, width / 15, height / 10, width / 15, width / 15);
    pop();
    level2 = level3 =  true;
    level1 = true;
  }
  else if (state === "game") {
    woodSound.onended(woodsoundCallback);
    metalSound.onended(metalsoundCallback);

    if (birdFly){
      if (birdX > width/3.5){
        birdFly = false;
        objects[4].fly();
      }
    }
  if (bird){
    if (birdCounter > 2 && birdX > windowWidth ||birdCounter > 1 &&birdX < 0){
      if( birdCounterWait > 60){
        birdCounter--;
      }
      birdCounterWait ++;
    }
    if (birdCounter === 1 && birdFlying &&  bird.body.speed < 0.28 ||birdCounter === 1 && birdX > windowWidth ||birdCounter === 1 &&birdX < 0){
      if( birdCounterWait > 60){
      gameOver  = true;
      }
      birdCounterWait ++;
    }
    if (birdCounter >1 && birdFlying &&  bird.body.speed < 0.28 || birdX > windowWidth ||birdX < 0){
      if( birdCounterWait > 60){
      World.remove(world, bird.body);
      bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);
      objects[4].attach(bird.body);
      birdCounterWait = 0;
      birdCounter--;
    }
    birdCounterWait ++;
    }
  }
    
    if (stateLevel === "level1") {

      if (currentLevel === 1) {
    
        bird =  new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Box(width / 1.5, height / 1.1, width / 15, width / 10, woodImg));
        objects.push(new Box(width / 1.2, height / 1.1, width / 15, width / 10, woodImg));
        objects.push(new Box(width / 1.333334, height / 1.48, width / 8.2, width / 17, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));
        objects.push(new Pig(width / 1.33, height - 40, pigAndBirdSize));
        
        
        currentLevel = 0;

      }


     


      levelClicked = false;
      checkIfMenuIsClicked();



      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);

      objects[0].show();


      let collitionForceY = objects[5].body.positionImpulse.y;

      let collitionForce = collitionForceY;

      if (collitionForce !== 0) {
        World.remove(world, objects[5].body);


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
        objects[5].show();
      }
      for (let i = 1; i < 4; i++) {
        objects[i].show();
      }
 


      objects[4].show();
      bird.show();
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);


      if (birdX <width/10) {
        slingShotRemoval = true;
      }
      else {
        slingShotRemoval = false;
      }


      if (mConstraint.body ) {
        
      if (mConstraint.body.label=== 'Bird' ) {
        World.add(world, mConstraint);
      }
      else {

        World.remove(world, mConstraint);
       
      }
        

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
      if (currentLevel === 2) {
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


        box1 = new Box(width / 1.47, height / 1.1, width / 15, width / 10, woodImg);
        box2 = new Box(width / 1.22, height / 1.1, width / 15, width / 10, woodImg);
        box3 = new Box(width / 1.333334, height / 1.48, width / 12, width / 17, woodImg);

        metal1 = new Metal(width / 1.1, (height - 20), width / 20, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.7, (height - 20), width / 20, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.333333, height / 1.7, width / 2.7, width / 30, metalHorizontalImg);

        

        bird = new Bird(width / 3.5, height / 1.5,pigAndBirdSize);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.33, height - 40, pigAndBirdSize);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, pigAndBirdSize);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, pigAndBirdSize);
        counter = 0;
        currentLevel = 0;
      }




      levelClicked = false;
      checkIfMenuIsClicked();

    
     

      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);
      
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
      if (mConstraint.body ) {
        
        if (mConstraint.body.label=== 'Bird' ) {
          World.add(world, mConstraint);
        }
        else {
  
          World.remove(world, mConstraint);
         
        }
          
  
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
      if (currentLevel === 3) {
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


        box1 = new Box(width / 1.52, height / 1.1, 120, 150, woodImg);
        box2 = new Box(width / 1.25, height / 1.1, 120, 150, woodImg);
        box3 = new Box(width / 1.38, height / 1.35, width / 11, 90, woodImg);

        metal1 = new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.395, height / 1.7, width / 3.1, width / 40, metalHorizontalImg);

        glass1 = new Glass(width / 1.08, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg);
        glass2 = new Glass(width / 1.9, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg);
        glass3 = new Glass(width / 1.376, height / 1.8, width / 2.28, width / 40, glassHorizontalImg);

        glass1break = glass2break = glass3break = true;
        counter = 0;

        bird = new Bird(width / 3.5, height / 1.5,pigAndBirdSize);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.37, height - 40, pigAndBirdSize);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, pigAndBirdSize);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, pigAndBirdSize);

        currentLevel = 0;

      }



      levelClicked = false;
      checkIfMenuIsClicked();

      

      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);
      
      ground.show();

      let glass1CollitionForce = glass1.body.speed;
      let glass2CollitionForce = glass2.body.speed;
      let glass3CollitionForce = glass3.body.speed;




      if (glass1CollitionForce > 1) {
        World.remove(world, glass1.body);
        if (glass1break) {
          glassSound.play();
          glass1break = false;
        }
      }
      else {
        glass1.show();
      }
      if (glass2CollitionForce > 1) {
        World.remove(world, glass2.body);
        if (glass2break) {
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
          if (glass3break) {
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
      
      if (mConstraint.body ) {
        
        if (mConstraint.body.label=== 'Bird' ) {
          World.add(world, mConstraint);
        }
        else {
  
          World.remove(world, mConstraint);
         
        }
        
  
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
    if (stateLevel === "level4") {
      if (currentLevel === 4) {
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


        box1 = new Box(width / 1.52, height / 1.1, 120, 150, woodImg);
        box2 = new Box(width / 1.25, height / 1.1, 120, 150, woodImg);
        box3 = new Box(width / 1.38, height / 1.35, width / 11, 90, woodImg);

        metal1 = new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.377, height / 1.7, width / 3.1, width / 40, metalHorizontalImg);

        glass1 = new Glass(width / 1.08, height / 1.25, width / 25, height / 2.7 + width / 40, glassImg);
        glass2 = new Glass(width / 1.9, height / 1.25, width / 25, height / 2.7 + width / 40, glassImg);
        glass3 = new Glass(width / 1.376, height / 1.8, width / 2.3, width / 40, glassHorizontalImg);

        glass6 = new Glass(width / 1.385, height / 2.5, width / 8.5, width / 50, glassHorizontalImg);
        glass4 = new Glass(width / 1.482, height / 2, width / 40, height /7, glassImg);
        glass5 = new Glass(width / 1.3, height / 2, width / 40, height /7, glassImg);

        glass1break = glass2break = glass3break = true;
        counter = 0;

        bird = new Bird(width / 3.5, height / 1.5,pigAndBirdSize);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.37, height - 40, pigAndBirdSize);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, pigAndBirdSize);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, pigAndBirdSize);

      tnt1 = new TNT(width / 1.38, height / 2, width / 20, 90, tntImg);
        currentLevel = 0;

      }

    


      levelClicked = false;
      checkIfMenuIsClicked();

      

      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);
      // Matter.Engine.update(engine);
      ground.show();

      let glass1CollitionForce = glass1.body.speed;
      let glass2CollitionForce = glass2.body.speed;
      let glass3CollitionForce = glass3.body.speed;
      let glass4CollitionForce = glass4.body.speed;
      let glass5CollitionForce = glass5.body.speed;
      let glass6CollitionForce = glass6.body.speed;
    
      
      if (tnt1.body.speed >4.5 && tntDone){
        tnt1.explosion();
        tntDone = false;
        World.remove(world, tnt1.body);
        
      }
      // if (tntEffect){
        //   tntEffect.effect();
        // }
        if (tntDone){
          tnt1.show();
        }
        
        
    

       if (glass4CollitionForce > .5 && glassBreak> 10) {
        World.remove(world, glass4.body);
        if (glass4break) {
          glassSound.play();
          glass4break = false;
        }
      }

      else {
        glass4.show();
      }
      if (glass5CollitionForce > .5&& glassBreak> 10) {
        World.remove(world, glass5.body);
        if (glass5break) {
          glassSound.play();
          glass5break = false;
        }
      }
      else {
        glass5.show();
      }
      if (glass6CollitionForce > .5&& glassBreak> 10) {
        World.remove(world, glass6.body);
        if (glass6break) {
          glassSound.play();
          glass6break = false;
        }
      }
      else {
        glass6.show();
      }

      if (glass1CollitionForce > .5) {
        World.remove(world, glass1.body);
        if (glass1break) {
          glassSound.play();
          glass1break = false;
        }
      }
      else {
        glass1.show();
      }
      if (glass2CollitionForce > 1) {
        World.remove(world, glass2.body);
        if (glass2break) {
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
          if (glass3break) {
            glassSound.play();
            glass3break = false;
          }
        }


      }
      else {

        glass3.show();
      }
      galss3Wait++;
      glassBreak++;
      let collitionForceY = minnionPig.body.positionImpulse.y;

      let collitionForce1 = collitionForceY;
      let collitionForce2 = minnionPig2.body.positionImpulse.y;
      let collitionForce3 = minnionPig3.body.positionImpulse.y;

      if (collitionForce1 !== 0) {
        World.remove(world, minnionPig.body);
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          
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
      if (mConstraint.body ) {
        
        if (mConstraint.body.label=== 'Bird' ) {
          World.add(world, mConstraint);
        }
        else {
  
          World.remove(world, mConstraint);
         
        }
       
  
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
    if (stateLevel === "level5") {
      if (currentLevel === 5) {
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


        box1 = new Box(width / 1.52, height / 1.1, 120, 150, woodImg);
        box2 = new Box(width / 1.25, height / 1.1, 120, 150, woodImg);
        box3 = new Box(width / 1.38, height / 1.35, width / 11, 90, woodImg);

        metal1 = new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg);
        metal2 = new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg);
        metal3 = new Metal(width / 1.395, height / 1.7, width / 3.1, width / 40, metalHorizontalImg);

        // glass1 = new Glass(width / 1.08, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg);
        // glass2 = new Glass(width / 1.9, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg);
        // glass3 = new Glass(width / 1.376, height / 1.8, width / 2.28, width / 40, glassHorizontalImg);

        glass1break = glass2break = glass3break = true;
        counter = 0;

        bird = new Bird(width / 3.5, height / 1.5,pigAndBirdSize);
        slingshot = new SlingShot(width / 3.5, height / 1.5, bird.body);
        minnionPig = new Pig(width / 1.37, height - 40, pigAndBirdSize);

        minnionPig2 = new Pig(width / 1.2, height / 1.33, pigAndBirdSize);

        minnionPig3 = new Pig(width / 1.5, height / 1.33, pigAndBirdSize);

      tnt1 = new TNT(width / 1.38, height / 2, width / 20, 90, tntImg);
        currentLevel = 0;

      }

    


      levelClicked = false;
      checkIfMenuIsClicked();

      

      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);
      // Matter.Engine.update(engine);
      ground.show();

      // let glass1CollitionForce = glass1.body.speed;
      // let glass2CollitionForce = glass2.body.speed;
      // let glass3CollitionForce = glass3.body.speed;


if (tnt1.body.speed >4.5 && tntDone){
tnt1.explosion();
tntDone = false;
World.remove(world, tnt1.body);

}
// if (tntEffect){
//   tntEffect.effect();
// }
if (tntDone){
  tnt1.show();
}

      // if (glass1CollitionForce > .5) {
      //   World.remove(world, glass1.body);
      //   if (glass1break) {
      //     glassSound.play();
      //     glass1break = false;
      //   }
      // }
      // else {
      //   glass1.show();
      // }
      // if (glass2CollitionForce > 1) {
      //   World.remove(world, glass2.body);
      //   if (glass2break) {
      //     glassSound.play();
      //     glass2break = false;
      //   }

      // }
      // else {
      //   glass2.show();
      // }
      // if (glass3CollitionForce > 1) {
      //   if (galss3Wait > 10) {
      //     World.remove(world, glass3.body);
      //     if (glass3break) {
      //       glassSound.play();
      //       glass3break = false;
      //     }
      //   }


      // }
      // else {

      //   glass3.show();
      // }
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
      if (mConstraint.body ) {
        
        if (mConstraint.body.label=== 'Bird' ) {
          World.add(world, mConstraint);
        }
        else {
  
          World.remove(world, mConstraint);
         
        }
         
  
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
    if (gameEnd || pause || gameOver) {
      
      instructions = false;

      if (mouseIsPressed && pauseClicked) {
        clickSound.play();
      }
      pauseClicked = false;
      push();

      imageMode(CENTER)
      let buttonSize = (width + height) / 17;
      image(gameEndImg, width / 2, height / 2, width / 2, height / 2);
      image(redo, width / 3, height / 1.4, buttonSize, buttonSize);
      image(goToLevels, width / 2, height / 1.4, buttonSize, buttonSize);
      image(next, width / 1.5, height / 1.4, buttonSize, buttonSize);
      if (pause) {
        image(closeImg, width / 1.35, height / 3.8, buttonSize / 2, buttonSize / 2);
      }
      pop();
     
      if (pause) {
        if (collidePointCircle(mouseX, mouseY, width / 1.35, height / 3.8, buttonSize / 2) && mouseIsPressed) {
          pause = false;
          clickSound.play();
        }
      }
      if (collidePointCircle(mouseX, mouseY, width / 2, height / 1.4, buttonSize - 5) && mouseIsPressed) {
        state = "level";
        levelClicked = false;
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false;
        clickSound.play();
      }
      if (collidePointCircle(mouseX, mouseY, width / 3, height / 1.4, buttonSize - 5) && mouseIsPressed) {

        deleteObjects();
        currentLevel = int(stateLevel[5]);
        levelClicked = false;
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false;
        clickSound.play();
      }
      if (collidePointCircle(mouseX, mouseY, width / 1.5, height / 1.4, buttonSize - 5) && mouseIsPressed) {

        let temp = int(stateLevel[5]) + 1;
        if (temp < 6){
          deleteObjects();
        levelClicked = false;
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        stateLevel = "level" + temp;
        currentLevel = temp;
      
      pause = false;
        clickSound.play();
      }
    }
        if (gameEnd){
          push();
          noStroke();
          textFont(font);
          textSize(width / 10);
      
          text("Victory !", width / 3, height / 2);
      
          pop();
          pause = false;
          gameOver= false;
          
        }
    if (gameOver){
      push();
      noStroke();
      textFont(font);
      textSize(width / 15);
  
      text("Game Over", width / 3, height / 2);
  
      pop();
      pause = false;
    }
    if (pause){
      push();
      noStroke();
      textFont(font);
      textSize(width / 15);
  
      text("Paused", width / 2.5, height / 2);
  
      pop();
      
    }
    }
    else {
      pauseClicked = true;
      if ( mouseIsPressed && instructionsDelay > 10){
        instructions =false;
      }
    }

  if (instructions){
    push();
    noStroke();
    textFont(font);
    textSize(width / 25);
    instructionsDelay ++;

    text("Click And Drag The Bird  Back To Shoot The Pig !", width / 8, height / 4);

    pop();
    
  }

  if (mouseX > width / 3 || birdX > width / 3 ) {
      World.remove(world, mConstraint);
    
    }
  }
  
 

}



function showSettings() {


  settingsSound = 0;
  volumeSlider.position(width / 1.7, height / 2.7);

  volumeSlider2.position(width / 1.7, height / 2.125);

  push();
  imageMode(CENTER)
  let buttonSize = (width + height) / 17;
  image(gameEndImg, width / 2, height / 2, width / 2, height / 2);
  image(closeImg, width / 1.35, height / 3.8, buttonSize / 2, buttonSize / 2);

  pop();

  if (!collidePointCircle(mouseX, mouseY, width / 1.35, height / 3.8, buttonSize / 2)) {
    settings = true;
  }

  if (collidePointCircle(mouseX, mouseY, width / 1.35, height / 3.8, buttonSize / 2) && mouseIsPressed) {
    settingsTemp = false;
    clickSound.play();
    settings = false;
    volumeSlider.position(width / 2, -height / 2);
    volumeSlider2.position(width / 2, -height / 2);

  }


  push();
  noStroke();

  textSize(width / 50);
  fill(0);

  text('Background Music Volume', width / 3.5, height / 2.5);
  text('SFX Volume', width / 3.5, height / 2);
  pop();


}




function mouseReleased() {

  // if (birdX < width / 4) {
  //   setTimeout(() => {
  //     slingshot.fly();
  //   }, 50);
  // }

  if (birdX < width / 4) {
    
    birdFly = true;
   
  }

  if (levelWait > 30) {
    levelClicked = true
  }
}

function woodsoundCallback(){
  woodSoundPlayed = true;
}
function metalsoundCallback(){
  metalSoundPlayed = true;
}
function collision(event){
 if ( !instructions){
  let pairs = event.pairs;
  
  let bodyB = pairs[0].bodyB.label;
  
    if (bodyB === "Wood" ){
     
        if (woodSoundPlayed){
     woodSound.play();
     woodSoundPlayed = false;
        }
      
    }
    if (bodyB === "Metal" ){
        if (metalSoundPlayed){
      metalSound.play();
      metalSoundPlayed = false;
      }
    }
    }
  }
 
