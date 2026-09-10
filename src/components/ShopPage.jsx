import React, { useState, useMemo } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Heart, 
  ShoppingBag, 
  Star, 
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  Check
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ShopPage({ onAddToCart, onQuickView, onNavigate }) {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1199);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [wishlist, setWishlist] = useState({});

  // Accordion toggle states
  const [openSections, setOpenSections] = useState({
    category: true,
    size: true,
    color: true,
    price: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'solid' && product.category !== 'solid') return false;
        if (selectedCategory === 'graphic' && product.category !== 'graphic') return false;
        if (selectedCategory === 'oversized' && product.category !== 'oversized') return false;
        if (selectedCategory === 'polo' && product.category !== 'polo') return false;
        if (selectedCategory === 'limited' && product.tag !== 'New') return false;
      }

      // Size match
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color match
      if (selectedColors.length > 0) {
        if (!selectedColors.includes(product.colorKey)) return false;
      }

      // Price match
      if (product.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.tag === 'New' ? 1 : 0) - (a.tag === 'New' ? 1 : 0);
      return 0; // Featured default order
    });
  }, [selectedCategory, selectedSizes, selectedColors, maxPrice, sortBy]);

  return (
    <div className="shop-page-wrapper">
      {/* ========================================================
          SHOP HERO BANNER
          ======================================================== */}
      <section className="shop-hero-banner">
        <img 
          src="/images/hero.jpg" 
          alt="ELVOR Men's T-Shirts Collection" 
          className="shop-hero-img"
        />
        <div className="shop-hero-overlay" />

        {/* Handwritten Cursive Accent on Right */}
        <div className="shop-handwritten-note">
          <div>Better</div>
          <div>Tees</div>
          <div>Bigger</div>
          <div>Stories</div>
          <svg className="shop-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
            <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
          <div className="shop-hero-content">
            <div className="shop-hero-tag">SHOP</div>
            <h1 className="shop-hero-title">MEN’S T-SHIRTS</h1>
            <p className="shop-hero-desc">
              Premium quality. Modern fits. Effortless style.<br />
              Discover the perfect tee for every mood, every moment.
            </p>
            <button 
              className="btn-primary" 
              style={{ padding: '14px 28px' }}
              onClick={() => {
                const el = document.getElementById('shop-products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>SHOP NOW</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          BREADCRUMBS & SORT CONTROLS BAR
          ======================================================== */}
      <div id="shop-products-section" className="shop-controls-bar">
        <div className="container">
          <div className="shop-controls-row">
            {/* Breadcrumbs */}
            <div className="shop-breadcrumbs">
              <span 
                className="breadcrumb-link" 
                onClick={() => onNavigate('home')}
              >
                Home
              </span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-current">Shop</span>
            </div>

            {/* Sort Dropdown & Layout Buttons */}
            <div className="shop-toolbar-right">
              <div className="sort-by-wrap">
                <span className="sort-label">Sort by:</span>
                <select 
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* View Layout Toggle */}
              <div className="layout-toggle-group">
                <button 
                  className={`layout-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid View"
                >
                  <LayoutGrid size={17} />
                </button>
                <button 
                  className={`layout-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List View"
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN SHOP CONTENT (SIDEBAR + 4-COLUMN PRODUCT GRID)
          ======================================================== */}
      <div className="container" style={{ paddingBottom: '70px' }}>
        <div className="shop-main-layout">
          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="shop-sidebar">
            <h2 className="sidebar-main-title">Filter by</h2>

            {/* 1. Category Filter */}
            <div className="filter-group">
              <button 
                className="filter-header-btn" 
                onClick={() => toggleSection('category')}
              >
                <span>Category</span>
                {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.category && (
                <div className="filter-content">
                  {[
                    { id: 'all', label: 'All T-Shirts', count: 48 },
                    { id: 'solid', label: 'Solid T-Shirts', count: 12 },
                    { id: 'graphic', label: 'Graphic T-Shirts', count: 18 },
                    { id: 'oversized', label: 'Oversized T-Shirts', count: 8 },
                    { id: 'polo', label: 'Polo T-Shirts', count: 6 },
                    { id: 'limited', label: 'Limited Edition', count: 4 }
                  ].map((cat) => (
                    <label key={cat.id} className="filter-checkbox-row">
                      <input
                        type="radio"
                        name="shop-category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="custom-checkbox"
                      />
                      <span className="filter-item-name">{cat.label}</span>
                      <span className="filter-item-count">({cat.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Size Filter */}
            <div className="filter-group">
              <button 
                className="filter-header-btn" 
                onClick={() => toggleSection('size')}
              >
                <span>Size</span>
                {openSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.size && (
                <div className="filter-content">
                  {[
                    { size: 'S', count: 12 },
                    { size: 'M', count: 24 },
                    { size: 'L', count: 20 },
                    { size: 'XL', count: 22 },
                    { size: 'XXL', count: 14 }
                  ].map((item) => (
                    <label key={item.size} className="filter-checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(item.size)}
                        onChange={() => toggleSize(item.size)}
                        className="custom-checkbox"
                      />
                      <span className="filter-item-name">{item.size}</span>
                      <span className="filter-item-count">({item.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Color Filter */}
            <div className="filter-group">
              <button 
                className="filter-header-btn" 
                onClick={() => toggleSection('color')}
              >
                <span>Color</span>
                {openSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.color && (
                <div className="filter-content">
                  {[
                    { name: 'Black', colorCode: '#111111', count: 14 },
                    { name: 'White', colorCode: '#f3f4f6', count: 12, border: true },
                    { name: 'Navy Blue', colorCode: '#1e3a8a', count: 6 },
                    { name: 'Olive Green', colorCode: '#4b5320', count: 6 },
                    { name: 'Grey', colorCode: '#9ca3af', count: 5 },
                    { name: 'Beige', colorCode: '#d4b996', count: 5 }
                  ].map((colorItem) => (
                    <label 
                      key={colorItem.name} 
                      className="filter-color-row"
                      onClick={() => toggleColor(colorItem.name)}
                    >
                      <span 
                        className={`color-swatch-dot ${selectedColors.includes(colorItem.name) ? 'selected' : ''}`}
                        style={{ 
                          backgroundColor: colorItem.colorCode,
                          border: colorItem.border ? '1px solid #d1d5db' : 'none'
                        }}
                      />
                      <span className="filter-item-name">{colorItem.name}</span>
                      <span className="filter-item-count">({colorItem.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Price Slider Filter */}
            <div className="filter-group" style={{ borderBottom: 'none' }}>
              <button 
                className="filter-header-btn" 
                onClick={() => toggleSection('price')}
              >
                <span>Price</span>
                {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.price && (
                <div className="filter-content">
                  <div className="price-slider-wrap">
                    <input
                      type="range"
                      min="399"
                      max="1199"
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="price-range-input"
                    />
                    <div className="price-range-labels">
                      <span>₹ 399</span>
                      <span>—</span>
                      <span>₹ {maxPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID (4 Columns x 2 Rows) */}
          <main className="shop-product-area">
            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <ShoppingBag size={48} strokeWidth={1} style={{ opacity: 0.4, margin: '0 auto 16px' }} />
                <h3>No t-shirts match your filter criteria</h3>
                <p>Try resetting the category, size, or price slider to see more styles.</p>
                <button 
                  className="btn-primary" 
                  style={{ marginTop: '16px', padding: '10px 24px', fontSize: '12px' }}
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSizes([]);
                    setSelectedColors([]);
                    setMaxPrice(1199);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'shop-grid-4' : 'shop-list-view'}>
                {filteredProducts.map((product) => {
                  const isWishlisted = !!wishlist[product.id];

                  return (
                    <div 
                      key={product.id} 
                      className="shop-product-card"
                      onClick={() => onQuickView(product)}
                    >
                      {/* Product Image Container */}
                      <div className="shop-card-img-wrap">
                        {/* Top-left Badge */}
                        {product.tag && (
                          <span className={`shop-card-badge ${product.tag.toLowerCase()}`}>
                            {product.tag}
                          </span>
                        )}

                        {/* Top-right Wishlist Heart Button */}
                        <button
                          className={`shop-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                          onClick={(e) => toggleWishlist(product.id, e)}
                          aria-label="Add to wishlist"
                          title="Wishlist"
                        >
                          <Heart 
                            size={16} 
                            fill={isWishlisted ? '#ef4444' : 'none'} 
                            stroke={isWishlisted ? '#ef4444' : '#ffffff'} 
                            strokeWidth={1.8}
                          />
                        </button>

                        <img
                          src={product.image}
                          alt={product.name}
                          className="shop-card-img"
                          loading="lazy"
                        />
                      </div>

                      {/* Product Card Details */}
                      <div className="shop-card-info">
                        <h3 className="shop-card-title">{product.name}</h3>
                        <div className="shop-card-meta">
                          {product.color} &nbsp;|&nbsp; {product.fit}
                        </div>

                        {/* Rating Stars & Count */}
                        <div className="shop-card-rating">
                          <div className="shop-rating-stars">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={13} fill="#ffb800" color="#ffb800" />
                            ))}
                          </div>
                          <span className="shop-rating-count">({product.reviewsCount})</span>
                        </div>

                        {/* Price & Add to Cart */}
                        <div className="shop-card-footer">
                          <div className="shop-price-row">
                            <span className="shop-current-price">₹ {product.price}</span>
                            {product.originalPrice && product.tag === 'Sale' && (
                              <span className="shop-old-price">₹ {product.originalPrice}</span>
                            )}
                          </div>

                          <button
                            className="shop-add-cart-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(product);
                            }}
                            aria-label={`Add ${product.name} to cart`}
                            title="Add to Cart"
                          >
                            <ShoppingBag size={17} strokeWidth={1.8} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================
          BOTTOM BENEFIT PILLARS (4 COLUMNS DARK BAR)
          ======================================================== */}
      <section className="shop-bottom-pillars">
        <div className="container">
          <div className="shop-pillars-grid">
            {/* Pillar 1 */}
            <div className="shop-pillar-item">
              <div className="shop-pillar-icon">
                <Truck size={28} strokeWidth={1.6} />
              </div>
              <div>
                <h4 className="shop-pillar-title">Free Shipping</h4>
                <p className="shop-pillar-desc">On all orders above ₹999</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="shop-pillar-item">
              <div className="shop-pillar-icon">
                <ShieldCheck size={28} strokeWidth={1.6} />
              </div>
              <div>
                <h4 className="shop-pillar-title">Premium Quality</h4>
                <p className="shop-pillar-desc">Comfort you can trust</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="shop-pillar-item">
              <div className="shop-pillar-icon">
                <RotateCcw size={28} strokeWidth={1.6} />
              </div>
              <div>
                <h4 className="shop-pillar-title">Easy Returns</h4>
                <p className="shop-pillar-desc">Hassle-free within 7 days</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="shop-pillar-item">
              <div className="shop-pillar-icon">
                <CreditCard size={28} strokeWidth={1.6} />
              </div>
              <div>
                <h4 className="shop-pillar-title">Secure Payments</h4>
                <p className="shop-pillar-desc">100% safe & encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
