import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onNavigate, onSubscribeNewsletter }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribeNewsletter(email);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand */}
          <div className="footer-brand">
            <BrandLogo size="lg" onNavigate={onNavigate} />
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
              </li>
              <li>
                <a href="#shop" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>Shop</a>
              </li>
              <li>
                <a href="#new-arrivals" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>New Arrivals</a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="footer-column-title">Customer Care</h4>
            <ul className="footer-links">
              <li>
                <a href="#contact" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact Us</a>
              </li>
              <li>
                <a href="#shipping" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('shipping'); }}>Shipping Policy</a>
              </li>
              <li>
                <a href="#returns" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('returns'); }}>Return & Exchange</a>
              </li>
              <li>
                <a href="#faqs" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('faqs'); }}>FAQs</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Connected */}
          <div>
            <h4 className="footer-column-title">Stay Connected</h4>
            <p className="newsletter-text">
              Get updates on new drops and exclusive offers.
            </p>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Social Icons SVGs */}
            <div className="footer-social-row">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>

              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2025 ELVOR. All rights reserved.
          </div>
          <div>
            Made for the Dreamers &nbsp;|&nbsp; Tamil Nadu, India ❤️
          </div>
        </div>
      </div>
    </footer>
  );
}
