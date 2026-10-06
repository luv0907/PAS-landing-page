import React from 'react';
import FoodStall from './FoodStall';


const V = { stroke: '#000', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
/* who can join: label + small icon (icons show as chips on phones) */
const VENDOR_TYPES = [
  ['Restaurants', <>
    <circle cx="16" cy="17" r="9" fill="#fff" {...V} /><circle cx="16" cy="17" r="5" fill="#ffc21a" {...V} />
    <path d="M4 6 V13 M2.5 6 V10 Q4 12 5.5 10 V6 M28 6 Q25 9 26 14 H28 V27 M4 13 V27" fill="none" {...V} />
  </>],
  ['Cafes', <>
    <path d="M5 12 H23 V20 Q23 27 14 27 Q5 27 5 20 Z" fill="#fff" {...V} />
    <path d="M23 14 Q29 14 28 19 Q27 22 23 21" fill="none" {...V} />
    <path d="M10 4 Q8 7 10 9 M15 3 Q13 6 15 9" fill="none" {...V} />
  </>],
  ['Cloud Kitchens', <>
    <path d="M8 19 Q2 18 4 12 Q5 7 11 8 Q13 3 18 4 Q24 4 24 9 Q30 9 29 15 Q28 19 24 19 Z" fill="#fff" {...V} />
    <rect x="9" y="19" width="14" height="8" rx="1.5" fill="#ff3b2f" {...V} />
  </>],
  ['Bakeries', <>
    <path d="M4 22 Q3 12 16 10 Q29 12 28 22 Q27 25 24 24 Q16 21 8 24 Q5 25 4 22 Z" fill="#ffc21a" {...V} />
    <path d="M11 13 L13 20 M16 11 V20 M21 13 L19 20" fill="none" {...V} />
  </>],
  ['Sweet Stores', <>
    <path d="M11 11 L4 7 L6 16 Z M21 21 L28 25 L26 16 Z" fill="#ffc21a" {...V} />
    <circle cx="16" cy="16" r="7.5" fill="#ff3b2f" {...V} />
    <path d="M12 13 Q16 16 20 13 M12 19 Q16 16 20 19" fill="none" stroke="#fff" strokeWidth="1.6" />
  </>],
];

export default function FoundingPerks() {
  return (
    <section className="vendor-section" id="founding-100">
      <div className="pas-container">
        <div className="vendor-head">
          <span className="sticker-pill">★ HYDERABAD FOUNDING 100 SELECTION</span>
          <h2 className="vendor-title">
            <span className="vendor-title__call drop-head">CALL FOR</span>
            <span className="vendor-title__main drop-head" style={{ '--d': '140ms' }}>VENDORS &amp; STORES</span>
          </h2>
        </div>

        <div className="vendor-core">
          {/* Left: calendar + founding-100 doodles */}
          <div className="vendor-side vendor-side--left">
            <div className="doodle-stack">
              <svg viewBox="0 0 64 64" className="doodle-stack__icon" aria-hidden="true">
                <rect x="8" y="12" width="48" height="44" rx="7" fill="#fff" stroke="#000" strokeWidth="4" />
                <path d="M8 26 V19 a7 7 0 0 1 7 -7 h34 a7 7 0 0 1 7 7 v7 Z" fill="#ff3b2f" stroke="#000" strokeWidth="3.5" />
                <rect x="17" y="5" width="6" height="13" rx="3" fill="#ffc21a" stroke="#000" strokeWidth="2.5" />
                <rect x="41" y="5" width="6" height="13" rx="3" fill="#ffc21a" stroke="#000" strokeWidth="2.5" />
                <g fill="#ff3b2f" stroke="#000" strokeWidth="1.8">
                  <rect x="15" y="32" width="8" height="7" rx="1.5" />
                  <rect x="28" y="32" width="8" height="7" rx="1.5" fill="#ffc21a" />
                  <rect x="41" y="32" width="8" height="7" rx="1.5" />
                  <rect x="15" y="44" width="8" height="7" rx="1.5" />
                  <rect x="28" y="44" width="8" height="7" rx="1.5" />
                </g>
              </svg>
              <span className="doodle-stack__big">2026</span>
              <span className="doodle-stack__small">LAUNCH</span>
            </div>
            <div className="doodle-stack">
              <svg viewBox="0 0 64 64" className="doodle-stack__icon" aria-hidden="true">
                <path d="M14 14 C9 20 15 27 21 22 Z" fill="#ffc21a" stroke="#000" strokeWidth="2.5" />
                <path d="M50 14 C55 20 49 27 43 22 Z" fill="#ffc21a" stroke="#000" strokeWidth="2.5" />
                <circle cx="32" cy="36" r="21" fill="#ff3b2f" stroke="#000" strokeWidth="4" />
                <circle cx="32" cy="36" r="14" fill="#fff" stroke="#000" strokeWidth="2.5" />
                <path d="M32 36 V27 M32 36 H39" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <span className="doodle-stack__big">100</span>
              <span className="doodle-stack__small">ONLY</span>
            </div>
          </div>

          {/* Center: golden board */}
          <div className="vendor-board">
            <ul className="vendor-board__inner">
              {VENDOR_TYPES.map(([label, icon], i) => (
                <li key={label} className="vendor-board__item">
                  {/* on phones each line becomes a torn festival ticket */}
                  <span className="vendor-board__stub" aria-hidden="true">
                    <svg viewBox="0 0 32 32" className="vendor-board__icon">{icon}</svg>
                  </span>
                  <span className="vendor-board__body">
                    <span className="vendor-board__meta" aria-hidden="true">FOUNDING PASS · NO. 00{i + 1}</span>
                    <span className="vendor-board__name">{label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: location pin */}
          <div className="vendor-side vendor-side--right">
            <div className="vendor-loc">
              <svg width="46" height="56" viewBox="0 0 34 42" aria-hidden="true">
                <path d="M17 2C9.3 2 3 8.3 3 16c0 10.5 14 24 14 24s14-13.5 14-24C31 8.3 24.7 2 17 2z" fill="#ff3b2f" stroke="#000" strokeWidth="3" />
                <circle cx="17" cy="16" r="5.5" fill="#fff" stroke="#000" strokeWidth="2.5" />
              </svg>
              <span className="vendor-loc__name">Hyderabad</span>
              <span className="vendor-loc__zones">Kondapur • Madhapur • Jubilee Hills • Gachibowli</span>
            </div>
          </div>
        </div>

        {/* Food stall illustration: striped awning, sizzling grill, iced drink */}
        <div className="vendor-booth" aria-hidden="true">
          <FoodStall />
        </div>

      </div>
    </section>
  );
}
