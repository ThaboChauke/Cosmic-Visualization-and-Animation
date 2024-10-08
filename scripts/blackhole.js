const canvas = document.getElementById('black-hole');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const objects = [];
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const starCount = 300;
let blackHoleRadius = 50; // Initial radius of the black hole
let reverse = false; // Control variable for reversing the process

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Star {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.speed = random(0.05, 0.2);
        this.size = random(1, 2);
        this.color = `rgba(255, 255, 255, ${random(0.5, 1)})`;
    }

    update() {
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = (10 / dist) * this.speed;
        this.x += dx * force;
        this.y += dy * force;

        // Check if the star is within the black hole's radius
        if (dist < blackHoleRadius) {
            blackHoleRadius += 0.1; // Grow the black hole
            return true; // Indicate the star is consumed
        }
        return false; // Indicate the star is not consumed
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class RandomObject {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.size = random(5, 15);
        this.color = `rgba(${random(150, 255)}, ${random(0, 255)}, ${random(0, 255)}, 1)`;
        this.shape = Math.random() < 0.5 ? 'circle' : 'square'; // Random shape
    }

    update() {
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = (10 / dist) * 0.2; // Speed for objects
        this.x += dx * force;
        this.y += dy * force;

        // Check if the object is within the black hole's radius
        if (dist < blackHoleRadius) {
            return true; // Indicate the object is consumed
        }
        return false; // Indicate the object is not consumed
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.shape === 'circle') {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
            ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

function reverseProcess() {
    // Create new stars moving away from the black hole
    if (blackHoleRadius > 0) {
        blackHoleRadius -= 0.1; // Shrink the black hole
    }

    // Reverse stars' movement
    if (stars.length < starCount) {
        stars.push(new Star());
    }

    stars.forEach(star => {
        const dx = star.x - centerX;
        const dy = star.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dx);
        const force = (10 / dist) * star.speed;
        star.x -= dx * force;
        star.y -= dy * force;

        star.draw();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the black hole
    ctx.beginPath();
    ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();

    // Update and draw stars
    for (let i = stars.length - 1; i >= 0; i--) {
        if (stars[i].update()) {
            stars.splice(i, 1); // Remove the star if consumed
        } else {
            stars[i].draw();
        }
    }

    // Create random objects occasionally
    if (Math.random() < 0.02) { // Adjust frequency of object generation
        objects.push(new RandomObject());
    }

    // Update and draw random objects
    for (let i = objects.length - 1; i >= 0; i--) {
        if (objects[i].update()) {
            objects.splice(i, 1); // Remove the object if consumed
        } else {
            objects[i].draw();
        }
    }

    // Check if all stars are consumed
    if (stars.length === 0 && !reverse) {
        reverse = true; // Start the reverse process
        setTimeout(() => {
            reverse = false; // Allow reversing again if needed
        }, 10000); // Wait for 10 seconds
    }

    if (reverse) {
        reverseProcess();
    }

    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
