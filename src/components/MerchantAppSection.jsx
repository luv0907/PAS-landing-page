import React from 'react';
import { RESTAURANT_FORM_URL } from '../lib/links';


/* Founding-restaurant perks, one short line each */
const STROKE = { stroke: '#000', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const PERKS = [
  {
    title: 'Launch Video & Reels',
    line: 'Premium video + influencer reel',
    icon: (
      <>
        <rect x="6" y="14" width="26" height="20" rx="4" fill="#ff3b2f" {...STROKE} />
        <path d="M32 21 L42 15 V33 L32 27 Z" fill="#ffc21a" {...STROKE} />
        <circle cx="13" cy="20" r="2" fill="#fff" />
      </>
    ),
  },
  {
    title: 'Founding 100 Badge',
    line: 'Certificate, badge & the Wall',
    icon: (
      <>
        <path d="M17 28 L13 44 L19 40 L22 46 L24 30 M31 28 L35 44 L29 40 L26 46 L24 30" fill="#ff3b2f" {...STROKE} />
        <circle cx="24" cy="18" r="13" fill="#ffc21a" {...STROKE} />
        <text x="24" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="sans-serif">100</text>
      </>
    ),
  },
  {
    title: 'First In Line',
    line: 'Early features & launch events',
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
    title: 'Top Visibility',
    line: 'Priority listing & campaigns',
    icon: (
      <>
        <path d="M14 28 L17 40 H22 L20 29" fill="#fff" {...STROKE} />
        <path d="M6 20 H14 L32 10 V38 L14 28 H6 Z" fill="#ffc21a" {...STROKE} />
        <path d="M37 18 Q41 24 37 30 M41 13 Q48 24 41 35" fill="none" {...STROKE} />
      </>
    ),
  },
  {
    title: 'Launch Support',
    line: 'Onboarding & offline marketing',
    icon: (
      <>
        <path d="M4 22 L14 14 L24 20 L34 14 L44 22 L34 34 L24 40 L14 34 Z" fill="#ffc21a" {...STROKE} />
        <path d="M14 26 L22 33 M19 23 L27 30 M24 20 L31 26" fill="none" {...STROKE} />
      </>
    ),
  },
  {
    title: 'In-Store QR Kit',
    line: 'Counter display & stickers',
    icon: (
      <>
        <rect x="9" y="4" width="30" height="34" rx="3" fill="#fff" {...STROKE} />
        <path d="M14 9 h7 v7 h-7z M27 9 h7 v7 h-7z M14 23 h7 v7 h-7z M27 24 h3 v3 h-3z M31 28 h3 v3 h-3z" fill="#000" />
        <path d="M13 38 L8 45 H40 L35 38 Z" fill="#ff3b2f" {...STROKE} />
      </>
    ),
  },
];

export default function MerchantAppSection() {

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

            <p className="torn-lead">
              Just <strong>100 restaurants</strong> for our first Hyderabad launch. Be one of the first building the future of pickup.
            </p>

            <div className="torn-eyebrow">WHAT YOU GET AS A FOUNDING RESTAURANT</div>
            <ul className="perk-grid">
              {PERKS.map((p, i) => (
                <li key={p.title} className="perk-tile" style={{ '--r': `${[-2, 1.5, -1, 2, -1.5, 1][i]}deg` }}>
                  <svg viewBox="0 0 48 48" className="perk-tile__icon" aria-hidden="true">{p.icon}</svg>
                  <span className="perk-tile__title">{p.title}</span>
                  <span className="perk-tile__line">{p.line}</span>
                </li>
              ))}
            </ul>

            <div className="torn-cta">
              <a className="btn-poster btn-poster--red" href={RESTAURANT_FORM_URL} target="_blank" rel="noopener noreferrer">
                <span>BECOME A FOUNDING RESTAURANT</span>
                <span className="btn-poster__icon">↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
