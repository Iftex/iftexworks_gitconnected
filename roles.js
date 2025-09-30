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




 // Disable right-click on all images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault(); 
        }
    });



