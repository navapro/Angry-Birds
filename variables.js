
// the following matter.js fuctions can be used without "matter.js" prefix.
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

// define all varialbles.
let ground;
let box1, box2, box3;
let bird;
let world, engine,mConstraint;
let slingshot;
let birdImg, boxImg, bkgImg, minnionPigImg, metalImg, metalHorizontalImg, woodHorizontalImg;
let slingShotImgLeft, slingShotImgRight;
let slingShotRemoval = false;
let birdX, birdY;
let collitionForce;
let state = "menu";
let play, coin, goBack;
let coinCounter = 0;
let menuClicked, pauseClicked,settingsSound = storeSound = 0, settingsTemp = settings  = false;
let levelBackground, levelBackgroundGlow ,levelList;
let levels = [];
let birds = [];
let levelClicked;
let levelWait = 0;
let stateLevel;
let metal1, metal2, metal3;
let level1 = level2 = level3 = false;
let glassImg, glassHorizontalImg;
let glass1, glass2, glass3;
let glass1break, glass2break, glass3break;
let galss3Wait;
let gameEnd = false;
let minnionPig, minnionPig2, minnionPig3;
let woodWidth;
let minnionPig1Die, minnionPig2Die, minnionPig3Die;
let gameEndImg, redo, goToLevels, next, closeImg, backImg,settingsImg, storeImg;
let counter;
let currentLevel= storeSound = instructionsDelay = 0;
let pause = false;
let backgroundMusic, clickSound,glassSound, pigDieSound, metalSound;
let birdImg1,birdImg2,birdImg3,birdImg4,birdImgList,birdImgID;
let volumeSlider,volumeSlider2;
let font;
let instructions =  true;
let pigAndBirdSize;
let birdFly = false;
let tnt1;
