class GameStateManager {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.paused = false;
    this.started = false;
  }

  update() {
    this.draw();
  }

  draw() {
    // display menu if paused
    if (!this.started) {
      this.drawMenu();
    } else {
      if (this.paused) {
        this.drawPause();
      }
      this.drawScore();
    }
  }

  drawPause() {
    textSize(48);
    textAlign(CENTER, CENTER);
    fill('white');
    //title
    text('- Paused -', width / 2, height / 2);
  }

  drawMenu() {
    textSize(68);
    textAlign(CENTER, CENTER);
    fill('white');
    //title
    text('SPACE INVADERS', width / 2, height / 2 - 80);

    // prompt
    textSize(28);
    text('use Arrow keys or WASD to move', width / 2, height / 2);
    text('spacebar to shoot', width / 2, height / 2 + 30);
    textSize(48);
    text('- click to start -', width / 2, height / 2 + 90);
  }

  drawScore() {
    textSize(28);
    textAlign(LEFT, BOTTOM);
    fill('white');
    //title
    text('Score: ' + this.score, 0, height);
  }

  addScore(score) {
    this.score += score;
  }
}

var manager = new GameStateManager();

function keyPressed() {
  if (keyCode === 80 || keyCode === ESCAPE) {
    manager.paused = !manager.paused;
  }
}

function mousePressed() {
  if (!manager.started) {
    manager.started = true;
  }
}
