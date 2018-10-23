const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// useful constants
const NUM_CIRCLES = 5;
const MAX_RADIUS = 200;
const MAX_VELOCITY = 5;
const COLORS = ['#5C70B9', '#4C6290', '#5C9DBA', '#6DA2C5', '#7A92CE'];
const CURSOR_INTERACT_RADIUS = 70;
const CURSOR_ATTRACTION = 2;
const GRAVITY = 0.5;
const CIRCLE_RADIUS = 100;

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

// caculate pythoagorean distance between 2 points
const distance = (x1, x2, y1, y2) => {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

// circle class
class Circle {
  constructor() {
    this.dx = (Math.random() - 0.5) * MAX_VELOCITY;
    this.dy = (Math.random() - 0.5) * MAX_VELOCITY;
    this.startRadius = Math.random() * MAX_RADIUS;
    this.radius = CIRCLE_RADIUS;
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
    // c.fill();
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
      // this.dy += GRAVITY;
    }

    // interactivity

    // update position based on velocity
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// circles array
let circles = [];
init = () => {
  const initCircles = [new Circle()];
  for (let i = 0; i < NUM_CIRCLES - 1; i++) {
    let newCircle = new Circle();
    let intersect;
    // check with all circles if new one intersects
    do {
      intersect = false;
      initCircles.map(c => {
        // console.log(distance(newCircle.x, c.x, newCircle.y, c.y));
        if (distance(newCircle.x, c.x, newCircle.y, c.y) < CIRCLE_RADIUS * 2) {
          intersect = true;
          newCircle.x =
            Math.random() * (innerWidth - newCircle.radius * 2) +
            newCircle.radius;
          newCircle.y =
            Math.random() * (innerHeight - newCircle.radius * 2) +
            newCircle.radius;
        }
      });
    } while (intersect);
    if (!intersect) initCircles.push(newCircle);
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
