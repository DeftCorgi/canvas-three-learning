class InvaderDeathParticles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 5;
    this.dy = Math.random() * 5;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    draw();
  }

  draw() {
    ellipse(this.x, this.y);
  }
}
