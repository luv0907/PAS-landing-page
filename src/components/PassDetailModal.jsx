import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CUSTOMER_FORM_URL, RESTAURANT_FORM_URL } from '../lib/links';

/**
 * Full-detail "pass" sheet that opens when a registration card in the hero
 * is clicked. It unfolds from the card's position like a ticket being
 * pulled out, the perk groups drop in one after another, and the CTA at the
 * bottom sends people to the Google Form.
 */

export const PASS_DETAILS = {
  merchant: {
    tone: 'merchant',
    tag: 'FLAGSHIP RESTAURANT SELECTION',
    serial: 'HYD · 100 ONLY',
    eyebrow: "India's first Pre-Dine-In platform",
    num: '100',
    title: 'FOUNDING RESTAURANTS',
    sub: 'Just 100 restaurants for our first Hyderabad launch. Be one of the first building the future of pickup.',
    listHeading: 'What you get as a founding restaurant:',
    savings: {
      title: 'MERCHANT SAVINGS SHEET',
      rates: 'HYD · 2026 RATES',
      totalMin: 88000,
      totalMax: 191000,
      sections: [
        {
          name: 'Marketing',
          rows: [
            { title: 'Premium restaurant video', desc: 'Professionally shot & edited film of your food and space.', min: 25000, max: 50000 },
            { title: 'Local influencer reel', desc: 'A Hyderabad food creator visits and posts a reel.', min: 15000, max: 40000 },
            { title: 'Social media & marketing support', desc: 'Posts, captions and a launch campaign for a month.', min: 15000, max: 30000 },
          ],
        },
        {
          name: 'Visibility',
          rows: [
            { title: 'Priority listing & featured campaigns', desc: 'Top placement in the app and launch campaigns.', min: 10000, max: 25000 },
          ],
        },
        {
          name: 'Launch Support',
          rows: [
            { title: 'Dedicated onboarding', desc: 'We set up your menu, staff and pickup flow.', min: 10000, max: 20000 },
            { title: 'Offline launch marketing', desc: 'Flyers and on-ground promotion near your store.', min: 8000, max: 15000 },
          ],
        },
        {
          name: 'In-Store Kit',
          rows: [
            { title: 'Counter display & QR kit', desc: 'Printed standee with your ordering QR code.', min: 3000, max: 6000 },
            { title: 'Premium window stickers', desc: 'Founding 100 window & door branding.', min: 2000, max: 5000 },
          ],
        },
      ],
      extras: [
        { name: 'Recognition', items: ['Founding 100 certificate', 'Founding restaurant badge in the app', 'Featured on the Founding 100 wall'] },
        { name: 'Priority Access', items: ['First pick for brand campaigns', 'Early access to new merchant features', 'Invites to Pick At Store launch events'] },
      ],
    },
    groups: [
      { icon: '🎬', name: 'Marketing', items: ['Dedicated Premium Restaurant Video', 'Local Influencer Reel Feature', 'Social Media & Marketing Support'] },
      { icon: '🏅', name: 'Recognition', items: ['Founding 100 Certificate', 'Founding Restaurant Badge', 'Featured on the Founding 100 Wall'] },
      { icon: '⚡', name: 'Priority Access', items: ['Priority consideration for campaigns', 'Early access to new merchant features', 'Invitations to Pick At Store launch events'] },
      { icon: '📣', name: 'Visibility', items: ['Priority Listing & Featured Campaigns', 'Influencer Collabs & Exclusive Reels', 'Brand Visibility'] },
      { icon: '🚀', name: 'Launch Support', items: ['Dedicated Onboarding & Launch Support', 'Exclusive Offline Marketing', 'Exclusive Founding Benefits'] },
      { icon: '🏪', name: 'In-Store Kit', items: ['Counter Display & QR Kit', 'Premium Window Stickers', 'Branded In-Store Materials'] },
    ],
    cta: 'REGISTER RESTAURANT',
    stub: 'MERCHANT PASS',
  },
  customer: {
    tone: 'customer',
    tag: 'OFFICIAL FOUNDING SELECTION',
    serial: '#0001 — #1000',
    eyebrow: "India's first Pre-Dine-In platform",
    num: '1,000',
    title: 'FOUNDING PICKSTARS ACCESS',
    sub: 'Be among the first 1,000 people to experience Pick At Store.',
    listHeading: 'What you get as a Founding Pickstar:',
    groups: [
      { icon: '🍽️', name: 'Exclusive Food Experiences', items: [] },
      { icon: '⏩', name: 'Early Access', items: [] },
      { icon: '🎁', name: 'Founding-User Rewards', items: [] },
      { icon: '🛂', name: 'Pick At Store Passport', items: [] },
      { icon: '⭐', name: 'Founding User Status', items: [] },
      { icon: '☕', name: 'Explore Cafes with Founder', items: [] },
    ],
    cta: 'CLAIM PICKSTARS SPOT',
    stub: 'PICKSTARS PASS',
  },
};

const inr = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/* counts up from 0 once the sheet has landed */
function useCountUp(target, delay = 900, duration = 1300) {
  const [v, setV] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? target : 0
  ));
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return undefined; }
    let raf = 0;
    let start = 0;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const to = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(to); cancelAnimationFrame(raf); };
  }, [target, delay, duration]);
  return v;
}

function SavingsSheet({ data }) {
  let row = 0;
  const lo = useCountUp(data.totalMin);
  const hi = useCountUp(data.totalMax);
  return (
    <>
      <section className="save-sheet" aria-label="Merchant savings sheet">
        <header className="save-sheet__bar">
          <span><span className="save-sheet__bar-star" aria-hidden="true">★</span> {data.title}</span>
          <span className="save-sheet__rates">{data.rates}</span>
        </header>

        <div className="save-sheet__cols" aria-hidden="true">
          <span>Benefit</span>
          <span>Elsewhere</span>
          <span>With PAS</span>
        </div>

        {data.sections.map((sec) => (
          <div key={sec.name} className="save-sheet__section">
            <span className="save-chip">{sec.name}</span>
            <ul className="save-sheet__rows">
              {sec.rows.map((r) => {
                const i = row++;
                return (
                  <li key={r.title} className="save-row" style={{ '--i': i }}>
                    <span className="save-row__star" aria-hidden="true">★</span>
                    <div className="save-row__text">
                      <strong className="save-row__title">{r.title}</strong>
                      <span className="save-row__desc">{r.desc}</span>
                    </div>
                    <span className="save-row__price">
                      <span className="sr-only">Usually </span>
                      <s>{inr(r.min)}–{inr(r.max).slice(1)}</s>
                    </span>
                    <span className="save-row__free">FREE</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <footer className="save-sheet__total">
          <span className="save-sheet__total-label">You save</span>
          <span className="save-sheet__total-num" aria-label={`${inr(data.totalMin)} to ${inr(data.totalMax)}`}>
            {inr(lo)}–{inr(hi).slice(1)}
          </span>
        </footer>
      </section>

      <section className="also-free" aria-labelledby="also-free-title">
        <h4 className="also-free__title" id="also-free-title">Plus, also free</h4>
        <div className="also-free__card">
          {data.extras.map((g) => (
            <div key={g.name} className="also-free__col">
              <h5 className="also-free__name">{g.name}</h5>
              <ul>
                {g.items.map((it) => (
                  <li key={it}><span className="also-free__dot" aria-hidden="true">★</span>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function PassDetailModal({ kind, origin, onClose, onRegister }) {
  const data = kind ? PASS_DETAILS[kind] : null;
  const [closing, setClosing] = useState(false);
  const closeBtn = useRef(null);
  const lastFocus = useRef(null);

  // lock page scroll, focus the close button, close on Escape
  useEffect(() => {
    if (!data) return undefined;
    lastFocus.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => closeBtn.current && closeBtn.current.focus(), 60);
    const onKey = (e) => { if (e.key === 'Escape') requestClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  if (!data) return null;

  function requestClose() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onClose(); return; }
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 320);
  }

  // the sheet grows out of the card that was clicked
  const style = origin ? { '--ox': `${origin.x}px`, '--oy': `${origin.y}px` } : undefined;
  const rich = data.groups.some((g) => g.items.length);

  return createPortal(
    <div
      className={`pass-modal${closing ? ' is-closing' : ''}`}
      style={style}
      onMouseDown={(e) => { if (e.target === e.currentTarget) requestClose(); }}
    >
      <div
        className={`pass-modal__sheet pass-modal__sheet--${data.tone}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pass-modal-title"
      >
        <div className="pass-tag pass-modal__tag">
          <span className="pass-tag__star">★</span>
          <span>{data.tag}</span>
          <span className="pass-tag__serial">{data.serial}</span>
        </div>

        <button ref={closeBtn} type="button" className="pass-modal__close" onClick={requestClose} aria-label="Close details" id="pass-modal-close">
          ✕
        </button>

        <div className="pass-modal__scroll">
          <div className="pass-modal__head">
            <span className="pass-modal__eyebrow">★ {data.eyebrow}</span>
            <div className="pass-modal__headline">
              <span className="pass-num pass-modal__num">{data.num}</span>
              <h3 className="pass-title pass-modal__title" id="pass-modal-title">{data.title}</h3>
            </div>
            <p className="pass-modal__sub">{data.sub}</p>
          </div>

          <h4 className="pass-modal__list-heading">{data.listHeading}</h4>

          {data.savings ? <SavingsSheet data={data.savings} /> : (
          <ul className={`pass-modal__groups${rich ? '' : ' pass-modal__groups--simple'}`}>
            {data.groups.map((g, i) => (
              <li key={g.name} className="pass-modal__group" style={{ '--i': i }}>
                <div className="pass-modal__group-head">
                  <span className="pass-modal__group-icon" aria-hidden="true">{g.icon}</span>
                  <span className="pass-modal__group-name">{g.name}</span>
                </div>
                {g.items.length > 0 && (
                  <ul className="pass-modal__items">
                    {g.items.map((it) => (
                      <li key={it}><span className="perk-star" aria-hidden="true">★</span><span>{it}</span></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          )}

          <a
            id={`pass-modal-cta-${data.tone}`}
            className={`btn-poster ${data.tone === 'merchant' ? 'btn-poster--yellow' : 'btn-poster--red'} pass-modal__cta`}
            href={data.tone === 'merchant' ? RESTAURANT_FORM_URL : CUSTOMER_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onRegister}
          >
            <span>{data.cta}</span>
            <span className="btn-poster__icon">↗</span>
          </a>
        </div>

        <div className="pass-stub pass-modal__stub" aria-hidden="true">
          <div className="pass-stub__barcode">|||| || | ||||| | || ||||</div>
          <span className="pass-stub__label">{data.stub}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
