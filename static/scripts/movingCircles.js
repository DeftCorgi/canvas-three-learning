const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// useful constants
const NUM_CIRCLES = 150;
const MAX_RADIUS = 50;
const MAX_VELOCITY = 10;
const COLORS = ['#5C70B9', '#4C6290', '#5C9DBA', '#6DA2C5', '#7A92CE'];

class Circle {
  constructor() {
    this.dx = (Math.random() - 0.5) * MAX_VELOCITY;
    this.dy = (Math.random() - 0.5) * MAX_VELOCITY;
    this.radius = Math.random() * MAX_RADIUS;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
    this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius;
  }

  draw() {
    // render the circle
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
  }

  update() {
    // bounce at edges
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // update position based on velocity
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// random circles

// circles array
const circles = [];
for (let i = 0; i < NUM_CIRCLES; i++) {
  circles.push(new Circle());
}

animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  // draw all circles
  circles.map(circle => circle.update());
};

animate();
