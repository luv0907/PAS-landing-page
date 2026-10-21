import React, { useEffect, useState } from 'react';
import PosterBackdrop from './components/PosterBackdrop';
import CityRoute from './components/map/CityRoute';
import MapStop from './components/map/MapStop';
import { HitecLandmark } from './components/map/Landmarks';
import useReveal from './lib/useReveal';
import CursorLogo from './components/CursorLogo';
import ChaiLoader from './components/ChaiLoader';
import useDropHeads from './lib/useDropHeads';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import FoundingPerks from './components/FoundingPerks';
import MerchantAppSection from './components/MerchantAppSection';
import Footer from './components/Footer';
import { CUSTOMER_FORM_URL, RESTAURANT_FORM_URL } from './lib/links';


export default function App() {
  useReveal();
  useDropHeads();

  // phones: the register bar slides down from the top once the hero logo scrolls away
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShowBar(window.scrollY > 140));
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', check); };
  }, []);

  return (
    <div className="pas-app-root">
      {/* One continuous poster backdrop behind every section (no breaks) */}
      <PosterBackdrop />

      {/* Hyderabad map route: Charminar → HITEC City store */}
      <CityRoute />

      {/* desktop: the bag-pin logo follows the mouse */}
      <CursorLogo />
      <ChaiLoader />

      <main id="main-content">
        <Hero />

        <MarqueeTicker />

        <FoundingPerks />

        <MerchantAppSection />
        <MapStop index={0} name="HITEC City" final>
          <HitecLandmark />
        </MapStop>
      </main>

      <Footer />

      {/* Mobile floating dock */}
      <aside className={`pas-mobile-floating-bar${showBar ? ' is-shown' : ''}`} aria-label="Register">
        <div className="mob-dock-inner">
          <a className="mob-dock-brand" href="#register" aria-label="Pick At Store, go to registration">
            <svg viewBox="0 0 750 800" width="20" height="22" aria-hidden="true">
              <path d="M225.5 192 V172 A150 150 0 0 1 525.5 172 V192" fill="none" stroke="#b32a26" strokeWidth="48" />
              <path d="M120 163 H630 Q675 163 680 210 L748 735 Q752 788 700 788 H50 Q-2 788 2 735 L70 210 Q75 163 120 163 Z" fill="#b32a26" />
              <path d="M375 645 L268 495 A143 143 0 1 1 482 495 Z" fill="#fff" />
              <circle cx="375" cy="400" r="93" fill="#b32a26" />
            </svg>
            <span className="mob-dock-brand__text">Register</span>
          </a>
          <a
            className="btn-mobile-pill btn-mob-customer"
            href={CUSTOMER_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Customer Access"
          >
            <span className="mob-btn-icon-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="mob-btn-label">Customer</span>
            <span className="mob-btn-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="btn-mobile-pill btn-mob-merchant"
            href={RESTAURANT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Merchant Access"
          >
            <span className="mob-btn-icon-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l2-5h14l2 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M9 22V12h6v10" />
              </svg>
            </span>
            <span className="mob-btn-label">Restaurant</span>
            <span className="mob-btn-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
