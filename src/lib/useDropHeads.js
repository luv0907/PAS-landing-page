import { useEffect } from 'react';

/**
 * Headings fall in with a little bounce when they scroll into view.
 * Headings already on screen wait for the chai loader to open first.
 */
export default function useDropHeads() {
  useEffect(() => {
    const heads = [...document.querySelectorAll('.drop-head')];
    const show = (el) => el.classList.add('is-in');
    if (!('IntersectionObserver' in window)) {
      heads.forEach(show);
      return undefined;
    }
    const pending = new Set();
    const loaded = () => document.documentElement.classList.contains('pas-loaded');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        if (loaded()) show(e.target);
        else pending.add(e.target);
      }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    heads.forEach((h) => io.observe(h));
    const onLoaded = () => {
      pending.forEach(show);
      pending.clear();
    };
    window.addEventListener('pas:loaded', onLoaded);
    return () => {
      io.disconnect();
      window.removeEventListener('pas:loaded', onLoaded);
    };
  }, []);
}
