import React from 'react';

export default function BrandLogo({ size = 'md', onNavigate }) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  const emblemHeight = isLarge ? 50 : isSmall ? 34 : 42;
  const lvorSize = isLarge ? '28px' : isSmall ? '19px' : '24px';
  const lvorMarginTop = isLarge ? '14px' : isSmall ? '8px' : '11px';

  return (
    <a
      href="#home"
      className="brand-logo-combo"
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate('home');
        }
      }}
    >
      <div className="brand-logo-main-row">
        <img
          src="/Logo.png"
          alt="E"
          className="brand-emblem-img"
          style={{ height: `${emblemHeight}px` }}
        />
        <span
          className="brand-lvor-text"
          style={{
            fontSize: lvorSize,
            marginTop: lvorMarginTop
          }}
        >
          LVOR
        </span>
      </div>
      <span className="brand-tagline">
        WEAR YOUR STORY
      </span>
    </a>
  );
}
