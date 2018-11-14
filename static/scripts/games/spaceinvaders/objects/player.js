class Player {
  constructor(x, y, width, height, invaders) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.bullets = [];
    this.fireRate = 3;
    this.coolDown = false;
    this.invaders = invaders;
  }

  update() {
    if (!manager.paused) {
      this.controls();
    }
    this.draw();
    this.bullets.map((b, i) => {
      b.update(this.invaders);
      if (b.hit) this.bullets.splice(i, 1);
    });
  }

  controls() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      /* A */
      this.move(-1);
    }

    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      /* D */
      this.move(1);
    }

    if (keyIsDown(32)) {
      /* SPACE */
      this.shoot();
    }
  }

  shoot() {
    if (!this.coolDown) {
      const bullet = new Bullet(this.x, this.y + this.height / 2);
      this.bullets.push(bullet);

      this.coolDown = true;
      setTimeout(() => (this.coolDown = false), 1000 / this.fireRate);
    }
  }

  draw() {
    rectMode(CENTER);
    fill('#E6E8E6');
    rect(this.x, this.y, this.width, this.height);
  }

  move(dir) {
    this.x += dir * this.speed;
  }
}
