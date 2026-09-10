import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.color.toLowerCase().includes(query.toLowerCase()) ||
    p.fit.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 800 }}>
            <Search size={20} />
            <span>Search ELVOR Catalog</span>
          </div>
          <button className="icon-btn" style={{ color: '#111' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search oversized, graphic, black tee, olive..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '15px',
              borderRadius: '6px',
              border: '2px solid #111827',
              outline: 'none'
            }}
          />
        </div>

        {/* Quick Suggestions */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', alignSelf: 'center' }}>Popular:</span>
          {['Oversized Tee', 'Graphic Vibes', 'Olive Green', '240 GSM', 'Tirupur Cotton'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                borderRadius: '999px',
                backgroundColor: '#f3f4f6',
                color: '#374151'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>
              No t-shirts found matching "{query}".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={p.image} alt={p.name} style={{ width: '48px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{p.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{p.color} | {p.fit}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 800, fontSize: '14px' }}>₹ {p.price}</span>
                    <ArrowRight size={16} color="#9ca3af" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
