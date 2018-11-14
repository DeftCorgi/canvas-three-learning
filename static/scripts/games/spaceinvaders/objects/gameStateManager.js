class GameStateManager {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.paused = true;
  }

  update() {
    this.draw();
  }

  draw() {
    // display menu if paused
    if (this.paused) {
      this.drawMenu();
    }
  }

  drawMenu() {
    textAlign(CENTER, CENTER);
    text('- Paused -', width / 2, height / 2);
  }
}

var manager = new GameStateManager();

function keyPressed() {
  if (keyCode === 80 || keyCode === ESCAPE) {
    manager.paused = !manager.paused;
  }
}
