import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ArrowRight,
  Truck,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { NEW_ARRIVALS_PRODUCTS } from '../data/products';
import BrandLogo from './BrandLogo';

export default function NewArrivalsPage({ onAddToCart, onQuickView, onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [wishlist, setWishlist] = useState({});
  const [selectedSwatches, setSelectedSwatches] = useState({});

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'oversized', label: 'Oversized Fit' },
    { id: 'regular', label: 'Regular Fit' },
    { id: 'graphic', label: 'Graphic Prints' },
    { id: 'classic', label: 'Classic' },
    { id: 'premium', label: 'Premium' }
  ];

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSwatchClick = (productId, swatchColor, e) => {
    e.stopPropagation();
    setSelectedSwatches(prev => ({ ...prev, [productId]: swatchColor }));
  };

  const filteredProducts = useMemo(() => {
    return NEW_ARRIVALS_PRODUCTS.filter(product => {
      if (activeTab === 'all') return true;
      if (activeTab === 'oversized') return product.fitType === 'Oversized Fit' || product.category === 'oversized';
      if (activeTab === 'regular') return product.fitType === 'Regular Fit';
      if (activeTab === 'graphic') return product.category === 'graphic';
      if (activeTab === 'classic') return product.category === 'classic';
      if (activeTab === 'premium') return product.category === 'premium' || product.price >= 799;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Latest Arrivals default
    });
  }, [activeTab, sortBy]);

  return (
    <div className="new-arrivals-page-wrapper">
      {/* ========================================================
          NEW ARRIVALS HERO BANNER
          ======================================================== */}
      <section className="arrivals-hero-banner">
        <img
          src="/images/hero.jpg"
          alt="ELVOR New Arrivals 2025"
          className="arrivals-hero-img"
        />
        <div className="arrivals-hero-overlay" />

        {/* Handwritten Cursive Note on Right */}
        <div className="arrivals-handwritten-note">
          <div>New</div>
          <div>Looks</div>
          <div>New</div>
          <div>Stories</div>
          <svg className="arrivals-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
            <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
          <div className="arrivals-hero-content">
            <div className="arrivals-hero-tag">NEW ARRIVALS</div>
            <h1 className="arrivals-hero-title">
              FRESH STYLES.<br />
              SAME VIBE.
            </h1>
            <p className="arrivals-hero-desc">
              Explore the latest t-shirt collection crafted for modern men. Trendy designs, premium comfort, only at ELVOR.
            </p>
            <button
              className="btn-primary"
              style={{ padding: '14px 28px' }}
              onClick={() => {
                const el = document.getElementById('arrivals-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>SHOP NEW ARRIVALS</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          FILTER TABS & SORT CONTROLS BAR
          ======================================================== */}
      <div id="arrivals-catalog-section" className="arrivals-tabs-bar">
        <div className="container">
          <div className="arrivals-tabs-row">
            {/* Filter Tabs on Left */}
            <div className="arrivals-filter-tabs">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`arrivals-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort by Dropdown on Right */}
            <div className="arrivals-sort-wrap">
              <span className="sort-label">Sort by:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          5-COLUMN PRODUCT GRID (10 PRODUCTS)
          ======================================================== */}
      <div className="container" style={{ paddingBottom: '60px' }}>
        <div className="product-grid-5">
          {filteredProducts.map((product) => {
            const isWishlisted = !!wishlist[product.id];
            const activeSwatch = selectedSwatches[product.id] || product.swatches?.[0];

            return (
              <div
                key={product.id}
                className="arrivals-product-card"
                onClick={() => onQuickView(product)}
              >
                {/* Product Image Box */}
                <div className="arrivals-img-wrap">
                  {/* "New" Badge */}
                  <span className="arrivals-badge">New</span>

                  {/* Wishlist Heart Icon */}
                  <button
                    className={`arrivals-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label="Add to wishlist"
                    title="Wishlist"
                  >
                    <Heart
                      size={15}
                      fill={isWishlisted ? '#ef4444' : 'none'}
                      stroke={isWishlisted ? '#ef4444' : '#ffffff'}
                      strokeWidth={1.8}
                    />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="arrivals-img"
                    style={product.filterColor ? { filter: product.filterColor } : {}}
                    loading="lazy"
                  />
                </div>

                {/* Color Swatch Dots under Image */}
                <div className="arrivals-swatch-row">
                  {product.swatches?.map((colorCode, idx) => (
                    <button
                      key={idx}
                      className={`arrivals-swatch-dot ${activeSwatch === colorCode ? 'active' : ''}`}
                      style={{
                        backgroundColor: colorCode,
                        border: colorCode === '#ffffff' || colorCode === '#f4efe6' || colorCode === '#f3f4f6' ? '1px solid #d1d5db' : 'none'
                      }}
                      onClick={(e) => handleSwatchClick(product.id, colorCode, e)}
                      aria-label={`Color option ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Product Info */}
                <div className="arrivals-info">
                  <h3 className="arrivals-title">{product.name}</h3>
                  <div className="arrivals-meta">
                    {product.color} &nbsp;|&nbsp; {product.fit}
                  </div>

                  {/* Rating Stars & Count */}
                  <div className="arrivals-rating-row">
                    <div className="arrivals-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#ffb800" color="#ffb800" />
                      ))}
                    </div>
                    <span className="arrivals-review-count">({product.reviewsCount})</span>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="arrivals-footer-row">
                    <span className="arrivals-price">₹ {product.price}</span>
                    <button
                      className="arrivals-add-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      aria-label={`Add ${product.name} to cart`}
                      title="Add to Cart"
                    >
                      <ShoppingBag size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          BOTTOM BENEFIT BAR WITH TEXTURED FABRIC BANNER
          ======================================================== */}
      <section className="arrivals-bottom-banner">
        <div className="arrivals-fabric-bg">
          <img src="/images/fabric-macro.jpg" alt="ELVOR Fabric Texture" />
          <div className="arrivals-fabric-overlay" />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="arrivals-bottom-grid">
            {/* 1. Brand Logo */}
            <div className="arrivals-bottom-brand">
              <BrandLogo size="md" onNavigate={onNavigate} />
            </div>

            {/* 2. Premium Cotton */}
            <div className="arrivals-bottom-item">
              <div className="arrivals-bottom-icon">
                <Leaf size={24} strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="arrivals-item-title">Premium Cotton</h4>
                <p className="arrivals-item-sub">Soft on skin. Built to last.</p>
              </div>
            </div>

            {/* 3. Fast Delivery */}
            <div className="arrivals-bottom-item">
              <div className="arrivals-bottom-icon">
                <Truck size={24} strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="arrivals-item-title">Fast Delivery</h4>
                <p className="arrivals-item-sub">Across Tamil Nadu</p>
              </div>
            </div>

            {/* 4. Trusted Quality */}
            <div className="arrivals-bottom-item">
              <div className="arrivals-bottom-icon">
                <ShieldCheck size={24} strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="arrivals-item-title">Trusted Quality</h4>
                <p className="arrivals-item-sub">Comfort you can count on.</p>
              </div>
            </div>

            {/* 5. Right Callout Box */}
            <div className="arrivals-bottom-callout">
              <div className="arrivals-callout-title">New Arrivals</div>
              <p className="arrivals-callout-sub">Fresh fits. Bold looks. Only at ELVOR.</p>
              <button
                className="arrivals-callout-btn"
                onClick={() => {
                  const el = document.getElementById('arrivals-catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>SHOP NOW</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
