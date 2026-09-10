import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function TrendingSection({ products, onAddToCart, onQuickView, onViewAll }) {
  return (
    <section id="shop" className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-label">WHAT'S TRENDING</div>
            <h2 className="section-title">Trending Tees</h2>
          </div>

          <a 
            href="#all-products" 
            className="section-view-all"
            onClick={(e) => {
              e.preventDefault();
              onViewAll();
            }}
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 5 Products Grid */}
        <div className="product-grid-5">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Product Image Box */}
              <div 
                className="product-image-wrap"
                onClick={() => onQuickView(product)}
              >
                {product.tag && (
                  <span className="product-badge">{product.tag}</span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />

                {/* Quick view button overlay */}
                <div className="product-quick-view-overlay">
                  <button 
                    className="quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                  {product.color} | {product.fit}
                </div>

                {/* Price and Add to Cart Row */}
                <div className="product-footer-row">
                  <span className="product-price">₹ {product.price}</span>
                  <button
                    className="add-cart-btn"
                    onClick={() => onAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                    title="Add to Cart"
                  >
                    <ShoppingBag size={18} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
