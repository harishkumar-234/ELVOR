import React, { useState } from 'react';
import { X, Star, Check, Shield, Truck, RotateCcw, ShoppingBag } from 'lucide-react';
import { TAMIL_NADU_HUBS } from '../data/products';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState(product?.color || 'Black');
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  if (!isOpen || !product) return null;

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (!pincode) return;
    const match = TAMIL_NADU_HUBS.find(h => pincode.startsWith(h.pincode.slice(0, 2)));
    if (match) {
      setDeliveryResult({
        success: true,
        message: `Express Delivery Available to ${match.city} (${match.days})`
      });
    } else {
      setDeliveryResult({
        success: true,
        message: `Standard Delivery to Tamil Nadu / All-India (2-4 Days)`
      });
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Left: Product Image */}
          <div className="quickview-img-box">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Right: Product Details & Options */}
          <div className="quickview-info-box">
            {product.tag && (
              <span className="product-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '10px', width: 'fit-content' }}>
                {product.tag}
              </span>
            )}

            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: '#ffb800' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#ffb800" color="#ffb800" />
                ))}
              </div>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                {product.rating} ({product.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-primary)', fontSize: '24px', fontWeight: 900 }}>
                ₹ {product.price}
              </span>
              <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#9ca3af' }}>
                ₹ {product.originalPrice}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.6, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Fabric Specs Badge Row */}
            <div style={{ background: '#f8f8f8', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div><strong>Fabric:</strong> {product.gsm}</div>
              <div><strong>Material:</strong> {product.material}</div>
              <div><strong>Care:</strong> {product.washCare}</div>
              <div><strong>Origin:</strong> Crafted in Tamil Nadu</div>
            </div>

            {/* Size Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                <span>Select Size</span>
                <span style={{ color: '#6b7280', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}>
                  Size Guide (Boxy Oversized)
                </span>
              </div>

              <div className="size-selector-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-pill-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              className="btn-checkout"
              style={{ padding: '16px', marginBottom: '20px', backgroundColor: '#111827' }}
              onClick={handleAdd}
            >
              <ShoppingBag size={18} />
              <span>Add to Cart &bull; ₹ {product.price}</span>
            </button>

            {/* Tamil Nadu Pincode Checker */}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', color: '#374151' }}>
                Check Tamil Nadu Delivery Speed
              </div>
              <form onSubmit={handleCheckDelivery} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter Pincode (e.g. 600001)"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#111',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  Check
                </button>
              </form>

              {deliveryResult && (
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} />
                  <span>{deliveryResult.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
