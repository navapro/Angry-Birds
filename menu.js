function showMenu() {
    image(play, width / 2.7, height / 2, width / 5,height /4.5);
  }
  
  // check if mouse is clicked and if the mouse pointer is inside the playbutton.
  function checkIfButtonClicked() {
  
    if (mouseIsPressed) {
    click = collidePointRect(mouseX,mouseY,width/2.7, height/2,  width / 5,height /4.5);
  
    // if the mouse pointer is inside the play button then switch the state to game.
    if(click === true){
      state = "level";
    }
  }

  }
  function checkIfMenuIsClicked(){
    if (mouseIsPressed) {
    menuClicked = collidePointCircle(mouseX,mouseY,width / 1.059,  width / 24, width / 15)
  
    }
    else{
      menuClicked = false;
    }
    if (menuClicked){
      World.add(world, minnionPig.body);
      state = "menu";
    }
    else{
      state = "game";
    }
  }
  