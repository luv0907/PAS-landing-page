import React from 'react';

/** Pick At Store logo — red shopping bag with a yellow location pin. */
export default function BagPinLogo({ size = 48, className = '', title }) {
  return (
    <svg
      viewBox="0 -3 750 793"
      width={size}
      height={(size * 793) / 750}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* handle: semicircle measured from the official logo; viewBox starts at -3 so its top is not clipped */}
      <path d="M225.5 192 V172 A150 150 0 0 1 525.5 172 V192" fill="none" stroke="#b32a26" strokeWidth="48" />
      <path d="M120 163 H630 Q675 163 680 210 L748 735 Q752 788 700 788 H50 Q-2 788 2 735 L70 210 Q75 163 120 163 Z" fill="#b32a26" />
      <path d="M14 620 Q375 470 736 620" fill="none" stroke="#ffc808" strokeWidth="11" />
      <path d="M375 645 L268 495 A143 143 0 1 1 482 495 Z" fill="#ffc808" stroke="#b32a26" strokeWidth="16" strokeLinejoin="round" />
      <circle cx="375" cy="400" r="93" fill="#b32a26" />
    </svg>
  );
}
