import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function Testimonials({ onWriteReview, onViewAllReviews }) {
  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-label">WHAT OUR CUSTOMERS SAY</div>
            <h2 className="section-title">Real People. Real Style.</h2>
          </div>

          <a 
            href="#reviews" 
            className="section-view-all"
            onClick={(e) => {
              e.preventDefault();
              onViewAllReviews();
            }}
          >
            <span>View All Reviews</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-avatar-wrap">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                />
              </div>

              <div className="testimonial-content">
                <h4 className="testimonial-author-name">{item.name}</h4>
                <div className="testimonial-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#ffb800" color="#ffb800" />
                  ))}
                </div>
                <p className="testimonial-quote">
                  {item.review}
                </p>
                <div className="testimonial-location">
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
