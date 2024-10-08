const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const connections = [];
const starCount = 100;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Star {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.size = random(1, 3);
        this.color = 'white';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

function drawConnections() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    connections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection[0].x, connection[0].y);
        ctx.lineTo(connection[1].x, connection[1].y);
        ctx.stroke();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => star.draw());
    drawConnections();
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const nearestStar = stars.reduce((closest, star) => {
        const dist = Math.hypot(star.x - x, star.y - y);
        return dist < closest.dist ? { star, dist } : closest;
    }, { star: null, dist: Infinity }).star;

    if (nearestStar) {
        connections.push([nearestStar, stars[Math.floor(Math.random() * starCount)]]);
    }
});

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

