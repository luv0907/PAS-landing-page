import { useEffect } from 'react';

const SELECTOR = [
  '.pass-card', '.info-plate', '.vendor-title', '.sticker-pill', '.vendor-board', '.vendor-side',
  '.lineup-title', '.torn-card', '.footer-grid > *', '.footer-bottom',
].join(',');

/** Pops content up as it scrolls into view (only once JS is running). */
export default function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll(SELECTOR)];
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    document.documentElement.classList.add('js-reveal');
    els.forEach((el) => {
      const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(SELECTOR)) : [];
      el.style.setProperty('--rv-delay', `${Math.max(0, siblings.indexOf(el)) * 90}ms`);
      el.classList.add('rv');
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
