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


export default function App() {
  useReveal();
  useDropHeads();

  // phones: one "Register now" pill floats in whenever the registration panel is off screen
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const panel = document.getElementById('hero-action-boxes');
    if (!panel || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && window.scrollY > 200), { threshold: 0.05 });
    io.observe(panel);
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

      {/* Phones: single floating register button */}
      <a className={`reg-fab${showBar ? ' is-shown' : ''}`} href="#register" aria-label="Register now, go to the registration passes" tabIndex={showBar ? 0 : -1}>
        <span className="reg-fab__star" aria-hidden="true">★</span>
        <span>Register now</span>
        <span className="reg-fab__arrow" aria-hidden="true">↑</span>
      </a>
    </div>
  );
}
