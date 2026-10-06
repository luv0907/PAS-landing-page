import React from 'react';

/* Top corners: Irani chai being poured (left) and a steaming biryani handi (right). */
export default function TopDecors() {
  return (
    <div className="poster-top-decors" aria-hidden="true">
      {/* ---------- Irani chai ---------- */}
      <div className="decor-chai">
        <svg viewBox="0 0 220 230" className="decor-svg">
          <defs>
            <linearGradient id="chaiPour" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0a24a" />
              <stop offset="100%" stopColor="#c8641c" />
            </linearGradient>
            <linearGradient id="chaiGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f6b25a" />
              <stop offset="100%" stopColor="#b4561a" />
            </linearGradient>
            <filter id="decoShadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="3" dy="7" stdDeviation="5" floodColor="#000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* kettle */}
          <g className="chai-kettle" filter="url(#decoShadow)">
            <g transform="translate(18 18) rotate(26 60 50)">
              <path d="M20 38 Q60 8 100 38" fill="none" stroke="#111" strokeWidth="7" strokeLinecap="round" />
              <path d="M10 46 Q10 30 60 30 Q110 30 110 46 L116 94 Q116 110 60 110 Q4 110 4 94 Z" fill="#fff" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
              <path d="M8 70 H113" stroke="#ff3b2f" strokeWidth="8" />
              <path d="M8 70 H113" stroke="#000" strokeWidth="1.2" transform="translate(0 -4)" />
              <path d="M8 70 H113" stroke="#000" strokeWidth="1.2" transform="translate(0 4)" />
              <ellipse cx="60" cy="32" rx="34" ry="8" fill="#ffc21a" stroke="#000" strokeWidth="3" />
              <circle cx="60" cy="22" r="7" fill="#ffc21a" stroke="#000" strokeWidth="3" />
              <path d="M112 62 Q140 60 150 78 L144 84 Q134 72 114 78 Z" fill="#fff" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
              <path d="M22 50 Q20 80 28 98" stroke="#000" strokeOpacity="0.12" strokeWidth="6" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* chai stream */}
          <path className="chai-stream" d="M139.5 131 C140.5 148 151 156 152.5 180 L159.5 180 C158.5 154 149 144 147.5 133 Z" fill="url(#chaiPour)" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
          <path className="chai-stream-hl" d="M143.5 136 C145 150 154 158 155.5 174" fill="none" stroke="#ffe3b0" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="5 7" />

          {/* cutting-chai glass */}
          <g filter="url(#decoShadow)">
            <path d="M126 166 H186 L178 222 H134 Z" fill="url(#chaiGlass)" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M126 166 H186 L184 178 H128 Z" fill="#ffe7c2" stroke="#000" strokeWidth="2" />
            <path d="M132 188 L140 220 M146 188 L150 220 M162 188 L162 220 M176 188 L172 220" stroke="#fff" strokeOpacity="0.35" strokeWidth="2.5" />
            <path d="M130 170 L136 214" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* the stream entering the chai + ripples */}
          <path d="M152.5 166 L159.5 166 L159.5 172 L152.5 172 Z" fill="url(#chaiPour)" />
          <ellipse className="chai-ripple" cx="156" cy="171" rx="9" ry="2.4" fill="none" stroke="#c8641c" strokeWidth="1.4" />
          <ellipse className="chai-ripple chai-ripple--b" cx="156" cy="171" rx="9" ry="2.4" fill="none" stroke="#c8641c" strokeWidth="1.2" />
          {/* steam */}
          <g className="chai-steam" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <path d="M170 160 C164 150 176 144 170 134" />
            <path d="M182 158 C176 148 188 142 182 132" />
          </g>
          {/* Osmania biscuit */}
          <g className="chai-biscuit">
            <circle cx="104" cy="204" r="20" fill="#ffc21a" stroke="#000" strokeWidth="3" />
            <circle cx="104" cy="204" r="14" fill="none" stroke="#c98a00" strokeWidth="1.6" strokeDasharray="3 4" />
            {[[98, 198], [110, 200], [102, 210], [110, 212], [96, 208]].map(([x, y]) => (
              <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="#8a5a00" />
            ))}
          </g>
        </svg>
      </div>

      {/* ---------- Biryani handi ---------- */}
      <div className="decor-handi">
        <svg viewBox="0 0 240 240" className="decor-svg">
          <defs>
            <linearGradient id="handiBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff5a3d" />
              <stop offset="55%" stopColor="#d9261b" />
              <stop offset="100%" stopColor="#8e140c" />
            </linearGradient>
            <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffe27a" />
              <stop offset="100%" stopColor="#e0a000" />
            </linearGradient>
          </defs>

          {/* steam + flying rice */}
          <g className="handi-steam" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" opacity="0.9">
            <path d="M92 92 C82 76 100 68 90 52" />
            <path d="M118 88 C108 72 126 64 116 48" />
            <path d="M146 92 C136 76 154 68 144 52" />
          </g>
          <g className="handi-rice" fill="#fff" stroke="#000" strokeWidth="1.2">
            <ellipse cx="70" cy="78" rx="5" ry="2.2" transform="rotate(-30 70 78)" />
            <ellipse cx="168" cy="70" rx="5" ry="2.2" transform="rotate(25 168 70)" />
            <ellipse cx="132" cy="58" rx="5" ry="2.2" transform="rotate(-10 132 58)" />
            <ellipse cx="100" cy="64" rx="4.5" ry="2" fill="#ffc21a" transform="rotate(40 100 64)" />
          </g>

          <g filter="url(#decoShadow)">
            {/* pot */}
            <path d="M40 132 C24 214 216 214 200 132 Z" fill="url(#handiBody)" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
            <path d="M48 160 Q120 176 192 160" fill="none" stroke="#ffc21a" strokeWidth="5" />
            <path d="M54 178 Q120 192 186 178" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="3" />
            {/* brass rim */}
            <rect x="34" y="118" width="172" height="18" rx="8" fill="url(#brass)" stroke="#000" strokeWidth="3.5" />
            {/* rice mound */}
            <path d="M52 120 Q120 84 188 120 Z" fill="#fff8e6" stroke="#000" strokeWidth="3" />
            <g fill="#ffc21a" stroke="none">
              <ellipse cx="96" cy="108" rx="6" ry="2.4" transform="rotate(-20 96 108)" />
              <ellipse cx="124" cy="100" rx="6" ry="2.4" transform="rotate(15 124 100)" />
              <ellipse cx="150" cy="110" rx="6" ry="2.4" transform="rotate(-8 150 110)" />
              <ellipse cx="112" cy="112" rx="5" ry="2.2" fill="#ff7a1a" />
              <ellipse cx="138" cy="104" rx="5" ry="2.2" fill="#ff7a1a" />
            </g>
            {/* dough seal */}
            <path d="M34 127 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* lifted lid */}
          <g className="handi-lid">
            <path d="M48 64 Q120 20 192 64 Z" fill="url(#brass)" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" transform="rotate(-10 120 50)" />
            <circle cx="114" cy="30" r="9" fill="#ffc21a" stroke="#000" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}
