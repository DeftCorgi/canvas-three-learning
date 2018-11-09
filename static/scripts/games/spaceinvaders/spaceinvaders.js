// globals
const NUM_INVADERS = 7;
const INVADER_RADIUS = 40;

// drawable obejcts
const objects = [];
const invaders = [];
let player;
function setup() {
  createCanvas(800, window.innerHeight);

  player = new Player(width / 2, height - 70, 40, 40);

  for (let i = 0; i < NUM_INVADERS; i++) {
    const shift = NUM_INVADERS * INVADER_RADIUS + (NUM_INVADERS - 1 * 70);
    const invader = new Invader(width / 2 + i * 70 - shift, 200);
    invaders.push(invader);
    objects.push(invader);
  }
  objects.push(player);
  objects.push(new Bullet(width / 2, height - 20));
}

function draw() {
  background(51);

  objects.map(o => o.update());
}
