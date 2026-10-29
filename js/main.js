/* Coach Smith — Strength Coach · Behaviour
   Modules: mobile menu, carousels, scroll reveal, consultation form */
(function () {
  'use strict';

  /* ---- Config: replace with your real details ---- */
  const CONFIG = {
    contactEmail: 'hello@coachsmithcoaching.com',
    // Optional: paste a Formspree/Getform/Netlify endpoint to POST the form instead of opening email
    formEndpoint: ''
  };

  /* ---- Mobile menu ---- */
  const menuButton = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function setMenu(open) {
    mobileNav.classList.toggle('hidden', !open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.textContent = open ? '✕' : '☰';
  }
  menuButton.addEventListener('click', () => setMenu(mobileNav.classList.contains('hidden')));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---- Carousels ---- */
  function setupCarousel(rootId, prevId, nextId) {
    const slides = [...document.querySelectorAll('#' + rootId + ' .carousel-slide')];
    let index = 0;
    const show = n => {
      slides[index].hidden = true;
      index = (n + slides.length) % slides.length;
      slides[index].hidden = false;
    };
    document.getElementById(prevId).addEventListener('click', () => show(index - 1));
    document.getElementById(nextId).addEventListener('click', () => show(index + 1));
  }
  setupCarousel('transform-carousel', 'transform-prev', 'transform-next');
  setupCarousel('quote-carousel', 'quote-prev', 'quote-next');

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  /* ---- Consultation form ---- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const button = document.getElementById('submit-button');
  const say = (msg, error) => { status.textContent = msg; status.style.color = error ? '#ffb4a9' : '#c6f135'; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    say('Sending your consultation request…');
    try {
      if (CONFIG.formEndpoint) {
        const res = await fetch(CONFIG.formEndpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        say('Request received. We’ll be in touch by email to discuss your consultation.');
      } else {
        const body = `Name: ${data.name}\nEmail: ${data.email}\nGoal: ${data.fitness_goal}\n\n${data.message}`;
        location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent('Consultation request')}&body=${encodeURIComponent(body)}`;
        say('Opening your email app to send the request…');
      }
    } catch (err) {
      say('We could not send your request. Please email us directly.', true);
    } finally {
      button.disabled = false;
    }
  });
})();
