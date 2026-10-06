import React from 'react';
import { SketchDefs, SketchBirds, rnd, INK, PAPER, PAPER_DK, WASH, ACCENT } from './sketch';

/* Ink-etched Hyderabad landmarks for the map route (viewBox 480 × 300). */

const ln = (d, w = 0.8, o = 1, key) => <path key={key} d={d} fill="none" stroke={INK} strokeWidth={w} strokeOpacity={o} strokeLinecap="round" />;


/* ================= HITEC City + Pick At Store ================= */
export function HitecLandmark() {
  const grid = (x, y, cols, rows, gx, gy, w, h, seed) => {
    const r = rnd(seed);
    return Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols;
      const rr = Math.floor(i / cols);
      const lit = r() > 0.55;
      return (
        <rect
          key={i}
          x={x + c * gx}
          y={y + rr * gy}
          width={w}
          height={h}
          fill={lit ? WASH : 'url(#skHatchDense)'}
          className={lit ? 'lm-win' : undefined}
          style={lit ? { animationDelay: `${-r() * 5}s` } : undefined}
        />
      );
    });
  };
  return (
    <svg viewBox="0 0 480 300" className="lm-svg" aria-hidden="true">
      <SketchDefs />
      <circle cx="240" cy="120" r="110" fill={WASH} opacity="0.8" filter="url(#skWash)" />
      <SketchBirds x={190} y={40} s={0.8} />

      <g filter="url(#skRough)">
        {/* Cyber Towers: the curved glass facade */}
        <path d="M18 270 V118 Q98 64 178 118 V270 Z" fill={PAPER} stroke={INK} strokeWidth="1.2" />
        <path d="M138 86 Q164 98 178 118 V270 H138 Z" fill="url(#skHatchLight)" />
        {Array.from({ length: 16 }, (_, i) => ln(`M${20} ${126 + i * 9} H176`, 0.45, 0.7, `ct${i}`))}
        {Array.from({ length: 11 }, (_, i) => ln(`M${30 + i * 14} ${100 - Math.sin(((i + 0.5) / 11) * Math.PI) * 18 + 22} V268`, 0.45, 0.6, `cv${i}`))}
        <g>{grid(22, 128, 11, 15, 14, 9, 10, 6, 4)}</g>
        <line x1="98" y1="82" x2="98" y2="48" stroke={INK} strokeWidth="1" />
        <path d="M86 86 Q98 76 110 86" fill="none" stroke={INK} strokeWidth="0.8" />

        {/* tall towers */}
        <rect x="336" y="56" width="54" height="214" fill={PAPER} stroke={INK} strokeWidth="1.2" />
        <rect x="372" y="56" width="18" height="214" fill="url(#skHatch)" />
        <path d="M336 56 L363 30 L390 56 Z" fill={PAPER} stroke={INK} strokeWidth="1.1" />
        <path d="M363 30 L390 56 H372 Z" fill="url(#skHatch)" />
        <g>{grid(340, 64, 4, 22, 9, 9.3, 6, 6, 8)}</g>
        <rect x="396" y="108" width="62" height="162" fill={PAPER} stroke={INK} strokeWidth="1.2" />
        <rect x="438" y="108" width="20" height="162" fill="url(#skHatch)" />
        <g>{grid(400, 116, 5, 16, 11, 9.5, 7, 6, 12)}</g>
        <path d="M396 108 h62 v-6 h-62 z" fill={PAPER_DK} stroke={INK} strokeWidth="0.8" />

        {/* metro viaduct */}
        <rect x="0" y="196" width="480" height="10" fill="url(#skStone)" stroke={INK} strokeWidth="1" />
        <rect x="0" y="206" width="480" height="3" fill="url(#skHatchDense)" />
        {[40, 140, 330, 430].map((x) => (
          <g key={x}>
            <path d={`M${x - 10} 209 h28 l-6 8 v53 h-16 v-53 z`} fill={PAPER} stroke={INK} strokeWidth="0.9" />
            <rect x={x + 4} y="217" width="8" height="53" fill="url(#skHatch)" />
          </g>
        ))}
      </g>
      <circle cx="98" cy="46" r="3" fill={ACCENT} stroke={INK} strokeWidth="0.8" className="lm-beacon" />

      {/* metro train */}
      <g className="lm-metro">
        <g stroke={INK} strokeWidth="0.9" strokeLinejoin="round">
          {[0, 52, 104].map((dx, i) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              <path d={i === 2 ? 'M0 166 H40 Q50 166 50 180 V196 H0 Z' : 'M0 166 H48 V196 H0 Z'} fill="#fffaf0" />
              <rect x="0" y="186" width={i === 2 ? 50 : 48} height="5" fill={ACCENT} strokeWidth="0" />
              {[5, 18, 31].map((wx) => (
                <rect key={wx} x={wx} y="171" width="10" height="9" fill="url(#skCross)" strokeWidth="0.6" />
              ))}
              <line x1="0" y1="183" x2={i === 2 ? 50 : 48} y2="183" strokeWidth="0.5" />
            </g>
          ))}
        </g>
      </g>

      {/* ---- Pick At Store storefront — the destination ---- */}
      <g filter="url(#skRough)">
        <rect x="174" y="182" width="132" height="102" fill="url(#skStone)" stroke={INK} strokeWidth="1.3" />
        <rect x="284" y="182" width="22" height="102" fill="url(#skHatch)" />
        <rect x="174" y="150" width="132" height="32" rx="4" fill="#fffaf0" stroke={INK} strokeWidth="1.2" />
        <text x="256" y="171" textAnchor="middle" className="lm-store-sign">PICK AT STORE</text>
        {/* awning */}
        <path d="M164 200 H316 L322 222 H158 Z" fill="#fffaf0" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${160 + i * 15} 222 L${166 + i * 13.9} 200 H${173 + i * 13.9} L${167.5 + i * 15} 222 Z`} fill={ACCENT} />
        ))}
        <path d="M158 216 H322 V222 H158 Z" fill="url(#skHatchLight)" />
        <path d="M164 200 H316 L322 222 H158 Z" fill="none" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
        <path d={`M158 222 ${Array.from({ length: 11 }, () => 'a7.45 5 0 0 0 14.9 0').join(' ')}`} fill="#fffaf0" stroke={INK} strokeWidth="0.8" />
        {/* glass door + windows with warm light */}
        <rect x="222" y="236" width="36" height="48" fill="#5c0905" stroke={INK} strokeWidth="1.1" />
        <rect x="222" y="236" width="36" height="48" fill="url(#lmDoorGlow)" />
        <line x1="240" y1="236" x2="240" y2="284" stroke={INK} strokeWidth="0.8" />
        {[184, 266].map((wx) => (
          <g key={wx}>
            <rect x={wx} y="236" width="30" height="28" fill="#5c0905" stroke={INK} strokeWidth="1" />
            <rect x={wx} y="236" width="30" height="28" fill="url(#lmDoorGlow)" />
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${wx + 4 + k * 9} 258 h6 l-1 6 h-4 z`} fill={k % 2 ? '#fffaf0' : WASH} stroke={INK} strokeWidth="0.5" />
            ))}
          </g>
        ))}
        {/* potted plants by the door */}
        {[210, 270].map((px) => (
          <g key={px}>
            <path d={`M${px - 6} 284 l2 -10 h8 l2 10 z`} fill={ACCENT} stroke={INK} strokeWidth="0.7" />
            <path d={`M${px} 274 q-8 -10 -4 -18 M${px} 274 q8 -10 4 -18 M${px} 274 v-16`} fill="none" stroke={INK} strokeWidth="0.8" />
          </g>
        ))}
        {ln('M0 284 H480', 1.2, 1, 'ground')}
        <rect x="0" y="284" width="480" height="16" fill="url(#skStipple)" />
      </g>
      <defs>
        <radialGradient id="lmDoorGlow" cx="50%" cy="100%" r="95%">
          <stop offset="0%" stopColor="#ffd54a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffd54a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* logo on the sign */}
      <g transform="translate(182 154)">
        <g transform="scale(0.031)">
          <path d="M225.5 192 V172 A150 150 0 0 1 525.5 172 V192" fill="none" stroke="#b32a26" strokeWidth="48" />
          <path d="M120 163 H630 Q675 163 680 210 L748 735 Q752 788 700 788 H50 Q-2 788 2 735 L70 210 Q75 163 120 163 Z" fill="#b32a26" />
          <path d="M14 620 Q375 470 736 620" fill="none" stroke="#ffc808" strokeWidth="11" />
          <path d="M375 645 L268 495 A143 143 0 1 1 482 495 Z" fill="#ffc808" stroke="#b32a26" strokeWidth="16" />
          <circle cx="375" cy="400" r="93" fill="#b32a26" />
        </g>
      </g>
    </svg>
  );
}
