import React from 'react';

/* Red wax seal with the bag-pin logo pressed in and a yellow
   "FIRST 1,000" ribbon. Pure SVG; animated from CSS (.wax-seal). */

const CX = 90;
const CY = 78;

// wavy wax edge
const blob = (() => {
  const n = 72;
  const pts = [];
  for (let i = 0; i <= n; i += 1) {
    const a = (i / n) * Math.PI * 2;
    const r = 58 + Math.sin(a * 7) * 2.6 + Math.sin(a * 13 + 1.3) * 1.6 + Math.sin(a * 3 + 0.4) * 2.2;
    pts.push([CX + Math.cos(a) * r, CY + Math.sin(a) * r]);
  }
  return `M${pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L')} Z`;
})();

const LOGO = (
  <g>
    <path d="M225.5 192 V172 A150 150 0 0 1 525.5 172 V192" fill="none" strokeWidth="56" />
    <path d="M120 163 H630 Q675 163 680 210 L748 735 Q752 788 700 788 H50 Q-2 788 2 735 L70 210 Q75 163 120 163 Z" />
    <path d="M375 645 L268 495 A143 143 0 1 1 482 495 Z" fill="var(--seal-pin)" />
    <circle cx="375" cy="400" r="93" />
  </g>
);

export default function WaxSeal() {
  return (
    <svg viewBox="0 0 180 200" className="wax-seal__svg" aria-hidden="true">
      <defs>
        <radialGradient id="waxBody" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#d8322a" />
          <stop offset="45%" stopColor="#9c0f0c" />
          <stop offset="100%" stopColor="#560504" />
        </radialGradient>
        <radialGradient id="waxPool" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#8a0c09" />
          <stop offset="100%" stopColor="#5c0604" />
        </radialGradient>
        <linearGradient id="ribbonY" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd84d" />
          <stop offset="100%" stopColor="#f0a800" />
        </linearGradient>
        <linearGradient id="sealShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="sealClip">
          <path d={blob} />
        </clipPath>
        <path id="sealRingText" d={`M${CX - 40} ${CY} A40 40 0 1 1 ${CX + 40} ${CY} A40 40 0 1 1 ${CX - 40} ${CY}`} />
        <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="2" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* ribbon tails behind the seal */}
      <g className="wax-seal__tails" stroke="#000" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M70 108 L46 186 L58 178 L66 194 L88 116 Z" fill="url(#ribbonY)" />
        <path d="M110 108 L134 186 L122 178 L114 194 L92 116 Z" fill="url(#ribbonY)" />
        <path d="M70 108 L58 150 L76 116 Z M110 108 L122 150 L104 116 Z" fill="#c98a00" stroke="none" />
      </g>

      <g filter="url(#sealShadow)">
        {/* sticker-style halo so the seal reads on the red poster */}
        <path d={blob} fill="none" stroke="#000" strokeWidth="11" strokeLinejoin="round" />
        <path d={blob} fill="none" stroke="#ffc21a" strokeWidth="7" strokeLinejoin="round" />
        {/* wax body */}
        <path d={blob} fill="url(#waxBody)" stroke="#000" strokeWidth="2" />
        {/* drips */}
        <path d="M128 112 Q134 128 129 136 Q123 140 122 130 Q121 120 118 116 Z" fill="url(#waxBody)" stroke="#000" strokeWidth="1.6" />
        <path d="M44 106 Q38 116 42 121 Q47 124 49 115 Z" fill="url(#waxBody)" stroke="#000" strokeWidth="1.4" />
        <g clipPath="url(#sealClip)">
          {/* pressed pool */}
          <circle cx={CX} cy={CY} r="44" fill="url(#waxPool)" />
          {/* raised rim: light top-left, dark bottom-right */}
          <circle cx={CX} cy={CY} r="45" fill="none" stroke="#ff8a76" strokeWidth="3" strokeDasharray="70 300" strokeDashoffset="150" strokeLinecap="round" opacity="0.8" />
          <circle cx={CX} cy={CY} r="45" fill="none" stroke="#4a0403" strokeWidth="2.5" strokeDasharray="90 300" strokeDashoffset="10" strokeLinecap="round" opacity="0.7" />
          {/* embossed ring text */}
          <text className="wax-seal__ring" fill="#ff8a76" opacity="0.6" transform="translate(0.6 0.6)">
            <textPath href="#sealRingText" startOffset="0">★ PICK AT STORE ★ HYDERABAD ★ FIRST 1,000</textPath>
          </text>
          <text className="wax-seal__ring" fill="#ffd27a">
            <textPath href="#sealRingText" startOffset="0">★ PICK AT STORE ★ HYDERABAD ★ FIRST 1,000</textPath>
          </text>
          <circle cx={CX} cy={CY} r="31" fill="none" stroke="#5a0605" strokeWidth="1.2" />
          <circle cx={CX - 0.6} cy={CY - 0.6} r="31" fill="none" stroke="#ff7a68" strokeWidth="0.8" opacity="0.6" />
          {/* embossed logo: highlight, shadow, face */}
          <g transform={`translate(${CX - 20.6} ${CY - 26.5}) scale(0.055)`}>
            <g fill="#ff8a76" stroke="#ff8a76" style={{ '--seal-pin': '#ff8a76' }} transform="translate(-28 -28)" opacity="0.8">{LOGO}</g>
            <g fill="#4a0403" stroke="#4a0403" style={{ '--seal-pin': '#4a0403' }} transform="translate(30 30)">{LOGO}</g>
            <g fill="#c4160f" stroke="#c4160f" style={{ '--seal-pin': '#ffc21a' }}>{LOGO}</g>
          </g>
          {/* gloss */}
          <ellipse cx="66" cy="44" rx="20" ry="9" fill="#fff" opacity="0.28" transform="rotate(-30 66 44)" />
          <ellipse cx="60" cy="40" rx="6" ry="2.6" fill="#fff" opacity="0.55" transform="rotate(-30 60 40)" />
          {/* moving shine */}
          <rect className="wax-seal__shine" x="-60" y="0" width="40" height="160" fill="url(#sealShine)" transform="rotate(20 90 78)" />
        </g>
      </g>

      {/* front banner */}
      <g className="wax-seal__banner">
        <path d="M8 124 L22 118 L18 132 L22 146 L8 140 Z" fill="#c98a00" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
        <path d="M172 124 L158 118 L162 132 L158 146 L172 140 Z" fill="#c98a00" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 116 Q90 100 162 116 L162 144 Q90 128 18 144 Z" fill="url(#ribbonY)" stroke="#000" strokeWidth="2.4" strokeLinejoin="round" />
        <path id="bannerTextPath" d="M26 136 Q90 121 154 136" fill="none" />
        <text className="wax-seal__label" textAnchor="middle">
          <textPath href="#bannerTextPath" startOffset="50%">FIRST 1,000</textPath>
        </text>
      </g>
    </svg>
  );
}
