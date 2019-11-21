const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
let bkgImg;
let slingShotImgLeft,slingShotImgRight;
let slingShotBandFront,slingShotBandBack;

function preload() {
  dotImg = loadImage('assets/redBird.png');
  boxImg = loadImage('assets/wood.png');
  bkgImg = loadImage('images/skyBackground.png');
  slingShotImgLeft = loadImage('assets/slingshotLeft.png');
  slingShotImgRight = loadImage('assets/slingshotRight.png');
  slingShotBandBack = loadImage('assets/slingshotBackSling.png');
  slingShotBandFront = loadImage('assets/slingshotFrontSling.png');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(width/1.5, (height-200) - i * 75, 126, 150);
  }
  bird = new Bird(width/3.5, height/1.5, 40);

 
  slingshot = new SlingShot(width/3.5, height/1.5, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(width/3.5, height/1.5, 40);
    slingshot.attach(bird.body);
  }

}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

function draw() {
  background(bkgImg);
  image(slingShotImgRight,width/3.5 ,height/1.53,width/25,height/3);

  // image(slingShotBandBack,width/3.5 ,height/1.53,45,250);
  // image(slingShotBandFront,width/3.5 ,height/1.53,45,250);

  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  bird.show();
  image(slingShotImgLeft,width/4 ,height/1.555,width/25,height/3);
}