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
