// globals
const NUM_INVADERS = 9;
const INVADER_RADIUS = 50;

// drawable obejcts
const invaders = [];
let player;
function setup() {
  createCanvas(800, window.innerHeight);
  player = new Player(width / 2, height - 70, 40, 40, invaders);

  for (let i = 0; i < NUM_INVADERS; i++) {
    const shift = ((NUM_INVADERS - 1) * 70) / 2;
    const invader = new Invader(width / 2 + i * 70 - shift, 20, INVADER_RADIUS);
    invaders.push(invader);
  }
}

let direction = 1;
let goalY = 20;
function draw() {
  background(51);

  if (manager.started) {
    player.update();
    if (invaders.length > 0) {
      // update invader direction and Y
      // when first or last hit a wall
      const touchingWall =
        invaders[0].touchingWall() ||
        invaders[invaders.length - 1].touchingWall();

      if (touchingWall) {
        direction = -direction;
        goalY += INVADER_RADIUS;
      }
      invaders.map((o, i) => {
        // remove invader when its dead
        if (o.dead) {
          invaders.splice(i, 1);
        }
        o.update(direction, goalY);
      });
    }
  }
  manager.update();
}
