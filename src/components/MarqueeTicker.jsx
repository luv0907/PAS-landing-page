import React from 'react';

export default function MarqueeTicker() {
  const itemsRow1 = [
    { text: 'FOUNDING PICKSTARS ACCESS', icon: '★' },
    { text: 'EXCLUSIVE FOOD EXPERIENCES', icon: '★' },
    { text: 'EARLY ACCESS', icon: '★' },
    { text: 'FOUNDING-USER REWARDS', icon: '★' },
    { text: 'PICK AT STORE PASSPORT', icon: '★' },
    { text: 'FOUNDING USER STATUS', icon: '★' },
    { text: 'EXPLORE CAFES WITH FOUNDER', icon: '★' },
  ];

  const itemsRow2 = [
    { text: "INDIA'S FIRST PRE-DINE-IN PLATFORM", icon: '★' },
    { text: 'JUST 100 RESTAURANTS', icon: '★' },
    { text: 'HYDERABAD LAUNCH', icon: '★' },
    { text: 'FOUNDING 100 CERTIFICATE', icon: '★' },
    { text: 'FEATURED ON THE FOUNDING 100 WALL', icon: '★' },
    { text: 'LOCAL INFLUENCER REELS', icon: '★' },
    { text: 'COUNTER DISPLAY & QR KIT', icon: '★' },
  ];

  return (
    <div className="tape-wrap" aria-label="PickAtStore Core Guarantees">
      {/* Yellow tape — red text */}
      <div className="tape tape--yellow">
        <div className="tape__track">
          {[...itemsRow1, ...itemsRow1].map((item, idx) => (
            <span key={`r1-${idx}`} className="tape__item" aria-hidden={idx >= itemsRow1.length}>
              <span className="tape__icon">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* White tape — red text, runs the other way */}
      <div className="tape tape--white">
        <div className="tape__track tape__track--reverse">
          {[...itemsRow2, ...itemsRow2].map((item, idx) => (
            <span key={`r2-${idx}`} className="tape__item" aria-hidden={idx >= itemsRow2.length}>
              <span className="tape__icon">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
