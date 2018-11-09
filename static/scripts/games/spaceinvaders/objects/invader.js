class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;
    this.speed = 1;
    this.hit = false;
  }

  update(direction, goalY, flipDirection, extendGoal) {
    this.move(direction, goalY, flipDirection, extendGoal);
    this.draw();
  }

  move(direction, goalY, flipDirection, extendGoal) {
    if (this.x + this.radius / 2 >= width || this.x - this.radius / 2 <= 0) {
      console.log(direction);
      this.x += -direction * this.speed;

      // callbacks to update invader goals
      flipDirection();
      extendGoal();
    } else {
      this.x += direction * this.speed;
    }

    if (this.y < goalY) {
      this.y = goalY;
    }
  }

  // call this after registered hit
  hit() {}

  draw() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
