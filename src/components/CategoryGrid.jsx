import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className="category-promo-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="category-promo-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="category-promo-card"
              onClick={() => onSelectCategory(cat.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Image Column */}
              <div className="category-card-img-wrap">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="category-card-img"
                  loading="lazy"
                />
              </div>

              {/* Text Column */}
              <div className="category-card-body">
                <h3 className="category-card-title">{cat.title}</h3>
                <p className="category-card-sub">{cat.subtitle}</p>
                <span className="category-card-link">
                  <span>Shop Now</span>
                  <ArrowRight size={15} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
