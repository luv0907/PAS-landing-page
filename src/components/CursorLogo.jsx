import React, { useEffect, useRef, useState } from 'react';
import BagPinLogo from './BagPinLogo';

const DESKTOP = '(min-width: 900px)';
const CLICKABLE = 'a, button, [role="button"], [role="tab"], input, label, select, textarea';

/**
 * Desktop companion cursor: the Pick At Store bag-pin follows the mouse
 * with a soft spring, leans into the direction of travel, grows over
 * anything clickable and drops a pin ripple where you click.
 */
export default function CursorLogo() {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef(null);
  const logoRef = useRef(null);
  const ripplesRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const on = () => setEnabled(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const wrap = wrapRef.current;
    const logo = logoRef.current;
    if (!wrap || !logo) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    const vel = { x: 0, y: 0 };
    let seen = false;
    let raf = 0;
    let hover = false;

    const frame = () => {
      if (reduce) {
        pos.x = target.x;
        pos.y = target.y;
      } else {
        // critically-damped-ish spring
        const k = 0.16;
        const damp = 0.72;
        vel.x = (vel.x + (target.x - pos.x) * k) * damp;
        vel.y = (vel.y + (target.y - pos.y) * k) * damp;
        pos.x += vel.x;
        pos.y += vel.y;
      }
      const tilt = Math.max(-22, Math.min(22, vel.x * 1.6));
      wrap.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      logo.style.transform = `rotate(${tilt.toFixed(1)}deg) scale(${hover ? 1.35 : 1})`;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      target.x = e.clientX + 18;
      target.y = e.clientY + 20;
      if (!seen) {
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
        wrap.classList.add('is-visible');
      }
      const el = e.target instanceof Element ? e.target.closest(CLICKABLE) : null;
      if (!!el !== hover) {
        hover = !!el;
        wrap.classList.toggle('is-hover', hover);
      }
    };
    const onLeave = () => wrap.classList.remove('is-visible');
    const onEnter = () => seen && wrap.classList.add('is-visible');
    const onDown = (e) => {
      wrap.classList.remove('is-press');
      void wrap.offsetWidth;
      wrap.classList.add('is-press');
      const host = ripplesRef.current;
      if (!host || reduce) return;
      const r = document.createElement('span');
      r.className = 'cursor-ripple';
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      host.appendChild(r);
      setTimeout(() => r.remove(), 700);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor-logo" ref={wrapRef} aria-hidden="true">
        <span className="cursor-logo__shadow" />
        <span className="cursor-logo__inner" ref={logoRef}>
          <BagPinLogo size={38} />
        </span>
      </div>
      <div className="cursor-ripples" ref={ripplesRef} aria-hidden="true" />
    </>
  );
}
