import React from 'react';

/**
 * A landmark stop on the Hyderabad route. The route crosses the "ground"
 * spacer under the landmark; the final stop is where the route ends
 * (the store door, marked by .map-stop__anchor).
 */
export default function MapStop({ index, name, final = false, children }) {
  return (
    <section className={`map-stop${final ? ' map-stop--final' : ''}`} data-stop={index} aria-label={name}>
      <div className="map-stop__art">
        {children}
        {final && <span className="map-stop__anchor" />}
      </div>
      <div className="map-stop__sign">
        <span className="map-stop__sign-pin" aria-hidden="true" />
        <span className="map-stop__sign-text">{name}</span>
      </div>
      {!final && <div className="map-stop__ground" />}
    </section>
  );
}
