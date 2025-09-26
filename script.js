
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
            // Show with smooth animation
            icon.classList.remove('hide');
        } else {
            // Hide with smooth animation
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
        // Remove active class from all
        filters.forEach(f => f.classList.remove('active'));

        // Add active class to clicked filter
        item.classList.add('active');

        // Apply filter
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


// Contact form submission blank 

const form = document.querySelector('form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
  const error = input.previousElementSibling; // error span above

  // Show error when leaving the field
  input.addEventListener('blur', () => {
    if (!input.value.trim()) {
      error.textContent = "Please fill out this field";
    } else {
      error.textContent = "";
    }
  });

  // Clear error when typing
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

  if (!valid) e.preventDefault(); // stop submission if any field is empty
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "light") {
    body.setAttribute("data-theme", "light");
  }

  toggleBtn.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "light") {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
});
