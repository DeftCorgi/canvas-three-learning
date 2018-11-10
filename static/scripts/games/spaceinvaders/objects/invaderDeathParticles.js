class InvaderDeathParticles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.dx = (Math.random() - 0.5) * 5;
    this.dy = -Math.random() * 5;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  draw() {
    ellipse(this.x, this.y, this.radius);
  }
}
