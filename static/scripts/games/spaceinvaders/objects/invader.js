class Invader {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 2;
    this.colors = ['#C1292E', '#B96529', '#F9C527'];
    this.health = 2;
    this.numDeathParticles = 7;
    this.deathParticles = [];
    this.dead = false;
  }

  update(direction, goalY) {
    if (!manager.paused) {
      this.move(direction, goalY);
    }
    this.draw();
    this.deathParticles.map(p => p.update());
  }

  move(direction, goalY) {
    this.x += direction * this.speed;

    if (this.y < goalY) {
      this.y = goalY;
    }
  }

  touchingWall() {
    return this.x + this.radius / 2 >= width || this.x - this.radius / 2 <= 0;
  }

  // call this after registered hit
  hit() {
    manager.addScore(1);
    this.health -= 1;
    this.explode();
    if (this.health < 0) {
      this.dead = true;
    }
  }

  explode() {
    for (let i = 0; i < this.numDeathParticles; i++)
      this.deathParticles.push(new InvaderDeathParticles(this.x, this.y));
  }

  draw() {
    fill(this.colors[this.health] || '#C1292E');
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
