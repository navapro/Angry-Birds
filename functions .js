// display the main menu.
function showMenu() {
  push();
  imageMode(CENTER)
  image(play, width / 2, height / 2, width / 6, width / 6.1);
  pop();

  image(settingsImg, width / 1.1, width / 100, width / 15, width / 15);

  // check if settings is clicked and play the sound.

  if (!settingsTemp && mouseIsPressed && collidePointCircle(mouseX, mouseY, width / 1.059, width / 24, width / 15)) {
    settingsTemp = true;
    settingsSound++;
  }
  if (settingsSound === 1) {
    clickSound.play();
  }

  // show settings.
  if (settingsTemp) {
    showSettings();
  }

  // dispaly the store icon.
  push();
  imageMode(CENTER);
  image(storeImg, width / 1.059, height / 1.1, width / 15, width / 15);
  pop();
}

// check if mouse is clicked and if the mouse pointer is inside the playbutton.
function checkIfButtonClicked() {

  // if the mouse pointer is inside the play button then switch the state to level.
  if (mouseIsPressed && collidePointCircle(mouseX, mouseY, width / 2, height / 2, width / 6)) {
    state = "level";
    clickSound.play();
  }

  // check if store is clicked if it is then change state to store.
  if (mouseIsPressed && collidePointCircle(mouseX, mouseY, width / 1.059, height / 1.1, width / 15)) {
    storeSound++;
    if (storeSound === 1) {
      clickSound.play();
    }
    state = 'store';
  }
}

function checkIfPauseIsClicked() {

  // if pause button is clicked then pause the game and show the menu.
  if (mouseIsPressed && collidePointCircle(mouseX, mouseY, width / 1.059, width / 24, width / 15)) {
    pause = true;

  }
}
