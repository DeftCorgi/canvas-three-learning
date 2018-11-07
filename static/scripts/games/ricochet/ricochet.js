const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');
const mouse = { x: null, y: null, left: false };
const keys = { w: false, a: false, s: false, d: false };

/*************** *
      Mouse Events
******************/
window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('mousedown', e => {
  mouse.left = true;
});

window.addEventListener('mouseup', e => {
  mouse.left = false;
});

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w':
      keys.w = true;
      break;
    case 'a':
      keys.a = true;
      break;
    case 's':
      keys.s = true;
      break;
    case 'd':
      keys.d = true;
      break;
    default:
      break;
  }
});

window.addEventListener('keyup', e => {
  console.log(e.key);
  switch (e.key) {
    case 'w':
      keys.w = false;
      break;
    case 'a':
      keys.a = false;
      break;
    case 's':
      keys.s = false;
      break;
    case 'd':
      keys.d = false;
      break;
    default:
      break;
  }
});

let player;

const init = () => {
  player = new Player(40, 40);
};

const animate = () => {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  player.update();

  window.requestAnimationFrame(animate);
};

/*************** *
      PLAYER
******************/

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 50;
    this.width = 20;
    this.moveSpeed = 5;
    this.maxSpeed = 12;
    this.dx = 0;
    this.dy = 0;
  }

  update() {
    // update physics and stuff
    this.movement();
    this.shooting();
    this.draw();
  }

  shooting() {
    if (mouse.left) {
      const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
      const frontX = this.x - this.length * Math.cos(angle);
      const frontY = this.y - this.length * Math.sin(angle);
      const ricochet = new Ricochet(frontX, frontY, angle);
    }
  }

  movement() {
    // update delta values based on input
    if (keys.w) this.dy -= this.moveSpeed;
    if (keys.a) this.dx -= this.moveSpeed;
    if (keys.s) this.dy += this.moveSpeed;
    if (keys.d) this.dx += this.moveSpeed;

    // cap deltas
    if (Math.abs(this.dx) > this.maxSpeed)
      this.dx = Math.sign(this.dx) * this.maxSpeed;
    if (Math.abs(this.dy) > this.maxSpeed)
      this.dy = Math.sign(this.dy) * this.maxSpeed;

    // update position based on deltas
    this.x += this.dx;
    this.y += this.dy;

    // delta degredation
    this.dx -= Math.sign(this.dx) * 2;
    this.dy -= Math.sign(this.dy) * 2;
  }

  draw() {
    // draw player triangle
    c.beginPath();
    // get angle from plyaer and mouse
    const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
    const angle2 = angle + (2 * Math.PI) / 3;
    const angle3 = angle - (2 * Math.PI) / 3;

    const frontX = this.x - this.length * Math.cos(angle);
    const frontY = this.y - this.length * Math.sin(angle);

    const leftX = this.x - this.width * Math.cos(angle2);
    const leftY = this.y - this.width * Math.sin(angle2);

    const rightX = this.x - this.width * Math.cos(angle3);
    const rightY = this.y - this.width * Math.sin(angle3);
    c.moveTo(this.x, this.y);
    c.lineTo(leftX, leftY);
    c.lineTo(frontX, frontY);
    c.lineTo(rightX, rightY);
    c.closePath();
    c.stroke();
    c.fillStyle = '#247BA0';
    c.fill();
  }
}

/*************** *
      Ricochet
******************/

class Ricochet {
  construcutor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 10;
    this.maxBounces = 3;
  }

  update() {
    this.draw();
  }

  draw() {}
}

init();
animate();
console.log('hello world');