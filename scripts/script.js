function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// Function to generate random stars
function generateStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Randomize star position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Set position and add to body
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    document.body.appendChild(star);
  }
}

// Generate 200 random stars
generateStars(200);