// display the main menu.
function showMenu() {
  push();
  imageMode(CENTER)
  image(play, width / 2, height / 2, width / 6, width / 6.1);
  pop();
}

// check if mouse is clicked and if the mouse pointer is inside the playbutton.
function checkIfButtonClicked() {
  if (mouseIsPressed) {
    click = collidePointCircle(mouseX, mouseY, width / 2, height / 2, width / 6);

    // if the mouse pointer is inside the play button then switch the state to level.
    if (click === true) {
      state = "level";
      clickSound.play();
    }
  }
}

function checkIfPauseIsClicked() {

  // if pause button is clicked then pause the game and show the menu.
  if (mouseIsPressed && collidePointCircle(mouseX, mouseY, width / 1.059, width / 24, width / 15)) {
    pause = true;

  }
}
