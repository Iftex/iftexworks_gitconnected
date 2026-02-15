
// ====================
// Theme toggle (Font Awesome sun/moon)
// ====================
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");
  const themeSpan = document.querySelector(".theme-name");

  function getTheme() {
    return root.getAttribute("data-theme") || "light";
  }

  function updateThemeText() {
    if (themeSpan) themeSpan.textContent = `"${getTheme()}"`;
  }

  // Init from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  else root.setAttribute("data-theme", "dark"); // default if none

  // Set icons correctly on load (guard elements)
  if (moonIcon && sunIcon) {
    if (getTheme() === "light") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline-block";
    } else {
      moonIcon.style.display = "none";
      sunIcon.style.display = "inline-block";
    }
  }

  updateThemeText();

  // Toggle click (guard toggleBtn)
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = getTheme();
      const next = current === "light" ? "dark" : "light";

      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);

      if (moonIcon && sunIcon) {
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
      }

      updateThemeText();
    });
  }
});




