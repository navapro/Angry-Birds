// Image slider with zoom.
// Navaneeth Krishna
// 23 September 2019
// Extra for Experts:
// - Used mouse wheel as an input to zoom in and out of the image.
// - Used windowResized() to adapt the code if the user resized the window.
// - Added sound to the project.

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

  if (state === "menu") {
    levelWait = 0;

    background(bkgImg);
    if (!settings) {
      showMenu();
      checkIfButtonClicked();
    }

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





  }



  if (state === "store") {
    for (let i = 0; i < 4; i++) {
      birds[i] = new StoreBird(width / 5 + i * width / 5, height / 2, width / 8, width / 8, i);
    }
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
    for (let i = 0; i < 5; i++) {
      levels[i] = new Levels(width / 6 + i * width / 7, height / 2, width / 13, width / 13, i + 1);
    }
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


    deleteObjects();
    push();
    imageMode(CENTER);
    image(backImg, width / 15, height / 10, width / 15, width / 15);
    pop();

  }
  else if (state === "game") {

    woodSound.onended(woodsoundCallback);
    metalSound.onended(metalsoundCallback);

    if (birdFly) {
      if (birdX > width / 3.5) {
        birdFly = false;
        objects[4].fly();
      }
    }
    if (bird) {
      if (birdCounter > 2 && birdX > windowWidth || birdCounter > 1 && birdX < 0) {
        if (birdCounterWait > 60) {
          birdCounter--;
        }
        birdCounterWait++;
      }
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


      checkIfPauseIsClicked();

      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);



      if (objects[5].body.positionImpulse.y !== 0) {
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

      for (let i = 0; i < 5; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }

      bird.show();
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);

      if (birdX < width / 10) {
        slingShotRemoval = true;
      }
      else {
        slingShotRemoval = false;
      }

      if (mConstraint.body && birdX < width / 3 && mConstraint.body.label === 'Bird') {
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
      if (currentLevel === 2) {

        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.5, height / 1.15, width / 15, width / 10, woodImg));
        objects.push(new Wood(width / 1.2, height / 1.15, width / 15, width / 10, woodImg));
        objects.push(new Wood(width / 1.333334, height / 1.4, width / 9.4, width / 20, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));

        objects.push(new Metal(width / 1.1, height / 1.26, width / 20, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.7, height / 1.26, width / 20, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.333333, height / 1.75, width / 2.7, width / 30, metalHorizontalImg));

        objects.push(new Pig(width / 1.33, height / 1.09, pigAndBirdSize));
        objects.push(new Pig(width / 1.2, height / 1.4, pigAndBirdSize));
        objects.push(new Pig(width / 1.5, height / 1.4, pigAndBirdSize));

        counter = 0;
        currentLevel = 0;
      }


      checkIfPauseIsClicked();

      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);

      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }

      if (objects[8].body.positionImpulse.y !== 0) {
        World.remove(world, objects[8].body);
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig1Die = false;
        }

      }
      else {
        objects[8].show();
        gameEnd = false;
      }
      if (objects[9].body.positionImpulse.y !== 0) {
        World.remove(world, objects[9].body);
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }

      } else {
        objects[9].show();
        gameEnd = false;
      }
      if (objects[10].body.positionImpulse.y !== 0) {
        World.remove(world, objects[10].body);
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }
      } else {
        objects[10].show();
        gameEnd = false;
      }

      if (counter === 3) {
        gameEnd = true;
      }

      bird.show();
      image(slingShotImgLeft, width / 4, height / 1.56, width / 25, height / 3);


      if (birdX < 270) {
        slingShotRemoval = true;
      } else {
        slingShotRemoval = false;
      }
      if (mConstraint.body) {

        if (mConstraint.body.label === 'Bird') {
          World.add(world, mConstraint);
        } else {

          World.remove(world, mConstraint);

        }


      } else {

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
        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.52, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.25, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.38, height / 1.35, width / 11, 90, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));

        objects.push(new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.395, height / 1.7, width / 3.1, width / 40, metalHorizontalImg));

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


      checkIfPauseIsClicked();

      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);

      if (objects[8].body.positionImpulse.y !== 0) {
        World.remove(world, objects[8].body);
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig1Die = false;
        }

      } else {
        objects[8].show();
        gameEnd = false;
      }
      if (objects[9].body.positionImpulse.y !== 0) {
        World.remove(world, objects[9].body);
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }

      } else {
        objects[9].show();
        gameEnd = false;
      }
      if (objects[10].body.positionImpulse.y !== 0) {
        World.remove(world, objects[10].body);
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }
      } else {
        objects[10].show();
        gameEnd = false;
      }

      if (objects[11].body.speed > 1) {
        World.remove(world, objects[11].body);
        if (glass1break) {
          glassSound.play();
          glass1break = false;
        }
      } else {
        objects[11].show();
      }
      if (objects[12].body.speed > 1) {
        World.remove(world, objects[12].body);
        if (glass2break) {
          glassSound.play();
          glass2break = false;
        }
      }
      else {
        objects[12].show();
      }
      if (objects[13].body.speed > 1) {
        if (galss3Wait > 10) {
          World.remove(world, objects[13].body);
          if (glass3break) {
            glassSound.play();
            glass3break = false;
          }
        }
      } else {
        objects[13].show();
      }
      galss3Wait++;

      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }



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

      if (mConstraint.body) {

        if (mConstraint.body.label === 'Bird') {
          World.add(world, mConstraint);
        } else {
          World.remove(world, mConstraint);
        }
      } else {
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

        bird = new Bird(width / 3.5, height / 1.5, pigAndBirdSize);

        objects.push(new Ground(width / 2, height - 10, width, 20));
        objects.push(new Wood(width / 1.52, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.25, height / 1.1, 120, 150, woodImg));
        objects.push(new Wood(width / 1.38, height / 1.35, width / 11, 90, woodImg));
        objects.push(new SlingShot(width / 3.5, height / 1.5, bird.body));

        objects.push(new Metal(width / 1.15, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.75, (height - 40), width / 25, height / 2.7, metalImg));
        objects.push(new Metal(width / 1.395, height / 1.7, width / 3.1, width / 40, metalHorizontalImg));

        objects.push(new Pig(width / 1.37, height - 40, pigAndBirdSize));
        objects.push(new Pig(width / 1.2, height / 1.33, pigAndBirdSize));
        objects.push(new Pig(width / 1.5, height / 1.33, pigAndBirdSize));


        objects.push(new TNT(width / 1.38, height / 2, width / 20, 90, tntImg));

        glass1break = glass2break = glass3break = true;
        counter = 0;

        currentLevel = 0;

      }




      checkIfPauseIsClicked();



      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);




      if (objects[11].body.speed > 4.5 && tntDone) {
        objects[11].explosion();
        tntDone = false;
        World.remove(world, objects[11].body);

      }

      if (tntDone) {
        objects[11].show();
      }




      if (objects[8].body.positionImpulse.y !== 0) {
        World.remove(world, objects[8].body);
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;

          pigDieSound.play();
          minnionPig1Die = false;
        }

      }
      else {
        objects[8].show();
        gameEnd = false;
      }
      if (objects[9].body.positionImpulse.y !== 0) {
        World.remove(world, objects[9].body);
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }

      }
      else {
        objects[9].show();
        gameEnd = false;
      }
      if (objects[10].body.positionImpulse.y !== 0) {
        World.remove(world, objects[10].body);
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }

      }
      else {
        objects[10].show();
        gameEnd = false;
      }

      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }
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
      if (mConstraint.body) {

        if (mConstraint.body.label === 'Bird') {
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


      checkIfPauseIsClicked();



      background(bkgImg);
      image(slingShotImgRight, width / 3.5, height / 1.53, width / 25, height / 3);


      if (objects[objects.length - 1].body.speed > 4.5 && tntDone) {
        objects[objects.length - 1].explosion();
        tntDone = false;
        World.remove(world, objects[objects.length - 1].body);

      }

      if (tntDone) {
        objects[objects.length - 1].show();
      }



      if (objects[8].body.speed > .5) {
        World.remove(world, objects[8].body);
        if (glass1break) {
          glassSound.play();
          glass1break = false;
        }
      }
      else {
        objects[8].show();
      }
      if (objects[9].body.speed > 1) {
        World.remove(world, objects[9].body);
        if (glass2break) {
          glassSound.play();
          glass2break = false;
        }

      }
      else {
        objects[9].show();
      }
      if (objects[10].body.speed > 1) {
        if (galss3Wait > 10) {
          World.remove(world, objects[10].body);
          if (glass3break) {
            glassSound.play();
            glass3break = false;
          }
        }


      }
      else {

        objects[10].show();
      }





      if (objects[11].body.speed > .5 && glassBreak > 10) {
        World.remove(world, objects[11].body);
        if (glass4break) {
          glassSound.play();
          glass4break = false;
        }
      }

      else {
        objects[11].show();
      }
      if (objects[12].body.speed > .5 && glassBreak > 10) {
        World.remove(world, objects[12].body);
        if (glass5break) {
          glassSound.play();
          glass5break = false;
        }
      }
      else {
        objects[12].show();
      }
      if (objects[13].body.speed > .5 && glassBreak > 10) {
        World.remove(world, objects[13].body);
        if (glass6break) {
          glassSound.play();
          glass6break = false;
        }
      }
      else {
        objects[13].show();
      }

      galss3Wait++;
      glassBreak++;




      if (objects[14].body.positionImpulse.y !== 0) {
        World.remove(world, objects[14].body);
        if (minnionPig1Die) {
          coinCounter += 100;
          counter++;

          pigDieSound.play();
          minnionPig1Die = false;
        }

      }
      else {
        objects[14].show();
        gameEnd = false;
      }
      if (objects[15].body.positionImpulse.y !== 0) {
        World.remove(world, objects[15].body);
        if (minnionPig2Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig2Die = false;
        }

      }
      else {
        objects[15].show();
        gameEnd = false;
      }
      if (objects[16].body.positionImpulse.y !== 0) {
        World.remove(world, objects[16].body);
        if (minnionPig3Die) {
          coinCounter += 100;
          counter++;
          pigDieSound.setVolume(.5);
          pigDieSound.play();
          minnionPig3Die = false;
        }

      }
      else {
        objects[16].show();
        gameEnd = false;
      }



      for (let i = 0; i < 8; i++) {
        objects[i].show();
        World.remove(world, mConstraint);
      }
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
      if (mConstraint.body) {

        if (mConstraint.body.label === 'Bird') {
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

        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false;
        clickSound.play();
      }
      if (collidePointCircle(mouseX, mouseY, width / 3, height / 1.4, buttonSize - 5) && mouseIsPressed) {

        deleteObjects();
        currentLevel = int(stateLevel[5]);

        minnionPig1Die = minnionPig2Die = minnionPig3Die = true;
        pause = false;
        clickSound.play();
      }
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
      if (gameOver) {
        push();
        noStroke();
        textFont(font);
        textSize(width / 15);

        text("Game Over", width / 3, height / 2);

        pop();
        pause = false;
      }
      if (pause) {
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
      if (mouseIsPressed && instructionsDelay > 10) {
        instructions = false;
      }
    }

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



  if (birdX < width / 4) {

    birdFly = true;

  }

}

function woodsoundCallback() {
  woodSoundPlayed = true;
}
function metalsoundCallback() {
  metalSoundPlayed = true;
}
function collision(event) {
  if (!instructions) {
    let pairs = event.pairs;

    let bodyB = pairs[0].bodyB.label;

    if (bodyB === "Wood") {

      if (woodSoundPlayed) {
        woodSound.play();
        woodSoundPlayed = false;
      }

    }
    if (bodyB === "Metal") {
      if (metalSoundPlayed) {
        metalSound.play();
        metalSoundPlayed = false;
      }
    }
  }
}

