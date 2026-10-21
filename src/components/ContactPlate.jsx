import React, { useId } from 'react';

/* Official contact / social links used by the black info bars and the footer */
export const WHATSAPP_URL = 'https://wa.me/919100871273';
export const INSTAGRAM_URL = 'https://www.instagram.com/pickatstore.in/';
export const YOUTUBE_URL = 'https://youtu.be/wrxbzmcJhXo';

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="social-ico" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#25d366" />
      <path d="M6.2 18.2 7 15.3a6.3 6.3 0 1 1 2.4 2.3Z" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.6 8.9c.2-.4.4-.4.6-.4h.4c.1 0 .3 0 .4.3l.6 1.4c.1.2 0 .3-.1.5l-.4.5c-.1.1-.1.2 0 .4.6 1 1.3 1.6 2.3 2 .2.1.3.1.4 0l.6-.7c.1-.2.3-.2.5-.1l1.3.6c.2.1.3.2.3.3 0 .6-.3 1.2-.9 1.4-.6.3-1.4.3-2.9-.4-1.7-.8-2.8-2.5-3-2.8-.2-.3-.7-1.1-.7-2 0-.6.3-1 .6-1.3Z" fill="#fff" />
    </svg>
  );
}

export function InstagramIcon() {
  const gid = `ig${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 24 24" className="social-ico" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.1" stopColor="#fdf497" />
          <stop offset="0.5" stopColor="#fd5949" />
          <stop offset="0.68" stopColor="#d6249f" />
          <stop offset="1" stopColor="#285aeb" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill={`url(#${gid})`} />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="social-ico" aria-hidden="true">
      <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#ff0000" />
      <path d="M10 8.6v6.8l5.8-3.4Z" fill="#fff" />
    </svg>
  );
}

/* white glyphs for the big app-style tiles (phones) */
function AppGlyph({ kind }) {
  if (kind === 'wa') {
    return (
      <svg viewBox="0 0 24 24" className="app-tile__glyph" aria-hidden="true">
        <path d="M5 19.5 6.1 15.8a7.4 7.4 0 1 1 2.8 2.7Z" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.4 8.3c.2-.4.4-.5.7-.5h.5c.2 0 .4 0 .5.3l.7 1.6c.1.2 0 .4-.1.5l-.5.6c-.1.1-.1.3 0 .4.7 1.1 1.5 1.9 2.7 2.4.2.1.3.1.4 0l.7-.8c.2-.2.3-.2.5-.1l1.5.7c.2.1.3.2.3.4 0 .7-.3 1.3-1 1.6-.7.3-1.6.3-3.3-.5-2-1-3.2-2.9-3.4-3.2-.2-.3-.8-1.3-.8-2.3 0-.7.3-1.2.6-1.5Z" fill="#fff" />
      </svg>
    );
  }
  if (kind === 'ig') {
    return (
      <svg viewBox="0 0 24 24" className="app-tile__glyph" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.8" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.2" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="app-tile__glyph" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="#fff" />
      <path d="M10 9v6l5.2-3Z" fill="#ff0000" />
    </svg>
  );
}

const APP_TILES = [
  { kind: 'wa', href: WHATSAPP_URL, name: 'WhatsApp', note: 'Chat with us', label: 'Chat with Pick At Store on WhatsApp' },
  { kind: 'ig', href: INSTAGRAM_URL, name: 'Instagram', note: '@pickatstore.in', label: 'Pick At Store on Instagram' },
  { kind: 'yt', href: YOUTUBE_URL, name: 'YouTube', note: 'Watch video', label: 'Watch Pick At Store on YouTube' },
];

/** Black info bar with three link buttons: WhatsApp, Instagram, YouTube.
 *  Phones get a "home screen" version with three big app icons instead. */
export default function ContactPlate({ label = 'FOR ENQUIRIES & SOCIAL MEDIA', title, sub }) {
  return (
    <>
    <div className="app-dock" aria-label="Contact Pick At Store">
      <div className="app-dock__head">
        <span className="app-dock__hi">SAY HI!</span>
        <span className="app-dock__sub">For enquiries &amp; social media</span>
      </div>
      <div className="app-dock__row">
        {APP_TILES.map((t) => (
          <a key={t.kind} className={`app-tile app-tile--${t.kind}`} href={t.href} target="_blank" rel="noopener noreferrer" aria-label={t.label}>
            <span className="app-tile__icon"><AppGlyph kind={t.kind} /></span>
            <span className="app-tile__name">{t.name}</span>
            <span className="app-tile__note">{t.note}</span>
          </a>
        ))}
      </div>
      <a className="app-dock__phone" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">+91 91008 71273 · Hyderabad</a>
    </div>
    <div className="info-plate info-plate--links">
      <div className="info-plate__inner">
        {title ? (
          <span className="info-plate__head">
            <span className="info-plate__title">{title}</span>
            {sub && <span className="info-plate__sub">{sub}</span>}
          </span>
        ) : (
          <span className="info-plate__label">{label}:</span>
        )}
        <span className="info-plate__links">
          <a className="social-btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Pick At Store on WhatsApp">
            <WhatsAppIcon />
            <span>+91 91008 71273</span>
          </a>
          <a className="social-btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Pick At Store on Instagram">
            <InstagramIcon />
            <span>@pickatstore.in</span>
          </a>
          <a className="social-btn" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="Watch Pick At Store on YouTube">
            <YouTubeIcon />
            <span>Watch video</span>
          </a>
        </span>
      </div>
    </div>
    </>
  );
}
