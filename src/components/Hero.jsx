import React, { useEffect, useState, useRef } from 'react';
import StampLayer from './StampLayer';
import TopDecors from './TopDecors';
import CharminarScene from './CharminarScene';
import ContactPlate from './ContactPlate';
import { CUSTOMER_FORM_URL, RESTAURANT_FORM_URL } from '../lib/links';
import WaxSeal from './WaxSeal';
import PassDetailModal from './PassDetailModal';


export default function Hero() {
  // phones show one pass at a time, switched with the toggle above it
  const [pass, setPass] = useState('customer');
  const [thud, setThud] = useState(false);
  // which registration card's full-detail sheet is open (and where it grows from)
  const [detail, setDetail] = useState(null);

  const openDetail = (kind) => (e) => {
    const card = e.currentTarget.closest('.pass-card');
    const r = card ? card.getBoundingClientRect() : null;
    setDetail({ kind, origin: r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null });
  };

  // on arrival, glide down to the registration cards once the intro has played
  const registerRef = useRef(null);
  useEffect(() => {
    if (window.location.hash) return undefined;
    let cancelled = false;
    let t = 0;
    const cancel = () => { cancelled = true; clearTimeout(t); };
    const userMoved = ['wheel', 'touchstart', 'keydown', 'mousedown'];
    userMoved.forEach((ev) => window.addEventListener(ev, cancel, { once: true, passive: true }));
    const go = () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      t = setTimeout(() => {
        const el = registerRef.current;
        if (cancelled || !el || window.scrollY > 80) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 12;
        window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      }, reduce ? 300 : 1500);
    };
    if (document.documentElement.classList.contains('pas-loaded')) go();
    else window.addEventListener('pas:loaded', go, { once: true });
    return () => {
      cancel();
      window.removeEventListener('pas:loaded', go);
      userMoved.forEach((ev) => window.removeEventListener(ev, cancel));
    };
  }, []);

  // the title block shakes at the moment the rubber stamp hits the poster
  const [stampRun, setStampRun] = useState(0);
  const timers = useRef([]);
  const shakeAt = (ms) => {
    timers.current.push(setTimeout(() => setThud(true), ms));
    timers.current.push(setTimeout(() => setThud(false), ms + 380));
  };
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // stamp starts 0.9s after the loader hands over; it hits ~0.47s into its 0.9s press
    const start = () => shakeAt(900 + 470);
    if (document.documentElement.classList.contains('pas-loaded')) start();
    else window.addEventListener('pas:loaded', start, { once: true });
    return () => {
      window.removeEventListener('pas:loaded', start);
      timers.current.forEach(clearTimeout);
    };
  }, []);
  // tap the seal to stamp it again
  const restamp = () => {
    setStampRun((n) => n + 1);
    shakeAt(470);
  };
  const onKey = (fn) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };

  return (
    <section className="poster-hero" id="hero">
      {/* Hanging turntable (left) & pouring red cup (right) */}
      <TopDecors />

      <StampLayer
        stamps={[
          { x: 9, y: 'top', off: 250, only: 'desktop', shape: 'round', tone: 'yellow', main: 'PAS', sub: 'HYD', rot: -12, waves: true },
          { x: 91, y: 'top', off: 270, only: 'desktop', shape: 'postage', tone: 'yellow', main: '★', sub: 'LOCAL', rot: 10 },
          { x: 17, y: 'bottom', off: 18, moff: 10, shape: 'rect', tone: 'yellow', border: 'dashed', main: '1,000', sub: 'PICKSTARS', rot: 8 },
          { x: 83, y: 'bottom', off: 18, moff: 10, shape: 'rect', tone: 'yellow', border: 'double', main: '★★★', sub: 'PICKUP', rot: -10 },
        ]}
      />

      <div className="poster-inner">
        <a className="register-cue__badge register-cue__badge--top" href="#register">Registrations open</a>

        {/* "… PRESENTS" brand tag */}
        <header className="poster-top-brand">
          {/* official logo artwork (exact layout), PRESENTS tucked under "store", on a clean white card */}
          <a className="brand-lockup" href="https://www.pickatstore.io/" aria-label="Pick At Store – go to the main website">
            <span className="brand-lockup__art">
              <img src="/images/pas-logo-horizontal-900.webp" alt="Pick At Store" width="900" height="419" className="brand-lockup__logo" decoding="async" fetchpriority="high" />
              <span className="brand-lockup__presents" aria-hidden="true">P R E S E N T S</span>
            </span>
          </a>
        </header>

        {/* Masthead: badges flanking the 3D block title */}
        <div className="masthead">
          <div className="side-badge side-badge--left" aria-label="Skip the queue">
            {/* a queue of three people, and a bag-pin arrow jumping past them */}
            <svg viewBox="0 0 80 80" className="side-badge__icon" aria-hidden="true">
              <path d="M6 70 H74" stroke="#000" strokeWidth="4" strokeLinecap="round" />
              {[42, 26, 10].map((x, i) => (
                <g key={x} stroke="#000" strokeWidth="3" strokeLinejoin="round">
                  <path d={`M${x - 7} 70 V58 Q${x - 7} 50 ${x} 50 Q${x + 7} 50 ${x + 7} 58 V70 Z`} fill={i === 0 ? '#fff' : '#ffc21a'} />
                  <circle cx={x} cy="43" r="5.5" fill={i === 0 ? '#fff' : '#ffc21a'} />
                </g>
              ))}
              <path className="skip-arrow" d="M8 34 C18 4 52 4 63 30" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeDasharray="5 6" />
              <path d="M55 25 L64 33 L68 21" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <g transform="translate(64 44)">
                <path d="M0 26 L-7 15 A9 9 0 1 1 7 15 Z" fill="#ff3b2f" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
                <circle cx="0" cy="8" r="3.4" fill="#ffc21a" stroke="#000" strokeWidth="1.6" />
              </g>
            </svg>
            <span className="side-badge__big">SKIP THE</span>
            <span className="side-badge__small">QUEUE</span>
          </div>

          <div className="title-assembly">
            <div className="title-banner">
              <span>BE AMONG THE FIRST 1,000</span>
            </div>

            <div className={`title-block${thud ? ' is-thud' : ''}`}>
              <h1 className="title-words">
                <span className="title-line title-line--pickat drop-head">FOUNDING</span>
                <span className="title-line title-line--store drop-head" style={{ '--d': '140ms' }}>
                  PICK STARS
                  {/* wax seal stamped onto the top-right corner of the final S */}
                  <span
                    key={stampRun}
                    className={`title-stamp wax-seal${stampRun ? ' is-restamp' : ''}`}
                    aria-hidden="true"
                    onClick={restamp}
                  >
                    <WaxSeal />
                    <span className="stamp-ink" />
                  </span>
                </span>
              </h1>
            </div>
          </div>

          <div className="side-badge side-badge--right" aria-label="Just 100 restaurants in Hyderabad">
            <svg viewBox="0 0 80 80" className="side-badge__icon" aria-hidden="true">
              <rect x="14" y="18" width="52" height="50" rx="8" fill="#fff" stroke="#000" strokeWidth="4.5" />
              <path d="M14 34 V26 a8 8 0 0 1 8 -8 h36 a8 8 0 0 1 8 8 v8 Z" fill="#ff3b2f" stroke="#000" strokeWidth="4" />
              <rect x="23" y="9" width="7" height="15" rx="3" fill="#ffc21a" stroke="#000" strokeWidth="3" />
              <rect x="50" y="9" width="7" height="15" rx="3" fill="#ffc21a" stroke="#000" strokeWidth="3" />
              <g fill="#ff3b2f" stroke="#000" strokeWidth="2">
                <rect x="22" y="40" width="9" height="8" rx="1.5" />
                <rect x="35.5" y="40" width="9" height="8" rx="1.5" />
                <rect x="49" y="40" width="9" height="8" rx="1.5" />
                <rect x="22" y="53" width="9" height="8" rx="1.5" />
                <rect x="35.5" y="53" width="9" height="8" rx="1.5" fill="#ffc21a" />
              </g>
              <circle cx="58" cy="60" r="11" fill="#ffc21a" stroke="#000" strokeWidth="3.5" />
              <path d="M58 54 V60 L62 62" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <span className="side-badge__big">1000 ONLY</span>
            <span className="side-badge__small">HYDERABAD</span>
          </div>
        </div>

        {/* Charminar pickup street */}
        <CharminarScene />

        {/* Two founding passes */}
        <div className="pass-section" id="hero-action-boxes">
          <div className="register-cue" id="register" ref={registerRef}>
            <p className="register-cue__line">Register now for founding access. Only <strong>1,000 customers</strong> and <strong>100 restaurants</strong>.</p>
            <ol className="register-steps" aria-label="How to register">
              <li><b>1</b> Pick your pass</li>
              <li><b>2</b> Fill the short form</li>
              <li><b>3</b> Get founding perks</li>
            </ol>
          </div>
          <div className="pass-switch" role="tablist" aria-label="Choose your pass">
            <button
              type="button"
              role="tab"
              id="tab-customer"
              aria-selected={pass === 'customer'}
              aria-controls="pass-customer"
              className={`pass-switch__btn ${pass === 'customer' ? 'is-active' : ''}`}
              onClick={() => setPass('customer')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Customers
            </button>
            <button
              type="button"
              role="tab"
              id="tab-merchant"
              aria-selected={pass === 'merchant'}
              aria-controls="pass-merchant"
              className={`pass-switch__btn ${pass === 'merchant' ? 'is-active' : ''}`}
              onClick={() => setPass('merchant')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l2-5h14l2 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M9 22V12h6v10" />
              </svg>
              Restaurants
            </button>
            <span className={`pass-switch__thumb ${pass === 'merchant' ? 'is-right' : ''}`} aria-hidden="true" />
          </div>

          <div className="pass-grid" data-show={pass}>
            <article className="pass-card pass-card--customer is-openable" id="pass-customer" role="tabpanel" aria-labelledby="tab-customer" onClick={openDetail('customer')}>
              <div className="pass-tag">
                <span className="pass-tag__star">★</span>
                <span>OFFICIAL FOUNDING SELECTION</span>
                <span className="pass-tag__serial">#0001 — #1000</span>
              </div>

              <div className="pass-body">
                <div className="pass-num">1,000</div>
                <h3 className="pass-title">FOUNDING PICKSTARS ACCESS</h3>
                <p className="pass-sub">Be among the first 1,000 people to experience Pick At Store</p>

                <ul className="pass-perks pass-perks--grid">
                  {['Exclusive Food Experiences', 'Early Access', 'Founding-User Rewards', 'Pick At Store Passport', 'Founding User Status', 'Explore Cafes with Founder'].map((t) => (
                    <li key={t}>
                      <span className="perk-star">★</span>
                      <span><strong>{t}</strong></span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  id="pass-customer-details"
                  className="pass-more"
                  onClick={(e) => { e.stopPropagation(); openDetail('customer')(e); }}
                  aria-haspopup="dialog"
                >
                  VIEW FULL DETAILS <span aria-hidden="true">+</span>
                </button>

                <a
                  className="btn-poster btn-poster--red"
                  href={CUSTOMER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Claim your Founding Pickstars spot on Google Forms"
                >
                  <span>CLAIM PICKSTARS SPOT</span>
                  <span className="btn-poster__icon">↗</span>
                </a>
              </div>

              <div className="pass-stub" aria-hidden="true">
                <div className="pass-stub__barcode">||| | |||| | || | |||| |||</div>
                <span className="pass-stub__label">PICKSTARS PASS</span>
              </div>
            </article>

            <article className="pass-card pass-card--merchant is-openable" id="pass-merchant" role="tabpanel" aria-labelledby="tab-merchant" onClick={openDetail('merchant')}>
              <div className="pass-tag">
                <span className="pass-tag__star">★</span>
                <span>FLAGSHIP RESTAURANT SELECTION</span>
                <span className="pass-tag__serial">HYD · 100 ONLY</span>
              </div>

              <div className="pass-body">
                <div className="pass-num">100</div>
                <h3 className="pass-title">FOUNDING RESTAURANTS</h3>
                <p className="pass-sub">Just 100 restaurants for our first Hyderabad launch. Be one of the first building the future of pickup.</p>

                <ul className="pass-perks">
                  <li>
                    <span className="perk-star">★</span>
                    <span><strong>Dedicated Premium Restaurant Video</strong> &amp; Local Influencer Reel Feature</span>
                  </li>
                  <li>
                    <span className="perk-star">★</span>
                    <span><strong>Founding 100 Certificate</strong> &amp; Founding Restaurant Badge</span>
                  </li>
                  <li>
                    <span className="perk-star">★</span>
                    <span><strong>Counter Display &amp; QR Kit</strong> with Premium Window Stickers</span>
                  </li>
                </ul>

                <button
                  type="button"
                  id="pass-merchant-details"
                  className="pass-more"
                  onClick={(e) => { e.stopPropagation(); openDetail('merchant')(e); }}
                  aria-haspopup="dialog"
                >
                  VIEW FULL DETAILS <span aria-hidden="true">+</span>
                </button>

                <a
                  className="btn-poster btn-poster--yellow"
                  href={RESTAURANT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Register your restaurant on Google Forms"
                >
                  <span>REGISTER RESTAURANT</span>
                  <span className="btn-poster__icon">↗</span>
                </a>
              </div>

              <div className="pass-stub" aria-hidden="true">
                <div className="pass-stub__barcode">|||| || | ||||| | || ||||</div>
                <span className="pass-stub__label">MERCHANT PASS</span>
              </div>
            </article>
          </div>

          {/* Enquiries bar: WhatsApp / Instagram / YouTube */}
          <ContactPlate />
        </div>
      </div>

      <PassDetailModal
        kind={detail && detail.kind}
        origin={detail && detail.origin}
        onClose={() => setDetail(null)}
        onRegister={() => setDetail(null)}
      />
    </section>
  );
}
