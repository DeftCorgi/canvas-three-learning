const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// random circles
const numCircles = 300;
const maxRadius = 50;
const colors = ['#5C70B9', '#4C6290', '#5C9DBA', '#6DA2C5', '#7A92CE'];
for (let i = 0; i < numCircles; i++) {
  c.beginPath();
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  let radius = Math.random() * maxRadius;
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
  c.stroke();
}

console.log(canvas);
