class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.draw();
  }
  draw() {
    ellipse(this.x, this.y, 30, 30);
  }
}
