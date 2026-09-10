import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrendingSection from './components/TrendingSection';
import CategoryGrid from './components/CategoryGrid';
import TrustBadges from './components/TrustBadges';
import MovementStory from './components/MovementStory';
import Testimonials from './components/Testimonials';
import ShopPage from './components/ShopPage';
import NewArrivalsPage from './components/NewArrivalsPage';
import AboutPage from './components/AboutPage';
import AdminPage from './components/AdminPage';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import StoryModal from './components/StoryModal';
import Toast from './components/Toast';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentPage, setCurrentPage] = useState('about'); // 'home' | 'shop' | 'new-arrivals' | 'about'
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const addToast = (message, type = 'cart') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Add to cart handler
  const handleAddToCart = (product, size = 'L', color = null) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            selectedSize: size,
            selectedColor: color || product.color,
            quantity: 1
          }
        ];
      }
    });

    addToast(`Added "${product.name}" (${size}) to your bag`, 'cart');
  };

  // Update cart item quantity
  const handleUpdateQty = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const [adminTab, setAdminTab] = useState('dashboard');

  // Navigation handler
  const handleNavigate = (pageOrSection) => {
    if (pageOrSection === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageOrSection === 'shop') {
      setCurrentPage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageOrSection === 'new-arrivals') {
      setCurrentPage('new-arrivals');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageOrSection === 'about') {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageOrSection === 'contact' || pageOrSection === 'shipping' || pageOrSection === 'returns' || pageOrSection === 'faqs') {
      setIsStoryModalOpen(true);
    } else if (['account', 'admin', 'products', 'orders', 'customers', 'categories', 'analytics', 'settings'].includes(pageOrSection)) {
      if (['products', 'orders', 'customers', 'categories', 'analytics', 'settings'].includes(pageOrSection)) {
        setAdminTab(pageOrSection);
      } else {
        setAdminTab('dashboard');
      }
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryFilter = (catId) => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast(`Showing ${catId.toUpperCase()} category`, 'info');
  };

  const handleSubscribe = (email) => {
    addToast(`Subscribed! Exclusive 10% coupon sent to ${email}`, 'success');
  };

  const handleCheckout = () => {
    addToast('Order placed successfully! Delivery across Tamil Nadu dispatched.', 'success');
    setCart([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (currentPage === 'admin') {
    return (
      <div className="app-root">
        <AdminPage
          initialTab={adminTab}
          onNavigate={handleNavigate}
          onPreviewProduct={(product) => setQuickViewProduct(product)}
          onAddToast={addToast}
        />
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
        <Toast toastList={toasts} />
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Dynamic View Router */}
      {currentPage === 'about' ? (
        <AboutPage
          onNavigate={handleNavigate}
          onOpenStoryModal={() => setIsStoryModalOpen(true)}
        />
      ) : currentPage === 'new-arrivals' ? (
        <NewArrivalsPage
          onAddToCart={(p) => handleAddToCart(p, 'L')}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={handleNavigate}
        />
      ) : currentPage === 'shop' ? (
        <ShopPage
          onAddToCart={(p) => handleAddToCart(p, 'L')}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={handleNavigate}
        />
      ) : (
        <main>
          {/* Home Hero Section */}
          <Hero
            onShopClick={() => handleNavigate('shop')}
            onExploreClick={() => setIsStoryModalOpen(true)}
          />

          {/* Trending Tees */}
          <TrendingSection
            products={PRODUCTS.slice(0, 5)}
            onAddToCart={(p) => handleAddToCart(p, 'L')}
            onQuickView={(p) => setQuickViewProduct(p)}
            onViewAll={() => handleNavigate('shop')}
          />

          {/* Category Promo Cards */}
          <CategoryGrid
            onSelectCategory={handleCategoryFilter}
          />

          {/* Trust Badges */}
          <TrustBadges />

          {/* Story & Movement */}
          <MovementStory
            onOpenStoryModal={() => setIsStoryModalOpen(true)}
          />

          {/* Customer Testimonials */}
          <Testimonials
            onWriteReview={() => addToast('Thank you! Reviews open after delivery verification.', 'info')}
            onViewAllReviews={() => addToast('Over 2,400+ 5-star ratings across Tamil Nadu!', 'info')}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSubscribeNewsletter={handleSubscribe}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      <Toast toastList={toasts} />
    </div>
  );
}
