import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = freeShippingThreshold - subtotal;

  const handleCheckoutClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onCheckout();
  };

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} />
            <h3 className="cart-drawer-title">Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})</h3>
          </div>
          <button className="icon-btn" style={{ color: '#111' }} onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div style={{ padding: '16px 24px', backgroundColor: '#fafafa', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
            <Truck size={16} />
            {subtotal >= freeShippingThreshold ? (
              <span style={{ color: '#16a34a' }}>🎉 You unlocked Free Express Shipping across Tamil Nadu!</span>
            ) : (
              <span>Add ₹{amountNeeded} more for Free Tamil Nadu Delivery</span>
            )}
          </div>
          <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: subtotal >= freeShippingThreshold ? '#16a34a' : '#111827',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={48} strokeWidth={1.2} style={{ marginBottom: '16px', opacity: 0.4 }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px', maxWidth: '240px', marginBottom: '20px' }}>
                Discover our oversized and graphic drops crafted from premium Tamil Nadu cotton.
              </p>
              <button 
                className="btn-primary"
                style={{ fontSize: '11px', padding: '12px 20px', background: '#111', color: '#fff' }}
                onClick={onClose}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div>
                      <h4 className="cart-item-title">{item.name}</h4>
                      <div className="cart-item-meta">
                        Size: {item.selectedSize || 'L'} &nbsp;|&nbsp; {item.color}
                      </div>
                    </div>

                    <div className="cart-qty-row">
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-count">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span className="cart-item-price">₹ {item.price * item.quantity}</span>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          style={{ color: '#9ca3af', display: 'flex' }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '14px' }}>
              Taxes and shipping calculated at checkout. Free returns within 7 days.
            </p>
            <button className="btn-checkout" onClick={handleCheckoutClick}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
