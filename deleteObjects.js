function deleteObjects() {

  instructions = true;
  tntDone = true;
  instructionsDelay = birdCounterWait = glassBreak = 0;
  birdCounter = 3;
  gameOver = false;
  glass1break = glass2break = glass3break = glass4break = glass5break = glass6break = true;


  for (let i = 0; i < objects.length; i++) {
    if (objects[i].body) {

      World.remove(world, objects[i].body);
    }
    objects[i].delete();
  }

  objects = [];
if (bird){
bird.delete();
}
}
