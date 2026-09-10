import React from 'react';
import { Truck, ShieldCheck } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      <div className="trust-badges-bar">
        <div className="trust-badges-grid">
          {/* Badge 1: Cotton */}
          <div className="trust-badge-item">
            <div className="trust-icon-box">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a5 5 0 0 1 5 5v1a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-1a5 5 0 0 1-5 5 5 5 0 0 1-5-5H6a4 4 0 0 1-4-4 4 4 0 0 1 4-4v-1a5 5 0 0 1 5-5z" />
                <path d="M12 7v10" />
              </svg>
            </div>
            <div>
              <h4 className="trust-title">PREMIUM COTTON</h4>
              <p className="trust-desc">Soft on skin. Built to last.</p>
            </div>
          </div>

          {/* Badge 2: Delivery */}
          <div className="trust-badge-item">
            <div className="trust-icon-box">
              <Truck size={34} strokeWidth={1.6} />
            </div>
            <div>
              <h4 className="trust-title">TAMIL NADU WIDE DELIVERY</h4>
              <p className="trust-desc">From Chennai to Kanyakumari.</p>
            </div>
          </div>

          {/* Badge 3: Quality */}
          <div className="trust-badge-item">
            <div className="trust-icon-box">
              <ShieldCheck size={34} strokeWidth={1.6} />
            </div>
            <div>
              <h4 className="trust-title">TRUSTED QUALITY</h4>
              <p className="trust-desc">Checked for comfort & durability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
