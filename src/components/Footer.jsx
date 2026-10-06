import React from 'react';
import { CUSTOMER_FORM_URL, RESTAURANT_FORM_URL } from '../lib/links';


const MAIN_SITE_URL = "https://www.pickatstore.io/";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=io.pickatstore.consumer";
const APP_STORE_URL = "https://apps.apple.com/in/app/pick-at-store/id6760038157";

export default function Footer() {
  return (
    <footer className="pas-footer" id="siteFooter">
      <div className="pas-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="footer-logo" href={MAIN_SITE_URL} aria-label="Pick At Store – go to the main website">
              <img src="/images/pas-logo-footer.webp" alt="Pick At Store" width="936" height="491" className="footer-logo__img" decoding="async" loading="lazy" />
            </a>
            <p className="footer-tagline">
              India's first unified retail BOPIS platform. Order from your favourite neighbourhood stores and pickup at the store in minutes.
            </p>
            <div className="footer-contact">
              <span>For Queries: <a className="footer-contact__link y" href="https://wa.me/917842287373" target="_blank" rel="noopener noreferrer"><strong>+91 78422 87373</strong></a></span>
              <span>Website: <a className="footer-contact__link y" href={MAIN_SITE_URL}><strong>www.pickatstore.io</strong></a></span>
              <span>Headquarters: <strong>Hyderabad, Telangana, India</strong></span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul>
              <li><a href="#hero">Overview</a></li>
              <li><a href="#founding-100">Founding 100 Selection</a></li>
              <li><a href="#merchant-app">Merchant Operating App</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Official Access</h4>
            <ul>
              <li>
                <a className="footer-link-btn" href={CUSTOMER_FORM_URL} target="_blank" rel="noopener noreferrer">
                  ★ Customer Access (First 1,000)
                </a>
              </li>
              <li>
                <a className="footer-link-btn" href={RESTAURANT_FORM_URL} target="_blank" rel="noopener noreferrer">
                  ★ Merchant Access (Restaurants)
                </a>
              </li>
              <li><a href="#merchant-app" id="footer-merchant-app">Merchant App</a></li>
              <li><a href="#get-the-app" id="footer-customer-app">Customer App</a></li>
            </ul>
          </div>
        </div>

        {/* Get the app */}
        <div className="footer-apps" id="get-the-app">
          <span className="footer-apps__label">Get the Pick At Store app</span>
          <div className="footer-apps__row">
            <a className="store-badge" id="footer-play-store" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
              <svg className="store-badge__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Z" fill="#00d7fe" />
                <path d="m16.8 8.6-3.4 3.4-9.8-10.2c.3-.2.8-.2 1.2 0l12 6.8Z" fill="#32bb52" />
                <path d="m16.8 15.4-12 6.8c-.4.2-.9.2-1.2 0l9.8-10.2 3.4 3.4Z" fill="#f4304a" />
                <path d="m20.4 10.6-3.6-2-3.4 3.4 3.4 3.4 3.6-2c1-.6 1-2.2 0-2.8Z" fill="#ffc21a" />
              </svg>
              <span className="store-badge__text">
                <span className="store-badge__small">GET IT ON</span>
                <span className="store-badge__big">Google Play</span>
              </span>
            </a>
            <a className="store-badge" id="footer-app-store" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
              <svg className="store-badge__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#fff" d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1ZM13.9 5.1c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5Z" />
              </svg>
              <span className="store-badge__text">
                <span className="store-badge__small">Download on the</span>
                <span className="store-badge__big">App Store</span>
              </span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PAS Retail Networks PVT LTD. All rights reserved.</p>
          <div className="footer-legal">
            <span>Privacy Shield</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Security Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
