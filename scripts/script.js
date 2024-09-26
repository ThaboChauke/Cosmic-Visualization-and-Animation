function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


function generateStars(numStars) {
  for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      document.body.appendChild(star);
  }
}

generateStars(200);