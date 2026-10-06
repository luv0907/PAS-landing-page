/**
 * Poster backdrop helpers
 * -----------------------
 * 1. buildDoodleTile()  → seamless 420×420 SVG tile of line-art party / food
 *    doodles (burgers, hot dogs, fries, soda, pizza, turntables, headphones…)
 *    exactly like the red Coal-City-style poster wallpaper.
 * 2. buildSpeakerFrame(W, H) → the curved "line-array" speaker stacks that
 *    frame the red backdrop on the left & right (J-curve, white edge line).
 *
 * Both are pure string builders so they can be re-run cheaply on resize.
 */

const INK = '#6e0a07';

export function buildDoodleTile() {
  const s = `fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"`;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 420 420">
<g ${s}>
  <!-- burger -->
  <g transform="translate(22,26) rotate(-8 30 30)">
    <path d="M2 24 C2 2 58 2 58 24 Z"/>
    <path d="M16 12 l4 -2 M30 9 l4 1 M42 14 l4 -2"/>
    <path d="M0 30 Q7 24 14 30 T29 30 T44 30 T60 30"/>
    <rect x="2" y="34" width="56" height="9" rx="4"/>
    <path d="M2 48 H58 V51 A6 6 0 0 1 52 57 H8 A6 6 0 0 1 2 51 Z"/>
  </g>
  <!-- hot dog -->
  <g transform="translate(118,40) rotate(12 38 18)">
    <path d="M2 14 C2 4 74 4 74 14 C74 24 2 24 2 14 Z"/>
    <path d="M-3 16 C-3 36 79 36 79 16"/>
    <path d="M8 12 l6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4"/>
  </g>
  <!-- fries -->
  <g transform="translate(240,14) rotate(-6 28 44)">
    <path d="M14 32 V6 M22 33 V0 M30 34 V8 M38 33 V2 M46 31 V10"/>
    <path d="M4 30 L12 82 H46 L54 30 Q29 44 4 30 Z"/>
    <path d="M22 58 a7 7 0 0 0 14 0"/>
  </g>
  <!-- samosa -->
  <g transform="translate(330,30) rotate(9 36 26)">
    <path d="M4 52 L36 2 L70 52 Z"/>
    <path d="M14 46 L36 12 M58 46 L40 18"/>
    <path d="M8 52 q6 5 12 0 t12 0 t12 0 t12 0 t12 0"/>
  </g>
  <!-- soda cup + straw -->
  <g transform="translate(20,128) rotate(8 24 40)">
    <path d="M2 14 H46 L40 82 H8 Z"/>
    <path d="M0 14 H48 V6 H0 Z"/>
    <path d="M26 6 L34 -16 H44"/>
    <path d="M6 38 H42 M7 50 H41"/>
  </g>
  <!-- pizza slice -->
  <g transform="translate(104,140) rotate(-14 36 38)">
    <path d="M0 0 Q36 -12 72 0 L36 76 Z"/>
    <path d="M5 9 Q36 -1 67 9"/>
    <circle cx="26" cy="22" r="5"/><circle cx="46" cy="24" r="5"/><circle cx="36" cy="44" r="5"/>
  </g>
  <!-- biryani handi -->
  <g transform="translate(214,128) rotate(6 44 34)">
    <path d="M4 26 C4 64 84 64 84 26 Z"/>
    <path d="M0 26 H88"/>
    <path d="M12 26 C12 10 76 10 76 26"/>
    <path d="M32 12 C28 4 40 2 36 -6 M50 12 C46 4 58 2 54 -6"/>
    <path d="M30 40 l3 2 M48 44 l3 -1 M60 36 l2 2"/>
  </g>
  <!-- donut -->
  <g transform="translate(345,148)">
    <circle cx="26" cy="26" r="24"/><circle cx="26" cy="26" r="8"/>
    <path d="M10 14 l4 3 M20 6 l1 5 M36 9 l-3 4 M42 22 l-5 1 M38 38 l-3 -4 M12 34 l5 -2"/>
  </g>
  <!-- cutting chai glass -->
  <g transform="translate(26,238) rotate(-8 24 36)">
    <path d="M4 14 H44 L38 74 H10 Z"/>
    <path d="M6 30 H42 M8 44 H40 M9 58 H39"/>
    <path d="M16 6 C12 0 22 -4 18 -10 M30 6 C26 0 36 -4 32 -10"/>
  </g>
  <!-- map pin -->
  <g transform="translate(120,236)">
    <path d="M18 46 L6 26 A16 16 0 1 1 30 26 Z"/>
    <circle cx="18" cy="16" r="6"/>
  </g>
  <!-- ice cream cone -->
  <g transform="translate(176,222) rotate(14 22 40)">
    <path d="M4 28 L22 80 L40 28"/>
    <path d="M10 40 L32 60 M14 58 L34 36"/>
    <path d="M2 28 C-4 14 8 2 22 5 C36 2 48 14 42 28 Z"/>
    <circle cx="22" cy="-3" r="5"/>
  </g>
  <!-- sunglasses -->
  <g transform="translate(244,256) rotate(-8 36 16)">
    <path d="M0 6 H74"/>
    <path d="M4 6 Q4 32 20 32 Q35 32 33 6"/>
    <path d="M41 6 Q39 32 54 32 Q70 32 70 6"/>
  </g>
  <!-- shopping bag (pick-up) -->
  <g transform="translate(346,226) rotate(8 26 40)">
    <path d="M0 18 H52 L48 76 H4 Z"/>
    <path d="M15 18 V12 A11 11 0 0 1 37 12 V18"/>
    <path d="M18 44 l6 6 l12 -12"/>
  </g>
  <!-- coffee cup + steam -->
  <g transform="translate(22,334) rotate(-6 26 34)">
    <path d="M4 24 H44 L40 70 H8 Z"/>
    <path d="M44 32 C58 32 58 52 42 52"/>
    <path d="M16 16 C10 8 22 6 16 -2 M28 16 C22 8 34 6 28 -2"/>
  </g>
  <!-- popcorn -->
  <g transform="translate(104,330) rotate(6 28 40)">
    <path d="M4 26 L12 84 H46 L54 26 Z"/>
    <path d="M18 26 L22 84 M36 26 L33 84"/>
    <path d="M4 26 C0 14 12 8 16 14 C18 4 30 2 32 12 C36 4 50 6 48 16 C56 14 58 24 54 26"/>
  </g>
  <!-- kebab skewer -->
  <g transform="translate(204,330) rotate(-24 30 40)">
    <path d="M30 -4 V84"/>
    <rect x="20" y="8" width="20" height="14" rx="6"/>
    <rect x="18" y="28" width="24" height="14" rx="6"/>
    <rect x="20" y="48" width="20" height="14" rx="6"/>
  </g>
  <!-- taco -->
  <g transform="translate(270,346) rotate(-6 38 22)">
    <path d="M2 42 C2 0 76 0 76 42 Z"/>
    <path d="M8 22 Q14 14 20 22 T32 22 T44 22 T56 22 T70 22"/>
  </g>
  <!-- star / sparkle confetti -->
  <path d="M196 102 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z"/>
  <path d="M398 110 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z"/>
  <path d="M90 108 h10 M95 103 v10"/>
  <path d="M316 214 h10 M321 209 v10"/>
  <path d="M168 316 h10 M173 311 v10"/>
  <path d="M378 330 h10 M383 325 v10"/>
  <path d="M300 106 q6 -8 12 0 t12 0"/>
  <path d="M70 214 q6 -8 12 0 t12 0"/>
  <path d="M370 404 q6 -8 12 0 t12 0"/>
  <circle cx="200" cy="18" r="3"/><circle cx="318" cy="292" r="3"/>
  <circle cx="84" cy="404" r="3"/><circle cx="160" cy="210" r="3"/>
  <circle cx="404" cy="214" r="3"/><circle cx="240" cy="412" r="3"/>
</g>
</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}")`;
}

const f = (n) => Math.round(n * 10) / 10;

/**
 * Curved old-city frame, split into GPU-friendly layers.
 *  - tile:  one repeat (4 floors) of haveli facade, drawn ONCE as an image;
 *           it slides inside the curved clip with a cheap translate3d
 *  - clip:  the J-curve the buildings live in (CSS clip-path)
 *  - edge:  the black edge line (static)
 * The white scalloped trim is built separately by buildTrim().
 */
export function buildCityFrame(W, H) {
  const isWide = W >= 900;
  const a = W < 600 ? Math.max(14, W * 0.048) : Math.max(22, Math.min(isWide ? 104 : 46, W * 0.075));
  const T = isWide ? 0.62 : 0.58;
  const endY = H * T;
  const xAt = (y) => {
    const t = Math.max(0, y) / H;
    if (t >= T) return 0;
    return a * Math.cos((Math.PI / 2) * Math.pow(t / T, 1.35));
  };
  const pts = [];
  for (let y = 0; y <= endY; y += 6) pts.push([xAt(y), y]);
  const clip = `M-4 -4 L${f(a)} -4 L${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L')} L0 ${f(endY)} L-4 ${f(endY)} Z`;
  const edge = `M${f(a)} -4 L${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L')}`;

  const h = Math.round(Math.max(54, Math.min(86, H * 0.08)));
  const period = h * 4;
  const faceW = Math.max(14, a * 0.96);
  const D = Math.ceil(a + 8);
  let floors = '';
  let lit = '';
  let bars = '';
  for (let kk = 0; kk < 4; kk += 1) {
    const y0 = kk * h;
    floors += `<rect x="-6" y="${f(y0)}" width="${f(D + 6)}" height="${f(h)}" fill="${kk % 2 ? '#2c0b08' : '#360e0a'}" stroke="#000" stroke-width="1.6"/>`;
    floors += `<rect x="-6" y="${f(y0)}" width="${f(D + 6)}" height="${f(h * 0.09)}" fill="#5a1a11" stroke="#000" stroke-width="1"/>`;
    for (let u = 0; u < D; u += 7) floors += `<rect x="${f(u)}" y="${f(y0 + h * 0.09)}" width="3.5" height="${f(h * 0.05)}" fill="#5a1a11"/>`;
    const nWin = faceW > 64 ? 2 : 1;
    for (let j = 0; j < nWin; j += 1) {
      const uc = nWin === 1 ? faceW * 0.5 : faceW * (j === 0 ? 0.3 : 0.72);
      const ww = Math.min(26, faceW * (nWin === 1 ? 0.56 : 0.3));
      const x0 = uc - ww / 2;
      const x1 = uc + ww / 2;
      const d = `M${f(x0)} ${f(y0 + h * 0.8)} L${f(x0)} ${f(y0 + h * 0.44)} Q${f(x0)} ${f(y0 + h * 0.24)} ${f(uc)} ${f(y0 + h * 0.2)} Q${f(x1)} ${f(y0 + h * 0.24)} ${f(x1)} ${f(y0 + h * 0.44)} L${f(x1)} ${f(y0 + h * 0.8)} Z`;
      const on = (kk * 3 + j * 5) % 4 !== 0;
      if (on) lit += `<path d="${d}" fill="${(kk + j) % 3 ? '#ffc21a' : '#ffd96b'}"/>`;
      else floors += `<path d="${d}" fill="#7a0f08"/>`;
      if (on) bars += `<line x1="${f(uc)}" y1="${f(y0 + h * 0.3)}" x2="${f(uc)}" y2="${f(y0 + h * 0.8)}" stroke="#7a3b00" stroke-width="1.1"/>`;
      bars += `<path d="${d}" fill="none" stroke="#f3dfb8" stroke-width="1.5"/>`;
    }
    if (kk % 2 === 0) {
      bars += `<rect x="0" y="${f(y0 + h * 0.82)}" width="${f(faceW)}" height="${f(h * 0.06)}" fill="#f3dfb8" stroke="#000" stroke-width="0.8"/>`;
      for (let u = 3; u < faceW - 1; u += 5) bars += `<line x1="${f(u)}" y1="${f(y0 + h * 0.74)}" x2="${f(u)}" y2="${f(y0 + h * 0.82)}" stroke="#f3dfb8" stroke-width="1"/>`;
      bars += `<line x1="0" y1="${f(y0 + h * 0.74)}" x2="${f(faceW)}" y2="${f(y0 + h * 0.74)}" stroke="#f3dfb8" stroke-width="1.3"/>`;
    }
  }
  const tileSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${period}" viewBox="0 0 ${D} ${period}"><defs><filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="0.7" stop-color="#000" stop-opacity="0"/></linearGradient></defs>${floors}<g filter="url(#g)">${lit}</g>${bars}<rect x="0" y="0" width="${D}" height="${period}" fill="url(#s)"/></svg>`;
  const tile = `url("data:image/svg+xml,${encodeURIComponent(tileSvg)}")`;
  return { tile, tileW: D, period, clip, edge, endY, isWide, a };
}

/**
 * The white cusped trim along the curve. `phase` (px) slides the scallops
 * along the curve so the edge appears to scroll with the buildings.
 */
export function buildTrim(W, H, phase) {
  const isWide = W >= 900;
  const a = W < 600 ? Math.max(14, W * 0.048) : Math.max(22, Math.min(isWide ? 104 : 46, W * 0.075));
  const T = isWide ? 0.62 : 0.58;
  const endY = H * T;
  const xAt = (y) => {
    const t = Math.max(0, y) / H;
    if (t >= T) return 0;
    return a * Math.cos((Math.PI / 2) * Math.pow(t / T, 1.35));
  };
  const step = isWide ? 20 : 14;
  const bulge = isWide ? 9 : 6;
  const p = ((phase % step) + step) % step;
  const ys = [0];
  for (let y = step - p; y < endY; y += step) ys.push(y);
  ys.push(endY);
  let d = `M${f(xAt(0))} 0`;
  for (let i = 1; i < ys.length; i += 1) {
    const y0 = ys[i - 1];
    const y1 = ys[i];
    const x0 = xAt(y0);
    const x1 = xAt(y1);
    const l = Math.hypot(x1 - x0, y1 - y0) || 1;
    const nx = -(y1 - y0) / l;
    const ny = (x1 - x0) / l;
    const k = (y1 - y0) / step; // partial scallops at the ends stay proportional
    d += ` Q${f((x0 + x1) / 2 - nx * bulge * k)} ${f((y0 + y1) / 2 - ny * bulge * k)} ${f(x1)} ${f(y1)}`;
  }
  return d;
}
