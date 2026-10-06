import React, { useEffect, useRef, useState } from 'react';
import BagPinLogo from '../BagPinLogo';

/**
 * A real city street, seen from above, that runs from the Charminar street
 * down the page through each landmark to the Pick At Store shop.
 * Asphalt, yellow-black kerbs, paved footpaths, trees, street lamps and
 * zebra crossings. City traffic keeps moving; the PAS auto follows your
 * scroll and parks at the shop door at the end.
 */

const INK = '#2a1510';

/* ---------- vehicles, top view, facing +x, centred on (0,0) ---------- */
function AutoTop({ pas = false }) {
  return (
    <g>
      <ellipse cx="2" cy="3" rx="17" ry="9" fill="rgba(0,0,0,0.28)" />
      <path d="M-15 -6 Q-15 -8.5 -12 -8.5 H6 Q14 -7 16 0 Q14 7 6 8.5 H-12 Q-15 8.5 -15 6 Z" fill="#1d1d20" stroke="#000" strokeWidth="0.8" />
      <rect x="-13.5" y="-7.2" width="20" height="14.4" rx="4" fill="#ffc21a" stroke="#000" strokeWidth="0.8" />
      <path d="M-9 -7 V7 M-3 -7.2 V7.2 M3 -7 V7" stroke="#b07f00" strokeWidth="0.6" />
      <path d="M7 -6 Q12 -5 13.5 0 Q12 5 7 6 Z" fill="#2c3440" stroke="#000" strokeWidth="0.6" />
      <path d="M8.5 -4 Q11 -3 11.8 0" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.6" />
      {pas && (
        <g transform="translate(-6.5 -5.4) scale(0.0145)">
          <path d="M225.5 192 V172 A150 150 0 0 1 525.5 172 V192" fill="none" stroke="#b32a26" strokeWidth="48" />
          <path d="M120 163 H630 Q675 163 680 210 L748 735 Q752 788 700 788 H50 Q-2 788 2 735 L70 210 Q75 163 120 163 Z" fill="#b32a26" />
          <path d="M375 645 L268 495 A143 143 0 1 1 482 495 Z" fill="#fff" />
          <circle cx="375" cy="400" r="93" fill="#b32a26" />
        </g>
      )}
      <circle cx="15.5" cy="0" r="1.2" fill="#fff3b0" />
    </g>
  );
}

function CarTop({ color = '#fffaf0' }) {
  return (
    <g>
      <rect x="-15" y="-7" width="34" height="16" rx="5" fill="rgba(0,0,0,0.28)" />
      <rect x="-17" y="-8.5" width="34" height="17" rx="5" fill={color} stroke="#000" strokeWidth="0.8" />
      <path d="M5 -7 Q10 -6 11 0 Q10 6 5 7 L3 5 V-5 Z" fill="#2c3440" stroke="#000" strokeWidth="0.5" />
      <path d="M-11 -6.5 Q-14 0 -11 6.5 L-9 5 V-5 Z" fill="#2c3440" stroke="#000" strokeWidth="0.5" />
      <rect x="-9" y="-6.2" width="12" height="12.4" rx="2" fill={color} stroke="#000" strokeWidth="0.4" strokeOpacity="0.6" />
      <rect x="-9" y="-6.2" width="12" height="12.4" rx="2" fill="rgba(0,0,0,0.08)" />
      <path d="M4 -8.5 l1.5 -1.6 M4 8.5 l1.5 1.6" stroke="#000" strokeWidth="1.2" />
      <circle cx="16" cy="-5" r="1" fill="#fff3b0" />
      <circle cx="16" cy="5" r="1" fill="#fff3b0" />
    </g>
  );
}

function BusTop() {
  return (
    <g>
      <rect x="-26" y="-8" width="56" height="20" rx="3" fill="rgba(0,0,0,0.28)" />
      <rect x="-28" y="-9.5" width="56" height="19" rx="3" fill="#d32f2f" stroke="#000" strokeWidth="0.8" />
      <rect x="-26" y="-6" width="48" height="12" rx="1.5" fill="#fffaf0" stroke="#000" strokeWidth="0.5" />
      {[-20, -8, 4].map((x) => (
        <rect key={x} x={x} y="-3.5" width="8" height="7" rx="1" fill="#cfcfd4" stroke="#000" strokeWidth="0.5" />
      ))}
      <path d="M23 -8 Q27 -7 27.5 0 Q27 7 23 8 Z" fill="#2c3440" stroke="#000" strokeWidth="0.5" />
      <rect x="-28" y="-1" width="2" height="2" fill="#ffc21a" />
    </g>
  );
}

/* Gulmohar (red) and Amaltas (yellow) trees, seen from above */
const TREE_TONES = [
  { base: '#9e1b0c', mid: '#cf3517', hi: '#f0632e', bloom: '#ffb347' },
  { base: '#b87d00', mid: '#e3a800', hi: '#ffd23d', bloom: '#fff1a6' },
  { base: '#8a1a0e', mid: '#b92d14', hi: '#e2522a', bloom: '#ffc21a' },
];
function TreeTop({ r = 13, seed = 1 }) {
  const k = (n) => ((Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  const tone = TREE_TONES[seed % 5 === 0 ? 1 : seed % 2 ? 2 : 0];
  const blobs = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + k(i);
    return [Math.cos(a) * r * 0.52, Math.sin(a) * r * 0.52, r * (0.48 + k(i + 9) * 0.22)];
  });
  return (
    <g>
      <ellipse cx={r * 0.35} cy={r * 0.45} rx={r * 1.08} ry={r} fill="rgba(40,5,0,0.3)" />
      {blobs.map(([x, y, br], i) => (
        <circle key={i} cx={x} cy={y} r={br} fill={tone.base} stroke={INK} strokeWidth="0.6" strokeOpacity="0.8" />
      ))}
      <circle cx="0" cy="0" r={r * 0.62} fill={tone.base} />
      {blobs.map(([x, y, br], i) => (
        <circle key={`m${i}`} cx={x - br * 0.18} cy={y - br * 0.18} r={br * 0.68} fill={tone.mid} />
      ))}
      <circle cx={-r * 0.12} cy={-r * 0.12} r={r * 0.45} fill={tone.mid} />
      {blobs.slice(0, 4).map(([x, y, br], i) => (
        <circle key={`h${i}`} cx={x - br * 0.35} cy={y - br * 0.35} r={br * 0.32} fill={tone.hi} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={`f${i}`} cx={(k(i + 3) - 0.5) * r * 1.4} cy={(k(i + 5) - 0.5) * r * 1.4} r={0.9 + k(i + 7)} fill={tone.bloom} />
      ))}
    </g>
  );
}

function LampTop({ glow = true }) {
  return (
    <g>
      {glow && <circle cx="9" cy="0" r="16" fill="url(#rtLampGlow)" className="rt-lamp" />}
      <circle cx="0" cy="0" r="2.4" fill="#3a3a3f" stroke="#000" strokeWidth="0.6" />
      <line x1="0" y1="0" x2="9" y2="0" stroke="#3a3a3f" strokeWidth="1.4" />
      <rect x="8" y="-2" width="5" height="4" rx="1" fill="#fff3b0" stroke="#000" strokeWidth="0.5" />
    </g>
  );
}

const TRAFFIC = [
  { type: 'bus', speed: 34, dir: 1, start: 0.08 },
  { type: 'car', speed: 58, dir: -1, start: 0.3, color: '#fffaf0' },
  { type: 'auto', speed: 44, dir: 1, start: 0.52 },
  { type: 'car', speed: 52, dir: 1, start: 0.74, color: '#ff3b2f' },
  { type: 'auto', speed: 40, dir: -1, start: 0.9 },
  { type: 'car', speed: 48, dir: -1, start: 0.62, color: '#ffc21a' },
];

function RoadRoute() {
  const underRef = useRef(null);
  const baseRef = useRef(null);
  const markerRef = useRef(null);
  const pinRef = useRef(null);
  const trafficRefs = useRef([]);
  const geo = useRef({ startY: 0, endY: 0, pins: [], total: 0 });
  const [shape, setShape] = useState({ w: 0, h: 0, d: '', pins: [], end: null, road: 40, fp: 12, wide: true });
  const [deco, setDeco] = useState({ trees: [], lamps: [], zebras: [], signs: [] });

  /* ---------- geometry from real layout ---------- */
  useEffect(() => {
    const layer = underRef.current;
    if (!layer) return undefined;
    const root = layer.parentElement;
    let raf = 0;

    const build = () => {
      const rb = root.getBoundingClientRect();
      const rel = (r) => ({ top: r.top - rb.top, bottom: r.bottom - rb.top, cx: r.left - rb.left + r.width / 2 });
      const W = root.clientWidth;
      const H = root.offsetHeight;
      const scene = root.querySelector('.poster-scene');
      const stops = [...root.querySelectorAll('.map-stop')];
      if (!scene || !stops.length) return;

      const containerLeft = (W - Math.min(W, 1080)) / 2;
      const wide = containerLeft >= 120;
      const road = wide ? 46 : 26;
      const fp = wide ? 12 : 5;
      const laneL = wide ? containerLeft - 36 : 13;
      const laneR = W - laneL;
      const mid = W / 2;

      const startY = rel(scene.getBoundingClientRect()).bottom - 8;
      // the street turns off the Charminar main road at its left end
      const sceneLeft = scene.getBoundingClientRect().left - rb.left;
      const pts = [[Math.max(sceneLeft + (wide ? 70 : 34), laneL + 20), startY - (wide ? 24 : 14)]];
      const pins = [];
      let side = 0;
      const laneX = () => (side === 0 ? laneL : laneR);

      pts.push([laneX(), startY + (wide ? 150 : 110)]);
      let end = null;

      stops.forEach((stop) => {
        if (stop.classList.contains('map-stop--final')) {
          const a = rel(stop.querySelector('.map-stop__anchor').getBoundingClientRect());
          pts.push([laneX(), a.top - (wide ? 260 : 190)]);
          pts.push([a.cx, a.top]);
          end = { x: a.cx, y: a.top };
        } else {
          const g = rel(stop.querySelector('.map-stop__ground').getBoundingClientRect());
          pts.push([laneX(), g.top]);
          side = 1 - side;
          pts.push([laneX(), g.bottom]);
          pins.push({ y: (g.top + g.bottom) / 2 });
        }
      });

      let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i += 1) {
        const [x0, y0] = pts[i - 1];
        const [x1, y1] = pts[i];
        const my = (y0 + y1) / 2;
        d += ` C${x0.toFixed(1)} ${my.toFixed(1)} ${x1.toFixed(1)} ${my.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      }
      geo.current = { ...geo.current, startY, endY: end ? end.y : H, pins };
      setShape({ w: W, h: H, d, pins, end, road, fp, wide });
    };

    build();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    });
    ro.observe(root);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    window.addEventListener('load', build);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('load', build);
    };
  }, []);

  /* ---------- trees, lamps, crossings along the street ---------- */
  useEffect(() => {
    const base = baseRef.current;
    if (!shape.d || !base) return;
    const total = base.getTotalLength();
    geo.current.total = total;
    const at = (len) => {
      const p = base.getPointAtLength(Math.max(0, Math.min(total, len)));
      const q = base.getPointAtLength(Math.max(0, Math.min(total, len + 2)));
      const a = Math.atan2(q.y - p.y, q.x - p.x);
      return { x: p.x, y: p.y, a, nx: -Math.sin(a), ny: Math.cos(a) };
    };
    const lenAtY = (y) => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 22; i += 1) {
        const m = (lo + hi) / 2;
        if (base.getPointAtLength(m).y < y) lo = m;
        else hi = m;
      }
      return lo;
    };
    const { road, fp, wide, w } = shape;
    const off = road / 2 + fp + (wide ? 16 : 9);
    const trees = [];
    const lamps = [];
    const step = wide ? 120 : 95;
    for (let s = 150, i = 0; s < total - 120; s += step, i += 1) {
      const p = at(s);
      [-1, 1].forEach((side) => {
        const x = p.x + p.nx * off * side;
        const y = p.y + p.ny * off * side;
        if (x > -10 && x < w + 10 && (i + (side > 0 ? 1 : 0)) % 3 !== 0) trees.push({ x, y, seed: i * 2 + (side > 0 ? 1 : 0), r: wide ? 16 + ((i * 7) % 5) : 9 });
      });
      if (i % 2 === 0) {
        const side = i % 4 === 0 ? 1 : -1;
        const lo = road / 2 + fp * 0.55;
        lamps.push({ x: p.x + p.nx * lo * side, y: p.y + p.ny * lo * side, a: (p.a * 180) / Math.PI + (side > 0 ? -90 : 90) });
      }
    }
    const zebras = geo.current.pins.map((pin) => {
      const p = at(lenAtY(pin.y));
      return { x: p.x, y: p.y, a: (p.a * 180) / Math.PI, nx: p.nx, ny: p.ny };
    });
    const signs = geo.current.pins.map((pin) => {
      const p = at(lenAtY(pin.y));
      return { x: p.x - p.nx * (road / 2 + fp + (wide ? 22 : 14)), y: p.y - p.ny * (road / 2 + fp + (wide ? 22 : 14)) };
    });
    setDeco({ trees, lamps, zebras, signs });
  }, [shape]);

  /* ---------- scroll: the PAS auto drives along the street ---------- */
  useEffect(() => {
    const base = baseRef.current;
    if (!shape.d || !base) return undefined;
    const total = base.getTotalLength();
    const lane = shape.road / 4;
    const scale = shape.wide ? 1.15 : 0.72;

    const lenAtY = (y) => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 20; i += 1) {
        const m = (lo + hi) / 2;
        if (base.getPointAtLength(m).y < y) lo = m;
        else hi = m;
      }
      return lo;
    };
    const pose = (len, dir) => {
      const L = Math.max(0, Math.min(total, len));
      const p = base.getPointAtLength(L);
      const q = base.getPointAtLength(Math.max(0, Math.min(total, L + 3)));
      const a = Math.atan2(q.y - p.y, q.x - p.x);
      const nx = -Math.sin(a);
      const ny = Math.cos(a);
      return { x: p.x + nx * lane * dir, y: p.y + ny * lane * dir, deg: (a * 180) / Math.PI + (dir < 0 ? 180 : 0) };
    };

    let raf = 0;
    const pinEls = document.querySelectorAll('.route-sign');
    const update = () => {
      const layer = underRef.current;
      const marker = markerRef.current;
      const pin = pinRef.current;
      if (!layer || !marker) return;
      const layerTop = layer.getBoundingClientRect().top + window.scrollY;
      const { startY, endY, pins } = geo.current;
      const target = window.scrollY + window.innerHeight * 0.6 - layerTop;
      const y = Math.max(startY, Math.min(endY, target));
      const parked = y >= endY - 1;
      const len = parked ? total - 4 : lenAtY(y);
      const p = pose(len, 1);
      marker.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.deg.toFixed(1)}) scale(${scale})`);
      if (pin) {
        pin.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        pin.classList.toggle('is-parked', parked);
      }
      pins.forEach((pn, i) => {
        const arrived = y >= pn.y - 2;
        if (pinEls[i]) pinEls[i].classList.toggle('is-arrived', arrived);
        const stop = document.querySelectorAll('.map-stop:not(.map-stop--final)')[i];
        if (stop) stop.classList.toggle('is-arrived', arrived);
      });
      const finalStop = document.querySelector('.map-stop--final');
      if (finalStop) finalStop.classList.toggle('is-arrived', parked);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* city traffic: keeps moving on its own */
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let traf = 0;
    let t0 = performance.now();
    const tick = (now) => {
      const t = (now - t0) / 1000;
      const vTop = window.scrollY - 200;
      const vBot = window.scrollY + window.innerHeight + 200;
      const layerTop = underRef.current ? underRef.current.getBoundingClientRect().top + window.scrollY : 0;
      TRAFFIC.forEach((v, i) => {
        const el = trafficRefs.current[i];
        if (!el) return;
        const span = total - 60;
        let s = (v.start * span + (reduce ? 0 : t * v.speed * v.dir)) % span;
        if (s < 0) s += span;
        const p = pose(s + 30, v.dir);
        const visible = p.y + layerTop > vTop && p.y + layerTop < vBot;
        if (visible) el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.deg.toFixed(1)}) scale(${scale})`);
        el.style.display = visible ? '' : 'none';
      });
      if (!reduce) traf = requestAnimationFrame(tick);
    };
    traf = requestAnimationFrame(tick);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(traf);
      else {
        t0 = performance.now() - 0;
        traf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(traf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [shape]);

  const { w, h, d, road, fp, wide } = shape;
  const zebraW = road - 4;

  return (
    <>
      <div className="route-layer" ref={underRef} aria-hidden="true">
        {d && (
          <svg className="route-svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <defs>
              <pattern id="rtAsphalt" width="14" height="14" patternUnits="userSpaceOnUse">
                <rect width="14" height="14" fill="#3b3b40" />
                <circle cx="2" cy="3" r="0.7" fill="#56565c" />
                <circle cx="9" cy="2" r="0.5" fill="#2a2a2e" />
                <circle cx="6" cy="9" r="0.8" fill="#2c2c30" />
                <circle cx="12" cy="11" r="0.6" fill="#5a5a60" />
                <circle cx="3" cy="12" r="0.4" fill="#4a4a50" />
                <circle cx="11" cy="6" r="0.35" fill="#66666c" />
              </pattern>
              <pattern id="rtPaver" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#eadcbf" />
                <path d="M0 7.5 H8 M7.5 0 V8" stroke="#bfa984" strokeWidth="0.6" />
                <circle cx="3" cy="3" r="0.4" fill="#cdb894" />
              </pattern>
              <pattern id="rtHatch" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                <line x1="0" y1="0" x2="0" y2="2.6" stroke={INK} strokeWidth="0.6" strokeOpacity="0.65" />
              </pattern>
              <radialGradient id="rtLampGlow">
                <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#fff3b0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ground shadow under the street */}
            <path d={d} fill="none" stroke="rgba(60,0,0,0.25)" strokeWidth={road + fp * 2 + 10} strokeLinecap="round" transform="translate(3 5)" />
            {/* footpaths */}
            <path d={d} fill="none" stroke="#9c8a6a" strokeWidth={road + fp * 2 + 2} strokeLinecap="round" />
            <path d={d} fill="none" stroke="url(#rtPaver)" strokeWidth={road + fp * 2} strokeLinecap="round" />
            {/* yellow-black kerb */}
            <path d={d} fill="none" stroke="#ffc21a" strokeWidth={road + 5} strokeLinecap="butt" />
            <path d={d} fill="none" stroke="#1a1a1c" strokeWidth={road + 5} strokeDasharray="7 7" strokeLinecap="butt" />
            {/* asphalt */}
            <path ref={baseRef} d={d} fill="none" stroke="url(#rtAsphalt)" strokeWidth={road} strokeLinecap="butt" />
            {/* worn tyre tracks */}
            <path d={d} fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth={road * 0.62} strokeLinecap="butt" />
            <path d={d} fill="none" stroke="url(#rtAsphalt)" strokeWidth={road * 0.46} strokeLinecap="butt" />
            {/* edge lines */}
            <path d={d} fill="none" stroke="#f2f2f2" strokeOpacity="0.85" strokeWidth={road - 5} />
            <path d={d} fill="none" stroke="url(#rtAsphalt)" strokeWidth={road - 7.5} />
            <path d={d} fill="none" stroke="#000" strokeOpacity="0.1" strokeWidth={road * 0.62} />
            {/* centre line */}
            <path d={d} fill="none" stroke="#f5f5f5" strokeWidth={wide ? 2 : 1.4} strokeDasharray={wide ? '16 12' : '10 9'} />

            {/* zebra crossings */}
            {deco.zebras.map((z, i) => (
              <g key={`z${i}`} transform={`translate(${z.x.toFixed(1)} ${z.y.toFixed(1)}) rotate(${z.a.toFixed(1)})`}>
                {Array.from({ length: 7 }, (_, k) => (
                  <rect key={k} x={-3} y={-zebraW / 2 + k * (zebraW / 7) + 1} width={wide ? 18 : 12} height={zebraW / 7 - 2.4} transform={`translate(${wide ? -9 : -6} 0)`} fill="#f2f2f2" fillOpacity="0.92" />
                ))}
              </g>
            ))}

            {/* street lamps */}
            {deco.lamps.map((l, i) => (
              <g key={`l${i}`} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.a.toFixed(1)}) scale(${wide ? 1 : 0.7})`}>
                <LampTop />
              </g>
            ))}

            {/* trees along the footpaths */}
            {deco.trees.map((t, i) => (
              <g key={`t${i}`} transform={`translate(${t.x.toFixed(1)} ${t.y.toFixed(1)})`}>
                <TreeTop r={t.r} seed={t.seed} />
              </g>
            ))}

            {/* traffic */}
            {TRAFFIC.map((v, i) => (
              <g key={`v${i}`} ref={(el) => { trafficRefs.current[i] = el; }} style={{ display: 'none' }}>
                {v.type === 'bus' && <BusTop />}
                {v.type === 'car' && <CarTop color={v.color} />}
                {v.type === 'auto' && <AutoTop />}
              </g>
            ))}

            {/* the PAS auto (follows your scroll) */}
            <g ref={markerRef}>
              <AutoTop pas />
            </g>
          </svg>
        )}
      </div>

      {/* stop signs + floating logo pin, above the content */}
      <div className="route-top" aria-hidden="true">
        {deco.signs.map((s, i) => (
          <div key={i} className="route-sign" style={{ transform: `translate3d(${s.x}px, ${s.y}px, 0)` }}>
            <span className="route-pin__ring" />
            <span className="route-pin__dot">
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#000" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        ))}
        {d && (
          <div className="route-floatpin" ref={pinRef}>
            <span className="route-floatpin__logo">
              <BagPinLogo size={wide ? 34 : 24} />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

const DESKTOP = '(min-width: 900px)';

/* Desktop: no road. Stops light up as they reach the middle of the screen. */
function StopArrivals() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const line = window.innerHeight * 0.6;
      document.querySelectorAll('.map-stop').forEach((stop) => {
        const art = stop.querySelector('.map-stop__art');
        const r = (art || stop).getBoundingClientRect();
        stop.classList.toggle('is-arrived', r.top + r.height * 0.6 < line);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return null;
}

export default function CityRoute() {
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const on = () => setDesktop(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  /* landmarks pop in when they enter the view */
  useEffect(() => {
    const stops = document.querySelectorAll('.map-stop');
    if (!('IntersectionObserver' in window)) {
      stops.forEach((s) => s.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-in')),
      { rootMargin: '0px 0px -12% 0px' },
    );
    stops.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);


  return desktop ? <StopArrivals /> : <RoadRoute />;
}
