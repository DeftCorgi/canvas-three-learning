class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.bullets = [];
  }

  update() {
    this.controls();
    this.draw();
    this.bullets.map(b => b.update());
  }

  controls() {
    if (keyIsDown(65)) {
      /* A */
      this.move(-1);
    }

    if (keyIsDown(68)) {
      /* D */
      this.move(1);
    }

    if (keyIsDown(32)) {
      /* SPACE */
      this.shoot();
    }
  }

  shoot() {
    const bullet = new Bullet(this.x, this.y + this.height / 2);
    this.bullets.push(bullet);
  }

  draw() {
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  move(dir) {
    this.x += dir * this.speed;
  }
}
