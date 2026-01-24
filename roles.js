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


//Image switcher according to theme
function updateThemeImages() {
  const theme = document.documentElement.getAttribute("data-theme");

  document.querySelectorAll(".theme-img").forEach(img => {
    img.src = theme === "light"
      ? img.dataset.light
      : img.dataset.dark;

    img.style.visibility = "visible";
  });
}

document.addEventListener("DOMContentLoaded", updateThemeImages);

document.querySelector("#theme-toggle").addEventListener("click", () => {
  const html = document.documentElement;
  const newTheme =
    html.getAttribute("data-theme") === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateThemeImages();
});


// Disable F12, Ctrl+Shift+I, Ctrl+U
document.addEventListener('keydown', function (event) {
    // Disable F12
    if (event.key === 'F12') {
        event.preventDefault();
        return false;
    }

    // Disable Ctrl+Shift+I (Inspect)
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i') {
        event.preventDefault();
        return false;
    }

    // (Optional) Disable Ctrl+U (View Source)
    if (event.ctrlKey && event.key.toLowerCase() === 'u') {
        event.preventDefault();
        return false;
        
    }
});



