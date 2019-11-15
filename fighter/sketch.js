// State variable assignment.
// Navaneeth Krishna.
// 22- oct - 2019
// used the state variable for menu page and starting the game.
// Extra for Experts:
//  -used rotate and translate.
//  -used html to add gif image as background.
//  -used class.
//  -make the zombie kill the hero (AI).

// Define all the variables.
let heroRunArray = [];
let heroAttackArray = [];
let zombieWalkArray = [];
let zombieDeadArray = [];
let run1, run2, run3, run4, run5, run6, run7, run8, run9, run10;
let attack0, attack1, attack2, attack3, attack4, attack5, attack6, attack7, attack8, attack9;
let zombie0,zombie1,zombie2,zombie3,zombie4,zombie5;
let zombieDead0,zombieDead1,zombieDead2,zombieDead3,zombieDead4,zombieDead5,zombieDead6,zombieDead7;
let fighter, fighterAttack;
let img;
let attack = false;
let heroX, heroY;
let zombieX,zombieY;
let attackCounter = 0;
let movingForward = false;
let movingBackwards = false;
let jumping = false;
let collide = false;
let zombieSpeed = 0.05;
let zombieDeathCounter = 0;
let heroFacing = 1;
let collideVariable;
let state = "menu";
let click;
let play;

// Preloading all the images on a different js file.
function preload() {
  loadHeroRun();
  loadHeroAttack();
  loadZombie1();
  loadZombie1Dead();
  play = loadImage("assets/play.png");
  img = loadImage("assets/bg3.gif");
}

// Create the canvas and set the size.
function setup() {
  createCanvas(windowWidth,windowHeight);

  // Place the images in arrays.
  heroRunArray = [run1, run2, run3, run4, run5, run6, run7, run8, run9, run10];
  heroAttackArray = [attack0, attack1, attack2, attack3, attack4, attack5, attack6, attack7, attack8, attack9];
  zombieWalkArray = [zombie0,zombie1,zombie2,zombie3,zombie4,zombie5];
  zombieDeadArray = [zombieDead0,zombieDead1,zombieDead2,zombieDead3,zombieDead4,zombieDead5,zombieDead6,zombieDead7];

  // place the image arrays and other information into classes to create charecters.
  fighter = new Run(heroRunArray, windowWidth / 4, windowHeight / 2, .4); 
  fighterAttack = new Attack(heroAttackArray, .2);
  zombie = new zombieRun(zombieWalkArray, windowWidth , windowHeight / 2, zombieSpeed);
  deadZombie = new ZombieDead (zombieDeadArray,0.15);
}

function draw() {

  // checking if the state is menu and if it is then displaying menu and checking play button is clicked.
  if (state === "menu") {
    showMenu();
    checkIfButtonClicked();
  }

  // if state is game then start the game.
else if (state === "game"){

  // setting the background image.
  background(img);

  // if the zombie is outside the screen reset it's position.
  if (zombieX <0){
    zombie.reset();
  }

  // if  the zombie and hero is coliding and hero is attacking then zombie is dead.
  if (collide === true && attack === true){

    // checking if all the images in the array is shown and then reset.
    if (zombieDeathCounter > 200) {
      zombie.reset();
    }

    // play the dead zombie image array and increase the counter to keep track of images shown.
    deadZombie.dead();
    zombieDeathCounter += 1
    
    // increase the zombie's speed and re drawing the zombie.
    zombieSpeed += .0002;
    zombie = new zombieRun(zombieWalkArray, windowWidth , windowHeight / 2, zombieSpeed);
  }

  // if  the zombie and hero is coliding and hero is not attacking then hero is dead and go back to menu page.
  if (collide === true && attack === false){

    // resetting the charecters position.
    fighter = new Run(heroRunArray, windowWidth / 4, windowHeight / 2, .4);
    zombie = new zombieRun(zombieWalkArray, windowWidth , windowHeight / 2, zombieSpeed);
    heroFacing = 1;

    state = "menu";
  }

  // if the charecters are not colliding then move the zombie forward.
  else {
    zombie.show();
    zombie.moveForward();
  }
  
  // if the hero is not attcking display the hero and move it according to the inputs.
  if (attack === false) {

    fighter.show();
    // if movingForward is true move the hero forward.
    if (movingForward) {
      fighter.moveForward();
    }
    // if movingBackward is true move the hero Backward.
    if (movingBackwards) {
      fighter.moveBackward();
    }

    // if jumping is true make the hero jump.
    if (jumping) {
      fighter.jump();
    }
  }

  // if attack is true play the attack animation.
  if (attack) {
    push();

    fighterAttack.hit();

    // increse the attack counter by one to keep track of the images shown.
    attackCounter += .1;

    // integrate gravity and oreant the hero acording to the direction that its facing.
    fighterAttack.gravity();
    scale(heroFacing, 1);

    pop();
  }

  // if attack counter is more than 5 set attack to false and attack counter to 0.
  if (attackCounter > 5) {
    attack = false;
    attackCounter = 0;
  }

  // gravity for the hero.
  fighter.gravity();
  collide = collideRectRect(heroX - collideVariable ,heroY,250,300,zombieX,zombieY,200,300);

}
}

// checking if key is pressed.
function keyPressed() {

  // if right space bar is pressed set attack to true.
  if (keyCode === 32) {
    attack = true;
  }

  // if right arrow key is pressed set movingForward to true.
  if (keyCode === 39) {
    movingForward = true;
  }
  
  // if left arrow key is pressed set movingBackward to true.
  if (keyCode === 37) {
    movingBackwards = true;
  }
  
  // if up arrow key is pressed set jumping to true.
  if (keyCode === 38) {
    jumping = true;
  }
}

// checking if key is released.
function keyReleased() {

  // if right arrow key is released set movingForward to false.
  if (keyCode === 39) {
    movingForward = false;
  }

  // if left arrow key is released set movingBackward to false.
  if (keyCode === 37) {
    movingBackwards = false;
  }

  // if up arrow key is released set jumping to false.
  if (keyCode === 38) {
    jumping = false;
  }
}

// show a play button image.
function showMenu() {
  image(play, width / 2.7, height / 2, 400,200);
}

// check if mouse is clicked and if the mouse pointer is inside the playbutton.
function checkIfButtonClicked() {

  if (mouseIsPressed) {
  click = collidePointRect(mouseX,mouseY,width/2.7, height/2, 400,200);

  // if the mouse pointer is inside the play button then switch the state to game.
  if(click === true){
    state = "game";
  }
}
}