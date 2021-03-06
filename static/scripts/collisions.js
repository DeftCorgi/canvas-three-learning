const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// useful constants
const CIRCLE_RADIUS = 20;
const MAX_VELOCITY = 2.7;
const COLORS = [
  { r: 55, g: 175, b: 204 },
  { r: 242, g: 192, b: 120 },
  { r: 219, g: 89, b: 105 },
  { r: 193, g: 219, b: 179 },
  { r: 126, g: 188, b: 137 }
];
const CURSOR_RADIUS = 200;
const GRAVITY = 0.5;

const ALPHA_SHIFT = 0.012;

const mouse = {
  x: null,
  y: null
};

// helpers
const randomIntFromRange = (min, max) => {
  return Math.random() * (max - min) + min;
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
  init();
});

// rotates our velocity based on an angle
const rotate = (velocity, angle) => {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
};

// resolves the collision between 2 circles
const resolveCollision = (circle1, circle2) => {
  const xVelocityDiff = circle2.velocity.x - circle1.velocity.x;
  const yVelocityDiff = circle2.velocity.y - circle1.velocity.y;

  const xDistance = circle2.x - circle1.x;
  const yDistance = circle2.y - circle1.y;

  if (xVelocityDiff * xDistance + yVelocityDiff * yDistance <= 0) {
    const m1 = circle1.mass;
    const m2 = circle2.mass;

    // arc tangent of
    const angle = -Math.atan2(circle2.y - circle1.y, circle2.x - circle1.x);

    // velcotiy before equation
    const u1 = rotate(circle1.velocity, angle);
    const u2 = rotate(circle2.velocity, angle);
    // console.log(u1);

    // velocity after 1D collision equation
    const x1 = (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2);
    const x2 = (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2);

    const v1 = { x: x1, y: u1.y };
    const v2 = { x: x2, y: u2.y };

    // rotate back to atan proper angle
    const finalV1 = rotate(v1, -angle);
    const finalV2 = rotate(v2, -angle);

    // swap velocitys
    circle1.velocity.x = finalV1.x;
    circle1.velocity.y = finalV1.y;

    circle2.velocity.x = finalV2.x;
    circle2.velocity.y = finalV2.y;
  }
};

// caculate pythoagorean distance between 2 points
const distance = (x1, x2, y1, y2) => {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

// circle class
class Circle {
  constructor() {
    this.velocity = {
      x: randomIntFromRange(-MAX_VELOCITY, MAX_VELOCITY),
      y: randomIntFromRange(-MAX_VELOCITY, MAX_VELOCITY)
    };
    this.radius = CIRCLE_RADIUS;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.x =
      Math.random() * (window.innerWidth - this.radius * 2) + this.radius;
    this.y =
      Math.random() * (window.innerHeight - this.radius * 2) + this.radius;
    this.friction = 1;
    this.mass = 1;
    this.fill = false;
    this.alpha = 0;
  }

  draw() {
    // render the circle
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${
      this.color.b
    }, 1)`;
    c.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${
      this.alpha
    })`;
    c.stroke();
    c.fill();
  }

  update(colliders) {
    // bounce at edges
    if (
      this.x + this.radius + this.velocity.x >= window.innerWidth ||
      this.x - this.radius + this.velocity.x <= 0
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.y + this.radius + this.velocity.y >= window.innerHeight ||
      this.y - this.radius + this.velocity.y <= 0
    ) {
      this.velocity.y = -this.velocity.y * this.friction;
      this.velocity.x = this.velocity.x * this.friction;
    }

    // collision detection between circles
    colliders.map(c => {
      // if collider is not itself
      if (this !== c) {
        // if collision detected
        if (distance(this.x, c.x, this.y, c.y) < CIRCLE_RADIUS * 2) {
          resolveCollision(this, c);
        }
      }
    });

    // mouse interaction
    if (
      this.x + this.radius < mouse.x + CURSOR_RADIUS &&
      this.x - this.radius > mouse.x - CURSOR_RADIUS &&
      this.y + this.radius < mouse.y + CURSOR_RADIUS &&
      this.y - this.radius > mouse.y - CURSOR_RADIUS
    ) {
      this.alpha = Math.min(this.alpha + ALPHA_SHIFT, 0.5);
    } else {
      this.alpha = Math.max(this.alpha - ALPHA_SHIFT, 0);
    }
    // update position based on velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
  }
}

// circles array
let circles = [];
const init = () => {
  // calculate how many circles to create based on screen size
  let numSquares =
    (window.innerHeight * window.innerWidth) / Math.pow(CIRCLE_RADIUS * 2, 2);
  let numCircles = Math.floor(numSquares * 0.4);

  const initCircles = [new Circle()];
  for (let i = 0; i < numCircles - 1; i++) {
    let newCircle = new Circle();
    let intersect;
    // check with all circles if new one intersects
    do {
      intersect = false;
      initCircles.map(c => {
        if (distance(newCircle.x, c.x, newCircle.y, c.y) < CIRCLE_RADIUS * 2) {
          intersect = true;
          newCircle.x =
            Math.random() * (window.innerWidth - newCircle.radius * 2) +
            newCircle.radius;
          newCircle.y =
            Math.random() * (window.innerHeight - newCircle.radius * 2) +
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
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // draw all circles
  circles.map(circle => circle.update(circles));
};

init();
animate();
