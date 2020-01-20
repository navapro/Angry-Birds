
// the following matter.js fuctions can be used without "matter.js" prefix.
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

// define all varialbles.
let objects =[];
let world, engine,mConstraint;
let bird;
let birdImg, boxImg, bkgImg, minnionPigImg, metalImg, metalHorizontalImg, woodHorizontalImg;
let slingShotImgLeft, slingShotImgRight;
let slingShotRemoval = false;
let birdX, birdY;
let state = "menu";
let play, coin, goBack;
let coinCounter = 0;
let menuClicked, pauseClicked,settingsSound = storeSound = 0, settingsTemp = settings  = false;
let levelBackground, levelBackgroundGlow ,levelList;
let levels = [];
let birds = [];
let levelClicked;
let levelWait  = glassBreak = 0;
let stateLevel;
let glassImg, glassHorizontalImg;
let glass1break, glass2break, glass3break,glass4break, glass5break, glass6break;
let galss3Wait;
let gameEnd = false;
let woodWidth;
let minnionPig1Die, minnionPig2Die, minnionPig3Die;
let gameEndImg, redo, goToLevels, next, closeImg, backImg,settingsImg, storeImg;
let counter;
let currentLevel= storeSound = instructionsDelay = birdCounterWait = 0;
let pause = false;
let backgroundMusic, clickSound,glassSound, pigDieSound, metalSound, woodSound;
let birdImg1,birdImg2,birdImg3,birdImg4,birdImgList,birdImgID;
let volumeSlider,volumeSlider2;
let font;
let instructions =  true;
let pigAndBirdSize;
let birdFly = gameOver = false;
let tnt1,tntImg,tntDone,tntEffect;
let birdCounter, birdFlying;
let woodSoundPlayed= metalSoundPlayed =true;
let clicked = false;