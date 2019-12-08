
// the following matter.js fuctions can be used without "matter.js" prefix.
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

// define all varialbles.
let ground;
let box1,box2,box3;
let bird;
let world, engine;
let mConstraint;
let slingshot;
let birdImg, boxImg, bkgImg, minnionPigImg;
let slingShotImgLeft, slingShotImgRight;
let slingShotBandFront, slingShotBandBack;
let minnionPig;
let slingShotRemoval = false;
let birdX, birdY;
let collitionForce;
let state = "menu";
let play;
let coin;
let coinCounter = 0;
let goBack;
let killPoint;
let menuClicked;
let levelBackground;
let levelList;
let levels = [];
let levelClicked;
let levelWait = 0;
let stateLevel;
let box21,box22,box23;