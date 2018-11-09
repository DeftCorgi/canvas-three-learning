class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 9;
    this.radius = 12;
  }

  update(colliders = []) {
    // move up
    this.y -= this.speed;
    this.collisions(colliders);
    this.draw();
  }

  collisions(colliders) {
    colliders.map(c => {
      const d = dist(c.x, c.y, this.x, this.y);
      if (d < c.radius + this.radius) {
        c.hit();
      }
    });
  }

  draw() {
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
