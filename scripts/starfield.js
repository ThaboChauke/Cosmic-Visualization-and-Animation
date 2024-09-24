const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const starCount = 300;
const maxSpeed = 10;
let speed = 1;
let mouseX = 0;
let mouseY = 0;

// Function to create stars with random positions and speeds
function createStar() {
  return {
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    z: Math.random() * canvas.width,
    color: `hsl(${Math.random() * 360}, 100%, 80%)`, // Random star color
  };
}

// Initialize stars array
for (let i = 0; i < starCount; i++) {
  stars.push(createStar());
}

// Function to move and draw the stars
function updateStarfield() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);

  stars.forEach((star, index) => {
    star.z -= speed;

    if (star.z <= 0) {
      stars[index] = createStar();
      stars[index].z = canvas.width;
    }

    const scale = canvas.width / (canvas.width + star.z);
    const x = star.x * scale;
    const y = star.y * scale;

    ctx.beginPath();
    ctx.arc(x, y, scale * 2, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
  });

  ctx.resetTransform();
  requestAnimationFrame(updateStarfield);
}

// Event listener for mouse movement to adjust star speed and direction
window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX - canvas.width / 2;
  mouseY = event.clientY - canvas.height / 2;

  speed = (mouseX / canvas.width) * maxSpeed;
});

// Event listener for window resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

updateStarfield();