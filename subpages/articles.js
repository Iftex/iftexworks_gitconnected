(() => {
  const themeButton = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  const filterButtons = [...document.querySelectorAll('.filter-chip')];
  const cards = [...document.querySelectorAll('.article-card')];
  const searchInput = document.getElementById('article-search');
  const count = document.getElementById('result-count');
  const emptyState = document.getElementById('empty-state');
  let activeFilter = 'all';

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    moonIcon.style.display = theme === 'light' ? 'inline-block' : 'none';
    sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
    try { localStorage.setItem('theme', theme); } catch (_) {}
  }

  applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  themeButton.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    const activeIcon = next === 'light' ? moonIcon : sunIcon;
    activeIcon.style.transition = 'all 0.3s ease';
    activeIcon.style.opacity = 0;
    activeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      activeIcon.style.opacity = 1;
      activeIcon.style.transform = 'rotate(0deg)';
    }, 300);
  });

  function filterArticles() {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matchesTopic = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSearch = !query || `${card.dataset.search} ${card.textContent}`.toLowerCase().includes(query);
      const show = matchesTopic && matchesSearch;
      card.hidden = !show;
      if (!show) card.querySelector('details').open = false;
      if (show) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? 'note' : 'notes'}`;
    emptyState.hidden = visible > 0;
  }

  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    filterArticles();
  }));
  searchInput.addEventListener('input', filterArticles);
})();
