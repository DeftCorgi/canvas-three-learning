const objects = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  const ball = new Ball(20, 20);
  objects.push(ball);
}

function draw() {
  // objects.map(o => o.update());
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
  }

  update() {
    draw();
  }

  draw() {
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
