// major project (angry birds clone).
// Navaneeth Krishna
// 20 january 2020

// I beta tested my game with a few people and I implemented the following :
// A loading screen, slightly changed my instructions and added some new sound effects.
// The beta tester recomened a guide line for the bird but that was had to do and i didn't have enough time to implement this.

function setup() {

  // create canvas.
  const canvas = createCanvas(windowWidth, windowHeight);

  // create matter.js engine and world.
  engine = Engine.create();
  world = engine.world;

  // set the pig and bird size.
  pigAndBirdSize = width / 40;

  //create matter.js mouse constraint for interacting with bird.
  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }
  mConstraint = MouseConstraint.create(engine, options);

  // A fix for high pixel density displays
  mouse.pixelRatio = pixelDensity();

  // loop the background music so it doest stop.
  backgroundMusic.loop();

  // add all the bird images into an array.
  birdImgList = [birdImg1, birdImg2, birdImg3, birdImg4];

  // set the default bird image to be red.
  birdImg = birdImgList[0];
  birdImgID = 0;

  // create volume sliders and set it's position.
  volumeSlider = createSlider(0, 1, 0.1, 0.01);
  volumeSlider2 = createSlider(0, 10, 1, 0.01);
  volumeSlider.position(width / 2, -height / 2);
  volumeSlider2.position(width / 2, -height / 2);

  // create a matter.js event callback for playing sound when objects collide.
  Matter.Events.on(engine, "collisionStart", collision);
}

function draw() {

  // update the matter.js engine.
  Matter.Engine.update(engine);

  // set the volume of sound effects to the value from slider.

  backgroundMusic.setVolume(volumeSlider.value());
  clickSound.setVolume(volumeSlider2.value());
  glassSound.setVolume(volumeSlider2.value());
  metalSound.setVolume(volumeSlider2.value() / 1.5);
  pigDieSound.setVolume(volumeSlider2.value());
  woodSound.setVolume(volumeSlider2.value() / 1.5);

  // if state is menu then display menupage.
  if (state === "menu") {
    levelWait = 0;

    // display the background image and the menu buttons and check if buttons are clicked.
    background(bkgImg);
    if (!settings) {
      showMenu();
      checkIfButtonClicked();
    }
    // display the settings.
    else {
        showSettings();
    }

    // set the pig die variables to true.
    minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
  }


  // if state is store then show the birds and check for mouse interaction.
  if (state === "store") {
    background(bkgImg);
    storeSound = 0;

    // create all the bird skins.
    for (let i = 0; i < 4; i++) {
      birds[i] = new StoreBird(width / 5 + i * width / 5, height / 2, width / 8, width / 8, i);
    }

    // show all the skins.
    for (let Birds of birds) {
      Birds.show();
    }

    // display back button.
    push();
    imageMode(CENTER);
    image(backImg, width / 15, height / 10, width / 15, width / 15);
    pop();

    // check if a back button is clicked.
    if (collidePointCircle(mouseX, mouseY, width / 15, height / 10, width / 15) && mouseIsPressed) {
      clickSound.play();
      state = "menu";
    }
  }

  // display the levels.
  else if (state === "level") {
    background(bkgImg);
    levelWait++;
    galss3Wait = 0;

    // create all the levels
    for (let i = 0; i < 5; i++) {
      levels[i] = new Levels(width / 6 + i * width / 7, height / 2, width / 13, width / 13, i + 1);
    }

    // display all the levels.
    for (let Levels of levels) {
      Levels.show();
    }

    // display back button.
    push();
    imageMode(CENTER);
    image(backImg, width / 15, height / 10, width / 15, width / 15);
    pop();

    // check if a back button is clicked.
    if (collidePointCircle(mouseX, mouseY, width / 15, height / 10, width / 15) && mouseIsPressed) {
      clickSound.play();
      state = "menu";
    }

    // delete objects.
    deleteObjects();
  }

  else if (state === "game") {

    // callback after sound stops playing.
    woodSound.onended(woodsoundCallback);
    metalSound.onended(metalsoundCallback);

    // if bird is allowed to fly and it has passed width/3 then relese the bird.
    if (birdFly && birdX > width / 3.5) {
      birdFly = false;
      objects[4].fly();
    }

    // if there is bird available then subtact one from the counter.
    if (bird) {
      if (birdCounter > 2 && birdX > windowWidth || birdCounter > 1 && birdX < 0) {
        if (birdCounterWait > 60) {
          birdCounter--;
        }
        birdCounterWait++;
      }
      // if bird is almost stoped then wait 60 frames and retatach the bird if counter is not 0.
      if (birdCounter === 1 && birdFlying && bird.body.speed < 0.28 || birdCounter === 1 && birdX > windowWidth || birdCounter === 1 && birdX < 0) {
        if (birdCounterWait > 60) {
          gameOver = true;
        }
        birdCounterWait++;
      }
      if (birdCounter > 1 && birdFlying && bird.body.speed < 0.28 || birdX > windowWidth || birdX < 0) {
        if (birdCounterWait > 60) {
          World.remove(world, bird.body);
          bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);
          objects[4].attach(bird.body);
          birdCounterWait = 0;
          birdCounter--;
        }
        birdCounterWait++;
      }
    }

    if (stateLevel === "level1") {

      // creating all the requred objects and pushing it to the objects array.
      if (currentLevel === 1) {

        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.5, height / 1.15, width / 15, width / 10, woodImg));
        objects.push(new Wood(width / 1.2, height / 1.15, width / 15, width / 10, woodImg));
        objects.push(new Wood(width / 1.333334, height / 1.415, width / 8.2, width / 17, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));
        objects.push(new Pig(width / 1.33, height / 1.09, pigAndBirdSize));

        currentLevel = 0;
      }
      background(bkgImg);

      // display pause button.
      image(goBack, width / 1.1, width / 100, width / 15, width / 15);
      // checking if pause button is clicked.
      checkIfPauseIsClicked();

      // display right part of the sling shot's handle.
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);

      // If the force applied on the pig's body is greater than 0 then remove the pig.
      if (objects[5].body.positionImpulse.y !== 0) {
        World.remove(world, objects[5].body);

        // if pig dies then go to the game end screen.
        gameEnd = true;

        // play sound and add 100 coins.
        if (minnionPig1Die) {
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          coinCounter += 100;
          minnionPig1Die = false;
        }
      }

      // if not show the pig.
      else {
        gameEnd = false;
        objects[5].show();
      }

      // display rest of the objects.
      for (let i = 0; i < 5; i++) {
        objects[i].show();

        // remove mouse constrain so it doesn't interfere with other bodies.
        World.remove(world, mConstraint);
      }

      // display the bird.
      bird.show();

      // display left part of the sling shot's handle.
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);

      // depending on the birds x position set sligshot boolean.
      if (birdX < width / 10) {
        slingShotRemoval = true;
      } else {
        slingShotRemoval = false;
      }

      // if mouse constraint is connected to bird and bird's x is less than width / 3 then add the mouse constraint else remove it.
      if (mConstraint.body && birdX < width / 3 && mConstraint.body.label === 'Bird') {
        World.add(world, mConstraint);
      } else {
        World.remove(world, mConstraint);
      }

      // display coin and the number of coins.
      image(coin, width / 100, width / 100, width / 20, width / 20);
      push();
      textSize(width / 25);
      fill(0);
      text(coinCounter, width / 12, width / 20);
      pop();
    }

    if (stateLevel === "level2") {
      if (currentLevel === 2) {
        // creating all the requred objects and pushing it to the objects array.

        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.5, height / 1.15, width / 15, width / 10, woodImg));
        objects.push(new Wood(width / 1.2, height / 1.15, width / 15, width / 10, woodImg));
        objects.push(new Wood(width / 1.333334, height / 1.4, width / 9.4, width / 20, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));

        objects.push(new Metal(width / 1.1, height / 1.26, width / 20, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.7, height / 1.26, width / 20, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.33333, height / 1.75, width / 2.7, width / 30, metalHorizontalImg));

        objects.push(new Pig(width / 1.33, height / 1.09, pigAndBirdSize));
        objects.push(new Pig(width / 1.2, height / 1.4, pigAndBirdSize));
        objects.push(new Pig(width / 1.5, height / 1.4, pigAndBirdSize));

        counter = 0;
        currentLevel = 0;
      }
      background(bkgImg);

      // display pause button.
      image(goBack, width / 1.1, width / 100, width / 15, width / 15);
      // checking if pause button is clicked.
      checkIfPauseIsClicked();

      // display right part of the sling shot's handle.
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);

      // display all of the objects except for pigs and glasses.
      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }

      // If the force applied on the pig 1's body is greater than 0 then remove the pig.
      if (objects[8].body.positionImpulse.y !== 0) {
        World.remove(world, objects[8].body);

        // play sound and add 100 coins.
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig1Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[8].show();
        gameEnd = false;
      }

      // If the force applied on the pig 2's body is greater than 0 then remove the pig.
      if (objects[9].body.positionImpulse.y !== 0) {
        World.remove(world, objects[9].body);

        // play sound and add 100 coins.
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[9].show();
        gameEnd = false;
      }

      // If the force applied on the pig 3's body is greater than 0 then remove the pig.
      if (objects[10].body.positionImpulse.y !== 0) {
        World.remove(world, objects[10].body);

        // play sound and add 100 coins.
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[10].show();
        gameEnd = false;
      }

      // if all three pigs are dead then go to the game end screen.
      if (counter === 3) {
        gameEnd = true;
      }

      // display the bird.
      bird.show();

      // display left part of the sling shot's handle.
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);

      // depending on the birds x position set sligshot boolean.
      if (birdX < 270) {
        slingShotRemoval = true;
      } else {
        slingShotRemoval = false;
      }

      // if mouse constraint is connected to bird and bird's x is less than width / 3 then add the mouse constraint else remove it.
      if (mConstraint.body && mConstraint.body.label === 'Bird') {
        World.add(world, mConstraint);
      } else {
        World.remove(world, mConstraint);
      }

      // display coin and the number of coins.
      image(coin, width / 100, width / 100, width / 20, width / 20);
      push();
      textSize(width / 25);
      fill(0);
      text(coinCounter, width / 12, width / 20);
      pop();
    }

    if (stateLevel === "level3") {
      if (currentLevel === 3) {
        // creating all the requred objects and pushing it to the objects array.

        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.52, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.25, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.38, height / 1.35, width / 11, 90, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));

        objects.push(new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.38, height / 1.7, width / 3.1, width / 40, metalHorizontalImg));

        objects.push(new Pig(width / 1.37, height - 40, pigAndBirdSize));
        objects.push(new Pig(width / 1.2, height / 1.33, pigAndBirdSize));
        objects.push(new Pig(width / 1.5, height / 1.33, pigAndBirdSize));

        objects.push(new Glass(width / 1.08, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg));
        objects.push(new Glass(width / 1.9, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg));
        objects.push(new Glass(width / 1.376, height / 1.8, width / 2.28, width / 40, glassHorizontalImg));

        glass1break = glass2break = glass3break = true;
        counter = 0;
        currentLevel = 0;
      }
      background(bkgImg);

      // display pause button.
      image(goBack, width / 1.1, width / 100, width / 15, width / 15);
      // checking if pause button is clicked.
      checkIfPauseIsClicked();

      // display right part of the sling shot's handle.
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);

      // display all of the objects except for pigs.
      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }

      // If the force applied on the pig 1's body is greater than 0 then remove the pig.
      if (objects[8].body.positionImpulse.y !== 0) {
        World.remove(world, objects[8].body);

        // play sound and add 100 coins.
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig1Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[8].show();
        gameEnd = false;
      }

      // If the force applied on the pig 2's body is greater than 0 then remove the pig.
      if (objects[9].body.positionImpulse.y !== 0) {
        World.remove(world, objects[9].body);

        // play sound and add 100 coins.
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[9].show();
        gameEnd = false;
      }

      // If the force applied on the pig 3's body is greater than 0 then remove the pig.
      if (objects[10].body.positionImpulse.y !== 0) {
        World.remove(world, objects[10].body);

        // play sound and add 100 coins.
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[10].show();
        gameEnd = false;
      }

      // if all three pigs are dead then go to the game end screen.
      if (counter === 3) {
        gameEnd = true;
      }

      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[11].body.speed > 1) {
        World.remove(world, objects[11].body);
        if (glass1break) {
          glassSound.play();
          glass1break = false;
        }
      }

      // if not show the glass
      else {
        objects[11].show();
      }

      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[12].body.speed > 1) {
        World.remove(world, objects[12].body);
        if (glass2break) {
          glassSound.play();
          glass2break = false;
        }
      }

      // if not show the glass
      else {
        objects[12].show();
      }

      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[13].body.speed > 1) {
        if (galss3Wait > 10) {
          World.remove(world, objects[13].body);
          if (glass3break) {
            glassSound.play();
            glass3break = false;
          }
        }
      }

      // if not show the glass
      else {
        objects[13].show();
      }
      galss3Wait++;

      // show the bird.
      bird.show();

      // display left part of the sling shot's handle.
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);

      // depending on the birds x position set sligshot boolean.
      if (birdX < 270) {
        slingShotRemoval = true;
      } else {
        slingShotRemoval = false;
      }

      // if mouse constraint is connected to bird and bird's x is less than width / 3 then add the mouse constraint else remove it.
      if (mConstraint.body && birdX < width / 3 && mConstraint.body.label === 'Bird') {
        World.add(world, mConstraint);
      } else {
        World.remove(world, mConstraint);
      }

      // display coin and the number of coins.
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

        // creating all the requred objects and pushing it to the objects array.
        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.52, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.25, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.38, height / 1.35, width / 11, 90, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));

        objects.push(new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.38, height / 1.7, width / 3.1, width / 40, metalHorizontalImg));

        objects.push(new Pig(width / 1.37, height - 40, pigAndBirdSize));
        objects.push(new Pig(width / 1.2, height / 1.33, pigAndBirdSize));
        objects.push(new Pig(width / 1.5, height / 1.33, pigAndBirdSize));


        objects.push(new TNT(width / 1.38, height / 2, width / 20, 90, tntImg));

        glass1break = glass2break = glass3break = true;
        counter = 0;
        currentLevel = 0;
      }
      background(bkgImg);

      // display pause button.
      image(goBack, width / 1.1, width / 100, width / 15, width / 15);
      // checking if pause button is clicked.
      checkIfPauseIsClicked();

      // display right part of the sling shot's handle.
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);



      // display all of the objects except for pigs.
      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }
      // If enough force applied on the tnt then remove it and apply explotion.
      if (objects[11].body.speed > 4.5 && tntDone) {
        objects[11].explosion();
        tntDone = false;
        World.remove(world, objects[11].body);
      }

      // if not show the tnt.
      if (tntDone) {
        objects[11].show();
      }

      // If the force applied on the pig 1's body is greater than 0 then remove the pig.
      if (objects[8].body.positionImpulse.y !== 0) {
        World.remove(world, objects[8].body);

        // play sound and add 100 coins.
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.play();
          minnionPig1Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[8].show();
        gameEnd = false;
      }

      // If the force applied on the pig 2's body is greater than 0 then remove the pig.
      if (objects[9].body.positionImpulse.y !== 0) {
        World.remove(world, objects[9].body);

        // play sound and add 100 coins.
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[9].show();
        gameEnd = false;
      }

      // If the force applied on the pig 3's body is greater than 0 then remove the pig.
      if (objects[10].body.positionImpulse.y !== 0) {
        World.remove(world, objects[10].body);

        // play sound and add 100 coins.
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[10].show();
        gameEnd = false;
      }

      // display the bird.
      bird.show();

      // display left part of the sling shot's handle.
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);

      // if all three pigs are dead then go to the game end screen.
      if (counter === 3) {
        gameEnd = true;
      }

      // depending on the birds x position set sligshot boolean.
      if (birdX < 270) {
        slingShotRemoval = true;
      } else {
        slingShotRemoval = false;
      }

      // if mouse constraint is connected to bird and bird's x is less than width / 3 then add the mouse constraint else remove it.
      if (mConstraint.body && mConstraint.body.label === 'Bird') {
        World.add(world, mConstraint);
      } else {
        World.remove(world, mConstraint);
      }

      // display coin and the number of coins.
      image(coin, width / 100, width / 100, width / 20, width / 20);
      push();
      textSize(width / 25);
      fill(0);
      text(coinCounter, width / 12, width / 20);
      pop();
    }

    if (stateLevel === "level5") {
      if (currentLevel === 5) {

        // creating all the requred objects and pushing it to the objects array.
        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.52, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.25, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.38, height / 1.35, width / 11, 90, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));

        objects.push(new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.395, height / 1.7, width / 3.1, width / 40, metalHorizontalImg));

        objects.push(new Glass(width / 1.08, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg));
        objects.push(new Glass(width / 1.9, height / 1.25, width / 25, height / 2.7 + width / 35, glassImg));
        objects.push(new Glass(width / 1.376, height / 1.8, width / 2.28, width / 40, glassHorizontalImg));
        objects.push(new Glass(width / 1.385, height / 2.5, width / 8.5, width / 50, glassHorizontalImg));
        objects.push(new Glass(width / 1.482, height / 2, width / 40, height / 7, glassImg));
        objects.push(new Glass(width / 1.3, height / 2, width / 40, height / 7, glassImg));

        objects.push(new Pig(width / 1.37, height - 40, pigAndBirdSize));
        objects.push(new Pig(width / 1.2, height / 1.33, pigAndBirdSize));
        objects.push(new Pig(width / 1.5, height / 1.33, pigAndBirdSize));

        objects.push(new TNT(width / 1.38, height / 2, width / 20, 90, tntImg));

        glass1break = glass2break = glass3break = true;
        counter = 0;
        currentLevel = 0;
      }
      background(bkgImg);

      // display pause button.
      image(goBack, width / 1.1, width / 100, width / 15, width / 15);
      // checking if pause button is clicked.
      checkIfPauseIsClicked();

      // display right part of the sling shot's handle.
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);

      // display all of the objects except for pigs and glasses.
      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }

      // If enough force applied on the tnt then remove it and apply explotion.
      if (objects[objects.length - 1].body.speed > 4.5 && tntDone) {
        objects[objects.length - 1].explosion();
        tntDone = false;
        World.remove(world, objects[objects.length - 1].body);
      }

      // if not show the tnt.
      if (tntDone) {
        objects[objects.length - 1].show();
      }


      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[8].body.speed > 1) {
        World.remove(world, objects[8].body);
        if (glass1break) {
          glassSound.play();
          glass1break = false;
        }
      }

      // if not show the glass
      else {
        objects[8].show();
      }

      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[9].body.speed > 1) {
        World.remove(world, objects[9].body);
        if (glass2break) {
          glassSound.play();
          glass2break = false;
        }
      }

      // if not show the glass
      else {
        objects[9].show();
      }

      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[10].body.speed > 1) {
        if (galss3Wait > 10) {
          World.remove(world, objects[10].body);
          if (glass3break) {
            glassSound.play();
            glass3break = false;
          }
        }
      }

      // if not show the glass
      else {
        objects[10].show();
      }

      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[11].body.speed > .5 && glassBreak > 10) {
        World.remove(world, objects[11].body);
        if (glass4break) {
          glassSound.play();
          glass4break = false;
        }
      }

      // if not show the glass
      else {
        objects[11].show();
      }
      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[12].body.speed > .5 && glassBreak > 10) {
        World.remove(world, objects[12].body);
        if (glass5break) {
          glassSound.play();
          glass5break = false;
        }
      }

      // if not show the glass
      else {
        objects[12].show();
      }

      // If the force applied on the glass body is greater than 1 then remove the glass.
      if (objects[13].body.speed > .5 && glassBreak > 10) {
        World.remove(world, objects[13].body);
        if (glass6break) {
          glassSound.play();
          glass6break = false;
        }
      }

      // if not show the glass
      else {
        objects[13].show();
      }

      galss3Wait++;
      glassBreak++;



      // If the force applied on the pig 1's body is greater than 0 then remove the pig. 
      if (objects[14].body.positionImpulse.y !== 0) {
        World.remove(world, objects[14].body);

        // play sound and add 100 coins.
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.play();
          minnionPig1Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[14].show();
        gameEnd = false;
      }

      // If the force applied on the pig 2's body is greater than 0 then remove the pig.
      if (objects[15].body.positionImpulse.y !== 0) {
        World.remove(world, objects[15].body);

        // play sound and add 100 coins.
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[15].show();
        gameEnd = false;
      }

      // If the force applied on the pig 3's body is greater than 0 then remove the pig.
      if (objects[16].body.positionImpulse.y !== 0) {
        World.remove(world, objects[16].body);

        // play sound and add 100 coins.
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }
      }

      // if not show the pig.
      else {
        objects[16].show();
        gameEnd = false;
      }


      // if all three pigs are dead then go to the game end screen.
      if (counter === 3) {
        gameEnd = true;
      }

      // show the bird.
      bird.show();

      // display left part of the sling shot's handle.
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);

      // depending on the birds x position set sligshot boolean.
      if (birdX < 270) {
        slingShotRemoval = true;
      } else {
        slingShotRemoval = false;
      }

      // if mouse constraint is connected to bird and bird's x is less than width / 3 then add the mouse constraint else remove it.
      if (mConstraint.body && birdX < width / 3 && mConstraint.body.label === 'Bird') {
        World.add(world, mConstraint);
      } else {
        World.remove(world, mConstraint);
      }

      // display coin and the number of coins.
      image(coin, width / 100, width / 100, width / 20, width / 20);
      push();
      textSize(width / 25);
      fill(0);
      text(coinCounter, width / 12, width / 20);
      pop();
    }

    // display a pop up window.
    if (gameEnd || pause || gameOver) {
      instructions = false;
      pauseClicked = false;

      // if pause is clicked then play sound.
      if (mouseIsPressed && pauseClicked) {
        clickSound.play();
      }

      // display all the buttons.
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

      // if close is clicked then close the window and play sound.
      if (pause) {
        if (collidePointCircle(mouseX, mouseY, width / 1.35, height / 3.8, buttonSize / 2) && mouseIsPressed) {
          pause = false;
          clickSound.play();
        }
      }

      // if levels is clicked then change state to levels.
      if (collidePointCircle(mouseX, mouseY, width / 2, height / 1.4, buttonSize - 5) && mouseIsPressed) {
        state = "level";
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false;
        clickSound.play();
      }

      // if the replay is pressed then reconstruct the level again.
      if (collidePointCircle(mouseX, mouseY, width / 3, height / 1.4, buttonSize - 5) && mouseIsPressed) {
        deleteObjects();
        currentLevel = int(stateLevel[5]);
        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false;
        clickSound.play();
      }

      // if next is clicked then go to next level.
      if (collidePointCircle(mouseX, mouseY, width / 1.5, height / 1.4, buttonSize - 5) && mouseIsPressed) {
        let temp = int(stateLevel[5]) + 1;
        if (temp < 6) {
          deleteObjects();
          minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
          stateLevel = "level" + temp;
          currentLevel = temp;
          pause = false;
          clickSound.play();
        }
      }

      // if game is won then write victory.
      if (gameEnd) {
        push();
        noStroke();
        textFont(font);
        textSize(width / 10);
        text("Victory !", width / 3, height / 2);
        pop();
        pause = false;
        gameOver = false;
      }

      // if gameover then write gameover.
      if (gameOver) {
        push();
        noStroke();
        textFont(font);
        textSize(width / 15);
        text("Game Over", width / 3, height / 2);
        pop();
        pause = false;
      }

      // if paused then write paused.
      if (pause) {
        push();
        noStroke();
        textFont(font);
        textSize(width / 15);
        text("Paused", width / 2.5, height / 2);
        pop();
      }
    }

    // if mouse is pressed then dont show instructions.
    else {
      pauseClicked = true;
      if (mouseIsPressed && instructionsDelay > 10) {
        instructions = false;
      }
    }

    // show the instructions.
    if (instructions) {
      push();
      noStroke();
      textFont(font);
      textSize(width / 25);
      instructionsDelay++;
      text("Click And Drag The Bird  Back To Shoot The Pig !", width / 8, height / 4);
      pop();
    }

    if (mouseX > width / 3 || birdX > width / 3) {
      World.remove(world, mConstraint);
    }
  }
}

function showSettings() {
  settingsSound = 0;

  // reposition volume sliders.
  volumeSlider.position(width / 1.7, height / 2.7);
  volumeSlider2.position(width / 1.7, height / 2.125);

  // show closing button and settings background.
  push();
  imageMode(CENTER)
  let buttonSize = (width + height) / 17;
  image(gameEndImg, width / 2, height / 2, width / 2, height / 2);
  image(closeImg, width / 1.35, height / 3.8, buttonSize / 2, buttonSize / 2);
  pop();

  // if close button is clicked then reposition the volume slider.
  if (collidePointCircle(mouseX, mouseY, width / 1.35, height / 3.8, buttonSize / 2)) {

    if (mouseIsPressed) {
      settingsTemp = false;
      clickSound.play();
      settings = false;
      volumeSlider.position(width / 2, -height / 2);
      volumeSlider2.position(width / 2, -height / 2);
    }
  }

  // if close is not clicked then set boolean.
  else {
    settings = true;
  }

  // add text for volume sliders.
  push();
  noStroke();
  textSize(width / 50);
  fill(0);
  text('Background Music Volume', width / 3.5, height / 2.5);
  text('SFX Volume', width / 3.5, height / 2);
  pop();
}

// if mouse is relesed then set bird fly boolean.
function mouseReleased() {
  if (birdX < width / 4) {
    birdFly = true;
  }
}

// if wood sound gets call backs then set wood boolean.
function woodsoundCallback() {
  woodSoundPlayed = true;
}

// if metal sound gets call backs then set metal boolean.
function metalsoundCallback() {
  metalSoundPlayed = true;
}

// if collisions event is called.
function collision(event) {

  // if instructions are done displaying.
  if (!instructions) {
    let pairs = event.pairs;
    let bodyB = pairs[0].bodyB.label;

    // play wood collide sound.
    if (bodyB === "Wood") {
      if (woodSoundPlayed) {
        woodSound.play();
        woodSoundPlayed = false;
      }
    }

    // play metal collide sound.
    if (bodyB === "Metal") {
      if (metalSoundPlayed) {
        metalSound.play();
        metalSoundPlayed = false;
      }
    }
  }
}

