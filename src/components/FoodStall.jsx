import React, { useEffect, useRef } from 'react';
import { SketchDefs, INK, PAPER, PAPER_DK } from './map/sketch';

/* Hyderabadi street-food stall: striped awning with marigold toran and
   bulbs, a charcoal sigri with seekh kebabs, flames and smoke, a lemon
   soda with ice and rising bubbles, two goli-soda bottles, a stack of
   PAS takeaway boxes. Warm ink + wash style to match the landmarks. */

const RED = '#e8352a';
const YEL = '#ffc21a';
const WOOD = '#b8692e';
const WOOD_DK = '#7d3f17';

const STRIPES = 15;

export default function FoodStall() {
  // only animate while the stall is on screen
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-live', e.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // awning geometry: front edge 40→560 at y 92, back edge 92→508 at y 18
  const stripe = (i) => {
    const t0 = i / STRIPES;
    const t1 = (i + 0.5) / STRIPES;
    const bx0 = 92 + 416 * t0;
    const bx1 = 92 + 416 * t1;
    const fx0 = 40 + 520 * t0;
    const fx1 = 40 + 520 * t1;
    return `M${bx0} 18 L${bx1} 18 L${fx1} 92 L${fx0} 92 Z`;
  };
  const scallopW = 520 / STRIPES;
  const flowers = Array.from({ length: 24 }, (_, i) => {
    const t = i / 23;
    const x = 62 + 476 * t;
    const sag = Math.sin(t * Math.PI * 3) * 6;
    return { x, y: 112 + Math.abs(sag), i };
  });
  const bulbs = Array.from({ length: 9 }, (_, i) => 74 + i * 57);

  return (
    <svg ref={ref} viewBox="0 0 600 330" className="vendor-booth__svg stall" preserveAspectRatio="xMidYMid meet">
      <SketchDefs />
      <defs>
        <linearGradient id="stCoal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffdb5c" />
          <stop offset="45%" stopColor="#ff7a1a" />
          <stop offset="100%" stopColor="#a8140a" />
        </linearGradient>
        <linearGradient id="stFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#e3160b" />
          <stop offset="45%" stopColor="#ff7a1a" />
          <stop offset="85%" stopColor="#ffc21a" />
          <stop offset="100%" stopColor="#fff3a8" />
        </linearGradient>
        <linearGradient id="stSoda" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb547" />
          <stop offset="100%" stopColor="#f07a12" />
        </linearGradient>
        <linearGradient id="stGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="stBottle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9f3e6" />
          <stop offset="0.5" stopColor="#cfe3c9" />
          <stop offset="1" stopColor="#a9c7a2" />
        </linearGradient>
        <radialGradient id="stWarm" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#ffc21a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="stPuff"><stop offset="0" stopColor="#fff" stopOpacity="0.9" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
        <clipPath id="stAwning">
          <path d="M92 18 H508 L560 92 H40 Z" />
        </clipPath>
        <clipPath id="stSodaClip">
          <path d="M136 186 H184 L178 284 H142 Z" />
        </clipPath>
        <filter id="stGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="stSmoke" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="300" cy="318" rx="270" ry="12" fill="#5c0905" opacity="0.35" />

      {/* ---------- stall body ---------- */}
      <g>
        {/* back wall (lit interior) */}
        <rect x="58" y="92" width="484" height="140" fill={PAPER} stroke={INK} strokeWidth="1.4" />
        <rect x="58" y="92" width="484" height="140" fill="url(#stWarm)" opacity="0.8" />
        {/* tiled back wall */}
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 22 }, (_, c) => (
            <rect key={`${r}-${c}`} x={60 + c * 22} y={134 + r * 16} width="22" height="16" fill="none" stroke={INK} strokeWidth="0.4" strokeOpacity="0.35" />
          )),
        )}
        {/* shelf with jars & a PAS sign */}
        <rect x="70" y="132" width="460" height="5" fill={WOOD} stroke={INK} strokeWidth="0.9" />
        {[86, 104, 122, 452, 470, 488, 506].map((x, i) => (
          <g key={x}>
            <rect x={x} y={116} width="13" height="16" rx="2.5" fill={i % 2 ? '#ffd27a' : '#f7a64a'} stroke={INK} strokeWidth="0.8" />
            <rect x={x - 1} y={113} width="15" height="4" rx="1" fill={RED} stroke={INK} strokeWidth="0.6" />
            <path d={`M${x + 3} ${119} v10`} stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" />
          </g>
        ))}
        {/* side posts */}
        <rect x="48" y="86" width="12" height="226" fill={WOOD} stroke={INK} strokeWidth="1.2" />
        <rect x="540" y="86" width="12" height="226" fill={WOOD} stroke={INK} strokeWidth="1.2" />
        <rect x="54" y="86" width="6" height="226" fill="url(#skHatch)" />
        <rect x="546" y="86" width="6" height="226" fill="url(#skHatch)" />

        {/* counter: wooden planks */}
        <rect x="40" y="228" width="520" height="14" fill={PAPER_DK} stroke={INK} strokeWidth="1.3" />
        <rect x="40" y="238" width="520" height="4" fill="url(#skHatch)" />
        <rect x="52" y="242" width="496" height="70" fill={WOOD} stroke={INK} strokeWidth="1.3" />
        {Array.from({ length: 4 }, (_, i) => (
          <line key={i} x1="52" y1={256 + i * 14} x2="548" y2={256 + i * 14} stroke={WOOD_DK} strokeWidth="1" />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <path key={`g${i}`} d={`M${70 + i * 34} ${246 + (i % 4) * 14} q8 3 16 0`} fill="none" stroke={WOOD_DK} strokeWidth="0.6" />
        ))}
        <rect x="52" y="242" width="496" height="70" fill="url(#skHatchLight)" />
        {/* painted red band with stars */}
        <rect x="52" y="272" width="496" height="16" fill={RED} stroke={INK} strokeWidth="1" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={`s${i}`} d={`M${74 + i * 41} 280 l2 -4 l2 4 l4 0 l-3 3 l1 4 l-4 -2 l-4 2 l1 -4 l-3 -3 z`} fill={YEL} transform="translate(-4 -2)" />
        ))}
      </g>

      {/* logo badge on the counter */}
      <g>
        <circle cx="300" cy="280" r="25" fill="#fffaf0" stroke={INK} strokeWidth="1.6" />
        <circle cx="300" cy="280" r="20" fill="none" stroke={RED} strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      <g transform="translate(287.6 266.5) scale(0.033)">
        <path d="M225.5 192 V172 A150 150 0 0 1 525.5 172 V192" fill="none" stroke="#b32a26" strokeWidth="48" />
        <path d="M120 163 H630 Q675 163 680 210 L748 735 Q752 788 700 788 H50 Q-2 788 2 735 L70 210 Q75 163 120 163 Z" fill="#b32a26" />
        <path d="M14 620 Q375 470 736 620" fill="none" stroke="#ffc808" strokeWidth="11" />
        <path d="M375 645 L268 495 A143 143 0 1 1 482 495 Z" fill="#ffc808" stroke="#b32a26" strokeWidth="16" />
        <circle cx="375" cy="400" r="93" fill="#b32a26" />
      </g>

      {/* ---------- sigri (charcoal grill) ---------- */}
      <g>
        {/* smoke */}
        <g className="stall-smoke" fill="url(#stPuff)">
          <circle cx="360" cy="150" r="16" opacity="0.5" />
          <circle cx="400" cy="138" r="20" opacity="0.4" />
          <circle cx="440" cy="150" r="15" opacity="0.45" />
        </g>
        <g className="stall-smoke stall-smoke--b" fill="url(#stPuff)">
          <circle cx="380" cy="120" r="14" opacity="0.35" />
          <circle cx="420" cy="110" r="18" opacity="0.3" />
        </g>
        {/* flames */}
        <g transform="translate(0 41) scale(1 0.8)"><path className="stall-flame" d="M318 206 C322 186 332 194 334 176 C342 190 348 168 356 186 C362 160 372 178 376 158 C384 176 392 168 396 186 C402 170 410 178 414 162 C422 182 430 176 434 190 C440 180 448 188 452 172 C458 190 466 192 470 206 Z" fill="url(#stFlame)" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
        <path className="stall-flame stall-flame--b" d="M334 206 C340 194 346 198 350 186 C356 196 362 184 368 196 C374 182 382 192 388 180 C394 194 404 186 410 198 C418 188 426 194 430 184 C438 196 446 198 452 206 Z" fill="#ffe27a" opacity="0.85" /></g>
        {/* skewers with seekh kebabs */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 196 + (i % 2) * 3;
          const x0 = 304 + i * 4;
          return (
            <g key={i} transform={`rotate(${-2 + i} 392 ${y})`}>
              <line x1={x0} y1={y} x2={x0 + 182} y2={y} stroke="#9a9aa0" strokeWidth="1.6" />
              <circle cx={x0 + 184} cy={y} r="2.4" fill={YEL} stroke={INK} strokeWidth="0.7" />
              <rect x={x0 + 40 + (i % 3) * 6} y={y - 5} width="98" height="10" rx="5" fill="#b4561f" stroke={INK} strokeWidth="1" />
              {Array.from({ length: 7 }, (_, k) => (
                <line key={k} x1={x0 + 50 + k * 13 + (i % 3) * 6} y1={y - 5} x2={x0 + 46 + k * 13 + (i % 3) * 6} y2={y + 5} stroke="#5a1d08" strokeWidth="1.6" />
              ))}
              <path d={`M${x0 + 46 + (i % 3) * 6} ${y - 3} h86`} stroke="#d0763a" strokeWidth="1.2" />
            </g>
          );
        })}
        {/* sigri box */}
        <g>
          <path d="M300 204 H484 L476 230 H308 Z" fill="#2a2a2e" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          <rect x="306" y="204" width="172" height="8" fill="url(#stCoal)" className="stall-coal" />
          {Array.from({ length: 16 }, (_, i) => (
            <circle key={i} cx={312 + i * 10.6} cy={207 + (i % 2) * 2} r="3.2" fill={i % 3 ? '#ff7a1a' : '#ffdb5c'} stroke="#3d1206" strokeWidth="0.6" className="stall-ember" style={{ animationDelay: `${-(i % 5) * 0.4}s` }} />
          ))}
          <path d="M308 216 H476" stroke="#55555b" strokeWidth="1" />
          {[320, 350, 380, 410, 440, 466].map((x) => (
            <rect key={x} x={x} y="218" width="10" height="5" rx="1" fill="#141416" />
          ))}
        </g>
        {/* sparks */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={340 + i * 22} cy="186" r="1.6" fill="#ffdb5c" className="stall-spark" style={{ animationDelay: `${-i * 0.37}s` }} />
        ))}
      </g>

      {/* ---------- goli soda bottles ---------- */}
      {[214, 246].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 228 V196 Q${x} 186 ${x + 6} 182 V168 Q${x + 5} 162 ${x + 8} 160 Q${x + 11} 162 ${x + 10} 168 V182 Q${x + 16} 186 ${x + 16} 196 V228 Z`} fill="url(#stBottle)" stroke={INK} strokeWidth="1.1" />
          <circle cx={x + 8} cy="171" r="3.4" fill="#e8f6ff" stroke={INK} strokeWidth="0.7" />
          <path d={`M${x + 2} 200 V224`} stroke="#fff" strokeWidth="2" strokeOpacity="0.8" />
          <rect x={x + 1} y="204" width="14" height="10" fill={i ? YEL : RED} stroke={INK} strokeWidth="0.6" />
          <circle cx={x + 8} cy="209" r="2.4" fill="#fff" />
        </g>
      ))}

      {/* ---------- lemon soda glass ---------- */}
      <g transform="translate(18 -56)">
        <g clipPath="url(#stSodaClip)">
          <rect x="130" y="200" width="60" height="90" fill="url(#stSoda)" />
          <path d="M130 200 q10 -3 20 0 t20 0 t20 0" fill="#ffe0a3" />
          {/* bubbles */}
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={144 + (i * 7) % 32} cy="278" r={1 + (i % 3) * 0.6} fill="#fff" opacity="0.85" className="stall-bubble" style={{ animationDelay: `${-i * 0.33}s`, animationDuration: `${2.2 + (i % 4) * 0.4}s` }} />
          ))}
          {/* ice cubes */}
          <rect x="146" y="210" width="15" height="14" rx="2" fill="#fff" fillOpacity="0.75" stroke={INK} strokeWidth="0.7" transform="rotate(-12 153 217)" />
          <rect x="160" y="226" width="14" height="13" rx="2" fill="#fff" fillOpacity="0.7" stroke={INK} strokeWidth="0.7" transform="rotate(10 167 232)" />
          <rect x="143" y="244" width="13" height="12" rx="2" fill="#fff" fillOpacity="0.6" stroke={INK} strokeWidth="0.7" transform="rotate(6 150 250)" />
          {/* mint leaves */}
          <path d="M168 206 q8 -6 12 2 q-7 4 -12 -2 z" fill="#ffd27a" stroke={INK} strokeWidth="0.6" />
        </g>
        <path d="M136 186 H184 L178 284 H142 Z" fill="url(#stGlass)" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <ellipse cx="160" cy="186" rx="24" ry="3.2" fill="none" stroke={INK} strokeWidth="1.2" />
        {/* condensation */}
        {[[140, 230], [176, 214], [174, 252], [146, 264], [178, 268]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="1.2" ry="1.8" fill="#fff" opacity="0.85" />
        ))}
        {/* striped straw */}
        <g transform="rotate(14 168 200)">
          <rect x="164" y="140" width="7" height="80" rx="3" fill="#fff" stroke={INK} strokeWidth="1" />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M164 ${146 + i * 11} l7 -5 v4 l-7 5 z`} fill={RED} />
          ))}
        </g>
        {/* lemon wheel on the rim */}
        <g transform="translate(138 184)">
          <circle r="14" fill={YEL} stroke={INK} strokeWidth="1.2" />
          <circle r="11" fill="#fff3a8" stroke="#e0a800" strokeWidth="0.8" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 10} y2={Math.sin(a) * 10} stroke="#e0a800" strokeWidth="0.8" />;
          })}
          <circle r="2" fill="#fff" />
        </g>
        <ellipse cx="160" cy="286" rx="26" ry="3" fill="#000" opacity="0.18" />
      </g>

      {/* ---------- PAS takeaway boxes ---------- */}
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M${80 + i * 3} ${212 - i * 18} h56 v18 h-56 z`} fill={i % 2 ? '#fffaf0' : YEL} stroke={INK} strokeWidth="1" />
            <path d={`M${80 + i * 3} ${212 - i * 18} l6 -5 h56 l-6 5`} fill={PAPER_DK} stroke={INK} strokeWidth="0.8" />
            <rect x={80 + i * 3 + 20} y={216 - i * 18} width="16" height="10" fill={RED} stroke={INK} strokeWidth="0.5" />
          </g>
        ))}
        {/* PAS bag */}
        <path d="M496 192 H530 L527 228 H499 Z" fill={YEL} stroke={INK} strokeWidth="1.1" />
        <path d="M514 192 H530 L527 228 H514 Z" fill="url(#skHatchLight)" />
        <path d="M504 192 V186 A9 9 0 0 1 522 186 V192" fill="none" stroke={INK} strokeWidth="1.2" />
        <rect x="496" y="192" width="34" height="6" fill={RED} stroke={INK} strokeWidth="0.8" />
      </g>

      {/* ---------- awning ---------- */}
      <g>
        <path d="M92 18 H508 L560 92 H40 Z" fill="#fffaf0" />
        <g clipPath="url(#stAwning)">
          {Array.from({ length: STRIPES }, (_, i) => (
            <path key={i} d={stripe(i)} fill={RED} />
          ))}
          {/* fold shading */}
          <rect x="30" y="64" width="540" height="28" fill="url(#skHatchLight)" />
          <path d="M60 50 H540" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
        </g>
        <path d="M92 18 H508 L560 92 H40 Z" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        {/* ridge roll */}
        <rect x="86" y="12" width="428" height="9" rx="4.5" fill={RED} stroke={INK} strokeWidth="1.2" />
        <rect x="86" y="12" width="428" height="3" rx="1.5" fill="#fff" opacity="0.35" />
        {/* scalloped valance */}
        {Array.from({ length: STRIPES }, (_, i) => (
          <path key={`v${i}`} d={`M${40 + i * scallopW} 92 h${scallopW} v4 a${scallopW / 2} ${scallopW / 2.4} 0 0 1 ${-scallopW} 0 z`} fill={i % 2 ? '#fffaf0' : RED} stroke={INK} strokeWidth="1.1" />
        ))}
        <rect x="40" y="92" width="520" height="4" fill="url(#skHatch)" />
      </g>

      {/* fairy bulbs under the awning */}
      <path d={`M60 104 ${bulbs.map((x, i) => `Q${x - 28} ${112 + (i % 2) * 2} ${x} 104`).join(' ')} T540 104`} fill="none" stroke={INK} strokeWidth="0.8" />
      <g>
        {bulbs.map((x, i) => (
          <circle key={x} cx={x} cy="108" r="3.6" fill="#fff3b0" stroke="#ffc21a" strokeWidth="1.5" className={`stall-bulb ${i % 2 ? 'stall-bulb--odd' : ''}`} />
        ))}
      </g>

      {/* marigold toran */}
      <g className="stall-toran">
        {flowers.map(({ x, y, i }) => (
          <g key={i}>
            <line x1={x} y1="98" x2={x} y2={y} stroke={INK} strokeWidth="0.5" />
            <circle cx={x} cy={y} r="4.3" fill={i % 3 === 0 ? '#ff7a1a' : YEL} stroke={INK} strokeWidth="0.7" />
            <circle cx={x} cy={y} r="1.6" fill={i % 3 === 0 ? '#c94b00' : '#e0a000'} />
            {i % 4 === 1 && <path d={`M${x} ${y + 4} q-3 5 0 8 q3 -3 0 -8`} fill="#7d3f17" />}
          </g>
        ))}
      </g>
    </svg>
  );
}
