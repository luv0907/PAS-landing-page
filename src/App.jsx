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

  // phones: tuck the floating dock away once the footer is on screen
  const [footerInView, setFooterInView] = useState(false);
  useEffect(() => {
    const footer = document.getElementById('siteFooter');
    if (!footer || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setFooterInView(e.isIntersecting), { rootMargin: '0px 0px -40px 0px' });
    io.observe(footer);
    return () => io.disconnect();
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
      <aside className={`pas-mobile-floating-bar${footerInView ? ' is-tucked' : ''}`} aria-label="Mobile Quick Registration">
        <div className="mob-dock-inner">
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
