// ====================
// Initialize AOS
// ====================
AOS.init({
  once: true,
  duration: 800,
  offset: 100
});


// ====================
// Menu toggle
// ====================
const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.querySelector('.dropdown-menu');
const body = document.body;

menuIcon.addEventListener('click', () => {
  const isOpen = dropdownMenu.classList.toggle('show');
  menuIcon.querySelector('i').textContent = isOpen ? 'close' : 'menu';

  // Prevent body scrolling when menu is open
  body.style.overflow = isOpen ? 'hidden' : '';
});

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


// ====================
// FAQ toggle
// ====================
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
    });

    // If not already open, open clicked one
    if (!isActive) item.classList.add('active');
  });
});


// ====================
// Skills filtering
// ====================
const allIcons = document.querySelectorAll('.skill-icon');
const filters = document.querySelectorAll('.skill-filture');

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

// Show all by default
window.addEventListener('load', () => {
  filterSkills('all');
});

// Add filter clicks
filters.forEach(item => {
  const text = item.querySelector('span').textContent.trim();
  const cssClass = categoryMap[text];

  item.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    item.classList.add('active');
    filterSkills(cssClass);
  });
});


// ====================
// Smooth scrolling
// ====================
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
}


// ====================
// Contact form validation
// ====================
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
  const error = input.previousElementSibling;

  input.addEventListener('blur', () => {
    error.textContent = input.value.trim() ? "" : "Please fill out this field";
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


// ====================
// System Info (Random Memory, Device, Time)
// ====================
function updateMemory() {
  const total = 8; // total GB
  const used = (Math.random() * total).toFixed(1);

  const memoryText = document.querySelector(".memory-text");
  const memoryFill = document.querySelector(".memory-fill");

  memoryText.textContent = `${used}GB/${total}GB`;
  memoryFill.style.width = `${(used / total) * 100}%`;
}
setInterval(updateMemory, 5000);
updateMemory();

function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(ua)) return "mobile";
  if (/tablet|ipad|android(?!.*mobile)/.test(ua)) return "tablet";
  return "desktop";
}
function updateDevice() {
  const deviceSpan = document.querySelector(".device");
  deviceSpan.textContent = `"${getDeviceType()}"`;
}
updateDevice();

function updateTime() {
  const timeSpan = document.querySelector(".time");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  timeSpan.textContent = `"${hours}:${minutes}:${seconds}"`;
}
setInterval(updateTime, 1000);
updateTime();


// ====================
// Theme toggle (Font Awesome sun/moon)
// ====================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");
  const themeSpan = document.querySelector(".theme-name");

  function getTheme() {
    return body.getAttribute("data-theme") || "light";
  }

  function updateThemeText() {
    if (themeSpan) themeSpan.textContent = `"${getTheme()}"`;
  }

  // Init from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
  } else {
    body.setAttribute("data-theme", "light"); // default
  }

  // Set icons correctly on load
  if (getTheme() === "light") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
  } else {
    moonIcon.style.display = "none";
    sunIcon.style.display = "inline-block";
  }

  updateThemeText();

  // Toggle click
  toggleBtn.addEventListener("click", () => {
    const current = getTheme();
    const next = current === "light" ? "dark" : "light";

    body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    if (next === "light") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline-block";
    } else {
      moonIcon.style.display = "none";
      sunIcon.style.display = "inline-block";
    }

    // Animate the active icon
    const activeIcon = next === "light" ? moonIcon : sunIcon;
    activeIcon.style.transition = "all 0.3s ease";
    activeIcon.style.opacity = 0;
    activeIcon.style.transform = "rotate(360deg)";
    setTimeout(() => {
      activeIcon.style.opacity = 1;
      activeIcon.style.transform = "rotate(0deg)";
    }, 300);

    updateThemeText();
  });
});



