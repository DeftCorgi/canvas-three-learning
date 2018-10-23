const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// useful constants
const NUM_CIRCLES = 20;
const MAX_RADIUS = 50;
const MAX_VELOCITY = 5;
const COLORS = ['#5C70B9', '#4C6290', '#5C9DBA', '#6DA2C5', '#7A92CE'];
const CURSOR_INTERACT_RADIUS = 70;
const CURSOR_ATTRACTION = 2;
const GRAVITY = 0.5;

const mouse = {
  x: null,
  y: null
};

// Event listeners
window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// reset screen on left click
window.addEventListener('mousedown', e => {
  init();
});

// resize canvas when window gets resized
window.addEventListener('resize', e => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// circle class
class Circle {
  constructor() {
    this.dx = (Math.random() - 0.5) * MAX_VELOCITY;
    this.dy = (Math.random() - 0.5) * MAX_VELOCITY;
    this.startRadius = Math.random() * MAX_RADIUS;
    this.radius = this.startRadius;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
    this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius;
    this.friction = 0.95;
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
      this.dy = -this.dy * this.friction;
      this.dx = this.dx * 0.95;
    } else {
      // gravity
      this.dy += GRAVITY;
    }

    // interactivity
    // if within boundaries of cursor
    if (
      this.x > mouse.x - this.radius - CURSOR_INTERACT_RADIUS &&
      this.x < mouse.x + this.radius + CURSOR_INTERACT_RADIUS &&
      this.y > mouse.y - this.radius - CURSOR_INTERACT_RADIUS &&
      this.y < mouse.y + this.radius + CURSOR_INTERACT_RADIUS &&
      this.radius < this.startRadius * 5
    ) {
      // make circles gravitate to cursor
      if (this.x < mouse.x) this.dx += CURSOR_ATTRACTION;
      if (this.x > mouse.x) this.dx -= CURSOR_ATTRACTION;
      if (this.y < mouse.y) this.dy += CURSOR_ATTRACTION;
      if (this.y > mouse.y) this.dy -= CURSOR_ATTRACTION;
    }
    // if NOT in boundaries of cursor and radius larger than original
    else if (this.radius > this.startRadius) {
      // grow circle to original size
      this.radius -= 1;
    }

    // update position based on velocity
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// circles array
let circles = [];
init = () => {
  const initCircles = [];
  for (let i = 0; i < NUM_CIRCLES; i++) {
    initCircles.push(new Circle());
  }
  circles = initCircles;
};

// animation loop
animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  // draw all circles
  circles.map(circle => circle.update());
};

init();
animate();
