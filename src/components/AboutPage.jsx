import React from 'react';
import { 
  Sparkles, 
  Truck, 
  Leaf, 
  Heart, 
  Users, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  Award
} from 'lucide-react';

export default function AboutPage({ onNavigate, onOpenStoryModal }) {
  return (
    <div className="about-page-wrapper">
      {/* ========================================================
          ABOUT HERO BANNER
          ======================================================== */}
      <section className="about-hero-banner">
        <img
          src="/images/hero.jpg"
          alt="About ELVOR Menswear"
          className="about-hero-img"
        />
        <div className="about-hero-overlay" />

        {/* Handwritten Cursive Note on Right */}
        <div className="about-handwritten-note">
          <div>From</div>
          <div>Tamil Nadu</div>
          <div>To Your</div>
          <div>Wardrobe</div>
          <svg className="about-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
            <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
          <div className="about-hero-content">
            <div className="about-hero-tag">ABOUT US</div>
            <h1 className="about-hero-title">
              MORE THAN<br />
              JUST T-SHIRTS
            </h1>
            <p className="about-hero-desc">
              We're not just a clothing brand. We're a movement for men who wear their own story.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          OUR STORY SECTION (3 COLUMNS)
          ======================================================== */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            {/* Left Column: Image with Style Comfort Confidence overlay */}
            <div className="about-story-img-card">
              <img
                src="/images/hero.jpg"
                alt="ELVOR Streetwear Models"
                className="about-story-models-img"
              />
              <div className="about-story-img-gradient" />
              <div className="about-story-badge-text">
                <div>STYLE</div>
                <div>COMFORT</div>
                <div>CONFIDENCE</div>
              </div>
            </div>

            {/* Middle Column: Our Story Content */}
            <div className="about-story-content">
              <div className="about-section-label">OUR STORY</div>
              <h2 className="about-story-heading">
                Built by Passion.<br />
                Designed for You.
              </h2>
              <p className="about-story-p">
                ELVOR was born from a simple belief — that every man has a story, and what he wears should reflect it. We started with a vision to create premium, stylish, and comfortable men’s T-shirts that fit every mood, moment, and mindset.
              </p>
              <p className="about-story-p">
                From everyday essentials to bold statement pieces, ELVOR is designed for dreamers, creators, achievers, and every man in between.
              </p>
              <button className="btn-dark-journey" onClick={onOpenStoryModal}>
                <span>OUR JOURNEY</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Column: 4 Pillars with Circle Icons */}
            <div className="about-pillars-list">
              {/* Pillar 1 */}
              <div className="about-pillar-row">
                <div className="about-pillar-circle-icon">
                  <Sparkles size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-pillar-title">Premium Quality</h4>
                  <p className="about-pillar-sub">Only the finest fabrics for lasting comfort.</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="about-pillar-row">
                <div className="about-pillar-circle-icon">
                  <Truck size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-pillar-title">Pan-Tamil Nadu Delivery</h4>
                  <p className="about-pillar-sub">Bringing ELVOR to every corner of Tamil Nadu.</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="about-pillar-row">
                <div className="about-pillar-circle-icon">
                  <Leaf size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-pillar-title">Sustainable Choices</h4>
                  <p className="about-pillar-sub">A greener tomorrow, with better materials.</p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="about-pillar-row">
                <div className="about-pillar-circle-icon">
                  <Heart size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-pillar-title">Made for Dreamers</h4>
                  <p className="about-pillar-sub">Because every story deserves a great tee.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          OUR VISION SECTION (WIDE DARK BANNER)
          ======================================================== */}
      <section className="about-vision-section">
        <div className="about-vision-grid">
          {/* Left: Vision Manifesto */}
          <div className="about-vision-text-col">
            <div className="about-vision-tag">OUR VISION</div>
            <h2 className="about-vision-title">
              Better Tees.<br />
              Bigger Stories.
            </h2>
            <p className="about-vision-desc">
              To become Tamil Nadu's most loved men's T-shirt brand, empowering individuals to express themselves with confidence, comfort, and style.
            </p>
          </div>

          {/* Center: Macro Fabric Texture + Script Callout */}
          <div className="about-vision-macro-col">
            <img
              src="/images/fabric-macro.jpg"
              alt="ELVOR Tag on Heavyweight Cotton"
              className="about-vision-macro-img"
            />
            <div className="about-vision-script-note">
              <div>Premium</div>
              <div>Menswear</div>
              <div>for a</div>
              <div>Bigger You</div>
              <svg className="about-script-underline" width="110" height="12" viewBox="0 0 110 12" fill="none">
                <path d="M2 9C28 2 80 2 108 10" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right: Clothes on Wooden Hangers Rack */}
          <div className="about-vision-rack-col">
            <div className="rack-clothing-display">
              <div className="hanger-pole" />
              <div className="hanging-tees-row">
                {/* Tee 1: Olive */}
                <div className="hanging-tee-item olive">
                  <div className="hanger-hook" />
                  <div className="tee-body">
                    <span className="tee-brand-micro">ELVOR</span>
                  </div>
                </div>

                {/* Tee 2: Off White */}
                <div className="hanging-tee-item white">
                  <div className="hanger-hook" />
                  <div className="tee-body">
                    <span className="tee-brand-micro">ELVOR</span>
                  </div>
                </div>

                {/* Tee 3: Black */}
                <div className="hanging-tee-item black">
                  <div className="hanger-hook" />
                  <div className="tee-body">
                    <span className="tee-brand-micro">ELVOR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          OUR VALUES SECTION ("WHAT DRIVES US")
          ======================================================== */}
      <section className="about-values-section">
        <div className="container">
          <div className="about-values-row">
            {/* Title on Left */}
            <div className="about-values-title-box">
              <div className="about-section-label">OUR VALUES</div>
              <h2 className="about-values-heading">What Drives Us</h2>
            </div>

            {/* 4 Pillars on Right */}
            <div className="about-values-cards-grid">
              {/* 1. Customer First */}
              <div className="about-value-card">
                <div className="about-value-icon-box">
                  <Users size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-value-title">Customer First</h4>
                  <p className="about-value-desc">Your comfort and style matter to us.</p>
                </div>
              </div>

              {/* 2. Quality Always */}
              <div className="about-value-card">
                <div className="about-value-icon-box">
                  <ShieldCheck size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-value-title">Quality Always</h4>
                  <p className="about-value-desc">No compromises. Ever.</p>
                </div>
              </div>

              {/* 3. Sustainability */}
              <div className="about-value-card">
                <div className="about-value-icon-box">
                  <Leaf size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-value-title">Sustainability</h4>
                  <p className="about-value-desc">A cleaner planet for future generations.</p>
                </div>
              </div>

              {/* 4. Made in India */}
              <div className="about-value-card">
                <div className="about-value-icon-box">
                  <Star size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="about-value-title">Made in India</h4>
                  <p className="about-value-desc">Proudly designed & crafted for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
