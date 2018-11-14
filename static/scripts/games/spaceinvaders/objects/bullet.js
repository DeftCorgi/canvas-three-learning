class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 9;
    this.radius = 12;
    this.hit = false;
  }

  update(colliders = []) {
    if (!manager.paused) {
      // move up
      this.y -= this.speed;
      this.collisions(colliders);
    }
    this.draw();
  }

  collisions(colliders) {
    colliders.map(c => {
      const d = dist(c.x, c.y, this.x, this.y);
      if (d < c.radius / 2 + this.radius / 2) {
        this.hit = true;
        c.hit();
      }
    });
  }

  draw() {
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
