class GameStateManager {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.paused = true;
  }

  update() {
    this.draw();
  }

  draw() {}
}

var manager = new GameStateManager();
