//home role changer 

const roles = ["Web Developer", "Programmer", "Graphics Designer", "Scripter", "Video Editor"];
const roleSpan = document.querySelector(".role");
let index = 0, charIndex = 0;

function typeRole() {
  const currentRole = roles[index];
  if (charIndex < currentRole.length) {
    roleSpan.textContent += currentRole.charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 150);
  } else {
    setTimeout(deleteRole, 1000);
  }
}

function deleteRole() {
  if (charIndex > 0) {
    roleSpan.textContent = roleSpan.textContent.slice(0, -1);
    charIndex--;
    setTimeout(deleteRole, 100);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(typeRole, 500);
  }
}

typeRole();


// Make all images undraggable
function disableImageDrag() {
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.setAttribute('draggable', 'false');
    });
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
    disableImageDrag();
});



 // Disable right-click on all images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault(); 
        }
    });



//image switcher according to theme 
function updateThemeImages(theme) {
    const allThemeImages = document.querySelectorAll('img[data-light][data-dark]');
    allThemeImages.forEach(img => {
        img.src = theme === 'dark' ? img.dataset.dark : img.dataset.light;
        img.setAttribute('draggable', 'false'); // enforce non-draggable
    });
}

// Apply saved theme and images on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    updateThemeImages(savedTheme);
});

// Theme toggle
document.querySelector('#theme-toggle').addEventListener('click', () => {
    const htmlTag = document.documentElement;
    htmlTag.classList.toggle('dark');
    const theme = htmlTag.classList.contains('dark') ? 'dark' : 'light';
    
    localStorage.setItem('theme', theme);
    updateThemeImages(theme);
});



// Disable Ctrl+U (View Page Source)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault(); // Prevent default browser action
        
    }
});



