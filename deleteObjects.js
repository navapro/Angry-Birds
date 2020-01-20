function deleteObjects() {

  // setting variable values.
  instructions = true;
  tntDone = true;
  gameOver = false;
  glass1break = glass2break = glass3break = glass4break = glass5break = glass6break = true;

  // setting delay variabeles.
  instructionsDelay = birdCounterWait = glassBreak = 0;

  // reset the number of birds to 3.
  birdCounter = 3;


  // looping through the objects array and deleting all the bodies.
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].body) {
      World.remove(world, objects[i].body);
    }
    objects[i].delete();
  }

  // setting the object array to empty.
  objects = [];
  // deleting the bird body.
  if (bird) {
    bird.delete();
  }
}
