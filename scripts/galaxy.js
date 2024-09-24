const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const starCount = 1000;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Star {
    constructor() {
        this.x = centerX;
        this.y = centerY;
        this.angle = random(0, 2 * Math.PI);
        this.radius = random(0, canvas.width / 2);
        this.speed = random(0.001, 0.005);
        this.size = random(0.5, 1.5);
        this.color = `rgba(255, 255, 255, ${random(0.1, 1)})`;
    }

    update() {
        this.angle += this.speed;
        this.x = centerX + this.radius * Math.cos(this.angle);
        this.y = centerY + this.radius * Math.sin(this.angle);
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

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});