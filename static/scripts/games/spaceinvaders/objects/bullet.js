class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 9;
    this.radius = 12;
  }

  update() {
    // move up
    this.y -= this.speed;

    this.draw();
  }

  draw() {
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
