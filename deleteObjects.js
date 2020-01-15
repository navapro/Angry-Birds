function deleteObjects(){
   instructions = true;
   tntDone= true;
   instructionsDelay = birdCounterWait = glassBreak = 0;
   birdCounter =3;
   gameOver = false;
   glass4break= glass5break= glass6break= true;
   
    
   for (let i = 0; i < objects.length; i++) {
     if (objects[i].body){

       World.remove(world, objects[i].body);
     }
    objects[i].delete();
  }

objects = [];
    
  if (bird){
    bird.delete();
    bird = null;
  }


    if (metal1) {
      metal1.delete();
      metal1 = null;
      metal2.delete();
      metal2 = null;
      metal3.delete();
      metal3 = null;
    }
    if (glass1) {
      glass1.delete();
      glass1 = null;
      glass2.delete();
      glass2 = null;
      glass3.delete();
      glass3 = null;

    }
    if (glass4) {
      glass4.delete();
      glass4 = null;
      glass5.delete();
      glass5 = null;
      glass6.delete();
      glass6 = null;

    }
    if (tnt1) {
      tnt1.delete();
      tnt1 = null;
    }
  }
