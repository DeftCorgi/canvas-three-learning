class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    // update physics and stuff

    this.draw();
  }

  draw() {
    // draw player triangle
    console.log('aye');
    c.beginPath();
    c.lineTo(this.x + 10, this.y + 10);
    x.stroke();
  }
}
