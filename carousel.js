// ====================
// 360° carousel (infinite loop)
// ====================
// The slides are cloned before and after the original set, so the first image
// always follows the last one and the strip can run in either direction forever.
// Whenever the strip leaves the middle copy it is silently moved back by exactly
// one set length, which looks identical, so there is never a visible jump.

(() => {
  const root = document.getElementById('carousel');
  if (!root) return;

  const track = root.querySelector('.carousel-track');
  const originals = Array.from(track.children);
  const N = originals.length;
  if (N < 2) return;

  // ---- settings ----
  const INTERVAL = 800;        // ms every slide stays in the centre
  const GLIDE = 1200;           // ms for the glide to the next slide
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- build the clones: [set before][originals][set after] ----
  const clone = (el) => {
    const c = el.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    const img = c.querySelector('img');
    if (img) {
      img.alt = '';
      img.setAttribute('draggable', 'false');
    }
    return c;
  };
  originals.map(clone).forEach((c) => track.insertBefore(c, originals[0]));
  originals.map(clone).forEach((c) => track.appendChild(c));

  const slides = Array.from(track.children); // 3 * N
  let lefts = [];
  let widths = [];
  let period = 0;               // pixel length of one full set (slides + gaps)
  let viewW = 0;

  // ---- state ----
  let pos = 0;                  // track x-coordinate that sits in the middle of the viewport
  let activeIdx = N;            // global index of the slide in the centre (first original)
  let rafId = 0;
  let timer = 0;
  let animating = false;
  const block = { hover: false, focus: false, drag: false, hidden: document.hidden, offscreen: false };

  const center = (i) => lefts[i] + widths[i] / 2;

  const measure = () => {
    lefts = slides.map((s) => s.offsetLeft);
    widths = slides.map((s) => s.offsetWidth);
    period = lefts[N] - lefts[0];
    viewW = root.clientWidth;
  };

  // keep pos inside one period, centred on the middle copy
  const wrap = (p) => {
    const base = center(N) - period / 2;
    return ((((p - base) % period) + period) % period) + base;
  };

  const nearest = (p) => {
    let best = N, dist = Infinity;
    for (let i = 0; i < slides.length; i++) {
      const d = Math.abs(center(i) - p);
      if (d < dist) { dist = d; best = i; }
    }
    return best;
  };

  const render = () => {
    const dpr = window.devicePixelRatio || 1;
    const x = Math.round((viewW / 2 - pos) * dpr) / dpr;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };

  // ---- animation ----
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const cancelGlide = () => {
    cancelAnimationFrame(rafId);
    animating = false;
  };

  const glideTo = (targetPos, duration, done) => {
    cancelGlide();
    const from = pos;
    const t0 = performance.now();
    animating = true;
    const frame = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      pos = from + (targetPos - from) * ease(t);
      render();
      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        animating = false;
        pos = wrap(pos);               // seamless jump back into the middle copy
        activeIdx = nearest(pos);
        render();
        if (done) done();
      }
    };
    rafId = requestAnimationFrame(frame);
  };

  const goTo = (idx, duration = GLIDE) => {
    activeIdx = idx;
    glideTo(center(idx), reduceMotion ? 1 : duration, schedule);
  };

  const step = (dir) => {
    clearTimeout(timer);
    goTo(nearest(pos) + dir);
  };

  // ---- autoplay ----
  const blocked = () => reduceMotion || block.hover || block.focus || block.drag || block.hidden || block.offscreen;

  function schedule() {
    clearTimeout(timer);
    if (blocked() || animating) return;
    timer = setTimeout(() => step(1), INTERVAL);
  }

  // ---- drag / swipe ----
  let startX = 0, startPos = 0, lastX = 0, lastT = 0, velocity = 0, pointerId = null;

  root.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerId = e.pointerId;
    cancelGlide();
    clearTimeout(timer);
    block.drag = true;
    root.classList.add('is-dragging');
    startX = lastX = e.clientX;
    startPos = pos;
    lastT = performance.now();
    velocity = 0;
    root.setPointerCapture(pointerId);
  });

  root.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointerId) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    velocity = 0.8 * velocity + 0.2 * ((lastX - e.clientX) / dt);   // px per ms, positive = moving forward
    lastX = e.clientX;
    lastT = now;
    pos = wrap(startPos - (e.clientX - startX));
    render();
  });

  const endDrag = (e) => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    block.drag = false;
    root.classList.remove('is-dragging');
    // throw a little with the velocity, then settle on the closest slide
    const target = nearest(pos + velocity * 240);
    goTo(target, 700);
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);

  // ---- pause rules ----
  root.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { block.hover = true; clearTimeout(timer); } });
  root.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { block.hover = false; schedule(); } });
  root.addEventListener('focusin', () => { block.focus = true; clearTimeout(timer); });
  root.addEventListener('focusout', () => { block.focus = false; schedule(); });
  document.addEventListener('visibilitychange', () => {
    block.hidden = document.hidden;
    block.hidden ? clearTimeout(timer) : schedule();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      block.offscreen = !entry.isIntersecting;
      block.offscreen ? clearTimeout(timer) : schedule();
    }, { threshold: 0.15 }).observe(root);
  }

  // ---- keyboard ----
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });

  // ---- layout changes (resize / fonts / orientation) ----
  const relayout = () => {
    const keep = animating ? activeIdx : nearest(pos);
    measure();
    pos = center(keep);
    render();
  };
  if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(root);
  window.addEventListener('resize', relayout);

  // ---- go ----
  measure();
  pos = center(N);
  render();
  schedule();
})();
