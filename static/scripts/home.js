const canvas = document.querySelector('canvas');

// set size
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// draw a rectangle

c.fillStyle = 'rgba(30, 0, 200, 1)';
c.fillRect(0, 0, 300, 300);

c.fillStyle = 'rgba(7, 200, 45, 0.2)';
c.fillRect(100, 100, 100, 100);

c.fillStyle = 'rgba(30, 200, 200, 0.2)';
c.fillRect(0, 0, 100, 100);

c.fillStyle = 'rgba(75, 2, 45, 0.2)';
c.fillRect(500, 500, 20, 20);

c.fillStyle = 'rgba(89, 124, 67, 0.2)';
c.fillRect(100, 500, 10, 10);

// draw lines
c.beginPath();
c.moveTo(50, 100);
c.lineTo(80, 300);
c.lineTo(200, 300);
c.lineTo(200, 500);
c.lineTo(80, 500);
c.lineTo(50, 700);

c.strokeStyle = 'aqua';
c.stroke();

console.log(canvas);
