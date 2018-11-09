// globals
const NUM_INVADERS = 9;
const INVADER_RADIUS = 30;

// drawable obejcts
const invaders = [];
let player;
function setup() {
  createCanvas(800, window.innerHeight);

  player = new Player(width / 2, height - 70, 40, 40, invaders);

  for (let i = 0; i < NUM_INVADERS; i++) {
    const shift = ((NUM_INVADERS - 1) * 70) / 2;
    const invader = new Invader(width / 2 + i * 70 - shift, 20);
    invaders.push(invader);
  }
}

let direction = 1;
let goalY = 20;
function draw() {
  background(51);

  player.update();

  // direction of invaders
  invaders.map(o =>
    o.update(
      direction,
      goalY,
      () => (direction = -direction),
      () => (goalY += 20)
    )
  );
}
