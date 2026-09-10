import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function MovementStory({ onOpenStoryModal }) {
  return (
    <section id="about" className="movement-section">
      <div className="container">
        <div className="movement-grid">
          {/* Left: Macro Fabric Label */}
          <div className="movement-macro-box">
            <img
              src="/images/fabric-macro.jpg"
              alt="ELVOR Premium Cotton Fabric Texture"
              loading="lazy"
            />
          </div>

          {/* Center: Brand Movement Manifesto */}
          <div className="movement-content-box">
            <div className="movement-sub">MORE THAN JUST T-SHIRTS</div>
            <h2 className="movement-heading">It’s a Movement</h2>
            <p className="movement-body">
              At ELVOR, we believe in simple things — good fabric, great design and the freedom to be yourself. Our T-shirts are crafted with care, inspired by the spirit of Tamil Nadu’s rich textile heritage and the energy of today’s youth.
            </p>
            <button className="btn-story" onClick={onOpenStoryModal}>
              <span>Our Story</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right: Textile Heritage Spindles & Tag */}
          <div className="movement-heritage-box">
            <div className="heritage-img-wrap">
              <img
                src="/images/textile-mill.jpg"
                alt="Tamil Nadu Textile Mill Loom"
                loading="lazy"
              />
            </div>
            <div className="heritage-tagline">
              Rooted in<br />Tamil Nadu
            </div>
            <div className="heritage-divider" />
            <div className="heritage-tagline" style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Crafted for<br />India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
