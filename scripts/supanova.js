const starryBackground = document.querySelector('.starry-background');

// Function to create stars
function createStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1; // Star size between 1 and 4 pixels
        const x = Math.random() * 100; // Positioning on x-axis
        const y = Math.random() * 100; // Positioning on y-axis

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${y}vh`;
        star.style.left = `${x}vw`;

        starryBackground.appendChild(star);
    }
}

// Create 100 stars
createStars(100);

const star = document.getElementById('star');
const explosion = document.getElementById('explosion');

setTimeout(() => {
    explosion.style.display = 'block';
    explosion.style.top = `${star.offsetTop - 25}px`;
    explosion.style.left = `${star.offsetLeft - 25}px`;
    explosion.classList.add('explode');
}, 4000); // Adjust time for when the supernova occurs
