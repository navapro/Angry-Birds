function deleteObjects(){
  
     if (ground) {
    ground.delete()
    ground = null;

    box1.delete();
    box1 = null;
    box2.delete();
    box2 = null;

    box3.delete();
    box3 = null;

    bird.delete();
    bird = null;
    slingshot.delete();
    slingshot = null;
    World.remove(world, minnionPig.body);


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
    console.log('yaayay');
  }
}