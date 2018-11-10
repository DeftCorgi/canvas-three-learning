class Invader {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 2;
    this.color = '#F9C527';
  }

  update(direction, goalY) {
    this.move(direction, goalY);
    this.draw();
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
    this.color = '#C1292E';
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
