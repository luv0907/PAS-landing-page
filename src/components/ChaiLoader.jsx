import React, { useEffect, useState } from 'react';
import BagPinLogo from './BagPinLogo';

/**
 * Opening: a cutting-chai glass fills to the brim (0 → 100 %), stays
 * upright and steams for a moment, then a circle opens from the middle to
 * reveal the page. Runs on every screen; never blocks for more than 4 s.
 */
const FILL_MS = 1300;
const HOLD_MS = 450;
const REVEAL_MS = 900;

const markLoaded = () => {
  document.documentElement.classList.add('pas-loaded');
  window.dispatchEvent(new Event('pas:loaded'));
};

export default function ChaiLoader() {
  const [phase, setPhase] = useState('fill');
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fillMs = reduce ? 300 : FILL_MS;
    const t0 = performance.now();
    let raf = 0;
    const timers = [];
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / fillMs);
      setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setPhase('full');
      timers.push(setTimeout(() => {
        setPhase('reveal');
        markLoaded();
        timers.push(setTimeout(() => setPhase('done'), REVEAL_MS));
      }, reduce ? 0 : HOLD_MS));
    };
    raf = requestAnimationFrame(tick);
    // safety: never block the page
    timers.push(setTimeout(() => {
      markLoaded();
      setPhase('done');
    }, 4000));
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === 'done') return null;
  const level = 132 - pct * 1.08; // liquid surface: bottom 132 → brim 24
  return (
    <div className={`chai-loader chai-loader--${phase}`} aria-hidden="true">
      <div className="chai-loader__center">
        <svg viewBox="0 0 120 150" className="chai-loader__glass">
          <defs>
            <clipPath id="ldGlass">
              <path d="M18 22 H102 L93 138 H27 Z" />
            </clipPath>
            <linearGradient id="ldChai" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f2b264" />
              <stop offset="1" stopColor="#b4561a" />
            </linearGradient>
          </defs>
          {/* steam once full */}
          <g className="chai-loader__steam" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round">
            <path d="M48 14 C42 4 54 -2 48 -12" />
            <path d="M70 14 C64 4 76 -2 70 -12" />
          </g>
          <g clipPath="url(#ldGlass)">
            <rect x="0" y={level} width="120" height="150" fill="url(#ldChai)" />
            <path d={`M0 ${level} q15 -5 30 0 t30 0 t30 0 t30 0 v7 H0 z`} fill="#ffe3b0" className="chai-loader__froth" />
          </g>
          <path d="M16 20 H104 L94 140 H26 Z" fill="none" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
          <path d="M28 32 L36 128 M50 32 L54 128 M70 32 L66 128 M92 32 L84 128" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
          <path d="M22 26 L32 132" stroke="#fff" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="chai-loader__brand">
          <BagPinLogo size={26} />
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}
