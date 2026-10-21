import React, { useEffect, useRef } from 'react';
import { buildDoodleTile, buildCityFrame, buildTrim } from '../lib/posterBackdrop';

const DOODLES = buildDoodleTile();

// doodle tile is drawn at 420px; shown a little smaller on phones
const tileSize = () => (window.innerWidth < 640 ? 300 : 420);

/**
 * ONE continuous poster backdrop for the whole page.
 * It is fixed behind every section, so there are no section breaks:
 * red wall + line-art doodles (slow parallax) + paper grain +
 * curved speaker stacks on both sides.
 */
export default function PosterBackdrop() {
  const wrapRef = useRef(null);
  const doodleRef = useRef(null);
  const dims = useRef({ W: 0, H: 0 });

  const frameRef = useRef(null);
  const stripRefs = useRef([]);
  const trimRefs = useRef([]);
  const lastTrim = useRef(-1);

  // old-city buildings stay put: they are a fixed frame and do NOT move
  // with the page scroll. Strips sit at 0 and the scalloped trim is drawn once.
  const placeStrips = () => {
    stripRefs.current.forEach((el) => {
      if (el) el.style.transform = 'none';
    });
    const { W, H } = dims.current;
    if (W && lastTrim.current !== 0) {
      lastTrim.current = 0;
      const d = buildTrim(W, H, 0);
      trimRefs.current.forEach((t) => t && t.setAttribute('d', d));
    }
  };

  // build the frame layers whenever the viewport size changes
  useEffect(() => {
    const wrap = wrapRef.current;
    const host = frameRef.current;
    if (!wrap || !host) return undefined;
    let raf = 0;
    const draw = () => {
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      dims.current = { W, H };
      const fr = buildCityFrame(W, H);
      const side = (cls) => `
        <div class="cf-side ${cls}" style="width:${Math.ceil(fr.a + 12)}px;height:${Math.ceil(fr.endY + 4)}px;clip-path:path('${fr.clip}')">
          <div class="cf-void"></div>
          <div class="cf-strip" style="width:${fr.tileW}px;height:${Math.ceil(fr.endY + fr.period * 2)}px;background-image:${fr.tile.replace(/"/g, "'")};background-size:${fr.tileW}px ${fr.period}px"></div>
        </div>`;
      const lines = (mirror) => `
        <g ${mirror ? `transform="translate(${W} 0) scale(-1 1)"` : ''}>
          <path d="${fr.edge}" fill="none" stroke="#000" stroke-width="${fr.isWide ? 6 : 4}"/>
          <path class="cf-trim" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="${fr.isWide ? 10 : 7}" stroke-linejoin="round"/>
          <path class="cf-trim" fill="none" stroke="#ffffff" stroke-width="${fr.isWide ? 3.5 : 2.6}" stroke-linejoin="round"/>
        </g>`;
      host.innerHTML = `${side('cf-side--l')}${side('cf-side--r')}
        <svg class="cf-lines" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${lines(false)}${lines(true)}</svg>`;
      stripRefs.current = [...host.querySelectorAll('.cf-strip')];
      trimRefs.current = [...host.querySelectorAll('.cf-trim')];
      lastTrim.current = -1;
      placeStrips();
    };
    draw();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // Doodle wallpaper drifts slowly while scrolling (GPU transform only)
  useEffect(() => {
    const el = doodleRef.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    let raf = 0;
    let tile = tileSize();
    const applySize = () => {
      tile = tileSize();
      el.style.backgroundSize = `${tile}px ${tile}px`;
      el.style.height = `calc(100% + ${tile}px)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = (window.scrollY * 0.35) % tile;
        el.style.transform = `translate3d(0, ${-y}px, 0)`;
      });
    };
    const onResize = () => {
      applySize();
      onScroll();
    };
    applySize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
    {/* side buildings: their own layer so the hero light never washes over them */}
    <div className="pas-frame-layer" aria-hidden="true">
      <div className="pas-backdrop__frame" ref={frameRef} />
    </div>
    <div className="pas-backdrop" ref={wrapRef} aria-hidden="true">
      <div className="pas-backdrop__wall" />
      <div className="pas-backdrop__doodles" ref={doodleRef} style={{ backgroundImage: DOODLES }} />
      <div className="pas-backdrop__grain" />
      <div className="pas-backdrop__glow" />
    </div>
    </>
  );
}
