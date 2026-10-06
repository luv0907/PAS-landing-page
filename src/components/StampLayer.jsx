import React from 'react';

/**
 * Minimal decorative postal stamps scattered across a section.
 * stamp = { x, y: 'top'|'bottom'|'mid', off, moff, shape: 'rect'|'round'|'postage',
 *           border, tone: 'red'|'yellow', main, sub, rot, scale, waves, only }
 */
export default function StampLayer({ stamps = [] }) {
  return (
    <div className="stamp-layer" aria-hidden="true">
      {stamps.map((s, i) => {
        const y = s.y || 'top';
        const shape = s.shape || 'rect';
        return (
          <span
            key={i}
            className={[
              'mini-stamp',
              `mini-stamp--${shape}`,
              `mini-stamp--y-${y}`,
              `mini-stamp--${s.tone || 'red'}`,
              shape === 'rect' ? `mini-stamp--${s.border || 'dashed'}` : '',
              s.only ? `mini-stamp--${s.only}-only` : '',
            ].join(' ')}
            style={{
              left: `${s.x ?? 50}%`,
              '--off': `${s.off ?? 12}px`,
              '--moff': `${s.moff ?? s.off ?? 10}px`,
              '--rot': `${s.rot ?? -6}deg`,
              '--s': s.scale ?? 1,
            }}
          >
            <span className="mini-stamp__main">{s.main}</span>
            {s.sub && <span className="mini-stamp__sub">{s.sub}</span>}
            {s.waves && shape === 'round' && (
              <svg className="mini-stamp__waves" viewBox="0 0 60 30" preserveAspectRatio="none">
                <path d="M0 6 q7.5 -5 15 0 t15 0 t15 0 t15 0" />
                <path d="M0 15 q7.5 -5 15 0 t15 0 t15 0 t15 0" />
                <path d="M0 24 q7.5 -5 15 0 t15 0 t15 0 t15 0" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}
