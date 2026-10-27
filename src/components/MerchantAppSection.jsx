import React, { useEffect, useRef, useState } from 'react';
import { RESTAURANT_REGISTER_URL, RESTAURANT_REGISTER_LABEL } from '../lib/links';


/* Founding-restaurant perks, one short line each */
const STROKE = { stroke: '#000', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const PERKS = [
  {
    title: 'Launch Video & Reel',
    worth: 55000,
    note: 'Pro film + influencer reel',
    icon: (
      <>
        <rect x="6" y="14" width="26" height="20" rx="4" fill="#ff3b2f" {...STROKE} />
        <path d="M32 21 L42 15 V33 L32 27 Z" fill="#ffc21a" {...STROKE} />
        <circle cx="13" cy="20" r="2" fill="#fff" />
      </>
    ),
  },
  {
    title: 'Social Media Support',
    worth: 22000,
    note: 'A month of posts & a campaign',
    icon: (
      <>
        <path d="M4 22 L14 14 L24 20 L34 14 L44 22 L34 34 L24 40 L14 34 Z" fill="#ffc21a" {...STROKE} />
        <path d="M14 26 L22 33 M19 23 L27 30 M24 20 L31 26" fill="none" {...STROKE} />
      </>
    ),
  },
  {
    title: 'Top Visibility',
    worth: 18000,
    note: 'Priority listing in the app',
    icon: (
      <>
        <path d="M14 28 L17 40 H22 L20 29" fill="#fff" {...STROKE} />
        <path d="M6 20 H14 L32 10 V38 L14 28 H6 Z" fill="#ffc21a" {...STROKE} />
        <path d="M37 18 Q41 24 37 30 M41 13 Q48 24 41 35" fill="none" {...STROKE} />
      </>
    ),
  },
  {
    title: 'Onboarding & Launch',
    worth: 23800,
    note: 'Setup + offline promotion',
    icon: (
      <>
        <path d="M20 36 Q24 47 28 36" fill="#ff7a1a" {...STROKE} />
        <path d="M17 26 L10 34 L17 33 Z M31 26 L38 34 L31 33 Z" fill="#ffc21a" {...STROKE} />
        <path d="M24 4 C33 10 35 22 31 34 H17 C13 22 15 10 24 4 Z" fill="#fff" {...STROKE} />
        <circle cx="24" cy="17" r="4" fill="#ff3b2f" {...STROKE} />
      </>
    ),
  },
  {
    title: 'In-Store QR Kit',
    worth: 1200,
    note: 'Counter display & stickers',
    icon: (
      <>
        <rect x="9" y="4" width="30" height="34" rx="3" fill="#fff" {...STROKE} />
        <path d="M14 9 h7 v7 h-7z M27 9 h7 v7 h-7z M14 23 h7 v7 h-7z M27 24 h3 v3 h-3z M31 28 h3 v3 h-3z" fill="#000" />
        <path d="M13 38 L8 45 H40 L35 38 Z" fill="#ff3b2f" {...STROKE} />
      </>
    ),
  },
  {
    title: 'Founding 100 Badge',
    worth: 0,
    note: 'Certificate, badge & the Wall',
    icon: (
      <>
        <path d="M17 28 L13 44 L19 40 L22 46 L24 30 M31 28 L35 44 L29 40 L26 46 L24 30" fill="#ff3b2f" {...STROKE} />
        <circle cx="24" cy="18" r="13" fill="#ffc21a" {...STROKE} />
        <text x="24" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="sans-serif">100</text>
      </>
    ),
  },
];
const TOTAL = PERKS.reduce((n, p) => n + p.worth, 0);
const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function MerchantAppSection() {
  // phones: perks show one card at a time (swipe, arrows or dots; auto-plays until touched)
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const n = PERKS.length;
    const idx = (i + n) % n;
    const card = track.children[idx];
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = track.clientWidth || 1;
        setActive(Math.round(track.scrollLeft / w));
      });
    };
    const stop = () => { paused.current = true; };
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('pointerdown', stop, { passive: true });
    track.addEventListener('touchstart', stop, { passive: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.matchMedia('(max-width: 759px)');
    let visible = false;
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.5 })
      : null;
    if (io) io.observe(track);
    const id = reduce ? 0 : setInterval(() => {
      if (paused.current || !visible || !phone.matches) return;
      const w = track.clientWidth || 1;
      goTo(Math.round(track.scrollLeft / w) + 1);
    }, 3200);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
      if (io) io.disconnect();
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('pointerdown', stop);
      track.removeEventListener('touchstart', stop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = (d) => () => { paused.current = true; goTo(active + d); };

  return (
    <section className="lineup-section" id="merchant-app">
      <div className="pas-container">
        <div className="lineup-head">
          <div className="lineup-pills">
            <span className="sticker-pill sticker-pill--white"><span aria-hidden="true">⏭</span> SKIP THE QUEUE</span>
            <span className="sticker-pill"><span aria-hidden="true">📍</span> HYDERABAD</span>
          </div>

          <h2 className="lineup-title">
            <span className="lineup-title__white drop-head">INDIA'S FIRST</span>
            <span className="lineup-title__yellow drop-head" style={{ '--d': '140ms' }}>PRE-DINE-IN PLATFORM</span>
          </h2>
        </div>

        {/* Torn paper line-up poster */}
        <div className="torn-wrap">
          <div className="torn-card">
            <span className="torn-tape torn-tape--l" aria-hidden="true" />
            <span className="torn-tape torn-tape--r" aria-hidden="true" />

            <div className="torn-eyebrow">WHAT YOU GET AS A FOUNDING RESTAURANT</div>
            <p className="torn-lead">
              <strong>100 restaurants</strong> only. Everything below is free.
            </p>
            <ul className="perk-grid" ref={trackRef} aria-label="Founding restaurant benefits">
              {PERKS.map((p, i) => (
                <li key={p.title} className="perk-tile" style={{ '--r': `${[-2, 1.5, -1, 2, -1.5, 1][i]}deg` }}>
                  <span className="perk-tile__stamp">FREE</span>
                  <svg viewBox="0 0 48 48" className="perk-tile__icon" aria-hidden="true">{p.icon}</svg>
                  <span className="perk-tile__title">{p.title}</span>
                  <span className="perk-tile__note">{p.note}</span>
                  <span className="perk-tile__worth">
                    {p.worth ? <><span className="sr-only">Usually </span><s>{inr(p.worth)}</s></> : <em>Founding bonus</em>}
                  </span>
                </li>
              ))}
            </ul>

            <div className="perk-nav" aria-label="Browse benefits">
              <button type="button" className="perk-nav__btn" onClick={step(-1)} aria-label="Previous benefit">←</button>
              <div className="perk-nav__dots">
                {PERKS.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    className={`perk-nav__dot${i === active ? ' is-active' : ''}`}
                    onClick={() => { paused.current = true; goTo(i); }}
                    aria-label={`Show ${p.title}`}
                    aria-current={i === active ? 'true' : undefined}
                  />
                ))}
              </div>
              <span className="perk-nav__count" aria-hidden="true">{active + 1}/{PERKS.length}</span>
              <button type="button" className="perk-nav__btn" onClick={step(1)} aria-label="Next benefit">→</button>
            </div>

            <div className="torn-total" aria-label={`Total worth ${inr(TOTAL)}, one-time registration fee ₹2,999`}>
              <span className="torn-total__worth">
                <small>Total worth</small>
                <s>{inr(TOTAL)}</s>
              </span>
              <span className="torn-total__arrow" aria-hidden="true">→</span>
              <span className="torn-total__pay">
                <small>One-time <span className="torn-total__nowrap">registration fee</span></small>
                <strong>₹2,999</strong>
              </span>
            </div>

            <div className="torn-cta">
              <a className="btn-poster btn-poster--red" href={RESTAURANT_REGISTER_URL} target="_blank" rel="noopener noreferrer" aria-label={RESTAURANT_REGISTER_LABEL}>
                <span>REGISTER RESTAURANT</span>
                <span className="btn-poster__icon">↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
