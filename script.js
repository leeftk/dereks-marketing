const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  const setMenuState = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => {
    setMenuState(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuState(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus();
    }
  });
}

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const goalChips = document.querySelectorAll('.goal-chip');
const planResult = document.querySelector('.plan-result');

goalChips.forEach(chip => chip.addEventListener('click', () => {
  goalChips.forEach(item => item.setAttribute('aria-pressed', String(item === chip)));
  if (!planResult) return;
  planResult.classList.remove('updated');
  planResult.querySelector('h3').textContent = `${chip.dataset.plan} is your best fit`;
  planResult.querySelector('p').textContent = chip.dataset.copy;
  requestAnimationFrame(() => planResult.classList.add('updated'));
}));
