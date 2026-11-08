// ====================
// About: interactive room
// ====================
// Clicking an indicator in the picture (or a number tile) swaps the card underneath.
// Which card each indicator opens is set by its data-target in index.html:
//   web = card 1, gfx = card 2, gaming = card 3, edu = card 4, workspace = card 5

(() => {
  const section = document.getElementById('about');
  const cards = document.getElementById('about-cards');
  if (!section || !cards) return;

  const views = new Map(
    Array.from(cards.querySelectorAll('.about-view')).map((el) => [el.dataset.view, el])
  );
  const hotspots = Array.from(section.querySelectorAll('.hotspot'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 'main';

  const show = (key, fromHotspot) => {
    const next = views.get(key);
    if (!next || key === current) return;

    views.forEach((el) => {
      el.hidden = el !== next;
      el.classList.remove('is-entering');
    });
    void next.offsetWidth;              // restart the entrance animation
    next.classList.add('is-entering');
    current = key;

    hotspots.forEach((h) => {
      const on = h.dataset.target === key;
      h.classList.toggle('is-active', on);
      h.setAttribute('aria-pressed', String(on));
    });

    if (fromHotspot) {
      // the cards sit under a tall picture: bring them into view if they landed off-screen
      const r = next.getBoundingClientRect();
      if (r.bottom > window.innerHeight || r.top < 0) {
        next.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    } else {
      // a number tile was clicked and its view just hid: keep keyboard focus in the cards
      next.focus({ preventScroll: true });
    }
  };

  section.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-target]');
    if (!trigger || !section.contains(trigger)) return;
    show(trigger.dataset.target, trigger.classList.contains('hotspot'));
  });
})();
