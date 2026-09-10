import React from 'react';
import { X, Sparkles, Heart, Award, MapPin } from 'lucide-react';

export default function StoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '720px', padding: '36px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close story modal">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#6b7280' }}>
            ABOUT ELVOR
          </span>
          <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '32px', fontWeight: 900, marginTop: '6px' }}>
            Wear Your Story
          </h2>
          <div style={{ width: '40px', height: '3px', background: '#111827', margin: '12px auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <img 
            src="/images/textile-mill.jpg" 
            alt="Tamil Nadu Textile Mill" 
            style={{ width: '100%', borderRadius: '8px', height: '180px', objectFit: 'cover' }}
          />
          <img 
            src="/images/fabric-macro.jpg" 
            alt="ELVOR Heavyweight Cotton" 
            style={{ width: '100%', borderRadius: '8px', height: '180px', objectFit: 'cover' }}
          />
        </div>

        <div style={{ fontSize: '14.5px', lineHeight: 1.8, color: '#374151', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            <strong>ELVOR</strong> was born out of a simple observation: modern streetwear needed the soul of genuine Indian textile craftsmanship. 
            Tamil Nadu — home to Tirupur, Coimbatore, and Salem — has been the knitwear capital of India for generations.
          </p>
          <p>
            We take this legacy and combine it with contemporary boxy oversized silhouettes, drop shoulders, clean minimal typography, and 240 GSM combed cotton that feels substantial yet exceptionally breathable in our tropical climate.
          </p>
        </div>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
          <div>
            <Award size={24} style={{ margin: '0 auto 8px', color: '#111827' }} />
            <div style={{ fontWeight: 800, fontSize: '13px' }}>240 GSM Cotton</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Durable & Non-Sheer</div>
          </div>
          <div>
            <MapPin size={24} style={{ margin: '0 auto 8px', color: '#111827' }} />
            <div style={{ fontWeight: 800, fontSize: '13px' }}>100% Tamil Nadu</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Locally Sourced & Spun</div>
          </div>
          <div>
            <Heart size={24} style={{ margin: '0 auto 8px', color: '#111827' }} />
            <div style={{ fontWeight: 800, fontSize: '13px' }}>Fair Trade</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Ethical Artisanal Craft</div>
          </div>
        </div>
      </div>
    </div>
  );
}
