import React, { useState } from 'react';
import { Sparkles, Truck, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function Hero({ onShopClick, onExploreClick }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: "MEN'S T-SHIRTS  |  TAMIL NADU",
      titleLine1: 'OWN YOUR',
      titleLine2: 'STYLE',
      subtitle: "Premium men's T-shirts for every mood, every moment. Designed for the modern you. Delivered across Tamil Nadu.",
      primaryBtn: 'SHOP NEW DROP',
      secondaryBtn: 'EXPLORE COLLECTION',
      image: '/images/hero.jpg'
    },
    {
      badge: "NEW ARRIVALS 2025  |  LIMITED DROP",
      titleLine1: 'HEAVYWEIGHT',
      titleLine2: 'COMFORT',
      subtitle: "Crafted with 240 GSM organic combed cotton. Pre-shrunk, bio-washed, and built for lasting everyday luxury.",
      primaryBtn: 'DISCOVER DROP',
      secondaryBtn: 'VIEW LOOKBOOK',
      image: '/images/hero.jpg'
    },
    {
      badge: "TAMIL TEXTILE HERITAGE",
      titleLine1: 'TIMELESS',
      titleLine2: 'ESSENTIALS',
      subtitle: "Inspired by Tirupur's master knitwear artisans and designed for the contemporary street aesthetic.",
      primaryBtn: 'SHOP ESSENTIALS',
      secondaryBtn: 'OUR HERITAGE',
      image: '/images/hero.jpg'
    },
    {
      badge: "GRAPHIC COLLECTION  |  VOL. 2",
      titleLine1: 'BOLD PRINTS',
      titleLine2: 'TRUE STORY',
      subtitle: "Artisanal screen prints that resonate with youth culture. High-definition color depth with tactile vintage finish.",
      primaryBtn: 'EXPLORE GRAPHICS',
      secondaryBtn: 'VIEW ALL PRINTS',
      image: '/images/hero.jpg'
    }
  ];

  const currentSlide = heroSlides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Image */}
      <img
        src={currentSlide.image}
        alt="ELVOR Mens Streetwear Models"
        className="hero-background-img"
      />
      <div className="hero-overlay" />

      {/* Cursive handwritten accent on upper right */}
      <div className="hero-handwritten-note">
        <div>From</div>
        <div>Tamil Nadu</div>
        <div>To Your</div>
        <div>Wardrobe</div>
        <svg className="note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
          <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="container hero-content-container">
        <div style={{ maxWidth: '640px' }}>
          {/* Badge */}
          <div className="hero-badge">
            {currentSlide.badge}
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            {currentSlide.titleLine1}
            <br />
            {currentSlide.titleLine2}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            {currentSlide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={onShopClick}>
              <span>{currentSlide.primaryBtn}</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary-dark" onClick={onExploreClick}>
              {currentSlide.secondaryBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="hero-bottom-bar">
        <div className="container">
          <div className="hero-bottom-grid">
            {/* Feature Pills */}
            <div className="hero-feature-pills">
              {/* Cotton Icon */}
              <div className="hero-feature-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 0 1 5 5v1a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-1a5 5 0 0 1-5 5 5 5 0 0 1-5-5H6a4 4 0 0 1-4-4 4 4 0 0 1 4-4v-1a5 5 0 0 1 5-5z" />
                  <path d="M12 7v10" />
                </svg>
                <span>PREMIUM COTTON</span>
              </div>

              {/* Trendy Designs */}
              <div className="hero-feature-pill">
                <Sparkles size={18} strokeWidth={1.8} />
                <span>TRENDY DESIGNS</span>
              </div>

              {/* Delivery */}
              <div className="hero-feature-pill">
                <Truck size={18} strokeWidth={1.8} />
                <span>TAMIL NADU WIDE DELIVERY</span>
              </div>
            </div>

            {/* Slider Dots & Navigation Controls */}
            <div className="hero-slider-controls">
              <div className="hero-dots">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`hero-dot ${activeSlide === index ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="hero-arrow-btns">
                <button className="hero-arrow-btn" onClick={prevSlide} aria-label="Previous slide">
                  <ChevronLeft size={18} />
                </button>
                <button className="hero-arrow-btn" onClick={nextSlide} aria-label="Next slide">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
