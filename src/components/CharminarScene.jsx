import React from 'react';
import { SketchDefs, EtchTree, INK, PAPER, PAPER_DK, WASH } from './map/sketch';

/* ------------------------------------------------------------------
   Charminar old-city street — hero illustration, ink-etching style.
   Charminar with a pickup counter glowing in its main arch, bazaar
   shops on both sides, kites and pigeons in the sky, an auto passing
   on the street. No people — just the place.
   ------------------------------------------------------------------ */

const RED = '#ff3b2f';
const YEL = '#ffc21a';
const DEEP = '#5c0905';
const f = (n) => Math.round(n * 10) / 10;

/* ---------- Shopfront props (cover the shop floors) ---------- */
const MARIGOLD = ['#ff8a1a', '#ffc21a', '#ff6a00', '#ffd23d'];
function Planter({ cx, w, seed }) {
  const x0 = cx - w / 2;
  const n = Math.round(w / 9);
  return (
    <g>
      {/* blooms + leaves */}
      <g className="scene-blooms" style={{ animationDelay: `${-seed * 0.7}s` }}>
        {Array.from({ length: n }, (_, i) => {
          const x = x0 + 5 + i * ((w - 10) / (n - 1));
          const y = 532 - ((i * 7 + seed * 3) % 5);
          return (
            <g key={i}>
              <path d={`M${x} 540 q-6 -4 -8 -10 q6 1 8 10 q4 -8 10 -9 q-2 7 -10 9`} fill="#5f6b2a" stroke={INK} strokeWidth="0.5" />
              <line x1={x} y1="541" x2={x} y2={y + 3} stroke="#4a5520" strokeWidth="1" />
              <circle cx={x} cy={y} r="4.6" fill={MARIGOLD[(i + seed) % 4]} stroke={INK} strokeWidth="0.6" />
              <circle cx={x} cy={y} r="2.6" fill="none" stroke="#c94b00" strokeWidth="0.7" strokeDasharray="1.2 1.2" />
              <circle cx={x} cy={y} r="1" fill="#7a2a00" />
            </g>
          );
        })}
      </g>
      {/* wooden planter box */}
      <path d={`M${x0} 539 H${x0 + w} L${x0 + w - 4} 562 H${x0 + 4} Z`} fill="#a0582a" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <rect x={x0 - 2} y="537" width={w + 4} height="5" rx="1" fill="#7d3f17" stroke={INK} strokeWidth="0.8" />
      {[546, 553].map((y) => (
        <line key={y} x1={x0 + 2} y1={y} x2={x0 + w - 2} y2={y} stroke="#6e3412" strokeWidth="0.7" />
      ))}
      <rect x={x0 + w * 0.62} y="542" width={w * 0.36} height="19" fill="url(#skHatchLight)" />
      {/* painted band */}
      <rect x={cx - 15} y="546" width="30" height="9" rx="1.5" fill="#fffaf0" stroke={INK} strokeWidth="0.6" />
      <path d={`M${cx - 10} 550.5 h20`} stroke={RED} strokeWidth="2.4" strokeDasharray="2.5 2" />
    </g>
  );
}

function FruitCart({ x }) {
  return (
    <g className="scene-cart">
      {/* fruit heap */}
      {Array.from({ length: 14 }, (_, i) => {
        const r = i < 6 ? 0 : i < 11 ? 1 : 2;
        const k = r === 0 ? i : r === 1 ? i - 6 : i - 11;
        const cx = x + 10 + k * 9 + r * 5;
        const cy = 534 - r * 6;
        return <circle key={i} cx={cx} cy={cy} r="4.6" fill={i % 3 === 0 ? RED : i % 3 === 1 ? YEL : '#ff8a1a'} stroke={INK} strokeWidth="0.6" />;
      })}
      <path d={`M${x} 538 H${x + 66} L${x + 62} 548 H${x + 4} Z`} fill="#b8692e" stroke={INK} strokeWidth="1" />
      <path d={`M${x + 66} 541 L${x + 84} 536`} stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <circle cx={x + 16} cy="556" r="8" fill="#fffaf0" stroke={INK} strokeWidth="1.2" />
      <circle cx={x + 50} cy="556" r="8" fill="#fffaf0" stroke={INK} strokeWidth="1.2" />
      {[0, 60, 120].map((a) => (
        <g key={a}>
          <line x1={x + 16} y1="556" x2={x + 16 + Math.cos((a * Math.PI) / 180) * 7} y2={556 + Math.sin((a * Math.PI) / 180) * 7} stroke={INK} strokeWidth="0.6" />
          <line x1={x + 50} y1="556" x2={x + 50 + Math.cos((a * Math.PI) / 180) * 7} y2={556 + Math.sin((a * Math.PI) / 180) * 7} stroke={INK} strokeWidth="0.6" />
        </g>
      ))}
      {/* little price flag */}
      <line x1={x + 6} y1="538" x2={x + 6} y2="516" stroke={INK} strokeWidth="0.8" />
      <path d={`M${x + 6} 516 h14 l-3 4 l3 4 h-14 z`} fill={YEL} stroke={INK} strokeWidth="0.6" className="scene-flag" />
    </g>
  );
}

function SodaCrate({ x }) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <rect x={x + 3 + i * 7} y="530" width="5" height="12" rx="2" fill="#cfe3c9" stroke={INK} strokeWidth="0.5" />
          <circle cx={x + 5.5 + i * 7} cy="529" r="1.6" fill="#e8f6ff" stroke={INK} strokeWidth="0.4" />
        </g>
      ))}
      <rect x={x} y="538" width="40" height="18" fill={RED} stroke={INK} strokeWidth="1" />
      <rect x={x + 8} y="543" width="24" height="7" fill="#fffaf0" stroke={INK} strokeWidth="0.5" />
      <rect x={x + 2} y="556" width="40" height="6" fill="#7d3f17" stroke={INK} strokeWidth="0.6" />
    </g>
  );
}

function Sack({ x, fill }) {
  return (
    <g>
      <path d={`M${x} 562 Q${x - 3} 546 ${x + 2} 538 Q${x + 12} 532 ${x + 22} 538 Q${x + 27} 546 ${x + 24} 562 Z`} fill="#c9a27a" stroke={INK} strokeWidth="0.9" />
      <ellipse cx={x + 12} cy="538" rx="10" ry="3.4" fill={fill} stroke={INK} strokeWidth="0.6" />
      <path d={`M${x + 4} 548 q8 3 16 0 M${x + 3} 555 q9 3 18 0`} fill="none" stroke="#8a6a44" strokeWidth="0.6" />
    </g>
  );
}

function ShopFront() {
  return (
    <g filter="url(#skRough)">
      {/* shared kerb so the bazaar sits on a clean line */}
      <rect x="-10" y="560" width="380" height="5" fill="#d9bf8e" stroke={INK} strokeWidth="0.8" />
      <rect x="630" y="560" width="380" height="5" fill="#d9bf8e" stroke={INK} strokeWidth="0.8" />
      {/* Irani chai: planter + soda crate */}
      <Planter cx={60} w={108} seed={1} />
      <SodaCrate x={124} />
      {/* bangle shop: planter */}
      <Planter cx={262} w={150} seed={2} />
      {/* attar store: planter + fruit cart */}
      <FruitCart x={668} />
      <Planter cx={800} w={96} seed={3} />
      {/* kirana: sacks + planter */}
      <Sack x={858} fill="#ffc21a" />
      <Sack x={884} fill="#fffaf0" />
      <Planter cx={960} w={84} seed={4} />
    </g>
  );
}

/* ---------- Kite (etched) ---------- */
function Kite({ x, y, color, delay, string }) {
  return (
    <g>
      <path className="kite-string" data-d={string} d={string} fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="0.7" />
      <g className="kite-pull" data-x={x} data-y={y}>
      <g className="scene-kite" style={{ animationDelay: `${delay}s` }}>
        <g transform={`translate(${x} ${y})`}>
          <path d="M0 -24 L18 -2 L0 26 L-18 -2 Z" fill={color} stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
          <path d="M0 -24 L18 -2 L0 26 Z" fill="url(#skHatchLight)" />
          <path d="M0 -24 V26 M-18 -2 Q0 -8 18 -2" fill="none" stroke={INK} strokeWidth="0.7" />
          <path d="M0 26 C-6 36 6 44 0 54 C-6 64 5 70 0 78" fill="none" stroke={INK} strokeWidth="0.8" />
          <path d="M-4 40 L4 43 L-4 46 Z M-3 60 L5 63 L-3 66 Z" fill={RED} stroke={INK} strokeWidth="0.6" />
        </g>
      </g>
      </g>
    </g>
  );
}

/* ---------- Auto-rickshaw (side view, etched, empty) ---------- */
function Auto() {
  return (
    <g className="scene-bounce">
      <path d="M10 32 Q12 4 46 2 H84 Q100 4 104 32 Z" fill={YEL} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M60 3 H84 Q100 4 104 32 H60 Z" fill="url(#skHatchLight)" />
      {/* canvas seams */}
      <path d="M26 6 Q24 18 22 32 M44 3 V32" fill="none" stroke={INK} strokeWidth="0.6" />
      {/* openings: both open and see-through, with the seats inside */}
      <path d="M24 32 V14 Q26 9 34 9 H56 V32 Z" fill="#fff6e3" stroke={INK} strokeWidth="0.9" />
      <path d="M64 32 V9 H86 Q96 11 98 32 Z" fill="#fff6e3" stroke={INK} strokeWidth="0.9" />
      <path d="M24 14 Q26 9 34 9 H56 V13 H26 Z M64 9 H86 Q93 10 96 22 L64 13 Z" fill="url(#skHatchLight)" />
      {/* rear bench seat */}
      <path d="M28 32 V22 Q28 19 31 19 H38 Q41 19 41 22 V26 H54 V32 Z" fill={RED} stroke={INK} strokeWidth="0.8" />
      <path d="M30 22 H39 M43 28 H53" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.8" />
      {/* driver seat + handlebar */}
      <path d="M66 32 V24 Q66 21 69 21 H74 V32 Z" fill="#2a2a2e" stroke={INK} strokeWidth="0.7" />
      <path d="M86 32 L90 18 M86 18 H94" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M95 14 Q97 22 97 30" fill="none" stroke="#9fb4c8" strokeWidth="1" />
      {/* pillars */}
      <path d="M58 32 V8 M62 32 V8" stroke={INK} strokeWidth="1" />
      {/* body */}
      <path d="M4 32 H104 Q114 32 114 42 V56 H0 V40 Q0 32 4 32 Z" fill="#1f1f22" stroke={INK} strokeWidth="1.3" />
      <path d="M2 44 H112" stroke={YEL} strokeWidth="2.4" />
      <path d="M4 36 H108" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />
      <rect x="40" y="38" width="26" height="12" rx="1.5" fill={YEL} stroke={INK} strokeWidth="0.8" />
      <text x="53" y="47.5" textAnchor="middle" className="scene-tiny-text">PAS</text>
      <circle cx="111" cy="38" r="3.5" fill="#fff3b0" stroke={INK} strokeWidth="0.8" />
      {/* mudguard + wheels */}
      {[22, 94].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 14} 52 A14 14 0 0 1 ${cx + 14} 52`} fill="none" stroke={INK} strokeWidth="1.2" />
          <g className="scene-wheel">
            <circle cx={cx} cy="58" r="10.5" fill="#151517" stroke={INK} strokeWidth="1" />
            <circle cx={cx} cy="58" r="6.5" fill="none" stroke="#6a6a70" strokeWidth="0.8" />
            <circle cx={cx} cy="58" r="3" fill="#b8b8be" stroke={INK} strokeWidth="0.6" />
            {[0, 60, 120].map((a) => (
              <line key={a} x1={cx + Math.cos((a * Math.PI) / 180) * 6} y1={58 + Math.sin((a * Math.PI) / 180) * 6} x2={cx - Math.cos((a * Math.PI) / 180) * 6} y2={58 - Math.sin((a * Math.PI) / 180) * 6} stroke="#6a6a70" strokeWidth="0.7" />
            ))}
          </g>
        </g>
      ))}
    </g>
  );
}

/* sun rays */
const rays = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2;
  const r0 = 214;
  const r1 = i % 2 ? 300 : 360;
  return `M${f(500 + Math.cos(a) * r0)} ${f(330 + Math.sin(a) * r0)} L${f(500 + Math.cos(a) * r1)} ${f(330 + Math.sin(a) * r1)}`;
}).join(' ');

/* bunting between the minarets and the shops */
const qb = (p0, c, p2, t) => {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p2[1]];
};
const bunting = (p0, c, p2, n) =>
  Array.from({ length: n }, (_, i) => {
    const a = qb(p0, c, p2, i / n + 0.01);
    const b = qb(p0, c, p2, (i + 0.8) / n);
    return { pts: `${f(a[0])},${f(a[1])} ${f(b[0])},${f(b[1])} ${f((a[0] + b[0]) / 2)},${f((a[1] + b[1]) / 2 + 13)}`, i };
  });
const FLAGS_L = bunting([390, 300], [250, 400], [96, 432], 14);
const FLAGS_R = bunting([610, 300], [750, 400], [904, 432], 14);

export default function CharminarScene() {
  return (
    <div className="poster-stage poster-scene" aria-hidden="true">
      <svg viewBox="0 0 1000 640" className="poster-stage__svg" preserveAspectRatio="xMidYMid meet">
        <SketchDefs />
        <defs>
          <clipPath id="archClip">
            <path d="M424 490 V372 Q424 332 500 314 Q576 332 576 372 V490 Z" />
          </clipPath>
          <radialGradient id="archGlow" cx="50%" cy="78%" r="70%">
            <stop offset="0%" stopColor="#ffd54a" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ff7a1a" stopOpacity="0.5" />
            <stop offset="100%" stopColor={DEEP} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shopGlow" cx="50%" cy="15%" r="85%">
            <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.85" />
            <stop offset="100%" stopColor={DEEP} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sunWash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe08a" />
            <stop offset="70%" stopColor={YEL} />
            <stop offset="100%" stopColor="#f2a900" />
          </radialGradient>
          <pattern id="cobble" width="16" height="9" patternUnits="userSpaceOnUse">
            <rect width="16" height="9" fill={PAPER_DK} />
            <path d="M0 8.5 H16 M8 0 V4.5 M0 4.5 H16 M3 4.5 V8.5 M13 4.5 V8.5" stroke={INK} strokeWidth="0.45" strokeOpacity="0.55" />
          </pattern>
          <pattern id="asphaltFront" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#3a3a3f" />
            <circle cx="2" cy="3" r="0.6" fill="#55555b" />
            <circle cx="7" cy="7" r="0.5" fill="#26262a" />
            <circle cx="8" cy="2" r="0.4" fill="#5e5e64" />
          </pattern>
          <filter id="sceneGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="groundFadeG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.045" stopColor="#fff" />
            <stop offset="0.955" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="groundFade" maskUnits="userSpaceOnUse" x="0" y="300" width="1000" height="360">
            <rect x="0" y="300" width="1000" height="360" fill="url(#groundFadeG)" />
          </mask>
          <path id="ribbonTextPath" d="M262 74 Q500 34 738 74" />
        </defs>

        {/* ---------- Sky ---------- */}
        <g className="scene-rays">
          <path d={rays} stroke={YEL} strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
        </g>
        <circle cx="500" cy="330" r="200" fill="url(#sunWash)" filter="url(#skWash)" />
        <circle cx="500" cy="330" r="200" fill="url(#skStipple)" opacity="0.5" />

        {/* soft photographic clouds drifting across the sky */}
        <g className="scene-cloud scene-cloud--slow">
          <image href="/images/sky/cloud-wisp.webp" x="-30" y="232" width="300" height="90" opacity="0.95" />
        </g>
        <g className="scene-cloud scene-cloud--b">
          <image href="/images/sky/cloud-puff.webp" x="790" y="270" width="170" height="105" />
        </g>
        <g className="scene-cloud scene-cloud--c">
          <image href="/images/sky/cloud-wisp.webp" x="690" y="150" width="200" height="60" opacity="0.7" />
        </g>
        <g className="scene-cloud">
          <image href="/images/sky/cloud-puff.webp" x="110" y="160" width="96" height="59" opacity="0.85" />
        </g>

        <Kite x={160} y={118} color="#fffaf0" delay={0} string="M160 198 Q190 330 236 396" />
        <Kite x={842} y={96} color={YEL} delay={-1.6} string="M842 176 Q800 320 770 396" />
        <Kite x={930} y={214} color={RED} delay={-0.8} string="M930 294 Q900 360 880 396" />

        {/* pigeons */}
        <g className="scene-flock">
          {[[250, 70], [276, 58], [300, 76], [226, 88], [262, 96], [690, 54], [716, 70], [740, 60]].map(([bx, by], i) => (
            <path
              key={i}
              className="scene-bird"
              style={{ animationDelay: `${-i * 0.17}s` }}
              d={`M${bx} ${by} q5 -6 10 -1 q5 -5 10 1`}
              fill="none"
              stroke={INK}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* ---------- Charminar ---------- */}

        {/* glow behind Charminar */}
        <ellipse cx="500" cy="470" rx="190" ry="34" fill="#5c0905" opacity="0.35" filter="url(#skWash)" />

        {/* pickup counter seen through the main arch (scaled into the arch opening) */}
        <g transform="translate(500 492) scale(0.52) translate(-500 -492)">
        <g clipPath="url(#archClip)">
          <rect x="420" y="300" width="160" height="200" fill="url(#archGlow)" />
          {/* hanging brass lamps */}
          {[452, 548].map((lx) => (
            <g key={lx}>
              <line x1={lx} y1="330" x2={lx} y2="352" stroke="#1a0d0a" strokeWidth="0.8" />
              <path d={`M${lx - 7} 352 h14 l-3 9 h-8 z`} fill={YEL} stroke="#1a0d0a" strokeWidth="0.8" className="scene-lantern" />
            </g>
          ))}
          {/* neon OPEN */}
          <line x1="484" y1="320" x2="485" y2="336" stroke="#1a0d0a" strokeWidth="1" />
          <line x1="516" y1="320" x2="515" y2="336" stroke="#1a0d0a" strokeWidth="1" />
          <rect x="470" y="334" width="60" height="22" rx="5" fill="#120707" stroke="#1a0d0a" strokeWidth="1.2" />
          <text x="500" y="350" textAnchor="middle" className="scene-neon-text scene-neon" filter="url(#sceneGlow)">OPEN</text>
          {/* awning */}
          {Array.from({ length: 10 }, (_, i) => (
            <path key={i} d={`M${424 + i * 16} 388 h16 v14 h-16 z`} fill={i % 2 ? '#fffaf0' : RED} />
          ))}
          <rect x="424" y="388" width="160" height="14" fill="url(#skHatchLight)" />
          <rect x="424" y="388" width="152" height="14" fill="none" stroke="#1a0d0a" strokeWidth="1.1" />
          {Array.from({ length: 10 }, (_, i) => (
            <path key={`s${i}`} d={`M${424 + i * 16} 402 a8 5 0 0 0 16 0`} fill={i % 2 ? '#fffaf0' : RED} stroke="#1a0d0a" strokeWidth="0.9" />
          ))}
          {/* menu board at the back */}
          <rect x="438" y="412" width="40" height="28" fill="#1a0d0a" stroke="#000" strokeWidth="0.8" />
          {[418, 424, 430].map((yy) => (
            <line key={yy} x1="442" y1={yy} x2={yy === 430 ? 462 : 472} y2={yy} stroke="#fff6d0" strokeWidth="1" strokeOpacity="0.8" />
          ))}
          {/* shelves of PAS bags waiting for pickup */}
          <line x1="490" y1="426" x2="570" y2="426" stroke="#f3c77a" strokeWidth="1.2" />
          {[494, 512, 530, 548].map((bx, i) => (
            <g key={bx}>
              <path d={`M${bx} 412 h13 l-1 14 h-11 z`} fill={i % 2 ? '#fffaf0' : YEL} stroke="#1a0d0a" strokeWidth="0.8" />
              <path d={`M${bx + 3.5} 412 v-2 a3 3 0 0 1 6 0 v2`} fill="none" stroke="#1a0d0a" strokeWidth="0.7" />
            </g>
          ))}
          {/* counter */}
          <rect x="428" y="452" width="144" height="40" fill={YEL} stroke="#1a0d0a" strokeWidth="1.3" />
          <rect x="428" y="452" width="144" height="40" fill="url(#skHatchLight)" />
          <rect x="428" y="452" width="144" height="6" fill={RED} stroke="#1a0d0a" strokeWidth="1" />
          <circle cx="500" cy="474" r="11" fill={RED} stroke="#1a0d0a" strokeWidth="1" />
          <text x="500" y="478" textAnchor="middle" className="scene-tiny-text scene-tiny-text--white">PAS</text>
          {/* steaming biryani plate + chai on the counter */}
          <ellipse cx="452" cy="451" rx="12" ry="3" fill="#fffaf0" stroke="#1a0d0a" strokeWidth="0.8" />
          <path d="M444 449 C444 441 460 441 460 449 Z" fill="#ffb000" stroke="#1a0d0a" strokeWidth="0.8" />
          <path d="M546 442 h8 l-1 9 h-6 z" fill="#c8641c" stroke="#1a0d0a" strokeWidth="0.7" />
          <g className="scene-steam" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round">
            <path d="M448 438 C444 432 452 430 448 424" />
            <path d="M456 438 C452 432 460 430 456 424" />
          </g>
        </g>
        {/* PAS bag ready on the counter */}
        <g stroke="#1a0d0a" strokeWidth="1">
          <path d="M506 430 H530 L528 452 H508 Z" fill={YEL} />
          <path d="M506 430 H530 L528 452 H520 Z" fill="url(#skHatchLight)" />
          <path d="M511 430 V426 A7 7 0 0 1 525 426 V430" fill="none" />
          <rect x="506" y="430" width="24" height="5" fill={RED} strokeWidth="0.8" />
        </g>

        </g>

        {/* Charminar — hand-painted illustration */}
        <image href="/images/landmarks/charminar.webp" x="361" y="92" width="278" height="400" preserveAspectRatio="xMidYMax meet" className="scene-charminar" />


        {/* ribbon banner with the stage name, above the minarets (scaled up) */}
        <g transform="translate(500 72) scale(1.25) translate(-500 -72)">
        <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round" className="scene-ribbon">
          <path d="M248 50 L206 58 L222 72 L206 90 L248 84 Z" fill={YEL} />
          <path d="M248 50 L206 58 L222 72 L206 90 L248 84 Z" fill="url(#skHatchLight)" />
          <path d="M752 50 L794 58 L778 72 L794 90 L752 84 Z" fill={YEL} />
          <path d="M752 50 L794 58 L778 72 L794 90 L752 84 Z" fill="url(#skHatchLight)" />
          <path d="M248 84 L262 92 L262 78 Z M752 84 L738 92 L738 78 Z" fill="#a8740a" />
          <path d="M248 50 Q500 10 752 50 L752 84 Q500 44 248 84 Z" fill={RED} />
          <path d="M252 80 Q500 40 748 80 L748 84 Q500 44 252 84 Z" fill="url(#skHatch)" stroke="none" />
        </g>
        <text className="scene-ribbon-text" fontSize="28" textAnchor="middle" letterSpacing="3">
          <textPath href="#ribbonTextPath" startOffset="50%">PICK AT STORE</textPath>
        </text>
        </g>

        {/* steps / platform */}
        <g filter="url(#skRough)" stroke={INK} strokeLinejoin="round">
          <rect x="300" y="490" width="400" height="13" fill="url(#skStone)" strokeWidth="1.1" />
          <rect x="284" y="503" width="432" height="13" fill="url(#skStone)" strokeWidth="1.1" />
          <rect x="300" y="498" width="400" height="5" fill="url(#skHatchLight)" stroke="none" />
          <rect x="284" y="511" width="432" height="5" fill="url(#skHatchLight)" stroke="none" />
        </g>

        {/* bunting from the minarets to the bazaar */}
        <path d="M390 300 Q250 400 96 432 M610 300 Q750 400 904 432" fill="none" stroke={INK} strokeWidth="0.8" />
        <g stroke={INK} strokeWidth="0.7" strokeLinejoin="round">
          {[...FLAGS_L, ...FLAGS_R].map(({ pts, i }, k) => (
            <polygon key={k} points={pts} fill={[RED, YEL, '#fffaf0'][i % 3]} className="scene-flag" style={{ animationDelay: `${-k * 0.13}s` }} />
          ))}
        </g>

        <g mask="url(#groundFade)">
        {/* ---------- Pavement (cobbles) ---------- */}
        <rect x="0" y="540" width="1000" height="54" fill="url(#cobble)" />
        <rect x="0" y="540" width="1000" height="6" fill="url(#skHatch)" />
        <line x1="0" y1="540" x2="1000" y2="540" stroke={INK} strokeWidth="1.2" />

        {/* old-city bazaar: hand-painted shopfronts */}
        <g className="scene-shops">
          {[
            ['chai', -34, 'IRANI CHAI'],
            ['bangle', 150, 'BANGLE SHOP'],
            ['kirana', 824, 'KIRANA STORE'],
            ['attar', 640, 'ATTAR STORE'],
          ].map(([name, x]) => (
            <image
              key={name}
              href={`/images/shops/${name}.webp`}
              x={x}
              y="430"
              width="220"
              height="132"
              preserveAspectRatio="xMidYMax meet"
            />
          ))}
        </g>
        {/* shopfront props: marigold planters, a fruit cart, soda crates, sacks */}
        <ShopFront />

        {/* trees between the bazaar and Charminar */}
        <EtchTree x={350} y={552} s={1.05} seed={3} />
        <EtchTree x={652} y={552} s={1} seed={8} />

        {/* street from Charminar to the main road */}
        <polygon points="452,516 548,516 646,594 354,594" fill="url(#asphaltFront)" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
        <polygon points="452,516 548,516 646,594 354,594" fill="url(#skHatchLight)" />
        <line x1="452" y1="516" x2="354" y2="594" stroke={YEL} strokeWidth="3.5" strokeDasharray="7 7" />
        <line x1="548" y1="516" x2="646" y2="594" stroke={YEL} strokeWidth="3.5" strokeDasharray="7 7" />
        <line x1="500" y1="520" x2="500" y2="592" stroke="#fff" strokeWidth="2.6" strokeDasharray="9 9" className="scene-dash-v" />
        {/* QR standee by the steps */}
        <g>
          <rect x="384" y="520" width="18" height="26" rx="1.5" fill="#fffaf0" stroke={INK} strokeWidth="1" />
          <path d="M387 523 h5 v5 h-5z M394 523 h5 v5 h-5z M387 530 h5 v5 h-5z M395 531 h3 v3 h-3z" fill={INK} />
          <rect x="387" y="538" width="12" height="4" fill={RED} />
          <line x1="393" y1="546" x2="393" y2="556" stroke={INK} strokeWidth="1.6" />
        </g>
        {/* parked cycle with a PAS basket */}
        <g stroke={INK} strokeWidth="1" fill="none">
          <circle cx="600" cy="546" r="9" />
          <circle cx="628" cy="546" r="9" />
          <path d="M600 546 L610 532 H624 L628 546 M610 532 L616 546 L624 532 M606 528 H614 M624 532 L622 526 H628" />
          <rect x="626" y="518" width="12" height="9" fill={YEL} strokeWidth="0.8" />
        </g>

        {/* ---------- Main road (front view) ---------- */}
        <rect x="0" y="592" width="1000" height="48" fill="url(#asphaltFront)" />
        <rect x="0" y="592" width="1000" height="48" fill="url(#skHatchLight)" />
        <line x1="0" y1="593" x2="1000" y2="593" stroke={YEL} strokeWidth="4" strokeDasharray="14 10" />
        <line x1="0" y1="592" x2="1000" y2="592" stroke={INK} strokeWidth="1.2" />
        <line x1="0" y1="618" x2="1000" y2="618" stroke="#fff" strokeWidth="2.6" strokeDasharray="26 18" className="scene-dash-h" />
        <g fill="#fffaf0">
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={456 + i * 16} y="598" width="9" height="40" />
          ))}
        </g>

        {/* auto passing by */}
        <g className="scene-drive scene-drive--r">
          <g transform="translate(0 558) scale(0.9)">
            <Auto />
          </g>
        </g>
        </g>
      </svg>
    </div>
  );
}
