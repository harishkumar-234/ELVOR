import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ cartCount, onOpenCart, onOpenSearch, activeSection, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'New Arrivals', id: 'new-arrivals' },
    { label: 'About', id: 'about' }
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          {/* Brand Logo with transparent emblem + LVOR */}
          <BrandLogo onNavigate={onNavigate} />

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="nav-actions">
            <button 
              className="icon-btn" 
              aria-label="Search collection"
              onClick={onOpenSearch}
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            <button 
              className="icon-btn" 
              aria-label="User Account"
              onClick={() => onNavigate('account')}
            >
              <User size={20} strokeWidth={1.8} />
            </button>

            <button 
              className="icon-btn" 
              aria-label="Shopping Cart"
              onClick={onOpenCart}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              <span className="cart-badge">{cartCount}</span>
            </button>

            {/* Mobile hamburger */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(15, 16, 18, 0.98)',
          padding: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                color: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.7)',
                fontSize: '16px',
                fontWeight: activeSection === item.id ? '700' : '500',
                padding: '8px 0'
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
