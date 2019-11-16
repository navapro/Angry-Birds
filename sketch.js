// State variable assignment.
// Navaneeth Krishna.
// 22- oct - 2019
// used the state variable for menu page and starting the game.
// Extra for Experts:
//  -used rotate and translate.
//  -used html to add gif image as background.
//  -used class.
//  -make the zombie kill the hero (AI).

let ground;
let bird;
let box;
let engine,world;

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Matter.Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height-10,width,20);
  box = new Box(width/2, height/2,100,175);
  bird = new Bird(width/6, height-200,50);
}

function draw() {
  background(0);
  Matter.Engine.update(engine);
  ground.show();
  box.show();
  bird.show();
}

