import React from 'react';

/* Ink-etching kit: warm sepia ink on cream paper, fine hatching at
   several densities, stone courses, water ripples, stippling, and a
   watercolour wash for the yellow accent. */
export const INK = '#3b2214';
export const PAPER = '#f7e2bd';
export const PAPER_DK = '#e6c08a';
export const WASH = '#ffc21a';
export const ACCENT = '#ff3b2f';

/* deterministic pseudo-random */
export const rnd = (seed) => {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export function SketchDefs() {
  const hatch = (id, gap, angle, w, o) => (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
      <line x1="0" y1="0" x2="0" y2={gap} stroke={INK} strokeWidth={w} strokeOpacity={o} />
    </pattern>
  );
  return (
    <defs>
      {/* very slight pen tremor */}
      <filter id="skRough" x="-3%" y="-3%" width="106%" height="106%">
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* watercolour wash edge */}
      <filter id="skWash" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="2" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" result="d" />
        <feGaussianBlur in="d" stdDeviation="2.2" />
      </filter>
      {hatch('skHatchLight', 4.2, 35, 0.6, 0.45)}
      {hatch('skHatch', 3, 35, 0.7, 0.7)}
      {hatch('skHatchDense', 2.2, 35, 0.75, 0.85)}
      {hatch('skHatchV', 3, 0, 0.6, 0.55)}
      <pattern id="skCross" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="3" height="3" fill="#3d1a12" />
        <line x1="0" y1="0" x2="0" y2="3" stroke="#120806" strokeWidth="0.9" />
        <line x1="0" y1="0" x2="3" y2="0" stroke="#120806" strokeWidth="0.7" />
      </pattern>
      <pattern id="skStone" width="18" height="7" patternUnits="userSpaceOnUse">
        <rect width="18" height="7" fill={PAPER} />
        <line x1="0" y1="6.5" x2="18" y2="6.5" stroke={INK} strokeWidth="0.45" strokeOpacity="0.55" />
        <line x1="6" y1="0" x2="6" y2="3" stroke={INK} strokeWidth="0.4" strokeOpacity="0.45" />
        <line x1="15" y1="3.5" x2="15" y2="6.5" stroke={INK} strokeWidth="0.4" strokeOpacity="0.45" />
      </pattern>
      <pattern id="skDots" width="3" height="3" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.7" fill={INK} />
      </pattern>
      <pattern id="skStipple" width="9" height="9" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="2" r="0.45" fill={INK} fillOpacity="0.6" />
        <circle cx="5" cy="6" r="0.4" fill={INK} fillOpacity="0.5" />
        <circle cx="7.5" cy="1.5" r="0.35" fill={INK} fillOpacity="0.5" />
        <circle cx="3" cy="8" r="0.35" fill={INK} fillOpacity="0.45" />
      </pattern>
    </defs>
  );
}

export const Rosette = ({ x, y, r = 8 }) => (
  <g stroke={INK} strokeWidth="0.8" fill="none">
    <circle cx={x} cy={y} r={r} fill={PAPER} />
    <circle cx={x} cy={y} r={r * 0.72} />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return (
        <path
          key={i}
          d={`M${x} ${y} Q${x + Math.cos(a + 0.25) * r * 0.5} ${y + Math.sin(a + 0.25) * r * 0.5} ${x + Math.cos(a) * r * 0.72} ${y + Math.sin(a) * r * 0.72}`}
        />
      );
    })}
    <circle cx={x} cy={y} r={r * 0.22} fill={INK} />
  </g>
);

export const SketchBirds = ({ x, y, s = 1 }) => (
  <g className="lm-birds" fill="none" stroke={INK} strokeWidth={1.2 * s} strokeLinecap="round">
    <path className="lm-bird" d={`M${x} ${y} q${5 * s} ${-5 * s} ${10 * s} ${-1 * s} q${5 * s} ${-4 * s} ${10 * s} ${1 * s}`} />
    <path className="lm-bird" style={{ animationDelay: '-0.25s' }} d={`M${x + 22 * s} ${y - 10 * s} q${4 * s} ${-4 * s} ${8 * s} 0 q${4 * s} ${-4 * s} ${8 * s} 0`} />
    <path className="lm-bird" style={{ animationDelay: '-0.5s' }} d={`M${x + 12 * s} ${y + 12 * s} q${3 * s} ${-3 * s} ${7 * s} 0 q${3 * s} ${-3 * s} ${7 * s} 0`} />
    <path className="lm-bird" style={{ animationDelay: '-0.4s' }} d={`M${x + 36 * s} ${y + 4 * s} q${3 * s} ${-3 * s} ${6 * s} 0 q${3 * s} ${-3 * s} ${6 * s} 0`} />
  </g>
);

/* Etched tree (side view): trunk + layered scribbled canopy with shading */
export function EtchTree({ x, y, s = 1, seed = 1 }) {
  const r = rnd(seed);
  const blobs = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2;
    return [x + Math.cos(a) * 13 * s + (r() - 0.5) * 6 * s, y - 34 * s + Math.sin(a) * 9 * s + (r() - 0.5) * 4 * s, (9 + r() * 5) * s];
  });
  return (
    <g>
      <path d={`M${x - 2.5 * s} ${y} C${x - 2 * s} ${y - 12 * s} ${x - 4 * s} ${y - 20 * s} ${x - 6 * s} ${y - 26 * s} M${x + 2.5 * s} ${y} C${x + 2 * s} ${y - 14 * s} ${x + 3 * s} ${y - 20 * s} ${x + 7 * s} ${y - 27 * s}`} fill="none" stroke={INK} strokeWidth={1 * s} />
      <rect x={x - 2.5 * s} y={y - 18 * s} width={5 * s} height={18 * s} fill="url(#skHatchV)" />
      {blobs.map(([bx, by, br], i) => (
        <circle key={i} cx={bx} cy={by} r={br} fill={PAPER} stroke={INK} strokeWidth={0.8 * s} />
      ))}
      <circle cx={x} cy={y - 34 * s} r={12 * s} fill={PAPER} />
      {blobs.slice(0, 4).map(([bx, by, br], i) => (
        <circle key={`h${i}`} cx={bx + 2 * s} cy={by + 2 * s} r={br * 0.8} fill="url(#skHatch)" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <path key={`l${i}`} d={`M${x + (r() - 0.5) * 30 * s} ${y - 34 * s + (r() - 0.5) * 18 * s} q${2 * s} ${-2 * s} ${4 * s} 0`} fill="none" stroke={INK} strokeWidth={0.6 * s} />
      ))}
    </g>
  );
}

/* Rough rock / boulder polygon with shading on the lower right */
export function Boulder({ x, y, w, h, seed = 1, id }) {
  const r = rnd(seed);
  const n = 9;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + 0.2;
    const k = 0.82 + r() * 0.3;
    return [x + Math.cos(a) * w * k, y + Math.sin(a) * h * k * (Math.sin(a) < 0 ? 1 : 0.75)];
  });
  const d = `M${pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L')} Z`;
  return (
    <g>
      <clipPath id={id}>
        <path d={d} />
      </clipPath>
      <path d={d} fill={PAPER} />
      <g clipPath={`url(#${id})`}>
        <ellipse cx={x + w * 0.55} cy={y + h * 0.5} rx={w * 0.95} ry={h * 0.9} fill="url(#skHatch)" />
        <path d={`M${x - w * 0.5} ${y - h * 0.1} q${w * 0.3} ${-h * 0.2} ${w * 0.6} ${h * 0.05}`} fill="none" stroke={INK} strokeWidth="0.6" />
      </g>
      <path d={d} fill="none" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
    </g>
  );
}
