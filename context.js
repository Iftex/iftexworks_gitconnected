const menu = document.getElementById('custom-menu');
const menuItems = document.getElementById('menu-items');

// Define menu options
const blankSpaceMenu = [
  { text: 'Back', action: () => history.back() },
  { text: 'Forward', action: () => history.forward() },
  { text: 'Reload', action: () => location.reload() },
];

const textSelectedMenu = [
  { text: 'Copy text', action: () => document.execCommand('copy') },
];

// Hide menu on click anywhere
document.addEventListener('click', () => {
  menu.style.display = 'none';
});

// Show custom menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // Prevent default context menu

  // Clear old menu items
  menuItems.innerHTML = '';

  // Detect if user selected text
  const selection = window.getSelection().toString();
  const menuToShow = selection ? textSelectedMenu : blankSpaceMenu;

  // Add items dynamically
  menuToShow.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    li.onclick = () => {
      item.action();
      menu.style.display = 'none';
    };
    menuItems.appendChild(li);
  });

  // Position menu at mouse cursor
  menu.style.top = `${e.pageY}px`;
  menu.style.left = `${e.pageX}px`;
  menu.style.display = 'block';
});