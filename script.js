const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
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
