import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  LayoutDashboard, 
  Shirt, 
  ShoppingBag, 
  Users, 
  Grid, 
  TrendingUp, 
  Settings, 
  UploadCloud, 
  X, 
  Plus, 
  Search, 
  Edit3, 
  Eye, 
  Trash2, 
  Save, 
  LogOut, 
  Shield, 
  Tag, 
  Layers, 
  ArrowRight,
  DollarSign,
  PackageCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingDown,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Globe,
  BellRing,
  Palette,
  CreditCard,
  Truck,
  RefreshCw,
  Menu
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { PRODUCTS } from '../data/products';

export default function AdminPage({ onNavigate, onPreviewProduct, onAddToast, initialTab = 'dashboard' }) {
  const [activeNav, setActiveNav] = useState(initialTab);
  const [mobileAdminMenuOpen, setMobileAdminMenuOpen] = useState(false);

  // ==========================================
  // 1. PRODUCTS STATE & HANDLERS
  // ==========================================
  const [productsList, setProductsList] = useState([
    {
      id: 'essential-oversized-black',
      name: 'Essential Oversized Tee',
      color: 'Black',
      fit: 'Oversized Fit',
      category: "Men's T-Shirts",
      price: 799,
      stock: 50,
      status: 'Active',
      image: '/images/tee-black.jpg'
    },
    {
      id: 'graphic-vibes-offwhite',
      name: 'Graphic Vibes Tee',
      color: 'Off White',
      fit: 'Regular Fit',
      category: "Men's T-Shirts",
      price: 749,
      stock: 32,
      status: 'Active',
      image: '/images/tee-white.jpg'
    },
    {
      id: 'classic-essentials-olive',
      name: 'Classic Essentials Tee',
      color: 'Olive Green',
      fit: 'Regular Fit',
      category: "Men's T-Shirts",
      price: 699,
      stock: 45,
      status: 'Active',
      image: '/images/tee-olive.jpg'
    },
    {
      id: 'typography-back-navy',
      name: 'Typography Back Tee',
      color: 'Navy Blue',
      fit: 'Oversized Fit',
      category: "Men's T-Shirts",
      price: 849,
      stock: 28,
      status: 'Active',
      image: '/images/tee-navy.jpg'
    },
    {
      id: 'minimal-logo-brown',
      name: 'Minimal Logo Tee',
      color: 'Coffee Brown',
      fit: 'Regular Fit',
      category: "Men's T-Shirts",
      price: 699,
      stock: 60,
      status: 'Active',
      image: '/images/tee-brown.jpg'
    }
  ]);

  // Form States
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formDiscountPrice, setFormDiscountPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formSizes, setFormSizes] = useState(['M', 'L', 'XL']);
  const [formDescription, setFormDescription] = useState('');
  const [formBrand, setFormBrand] = useState('ELVOR');
  const [formFabric, setFormFabric] = useState('100% Combed Cotton');
  const [formFitType, setFormFitType] = useState('Oversized Fit');
  const [formStyle, setFormStyle] = useState('Streetwear Casual');
  const [formStatus, setFormStatus] = useState(true);

  // Uploaded thumbnails
  const [images, setImages] = useState([
    '/images/tee-black.jpg',
    '/images/tee-white.jpg',
    '/images/fabric-macro.jpg'
  ]);

  // Table controls
  const [tableSearch, setTableSearch] = useState('');
  const [tableCategory, setTableCategory] = useState('all');
  const [editingId, setEditingId] = useState(null);

  const sidebarNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Shirt },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSizeToggle = (size) => {
    setFormSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    const extra = '/images/tee-olive.jpg';
    if (!images.includes(extra)) {
      setImages(prev => [...prev, extra]);
    }
  };

  const handleResetForm = () => {
    setFormName('');
    setFormCategory('');
    setFormPrice('');
    setFormDiscountPrice('');
    setFormStock('');
    setFormColor('');
    setFormSizes(['M', 'L']);
    setFormDescription('');
    setEditingId(null);
    onAddToast('Form fields cleared', 'info');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formName || !formPrice) {
      onAddToast('Please fill in product name and price', 'info');
      return;
    }

    if (editingId) {
      setProductsList(prev => prev.map(item => 
        item.id === editingId
          ? {
              ...item,
              name: formName,
              category: formCategory || "Men's T-Shirts",
              price: Number(formPrice),
              stock: Number(formStock) || item.stock,
              color: formColor || item.color,
              fit: formFitType || item.fit,
              status: formStatus ? 'Active' : 'Draft'
            }
          : item
      ));
      onAddToast(`Updated product "${formName}" successfully!`, 'success');
      setEditingId(null);
    } else {
      const newProduct = {
        id: `custom-${Date.now()}`,
        name: formName,
        category: formCategory || "Men's T-Shirts",
        price: Number(formPrice),
        stock: Number(formStock) || 30,
        color: formColor || 'Black',
        fit: formFitType || 'Oversized Fit',
        status: formStatus ? 'Active' : 'Draft',
        image: images[0] || '/images/tee-black.jpg'
      };
      setProductsList(prev => [newProduct, ...prev]);
      onAddToast(`Product "${formName}" published to ELVOR store!`, 'success');
    }

    handleResetForm();
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormName(product.name);
    setFormPrice(product.price);
    setFormStock(product.stock);
    setFormColor(product.color);
    setFormFitType(product.fit);
    setFormCategory(product.category);
    window.scrollTo({ top: 320, behavior: 'smooth' });
    onAddToast(`Editing "${product.name}"`, 'info');
  };

  const handleDeleteClick = (id, name) => {
    setProductsList(prev => prev.filter(p => p.id !== id));
    onAddToast(`Deleted product "${name}"`, 'info');
  };

  const filteredTableProducts = productsList.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
                        p.color.toLowerCase().includes(tableSearch.toLowerCase());
    return matchSearch;
  });

  // ==========================================
  // 2. ORDERS STATE & HANDLERS
  // ==========================================
  const [ordersList, setOrdersList] = useState([
    {
      id: 'ORD-98214',
      customer: 'Karthik Raja',
      email: 'karthik@example.com',
      date: 'Today, 02:45 PM',
      items: 'Essential Oversized Tee (L, Black) x 1',
      total: 799,
      status: 'Processing',
      city: 'Chennai, TN',
      payment: 'UPI / Prepaid'
    },
    {
      id: 'ORD-98213',
      customer: 'Priya Sundaram',
      email: 'priya.s@example.com',
      date: 'Today, 11:20 AM',
      items: 'Graphic Vibes Tee (M, Off White) x 2',
      total: 1498,
      status: 'Shipped',
      city: 'Coimbatore, TN',
      payment: 'Credit Card'
    },
    {
      id: 'ORD-98212',
      customer: 'Arun Kumar',
      email: 'arunk@example.com',
      date: 'Yesterday',
      items: 'Typography Back Tee (XL, Navy) x 1',
      total: 849,
      status: 'Delivered',
      city: 'Madurai, TN',
      payment: 'Cash on Delivery'
    },
    {
      id: 'ORD-98211',
      customer: 'Dinesh V.',
      email: 'dinesh.v@example.com',
      date: '08 Sep 2025',
      items: 'Classic Essentials Tee (L, Olive) x 1',
      total: 699,
      status: 'Delivered',
      city: 'Salem, TN',
      payment: 'UPI / Prepaid'
    },
    {
      id: 'ORD-98210',
      customer: 'Sanjay Ram',
      email: 'sanjay.ram@example.com',
      date: '07 Sep 2025',
      items: 'Minimal Logo Tee (M, Brown) x 1',
      total: 699,
      status: 'Cancelled',
      city: 'Trichy, TN',
      payment: 'Refunded'
    }
  ]);
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  const updateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    onAddToast(`Order ${orderId} updated to ${newStatus}`, 'success');
  };

  const filteredOrders = ordersList.filter(o => {
    const matchesStatus = orderFilter === 'all' || o.status.toLowerCase() === orderFilter.toLowerCase();
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) || 
                          o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.city.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // ==========================================
  // 3. CUSTOMERS STATE
  // ==========================================
  const [customersList, setCustomersList] = useState([
    {
      id: 'CUST-101',
      name: 'Karthik Raja',
      email: 'karthik@example.com',
      phone: '+91 98401 23456',
      city: 'Chennai',
      state: 'Tamil Nadu',
      ordersCount: 4,
      totalSpent: 3496,
      avatar: '/images/avatar1.jpg',
      badge: 'VIP Member',
      joined: 'Jan 2025'
    },
    {
      id: 'CUST-102',
      name: 'Priya Sundaram',
      email: 'priya.s@example.com',
      phone: '+91 97890 87654',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      ordersCount: 3,
      totalSpent: 2997,
      avatar: '/images/avatar2.jpg',
      badge: 'Loyal',
      joined: 'Feb 2025'
    },
    {
      id: 'CUST-103',
      name: 'Arun Kumar',
      email: 'arunk@example.com',
      phone: '+91 94432 11223',
      city: 'Madurai',
      state: 'Tamil Nadu',
      ordersCount: 2,
      totalSpent: 1548,
      avatar: '/images/avatar1.jpg',
      badge: 'Repeat',
      joined: 'Mar 2025'
    },
    {
      id: 'CUST-104',
      name: 'Dinesh V.',
      email: 'dinesh.v@example.com',
      phone: '+91 99405 67890',
      city: 'Salem',
      state: 'Tamil Nadu',
      ordersCount: 1,
      totalSpent: 699,
      avatar: '/images/avatar2.jpg',
      badge: 'New',
      joined: 'Sep 2025'
    },
    {
      id: 'CUST-105',
      name: 'Meera N.',
      email: 'meera.n@example.com',
      phone: '+91 96001 54321',
      city: 'Tirunelveli',
      state: 'Tamil Nadu',
      ordersCount: 5,
      totalSpent: 4250,
      avatar: '/images/avatar1.jpg',
      badge: 'VIP Member',
      joined: 'Jan 2025'
    }
  ]);
  const [customerSearch, setCustomerSearch] = useState('');

  const filteredCustomers = customersList.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // ==========================================
  // 4. CATEGORIES STATE
  // ==========================================
  const [categoriesList, setCategoriesList] = useState([
    {
      id: 'cat-oversized',
      name: 'Oversized Fit',
      slug: 'oversized-tees',
      itemCount: 14,
      image: '/images/tee-black.jpg',
      description: 'Heavyweight 240 GSM drop shoulder streetwear tees tailored for comfort.',
      featured: true,
      status: 'Active'
    },
    {
      id: 'cat-regular',
      name: 'Classic Regular Fit',
      slug: 'regular-tees',
      itemCount: 18,
      image: '/images/tee-white.jpg',
      description: 'Timeless 200 GSM everyday combed cotton silhouettes with tailored collar.',
      featured: true,
      status: 'Active'
    },
    {
      id: 'cat-graphics',
      name: 'Graphic & Narrative',
      slug: 'graphic-tees',
      itemCount: 12,
      image: '/images/tee-navy.jpg',
      description: 'Screen-printed dream and story statement collections designed in Tamil Nadu.',
      featured: true,
      status: 'Active'
    },
    {
      id: 'cat-solids',
      name: 'Minimal Solids',
      slug: 'solid-tees',
      itemCount: 9,
      image: '/images/tee-olive.jpg',
      description: 'Clean, tone-on-tone aesthetic luxury essentials for effortless minimalism.',
      featured: false,
      status: 'Active'
    },
    {
      id: 'cat-limited',
      name: 'Limited Drops',
      slug: 'limited-edition',
      itemCount: 4,
      image: '/images/fabric-macro.jpg',
      description: 'Numbered capsule batches handcrafted with gold foil and custom trims.',
      featured: false,
      status: 'Active'
    }
  ]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0,
      image: '/images/tee-black.jpg',
      description: newCatDesc || 'Custom collection category for ELVOR apparel.',
      featured: false,
      status: 'Active'
    };
    setCategoriesList([newCat, ...categoriesList]);
    setNewCatName('');
    setNewCatDesc('');
    setShowAddCatModal(false);
    onAddToast(`Category "${newCatName}" created successfully!`, 'success');
  };

  const handleDeleteCategory = (id, name) => {
    setCategoriesList(prev => prev.filter(c => c.id !== id));
    onAddToast(`Deleted category "${name}"`, 'info');
  };

  // ==========================================
  // 5. SETTINGS STATE
  // ==========================================
  const [settingsForm, setSettingsForm] = useState({
    storeName: 'ELVOR Apparel Co.',
    tagline: 'Wear Your Story',
    supportEmail: 'contact@elvor.in',
    supportPhone: '+91 94883 45678',
    shippingCost: '49',
    freeShippingThreshold: '999',
    storeCurrency: 'INR (₹)',
    gstNumber: '33AAACE1234F1Z5',
    warehouseCity: 'Tiruppur, Tamil Nadu',
    allowCOD: true,
    enableReviews: true,
    maintenanceMode: false,
    orderAlerts: true
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onAddToast('Store preferences and settings saved successfully!', 'success');
  };

  return (
    <div className="admin-page-root">
      {/* ========================================================
          ADMIN TOP NAVIGATION BAR
          ======================================================== */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mobile Admin Menu Toggle */}
            <button 
              className="admin-mobile-nav-toggle"
              onClick={() => setMobileAdminMenuOpen(!mobileAdminMenuOpen)}
              aria-label="Toggle admin menu"
            >
              {mobileAdminMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <BrandLogo size="md" onNavigate={onNavigate} />
          </div>

          {/* Tab indicator for desktop */}
          <div className="admin-current-tab-badge">
            <span className="admin-tab-dot" />
            <span className="admin-tab-name">
              {sidebarNavItems.find(i => i.id === activeNav)?.label || 'Admin Panel'}
            </span>
          </div>

          {/* Right Admin Controls */}
          <div className="admin-header-right">
            <button 
              className="admin-notification-btn" 
              aria-label="Notifications"
              onClick={() => onAddToast('You have 3 unread customer orders today.', 'info')}
            >
              <Bell size={19} />
              <span className="admin-bell-badge" />
            </button>

            {/* Admin Profile dropdown */}
            <div className="admin-profile-pill" onClick={() => setActiveNav('settings')}>
              <img
                src="/images/avatar2.jpg"
                alt="Admin Profile"
                className="admin-avatar-img"
              />
              <span className="admin-name-text">Admin</span>
              <ChevronDown size={15} />
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Tabs Row */}
        <div className="admin-mobile-tabs-row">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                className={`admin-mobile-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ========================================================
          ADMIN LAYOUT: SIDEBAR + MAIN CONTENT AREA
          ======================================================== */}
      <div className="admin-body-layout">
        {/* LEFT SIDEBAR (Desktop) */}
        <aside className={`admin-sidebar ${mobileAdminMenuOpen ? 'mobile-open' : ''}`}>
          <nav className="admin-sidebar-nav">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  className={`admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileAdminMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Promo Card */}
          <div className="admin-sidebar-card">
            <img 
              src="/images/fabric-macro.jpg" 
              alt="Manage Store" 
              className="admin-card-bg-img"
            />
            <div className="admin-card-overlay" />
            <div className="admin-card-content">
              <span className="admin-card-logo-text">ELVOR</span>
              <h4 className="admin-card-title">TAMIL NADU HUB</h4>
              <p className="admin-card-sub">Premium streetwear made for dreamers.</p>
              <ArrowRight size={16} className="admin-card-arrow" />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA (DYNAMIC BASED ON TAB) */}
        <main className="admin-main-content">
          
          {/* ========================================================
              TAB 1: DASHBOARD
              ======================================================== */}
          {activeNav === 'dashboard' && (
            <div>
              {/* Hero Banner */}
              <section className="admin-hero-banner">
                <img
                  src="/images/hero.jpg"
                  alt="Admin Panel"
                  className="admin-hero-bg-img"
                />
                <div className="admin-hero-overlay" />

                <div className="admin-handwritten-note">
                  <div>Better</div>
                  <div>Styles</div>
                  <div>Bigger</div>
                  <div>Dreams</div>
                  <svg className="admin-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
                    <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="admin-hero-text">
                  <div className="admin-tag">ADMIN OVERVIEW</div>
                  <h1 className="admin-title">
                    STORE METRICS &<br />
                    MANAGEMENT
                  </h1>
                  <p className="admin-desc">
                    Monitor revenue performance, track real-time dispatches across Tamil Nadu, and manage your catalogue.
                  </p>
                </div>
              </section>

              {/* Top Metric Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Total Revenue</span>
                    <div className="stat-icon-wrap gold">
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div className="stat-value">₹ 2,48,920</div>
                  <div className="stat-delta positive">
                    <TrendingUp size={14} />
                    <span>+18.4% from last month</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Total Orders</span>
                    <div className="stat-icon-wrap blue">
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                  <div className="stat-value">342</div>
                  <div className="stat-delta positive">
                    <TrendingUp size={14} />
                    <span>+12.1% this week</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Active Customers</span>
                    <div className="stat-icon-wrap emerald">
                      <Users size={18} />
                    </div>
                  </div>
                  <div className="stat-value">1,890</div>
                  <div className="stat-delta positive">
                    <TrendingUp size={14} />
                    <span>+85 new dreamers</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Active Catalogue</span>
                    <div className="stat-icon-wrap purple">
                      <Shirt size={18} />
                    </div>
                  </div>
                  <div className="stat-value">{productsList.length} Tees</div>
                  <div className="stat-delta neutral">
                    <span>5 categories active</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Table */}
              <div className="admin-dashboard-dual-grid">
                {/* Recent Orders Overview */}
                <div className="admin-card-container">
                  <div className="admin-card-header-flex">
                    <div>
                      <h3 className="admin-form-main-title">Recent Orders</h3>
                      <p className="admin-form-sub-title">Latest shipments dispatched across Tamil Nadu</p>
                    </div>
                    <button 
                      className="btn-admin-pill-link"
                      onClick={() => setActiveNav('orders')}
                    >
                      View All Orders <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="admin-table-wrapper" style={{ marginTop: '16px' }}>
                    <table className="admin-products-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersList.slice(0, 4).map((o) => (
                          <tr key={o.id}>
                            <td>
                              <span className="table-highlight-code">{o.id}</span>
                            </td>
                            <td>
                              <div className="table-customer-name">{o.customer}</div>
                              <div className="table-customer-sub">{o.city}</div>
                            </td>
                            <td>
                              <span className="table-price-text">₹ {o.total}</span>
                            </td>
                            <td>
                              <span className={`table-status-pill ${o.status.toLowerCase()}`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="admin-card-container">
                  <h3 className="admin-form-main-title">Store Shortcuts</h3>
                  <p className="admin-form-sub-title">Direct controls for your daily store routine</p>

                  <div className="admin-quick-actions-list">
                    <button 
                      className="admin-action-tile"
                      onClick={() => setActiveNav('products')}
                    >
                      <div className="action-tile-icon gold">
                        <Plus size={20} />
                      </div>
                      <div className="action-tile-text">
                        <div className="action-title">Add New T-Shirt</div>
                        <div className="action-desc">Upload design images, set pricing and stock</div>
                      </div>
                    </button>

                    <button 
                      className="admin-action-tile"
                      onClick={() => setActiveNav('categories')}
                    >
                      <div className="action-tile-icon purple">
                        <Grid size={20} />
                      </div>
                      <div className="action-tile-text">
                        <div className="action-title">Manage Categories</div>
                        <div className="action-desc">Organize Oversized, Regular & Graphic drops</div>
                      </div>
                    </button>

                    <button 
                      className="admin-action-tile"
                      onClick={() => setActiveNav('analytics')}
                    >
                      <div className="action-tile-icon blue">
                        <TrendingUp size={20} />
                      </div>
                      <div className="action-tile-text">
                        <div className="action-title">Sales Analytics</div>
                        <div className="action-desc">Review city breakdown and revenue trend charts</div>
                      </div>
                    </button>

                    <button 
                      className="admin-action-tile"
                      onClick={() => setActiveNav('settings')}
                    >
                      <div className="action-tile-icon emerald">
                        <Settings size={20} />
                      </div>
                      <div className="action-tile-text">
                        <div className="action-title">Store Preferences</div>
                        <div className="action-desc">Update shipping rules, policies & notifications</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: PRODUCTS
              ======================================================== */}
          {activeNav === 'products' && (
            <div>
              {/* Hero Banner */}
              <section className="admin-hero-banner">
                <img
                  src="/images/hero.jpg"
                  alt="Admin Products"
                  className="admin-hero-bg-img"
                />
                <div className="admin-hero-overlay" />

                <div className="admin-handwritten-note">
                  <div>Better</div>
                  <div>Styles</div>
                  <div>Bigger</div>
                  <div>Dreams</div>
                  <svg className="admin-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
                    <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="admin-hero-text">
                  <div className="admin-tag">INVENTORY & CATALOGUE</div>
                  <h1 className="admin-title">
                    ADD / EDIT<br />
                    PRODUCT
                  </h1>
                  <p className="admin-desc">
                    Manage your T-shirt collection. Add new drops, update fit specifications, and keep your inventory fresh.
                  </p>
                </div>
              </section>

              {/* Form Card */}
              <div className="admin-card-container">
                <div className="admin-form-header">
                  <h2 className="admin-form-main-title">{editingId ? 'Edit T-Shirt Details' : 'Add New T-Shirt'}</h2>
                  <p className="admin-form-sub-title">Fill in the information below to publish a product to ELVOR store.</p>
                </div>

                <form onSubmit={handleSaveProduct}>
                  <div className="admin-form-grid">
                    {/* Left Col: Images & Attributes */}
                    <div className="admin-form-left-col">
                      <div className="form-field-group">
                        <label className="form-label">Product Images</label>
                        <span className="form-sub-label">Upload clear high-res photos (front, back, model view).</span>

                        <div className="admin-dropzone" onClick={handleAddImage}>
                          <UploadCloud size={32} className="admin-upload-icon" />
                          <div className="admin-drop-text-primary">Drag & drop images here</div>
                          <div className="admin-drop-text-secondary">or click to browse</div>
                          <div className="admin-drop-text-support">Supports: JPG, PNG, WEBP (Max 5MB each)</div>
                        </div>

                        <div className="admin-thumbnails-row">
                          {images.map((imgSrc, idx) => (
                            <div key={idx} className="admin-thumb-box">
                              <img src={imgSrc} alt="Preview" />
                              <button
                                type="button"
                                className="admin-thumb-remove-btn"
                                onClick={() => handleRemoveImage(idx)}
                                aria-label="Remove image"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="admin-thumb-add-btn"
                            onClick={handleAddImage}
                            title="Add image"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="optional-details-group">
                        <label className="form-label" style={{ marginBottom: '12px' }}>
                          Product Specifications <span style={{ color: '#9ca3af', fontWeight: 400 }}>(Optional)</span>
                        </label>

                        <div className="optional-inputs-grid">
                          <div className="form-input-box">
                            <label className="input-mini-label">Brand</label>
                            <div className="input-with-icon">
                              <Tag size={15} className="input-icon" />
                              <input
                                type="text"
                                value={formBrand}
                                onChange={(e) => setFormBrand(e.target.value)}
                                className="admin-input"
                              />
                            </div>
                          </div>

                          <div className="form-input-box">
                            <label className="input-mini-label">Fabric</label>
                            <div className="input-with-icon">
                              <Layers size={15} className="input-icon" />
                              <input
                                type="text"
                                value={formFabric}
                                onChange={(e) => setFormFabric(e.target.value)}
                                className="admin-input"
                              />
                            </div>
                          </div>

                          <div className="form-input-box">
                            <label className="input-mini-label">Fit Type</label>
                            <div className="input-with-icon">
                              <select
                                value={formFitType}
                                onChange={(e) => setFormFitType(e.target.value)}
                                className="admin-input admin-select"
                              >
                                <option value="Oversized Fit">Oversized Fit</option>
                                <option value="Regular Fit">Regular Fit</option>
                                <option value="Slim Fit">Slim Fit</option>
                                <option value="Boxy Fit">Boxy Fit</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-input-box">
                            <label className="input-mini-label">Style</label>
                            <div className="input-with-icon">
                              <Shirt size={15} className="input-icon" />
                              <input
                                type="text"
                                value={formStyle}
                                onChange={(e) => setFormStyle(e.target.value)}
                                className="admin-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="status-toggle-box">
                        <label className="input-mini-label">Store Visibility Status</label>
                        <div className="status-toggle-row">
                          <button
                            type="button"
                            className={`status-switch ${formStatus ? 'active' : ''}`}
                            onClick={() => setFormStatus(!formStatus)}
                            aria-label="Toggle status"
                          >
                            <span className="status-knob" />
                          </button>
                          <div>
                            <div className="status-state-text">{formStatus ? 'Active & Published' : 'Draft / Hidden'}</div>
                            <div className="status-sub-text">Live on ELVOR store pages and search</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Col: Fields */}
                    <div className="admin-form-right-col">
                      <div className="form-field-group">
                        <div className="form-label-row">
                          <label className="form-label">Product Name <span className="req-star">*</span></label>
                          <span className="char-counter">{formName.length}/100</span>
                        </div>
                        <input
                          type="text"
                          placeholder="e.g., Heavyweight Oversized Tee"
                          value={formName}
                          maxLength={100}
                          onChange={(e) => setFormName(e.target.value)}
                          className="admin-input full"
                          required
                        />
                      </div>

                      <div className="form-field-group">
                        <label className="form-label">Category <span className="req-star">*</span></label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="admin-input full admin-select"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="Men's T-Shirts">Men's T-Shirts</option>
                          <option value="Oversized T-Shirts">Oversized T-Shirts</option>
                          <option value="Graphic T-Shirts">Graphic T-Shirts</option>
                          <option value="Solid T-Shirts">Solid T-Shirts</option>
                          <option value="Limited Edition">Limited Edition</option>
                        </select>
                      </div>

                      <div className="form-row-2">
                        <div className="form-field-group">
                          <label className="form-label">Price (₹) <span className="req-star">*</span></label>
                          <div className="input-currency-wrap">
                            <input
                              type="number"
                              placeholder="799"
                              value={formPrice}
                              onChange={(e) => setFormPrice(e.target.value)}
                              className="admin-input full"
                              required
                            />
                            <span className="currency-symbol">₹</span>
                          </div>
                        </div>

                        <div className="form-field-group">
                          <label className="form-label">Discount Price (Optional)</label>
                          <div className="input-currency-wrap">
                            <input
                              type="number"
                              placeholder="699"
                              value={formDiscountPrice}
                              onChange={(e) => setFormDiscountPrice(e.target.value)}
                              className="admin-input full"
                            />
                            <span className="currency-symbol">₹</span>
                          </div>
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="form-field-group">
                          <label className="form-label">Stock Quantity <span className="req-star">*</span></label>
                          <input
                            type="number"
                            placeholder="50"
                            value={formStock}
                            onChange={(e) => setFormStock(e.target.value)}
                            className="admin-input full"
                            required
                          />
                        </div>

                        <div className="form-field-group">
                          <label className="form-label">Color <span className="req-star">*</span></label>
                          <select
                            value={formColor}
                            onChange={(e) => setFormColor(e.target.value)}
                            className="admin-input full admin-select"
                            required
                          >
                            <option value="">Select color</option>
                            <option value="Black">Black</option>
                            <option value="Off White">Off White / Cream</option>
                            <option value="Olive Green">Olive Green</option>
                            <option value="Navy Blue">Navy Blue</option>
                            <option value="Coffee Brown">Coffee Brown</option>
                            <option value="Charcoal Grey">Charcoal Grey</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-field-group">
                        <label className="form-label">Sizes Available <span className="req-star">*</span></label>
                        <div className="admin-size-checkboxes">
                          {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                            <label key={sz} className="admin-size-check-label">
                              <input
                                type="checkbox"
                                checked={formSizes.includes(sz)}
                                onChange={() => handleSizeToggle(sz)}
                                className="custom-checkbox"
                              />
                              <span>{sz}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-field-group">
                        <div className="form-label-row">
                          <label className="form-label">Description <span className="req-star">*</span></label>
                          <span className="char-counter">{formDescription.length}/500</span>
                        </div>
                        <textarea
                          rows={4}
                          placeholder="Describe the fabric feel, drape, and narrative vibe..."
                          value={formDescription}
                          maxLength={500}
                          onChange={(e) => setFormDescription(e.target.value)}
                          className="admin-textarea full"
                        />
                      </div>

                      <div className="form-actions-row">
                        <button
                          type="button"
                          className="btn-admin-reset"
                          onClick={handleResetForm}
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="btn-admin-save"
                        >
                          <Save size={16} />
                          <span>{editingId ? 'Update Product' : 'Save & Publish Product'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Table Card */}
              <div className="admin-card-container table-card">
                <div className="admin-table-header-row">
                  <div>
                    <h3 className="admin-table-title">Existing Products ({filteredTableProducts.length})</h3>
                    <p className="admin-table-sub">Manage active catalogue, modify stock and trigger quick actions.</p>
                  </div>

                  <div className="admin-table-tools">
                    <div className="admin-search-wrap">
                      <Search size={15} className="admin-search-icon" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="admin-table-search-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-products-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>
                          <input type="checkbox" className="custom-checkbox" />
                        </th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTableProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <input type="checkbox" className="custom-checkbox" />
                          </td>
                          <td>
                            <img src={p.image} alt={p.name} className="table-product-thumb" />
                          </td>
                          <td>
                            <div className="table-product-name">{p.name}</div>
                            <div className="table-product-meta">{p.color} | {p.fit}</div>
                          </td>
                          <td>
                            <span className="table-cat-text">{p.category}</span>
                          </td>
                          <td>
                            <span className="table-price-text">₹ {p.price}</span>
                          </td>
                          <td>
                            <span className="table-stock-text">{p.stock}</span>
                          </td>
                          <td>
                            <span className="table-status-badge active">
                              <span className="status-dot" />
                              {p.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions-group">
                              <button
                                className="table-action-btn edit"
                                onClick={() => handleEditClick(p)}
                                title="Edit Product"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                className="table-action-btn view"
                                onClick={() => onPreviewProduct(p)}
                                title="Preview in Store"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                className="table-action-btn delete"
                                onClick={() => handleDeleteClick(p.id, p.name)}
                                title="Delete Product"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: ORDERS
              ======================================================== */}
          {activeNav === 'orders' && (
            <div>
              {/* Hero Banner */}
              <section className="admin-hero-banner">
                <img
                  src="/images/hero.jpg"
                  alt="Orders"
                  className="admin-hero-bg-img"
                />
                <div className="admin-hero-overlay" />

                <div className="admin-handwritten-note">
                  <div>Fast</div>
                  <div>Delivery</div>
                  <div>Pure</div>
                  <div>Quality</div>
                  <svg className="admin-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
                    <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="admin-hero-text">
                  <div className="admin-tag">LOGISTICS & FULFILLMENT</div>
                  <h1 className="admin-title">
                    CUSTOMER<br />
                    ORDERS
                  </h1>
                  <p className="admin-desc">
                    Track customer parcels, update delivery states, and manage orders dispatched across Tamil Nadu.
                  </p>
                </div>
              </section>

              {/* Order Status Counts */}
              <div className="admin-order-summary-pills">
                <button 
                  className={`order-filter-pill ${orderFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setOrderFilter('all')}
                >
                  All Orders ({ordersList.length})
                </button>
                <button 
                  className={`order-filter-pill ${orderFilter === 'processing' ? 'active' : ''}`}
                  onClick={() => setOrderFilter('processing')}
                >
                  Processing ({ordersList.filter(o => o.status === 'Processing').length})
                </button>
                <button 
                  className={`order-filter-pill ${orderFilter === 'shipped' ? 'active' : ''}`}
                  onClick={() => setOrderFilter('shipped')}
                >
                  Shipped ({ordersList.filter(o => o.status === 'Shipped').length})
                </button>
                <button 
                  className={`order-filter-pill ${orderFilter === 'delivered' ? 'active' : ''}`}
                  onClick={() => setOrderFilter('delivered')}
                >
                  Delivered ({ordersList.filter(o => o.status === 'Delivered').length})
                </button>
              </div>

              {/* Orders Table */}
              <div className="admin-card-container table-card">
                <div className="admin-table-header-row">
                  <div>
                    <h3 className="admin-table-title">Recent Order Dispatches</h3>
                    <p className="admin-table-sub">Real-time status updates and shipping management.</p>
                  </div>

                  <div className="admin-table-tools">
                    <div className="admin-search-wrap">
                      <Search size={15} className="admin-search-icon" />
                      <input
                        type="text"
                        placeholder="Search by ID, name, city..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="admin-table-search-input"
                        style={{ width: '240px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-products-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>City / Address</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((o) => (
                        <tr key={o.id}>
                          <td>
                            <div className="table-highlight-code">{o.id}</div>
                            <div className="table-date-meta">{o.date}</div>
                          </td>
                          <td>
                            <div className="table-customer-name">{o.customer}</div>
                            <div className="table-customer-sub">{o.email}</div>
                          </td>
                          <td>
                            <div className="table-items-detail">{o.items}</div>
                          </td>
                          <td>
                            <span className="table-location-text">{o.city}</span>
                          </td>
                          <td>
                            <span className="table-payment-pill">{o.payment}</span>
                          </td>
                          <td>
                            <span className="table-price-text">₹ {o.total}</span>
                          </td>
                          <td>
                            <span className={`table-status-pill ${o.status.toLowerCase()}`}>
                              {o.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-order-action-select-wrap">
                              <select 
                                value={o.status}
                                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                className="order-status-dropdown"
                              >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: CUSTOMERS
              ======================================================== */}
          {activeNav === 'customers' && (
            <div>
              {/* Hero Banner */}
              <section className="admin-hero-banner">
                <img
                  src="/images/hero.jpg"
                  alt="Customers"
                  className="admin-hero-bg-img"
                />
                <div className="admin-hero-overlay" />

                <div className="admin-handwritten-note">
                  <div>United</div>
                  <div>By</div>
                  <div>The</div>
                  <div>Story</div>
                  <svg className="admin-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
                    <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="admin-hero-text">
                  <div className="admin-tag">COMMUNITY & BUYERS</div>
                  <h1 className="admin-title">
                    CUSTOMER<br />
                    PROFILES
                  </h1>
                  <p className="admin-desc">
                    View dreamers and streetwear enthusiasts across Chennai, Coimbatore, Madurai, and all of Tamil Nadu.
                  </p>
                </div>
              </section>

              {/* Customer Stats Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Total Registered</span>
                    <div className="stat-icon-wrap emerald">
                      <Users size={18} />
                    </div>
                  </div>
                  <div className="stat-value">1,890</div>
                  <div className="stat-delta positive">
                    <span>94% repeat purchase satisfaction</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Average Order Value</span>
                    <div className="stat-icon-wrap gold">
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div className="stat-value">₹ 1,180</div>
                  <div className="stat-delta positive">
                    <span>+₹140 vs last quarter</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Top Region</span>
                    <div className="stat-icon-wrap blue">
                      <MapPin size={18} />
                    </div>
                  </div>
                  <div className="stat-value">Tamil Nadu</div>
                  <div className="stat-delta neutral">
                    <span>Chennai & Coimbatore leading</span>
                  </div>
                </div>
              </div>

              {/* Customers Table */}
              <div className="admin-card-container table-card">
                <div className="admin-table-header-row">
                  <div>
                    <h3 className="admin-table-title">Customer Directory</h3>
                    <p className="admin-table-sub">Manage customer contact information, order history and membership status.</p>
                  </div>

                  <div className="admin-table-tools">
                    <div className="admin-search-wrap">
                      <Search size={15} className="admin-search-icon" />
                      <input
                        type="text"
                        placeholder="Search dreamers..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="admin-table-search-input"
                        style={{ width: '220px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-products-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Orders</th>
                        <th>Total Spent</th>
                        <th>Membership</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((c) => (
                        <tr key={c.id}>
                          <td>
                            <div className="table-customer-profile-cell">
                              <img src={c.avatar} alt={c.name} className="table-avatar" />
                              <div>
                                <div className="table-customer-name">{c.name}</div>
                                <div className="table-customer-sub">Member since {c.joined}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="table-contact-row">
                              <Mail size={13} className="table-contact-icon" />
                              <span>{c.email}</span>
                            </div>
                            <div className="table-contact-row">
                              <Phone size={13} className="table-contact-icon" />
                              <span>{c.phone}</span>
                            </div>
                          </td>
                          <td>
                            <span className="table-location-badge">{c.city}, {c.state}</span>
                          </td>
                          <td>
                            <span className="table-stock-text">{c.ordersCount} orders</span>
                          </td>
                          <td>
                            <span className="table-price-text">₹ {c.totalSpent}</span>
                          </td>
                          <td>
                            <span className={`table-vip-badge ${c.badge.toLowerCase().replace(' ', '-')}`}>
                              {c.badge}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              className="btn-admin-view-profile"
                              onClick={() => onAddToast(`Opened order timeline for ${c.name}`, 'info')}
                            >
                              Timeline
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: CATEGORIES
              ======================================================== */}
          {activeNav === 'categories' && (
            <div>
              {/* Hero Banner */}
              <section className="admin-hero-banner">
                <img
                  src="/images/hero.jpg"
                  alt="Categories"
                  className="admin-hero-bg-img"
                />
                <div className="admin-hero-overlay" />

                <div className="admin-handwritten-note">
                  <div>Curated</div>
                  <div>Drops</div>
                  <div>Bold</div>
                  <div>Cuts</div>
                  <svg className="admin-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
                    <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="admin-hero-text">
                  <div className="admin-tag">STRUCTURE & NAVIGATION</div>
                  <h1 className="admin-title">
                    COLLECTION<br />
                    CATEGORIES
                  </h1>
                  <p className="admin-desc">
                    Organize your streetwear silhouettes into curated sections: Oversized, Regular Fit, Graphic, and Limited drops.
                  </p>
                </div>
              </section>

              {/* Add Category Section / Header */}
              <div className="admin-categories-control-row">
                <h2 className="admin-form-main-title">Store Collections ({categoriesList.length})</h2>
                <button 
                  className="btn-admin-save"
                  onClick={() => setShowAddCatModal(true)}
                >
                  <Plus size={16} />
                  <span>Add New Category</span>
                </button>
              </div>

              {/* Category Grid Cards */}
              <div className="admin-category-cards-grid">
                {categoriesList.map((cat) => (
                  <div key={cat.id} className="admin-category-card">
                    <div className="admin-category-card-img-wrap">
                      <img src={cat.image} alt={cat.name} />
                      <div className="admin-category-card-overlay" />
                      <span className="admin-category-item-count">{cat.itemCount} Designs</span>
                    </div>

                    <div className="admin-category-card-content">
                      <div className="cat-card-header">
                        <h4 className="cat-card-title">{cat.name}</h4>
                        <span className="cat-status-pill">{cat.status}</span>
                      </div>
                      <p className="cat-card-desc">{cat.description}</p>
                      <div className="cat-card-footer">
                        <span className="cat-slug-text">/{cat.slug}</span>
                        <div className="cat-action-btns">
                          <button 
                            className="table-action-btn edit"
                            onClick={() => onAddToast(`Editing category "${cat.name}"`, 'info')}
                            title="Edit Category"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            className="table-action-btn delete"
                            onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            title="Delete Category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Category Modal / Inline Form */}
              {showAddCatModal && (
                <div className="admin-card-container" style={{ marginTop: '28px' }}>
                  <div className="admin-form-header">
                    <h3 className="admin-form-main-title">Create New Category</h3>
                    <p className="admin-form-sub-title">Add a new section to the store navigation and catalogue filters.</p>
                  </div>

                  <form onSubmit={handleAddCategory}>
                    <div className="form-row-2">
                      <div className="form-field-group">
                        <label className="form-label">Category Title <span className="req-star">*</span></label>
                        <input
                          type="text"
                          placeholder="e.g., Heavyweight Hoodies & Outerwear"
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          className="admin-input full"
                          required
                        />
                      </div>

                      <div className="form-field-group">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          placeholder="Short summary for shoppers..."
                          value={newCatDesc}
                          onChange={(e) => setNewCatDesc(e.target.value)}
                          className="admin-input full"
                        />
                      </div>
                    </div>

                    <div className="form-actions-row">
                      <button 
                        type="button" 
                        className="btn-admin-reset"
                        onClick={() => setShowAddCatModal(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn-admin-save"
                      >
                        <Save size={16} />
                        <span>Save Category</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 6: ANALYTICS
              ======================================================== */}
          {activeNav === 'analytics' && (
            <div>
              {/* Hero Banner */}
              <section className="admin-hero-banner">
                <img
                  src="/images/hero.jpg"
                  alt="Analytics"
                  className="admin-hero-bg-img"
                />
                <div className="admin-hero-overlay" />

                <div className="admin-handwritten-note">
                  <div>Growth</div>
                  <div>By</div>
                  <div>Design</div>
                  <div>& Vision</div>
                  <svg className="admin-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
                    <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="admin-hero-text">
                  <div className="admin-tag">PERFORMANCE & METRICS</div>
                  <h1 className="admin-title">
                    STORE<br />
                    ANALYTICS
                  </h1>
                  <p className="admin-desc">
                    Understand top selling fits, regional sales distribution across Tamil Nadu, and visitor conversion rates.
                  </p>
                </div>
              </section>

              {/* Analytics Metric Highlights */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Monthly Gross Sales</span>
                    <div className="stat-icon-wrap gold">
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div className="stat-value">₹ 2,48,920</div>
                  <div className="stat-delta positive">
                    <TrendingUp size={14} />
                    <span>+23.8% MoM Growth</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Conversion Rate</span>
                    <div className="stat-icon-wrap emerald">
                      <BarChart3 size={18} />
                    </div>
                  </div>
                  <div className="stat-value">3.64%</div>
                  <div className="stat-delta positive">
                    <TrendingUp size={14} />
                    <span>Top benchmark in streetwear</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Returning Customer Rate</span>
                    <div className="stat-icon-wrap blue">
                      <RefreshCw size={18} />
                    </div>
                  </div>
                  <div className="stat-value">42.8%</div>
                  <div className="stat-delta positive">
                    <span>+5.2% loyalty growth</span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Cart Abandonment</span>
                    <div className="stat-icon-wrap purple">
                      <TrendingDown size={18} />
                    </div>
                  </div>
                  <div className="stat-value">28.4%</div>
                  <div className="stat-delta positive">
                    <span>Low drop-off rate</span>
                  </div>
                </div>
              </div>

              {/* Visual Breakdown Cards */}
              <div className="admin-dashboard-dual-grid">
                {/* City Performance Chart Simulation */}
                <div className="admin-card-container">
                  <h3 className="admin-form-main-title">Sales by Region (Tamil Nadu)</h3>
                  <p className="admin-form-sub-title">Top contributing cities to monthly gross sales</p>

                  <div className="admin-city-bars-list">
                    <div className="city-bar-item">
                      <div className="city-bar-meta">
                        <span className="city-name">Chennai</span>
                        <span className="city-val">₹ 1,12,000 (45%)</span>
                      </div>
                      <div className="city-progress-track">
                        <div className="city-progress-fill" style={{ width: '85%' }} />
                      </div>
                    </div>

                    <div className="city-bar-item">
                      <div className="city-bar-meta">
                        <span className="city-name">Coimbatore</span>
                        <span className="city-val">₹ 58,400 (24%)</span>
                      </div>
                      <div className="city-progress-track">
                        <div className="city-progress-fill" style={{ width: '60%' }} />
                      </div>
                    </div>

                    <div className="city-bar-item">
                      <div className="city-bar-meta">
                        <span className="city-name">Madurai</span>
                        <span className="city-val">₹ 34,200 (14%)</span>
                      </div>
                      <div className="city-progress-track">
                        <div className="city-progress-fill" style={{ width: '40%' }} />
                      </div>
                    </div>

                    <div className="city-bar-item">
                      <div className="city-bar-meta">
                        <span className="city-name">Salem & Tiruchirappalli</span>
                        <span className="city-val">₹ 28,100 (11%)</span>
                      </div>
                      <div className="city-progress-track">
                        <div className="city-progress-fill" style={{ width: '32%' }} />
                      </div>
                    </div>

                    <div className="city-bar-item">
                      <div className="city-bar-meta">
                        <span className="city-name">Other Districts</span>
                        <span className="city-val">₹ 16,220 (6%)</span>
                      </div>
                      <div className="city-progress-track">
                        <div className="city-progress-fill" style={{ width: '18%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Selling Products */}
                <div className="admin-card-container">
                  <h3 className="admin-form-main-title">Top Performing Silhouettes</h3>
                  <p className="admin-form-sub-title">Highest volume drops in the current collection</p>

                  <div className="admin-top-sellers-list">
                    <div className="top-seller-item">
                      <img src="/images/tee-black.jpg" alt="Essential Oversized" className="seller-thumb" />
                      <div className="seller-info">
                        <div className="seller-name">Essential Oversized Tee</div>
                        <div className="seller-cat">Oversized Fit • Black</div>
                      </div>
                      <div className="seller-metric">
                        <span className="seller-revenue">₹ 95,880</span>
                        <span className="seller-units">120 sold</span>
                      </div>
                    </div>

                    <div className="top-seller-item">
                      <img src="/images/tee-white.jpg" alt="Graphic Vibes" className="seller-thumb" />
                      <div className="seller-info">
                        <div className="seller-name">Graphic Vibes Tee</div>
                        <div className="seller-cat">Regular Fit • Off White</div>
                      </div>
                      <div className="seller-metric">
                        <span className="seller-revenue">₹ 62,916</span>
                        <span className="seller-units">84 sold</span>
                      </div>
                    </div>

                    <div className="top-seller-item">
                      <img src="/images/tee-navy.jpg" alt="Typography Back" className="seller-thumb" />
                      <div className="seller-info">
                        <div className="seller-name">Typography Back Tee</div>
                        <div className="seller-cat">Oversized Fit • Navy Blue</div>
                      </div>
                      <div className="seller-metric">
                        <span className="seller-revenue">₹ 52,638</span>
                        <span className="seller-units">62 sold</span>
                      </div>
                    </div>

                    <div className="top-seller-item">
                      <img src="/images/tee-olive.jpg" alt="Classic Essentials" className="seller-thumb" />
                      <div className="seller-info">
                        <div className="seller-name">Classic Essentials Tee</div>
                        <div className="seller-cat">Regular Fit • Olive Green</div>
                      </div>
                      <div className="seller-metric">
                        <span className="seller-revenue">₹ 37,746</span>
                        <span className="seller-units">54 sold</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: SETTINGS
              ======================================================== */}
          {activeNav === 'settings' && (
            <div>
              {/* Hero Banner */}
              <section className="admin-hero-banner">
                <img
                  src="/images/hero.jpg"
                  alt="Settings"
                  className="admin-hero-bg-img"
                />
                <div className="admin-hero-overlay" />

                <div className="admin-handwritten-note">
                  <div>Precision</div>
                  <div>In</div>
                  <div>Every</div>
                  <div>Detail</div>
                  <svg className="admin-note-underline" width="130" height="14" viewBox="0 0 130 14" fill="none">
                    <path d="M2 10C35 3 95 2 128 11" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="admin-hero-text">
                  <div className="admin-tag">STORE CONFIGURATION</div>
                  <h1 className="admin-title">
                    BRAND & STORE<br />
                    SETTINGS
                  </h1>
                  <p className="admin-desc">
                    Configure store identity, regional shipping thresholds, customer support channels, and payment policies.
                  </p>
                </div>
              </section>

              {/* Settings Form */}
              <form onSubmit={handleSaveSettings}>
                {/* Store Profile Card */}
                <div className="admin-card-container">
                  <div className="admin-form-header">
                    <h3 className="admin-form-main-title">Store Identity & Contact</h3>
                    <p className="admin-form-sub-title">General information visible across order invoices and footer links.</p>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label className="form-label">Brand Name</label>
                      <input
                        type="text"
                        value={settingsForm.storeName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                        className="admin-input full"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-label">Tagline</label>
                      <input
                        type="text"
                        value={settingsForm.tagline}
                        onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                        className="admin-input full"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label className="form-label">Support Email</label>
                      <input
                        type="email"
                        value={settingsForm.supportEmail}
                        onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                        className="admin-input full"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-label">Customer Helpline / WhatsApp</label>
                      <input
                        type="text"
                        value={settingsForm.supportPhone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                        className="admin-input full"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label className="form-label">Fulfillment Hub Location</label>
                      <input
                        type="text"
                        value={settingsForm.warehouseCity}
                        onChange={(e) => setSettingsForm({ ...settingsForm, warehouseCity: e.target.value })}
                        className="admin-input full"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-label">GST / Business Tax ID</label>
                      <input
                        type="text"
                        value={settingsForm.gstNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, gstNumber: e.target.value })}
                        className="admin-input full"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping & Delivery Card */}
                <div className="admin-card-container">
                  <div className="admin-form-header">
                    <h3 className="admin-form-main-title">Shipping & Logistics Rules</h3>
                    <p className="admin-form-sub-title">Thresholds for express courier deliveries across South India.</p>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label className="form-label">Standard Shipping Fee (₹)</label>
                      <input
                        type="number"
                        value={settingsForm.shippingCost}
                        onChange={(e) => setSettingsForm({ ...settingsForm, shippingCost: e.target.value })}
                        className="admin-input full"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-label">Free Shipping Minimum Threshold (₹)</label>
                      <input
                        type="number"
                        value={settingsForm.freeShippingThreshold}
                        onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: e.target.value })}
                        className="admin-input full"
                      />
                    </div>
                  </div>

                  <div className="admin-checkbox-list">
                    <label className="admin-size-check-label" style={{ marginBottom: '10px' }}>
                      <input
                        type="checkbox"
                        checked={settingsForm.allowCOD}
                        onChange={(e) => setSettingsForm({ ...settingsForm, allowCOD: e.target.checked })}
                        className="custom-checkbox"
                      />
                      <span>Enable Cash on Delivery (COD) for eligible pin codes</span>
                    </label>

                    <label className="admin-size-check-label" style={{ marginBottom: '10px' }}>
                      <input
                        type="checkbox"
                        checked={settingsForm.enableReviews}
                        onChange={(e) => setSettingsForm({ ...settingsForm, enableReviews: e.target.checked })}
                        className="custom-checkbox"
                      />
                      <span>Allow verified buyers to post customer reviews & photo testimonials</span>
                    </label>

                    <label className="admin-size-check-label">
                      <input
                        type="checkbox"
                        checked={settingsForm.orderAlerts}
                        onChange={(e) => setSettingsForm({ ...settingsForm, orderAlerts: e.target.checked })}
                        className="custom-checkbox"
                      />
                      <span>Send instant admin notification upon new order receipt</span>
                    </label>
                  </div>

                  <div className="form-actions-row">
                    <button 
                      type="button" 
                      className="btn-admin-reset"
                      onClick={() => onAddToast('Reset to saved settings', 'info')}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-admin-save"
                    >
                      <Save size={16} />
                      <span>Save All Store Settings</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================
          ADMIN FOOTER BAR
          ======================================================== */}
      <footer className="admin-bottom-footer">
        <div className="admin-footer-inner">
          <BrandLogo size="sm" onNavigate={onNavigate} />
          
          <div className="admin-footer-copy">
            © 2025 ELVOR. All rights reserved. &nbsp;|&nbsp; Crafted for the Dreamers ❤️
          </div>

          <div className="admin-footer-right-links">
            <span className="admin-panel-indicator">
              <Shield size={14} />
              <span>Admin Management Hub</span>
            </span>
            <span className="footer-pipe">|</span>
            <button
              className="admin-logout-btn"
              onClick={() => onNavigate('home')}
            >
              <span>Exit Admin</span>
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
