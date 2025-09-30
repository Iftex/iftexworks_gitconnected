// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    offset: 100
});




// Menu toggle functionality
const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.querySelector('.dropdown-menu');
const body = document.body;

menuIcon.addEventListener('click', () => {
    const isOpen = dropdownMenu.classList.toggle('show');
    menuIcon.querySelector('i').textContent = isOpen ? 'close' : 'menu';
    
    // Prevent body scrolling when menu is open
    if (isOpen) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});



// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });

        // If the clicked one was not already open, open it
        if (!isActive) {
            item.classList.add('active');
        }
    });
});




// Skills filtering functionality
const allIcons = document.querySelectorAll('.skill-icon');
const filters = document.querySelectorAll('.skill-filture');

// Map category names to CSS classes
const categoryMap = {
    'All': 'all',
    'Programming Languages': 'programming',
    'Visual Designing': 'visualdesign',
    'Video Editing': 'videoediting',
    'Productivity': 'productivity',
    'Devtools': 'others'
};

function filterSkills(category) {
    allIcons.forEach(icon => {
        if (category === 'all' || icon.classList.contains(category)) {
            icon.classList.remove('hide');
        } else {
            icon.classList.add('hide');
        }
    });
}

// Show all skills by default
window.addEventListener('load', () => {
    filterSkills('all');
});

// Add event listeners to filters
filters.forEach(item => {
    const text = item.querySelector('span').textContent.trim();
    const cssClass = categoryMap[text];

    item.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        item.classList.add('active');
        filterSkills(cssClass);
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (dropdownMenu.classList.contains('show') && 
        !dropdownMenu.contains(e.target) && 
        !menuIcon.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        menuIcon.querySelector('i').textContent = 'menu';
        body.style.overflow = '';
    }
});




// Contact form validation
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    const error = input.previousElementSibling;

    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            error.textContent = "Please fill out this field";
        } else {
            error.textContent = "";
        }
    });

    input.addEventListener('input', () => {
        error.textContent = "";
    });
});

form.addEventListener('submit', (e) => {
    let valid = true;

    inputs.forEach(input => {
        const error = input.previousElementSibling;
        if (!input.value.trim()) {
            error.textContent = "Please fill out this field";
            valid = false;
        }
    });

    if (!valid) e.preventDefault();
});




// System user home
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const icon = toggleBtn.querySelector(".material-icons");
    const themeSpan = document.querySelector(".theme-name");

    // Function to get current theme
    function getTheme() {
        return body.getAttribute("data-theme") || "dark";
    }

    // Update the sys.theme span
    function updateThemeText() {
        themeSpan.textContent = getTheme() === "dark" ? `"dark"` : `"light"`;


    }

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.setAttribute("data-theme", savedTheme);
        icon.textContent = savedTheme === "light" ? "sunny" : "dark_mode";
    } else {
        body.setAttribute("data-theme", "light"); // default
        icon.textContent = "sunny";
    }

    updateThemeText();


//user system memory (random)

function updateMemory() {
  const total = 8; // total GB
  const used = (Math.random() * total).toFixed(1);

  const memoryText = document.querySelector(".memory-text");
  const memoryFill = document.querySelector(".memory-fill");

  memoryText.textContent = `${used}GB/${total}GB`;
  memoryFill.style.width = `${(used / total) * 100}%`;
}

// update every 2 seconds
setInterval(updateMemory, 5000);
updateMemory();



//user system device 
function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();

  if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(ua)) {
    return "mobile";
  } else if (/tablet|ipad|android(?!.*mobile)/.test(ua)) {
    return "tablet";
  } else {
    return "desktop";
  }
}

// Update the sys.device span
function updateDevice() {
  const deviceSpan = document.querySelector(".device");
  deviceSpan.textContent = `"${getDeviceType()}"`; // show in quotes
}

// Call it once on page load
updateDevice();


//user system time
function updateTime() {
  const timeSpan = document.querySelector(".time");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  timeSpan.textContent = `"${hours}:${minutes}:${seconds}"`;
}

// Update every second
setInterval(updateTime, 1000);
updateTime(); // initial call




// Toggle theme on click
    toggleBtn.addEventListener("click", () => {
        const current = getTheme();
        const next = current === "light" ? "dark" : "light";

        body.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);

        icon.textContent = next === "light" ? "sunny" : "dark_mode";

        // Animate icon
        icon.style.transition = "all 0.3s ease";
        icon.style.opacity = 0;
        icon.style.transform = "rotate(360deg)";
        setTimeout(() => {
            icon.style.opacity = 1;
            icon.style.transform = "rotate(0deg)";
        }, 300);

        updateThemeText();
    });
});
