import { mount } from 'svelte';
import { html as content, headings, meta, widgetCopy } from 'virtual:content';
import PainModel from './widgets/PainModel.svelte';
import LifeDays from './widgets/LifeDays.svelte';
import DietCalculator from './widgets/DietCalculator.svelte';
import SufferingDays from './widgets/SufferingDays.svelte';
import './style.css';

const app = document.getElementById('app');

// Theme: honor localStorage, else prefers-color-scheme, else light
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.dataset.theme = initialTheme;


// Build TOC from h2 headings
const tocItems = headings
  .filter(h => h.depth === 1)
  .map(h => `<li><a href="#${h.slug}">${h.text}</a></li>`)
  .join('\n');

app.innerHTML = `
  <div class="hero">
    <div class="hero-gradient"></div>
    <div class="hero-content">
      <h1>${meta.title}</h1>
      <div class="hero-meta">
        <a class="hero-author" href="https://henrystanley.com" target="_blank" rel="noopener">${meta.author}</a>
      </div>
    </div>
  </div>
  <div class="layout">
    <nav class="toc">
      <div class="toc-title">${meta.title}</div>
      <ul>${tocItems}</ul>
    </nav>
    <article class="prose">${content}</article>
  </div>
  <button class="theme-toggle" aria-label="Toggle theme">
    <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
  </button>
  <nav class="mobile-nav">
    <button class="mobile-nav-toggle">
      <span class="mobile-nav-section"></span>
      <span class="mobile-nav-arrow">&#9660;</span>
    </button>
    <ul class="mobile-nav-menu">${tocItems}</ul>
  </nav>
`;

// Mount widgets
const widgets = {
  'widget-pain-model': PainModel,
  'widget-life-days': LifeDays,
  'widget-diet-calculator': DietCalculator,
  'widget-suffering-days': SufferingDays,
};

for (const [id, Component] of Object.entries(widgets)) {
  const target = document.getElementById(id);
  if (target) {
    const copyKey = id.replace('widget-', '');
    const copy = widgetCopy[copyKey] || {};
    mount(Component, { target, props: { copy } });
  }
}

// Highlight active TOC link based on scroll position
const tocLinks = document.querySelectorAll('.toc a');
const sectionIds = headings.filter(h => h.depth === 1).map(h => h.slug);
const mobileNavSection = document.querySelector('.mobile-nav-section');
const sectionTitles = Object.fromEntries(
  headings.filter(h => h.depth === 1).map(h => [h.slug, h.text])
);

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
        mobileNavSection.textContent = sectionTitles[entry.target.id] || '';
      }
    }
  },
  { rootMargin: '0px 0px -60% 0px' }
);

for (const id of sectionIds) {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
}

// Show TOC and title when the first paragraph scrolls out of view
const hero = document.querySelector('.hero');
const tocNav = document.querySelector('.toc');
const tocTitle = document.querySelector('.toc-title');
const firstParagraph = document.querySelector('.prose p:first-of-type');

const scrollObserver = new IntersectionObserver(
  ([entry]) => {
    const pastIntro = !entry.isIntersecting;
    tocNav.classList.toggle('visible', pastIntro);
    tocTitle.classList.toggle('visible', pastIntro);
  },
  { threshold: 0 }
);

scrollObserver.observe(firstParagraph);

// Mobile nav: show when past hero, toggle menu on tap
const mobileNav = document.querySelector('.mobile-nav');
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const mobileMenu = document.querySelector('.mobile-nav-menu');

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    mobileNav.classList.toggle('visible', !entry.isIntersecting);
    if (entry.isIntersecting) mobileMenu.classList.remove('open');
  },
  { threshold: 0 }
);
heroObserver.observe(hero);

mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  mobileToggle.classList.toggle('open');
});

mobileMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    mobileMenu.classList.remove('open');
    mobileToggle.classList.remove('open');
  }
});

// Theme toggle
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});
