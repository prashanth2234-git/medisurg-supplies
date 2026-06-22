import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Heart,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  Moon,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Sun,
  Truck,
  User,
  X
} from 'lucide-react';
import './styles.css';
import { categories, currency, orders, products, testimonials } from './data/catalog';

const navItems = [
  { id: 'home', label: 'Store' },
  { id: 'catalog', label: 'Catalog' },
  { id: 'dashboard', label: 'Customer Portal' },
  { id: 'admin', label: 'Admin Portal' }
];

function App() {
  const [page, setPage] = useState('home');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [query, category]);

  const addToCart = (product) => setCart((items) => [...items, product]);
  const toggleWishlist = (product) =>
    setWishlist((items) =>
      items.some((item) => item.id === product.id) ? items.filter((item) => item.id !== product.id) : [...items, product]
    );

  return (
    <div className={dark ? 'dark' : ''}>
      <main className="min-h-screen bg-slate-50 text-ink transition dark:bg-slate-950 dark:text-slate-100">
        <Header
          page={page}
          setPage={setPage}
          cartCount={cart.length}
          wishlistCount={wishlist.length}
          setAuthOpen={setAuthOpen}
          dark={dark}
          setDark={setDark}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        {page === 'home' && (
          <Home
            setPage={setPage}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {page === 'catalog' && (
          <Catalog
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            products={filteredProducts}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {page === 'dashboard' && <CustomerDashboard cart={cart} wishlist={wishlist} setAuthOpen={setAuthOpen} />}
        {page === 'admin' && <AdminPortal />}
        <Footer />
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        <WhatsAppButton />
      </main>
    </div>
  );
}

function Header({ page, setPage, cartCount, wishlistCount, setAuthOpen, dark, setDark, mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => setPage('home')} className="flex items-center gap-3" aria-label="MediSurg home">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-white shadow-soft">
            <Activity size={24} />
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight">MediSurg</span>
            <span className="block text-xs font-semibold uppercase tracking-wider text-clinical">Supplies</span>
          </span>
        </button>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                page === item.id ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <IconPill icon={<Heart size={18} />} label={wishlistCount} title="Wishlist" />
          <IconPill icon={<ShoppingCart size={18} />} label={cartCount} title="Cart" />
          <button
            onClick={() => setDark(!dark)}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setAuthOpen(true)}
            className="hidden items-center gap-2 rounded-md bg-clinical px-4 py-2 text-sm font-bold text-white shadow-soft sm:flex"
          >
            <LockKeyhole size={17} /> Login
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 lg:hidden dark:border-slate-700"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden dark:border-slate-800 dark:bg-slate-950">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setMobileOpen(false);
              }}
              className="block w-full rounded-md px-3 py-3 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function IconPill({ icon, label, title }) {
  return (
    <span title={title} className="relative grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      {icon}
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clinical px-1 text-[11px] font-bold text-white">
        {label}
      </span>
    </span>
  );
}

function Home({ setPage, addToCart, toggleWishlist, wishlist }) {
  const featured = products.slice(0, 4);
  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,111,182,.12),rgba(22,160,133,.10),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.05fr_.95fr] md:py-16 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-clinical dark:bg-emerald-950/40">
              <ShieldCheck size={17} /> Verified medical procurement platform
            </span>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-ink dark:text-white sm:text-5xl lg:text-6xl">
              MediSurg Supplies
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Source surgical instruments, diagnostic devices, hospital equipment, and daily consumables with secure checkout,
              live inventory alerts, invoices, and order tracking built for healthcare teams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setPage('catalog')} className="rounded-md bg-primary px-6 py-3 font-bold text-white shadow-soft">
                Shop Products
              </button>
              <button onClick={() => setPage('admin')} className="rounded-md border border-slate-300 px-6 py-3 font-bold text-slate-700 dark:border-slate-700 dark:text-slate-100">
                View Admin Portal
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {['2,500+ SKUs', '24h dispatch', 'ISO vendors'].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-sm font-extrabold text-primary dark:text-sky-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-[360px] overflow-hidden rounded-lg shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
              alt="Medical professional preparing surgical supplies"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <CategoryBand />
      <ProductSection title="Featured Products" products={featured} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />
      <ProductSection title="Best Sellers" products={products.slice(4)} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function CategoryBand() {
  return (
    <section className="border-y border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-clinical">Product Categories</p>
            <h2 className="text-2xl font-black">Everything for clinical procurement</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <Package className="mb-4 text-primary" />
              <h3 className="font-bold">{item}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Certified products with traceable vendor documentation.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection(props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-black">{props.title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {props.products.map((product) => (
          <ProductCard key={product.id} product={product} {...props} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, addToCart, toggleWishlist, wishlist }) {
  const liked = wishlist.some((item) => item.id === product.id);
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-3 py-1 text-xs font-bold text-primary">{product.badge}</span>
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md ${liked ? 'bg-rose-500 text-white' : 'bg-white text-slate-700'}`}
          aria-label="Add to wishlist"
        >
          <Heart size={17} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-clinical">{product.category}</p>
        <h3 className="mt-2 min-h-12 text-base font-extrabold leading-6">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-amber-500">
          <Star size={16} fill="currentColor" /> <span className="font-bold text-slate-600 dark:text-slate-300">{product.rating}</span>
        </div>
        <p className="mt-3 text-xl font-black text-primary dark:text-sky-300">{currency(product.price)}</p>
        <p className={`mt-1 text-sm font-semibold ${product.stock < 25 ? 'text-amber-600' : 'text-clinical'}`}>
          {product.stock < 25 ? `Only ${product.stock} left` : `${product.stock} available`}
        </p>
        <ul className="mt-4 space-y-1 text-sm text-slate-500 dark:text-slate-400">
          {product.specs.map((spec) => (
            <li key={spec} className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-clinical" /> {spec}
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={() => addToCart(product)} className="rounded-md bg-primary px-3 py-2 text-sm font-bold text-white">
            Add to Cart
          </button>
          <button onClick={() => addToCart(product)} className="rounded-md border border-clinical px-3 py-2 text-sm font-bold text-clinical">
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

function Catalog({ query, setQuery, category, setCategory, products: visibleProducts, addToCart, toggleWishlist, wishlist }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div>
          <h1 className="text-3xl font-black">Product Catalog</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Search, filter, compare specs, and order medical supplies.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-bold text-slate-500">Stock Alerts</p>
          <p className="mt-1 text-2xl font-black text-amber-600">3 low stock items</p>
        </div>
      </div>
      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_260px]">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <Search className="text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, categories, or specs"
            className="w-full bg-transparent outline-none"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ))}
      </div>
    </section>
  );
}

function CustomerDashboard({ cart, wishlist, setAuthOpen }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-clinical">Customer Portal</p>
          <h1 className="text-3xl font-black">Account, orders, wishlist, and support</h1>
        </div>
        <button onClick={() => setAuthOpen(true)} className="rounded-md bg-primary px-5 py-3 font-bold text-white">
          Secure Login / Register
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<ShoppingCart />} label="Cart Items" value={cart.length} />
        <Metric icon={<Heart />} label="Wishlist" value={wishlist.length} />
        <Metric icon={<Truck />} label="Active Orders" value="2" />
        <Metric icon={<Bell />} label="Notifications" value="5" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <Panel title="Order History & Tracking">
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="grid gap-3 rounded-lg border border-slate-200 p-4 sm:grid-cols-4 dark:border-slate-800">
                <span className="font-bold">{order.id}</span>
                <span>{order.date}</span>
                <span>{currency(order.total)}</span>
                <span className="font-bold text-clinical">{order.status}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Profile & Support">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <InfoLine icon={<User />} text="Profile management and saved addresses" />
            <InfoLine icon={<CreditCard />} text="Secure Razorpay, Stripe, UPI, and card checkout" />
            <InfoLine icon={<ClipboardList />} text="Invoices, return requests, and support tickets" />
            <InfoLine icon={<Mail />} text="Email verification and order notifications" />
          </div>
        </Panel>
      </div>
    </section>
  );
}

function AdminPortal() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-clinical">Admin Portal</p>
          <h1 className="text-3xl font-black">Operations dashboard</h1>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold dark:border-slate-800 dark:bg-slate-900">
          Admin access protected by JWT and role middleware
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<BarChart3 />} label="Total Revenue" value={currency(1845200)} />
        <Metric icon={<ClipboardList />} label="Total Orders" value="1,284" />
        <Metric icon={<User />} label="Customers" value="786" />
        <Metric icon={<Package />} label="Products" value="2,548" />
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
        <Panel title="Sales Analytics">
          <div className="flex h-72 items-end gap-3">
            {[54, 72, 46, 88, 64, 94, 78, 90].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-gradient-to-t from-primary to-clinical" style={{ height: `${height}%` }} />
                <span className="text-xs font-bold text-slate-500">D{index + 1}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Management Console">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Add / edit / delete products',
              'Upload multiple images via Cloudinary',
              'Manage categories and bulk imports',
              'Inventory tracking and low stock alerts',
              'Process orders and returns',
              'Generate invoices',
              'Customer support management',
              'Homepage, SEO, and testimonials'
            ].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 p-4 text-sm font-semibold dark:border-slate-800">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Recent Orders" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-950">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="p-3 font-bold">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{currency(order.total)}</td>
                  <td className="p-3 text-clinical">{order.status}</td>
                  <td className="p-3">
                    <button className="rounded-md bg-primary px-3 py-2 text-xs font-bold text-white">Update Status</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-sky-50 text-primary dark:bg-sky-950/50 dark:text-sky-300">
        {icon}
      </div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function Panel({ title, children, className = '' }) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      <h2 className="mb-5 text-xl font-black">{title}</h2>
      {children}
    </section>
  );
}

function InfoLine({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-emerald-50 text-clinical dark:bg-emerald-950/40">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-12 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-black">Trusted by healthcare teams</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.name} className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <blockquote className="text-slate-600 dark:text-slate-300">"{item.quote}"</blockquote>
              <figcaption className="mt-5">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-clinical">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-primary p-6 text-white shadow-soft md:flex md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="text-2xl font-black">Get stock alerts and procurement offers</h2>
          <p className="mt-2 text-sky-100">Subscribe for low-stock notices, new product launches, and hospital supply updates.</p>
        </div>
        <form className="mt-5 flex gap-2 md:mt-0">
          <input type="email" placeholder="procurement@hospital.com" className="min-w-0 rounded-md px-4 py-3 text-ink outline-none" />
          <button className="rounded-md bg-clinical px-5 py-3 font-bold">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

function AuthModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-soft dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-black">Secure Account Access</h2>
            <p className="text-sm text-slate-500">Customer login, registration, forgot password, and email verification flow.</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 dark:border-slate-700">
            <X />
          </button>
        </div>
        <div className="grid gap-0 md:grid-cols-2">
          <form className="space-y-4 p-5">
            <h3 className="font-black">Login</h3>
            <input className="field" type="email" placeholder="Email address" />
            <input className="field" type="password" placeholder="Password" />
            <button className="w-full rounded-md bg-primary py-3 font-bold text-white">Login Securely</button>
            <button type="button" className="text-sm font-bold text-primary">Forgot password?</button>
          </form>
          <form className="space-y-4 bg-slate-50 p-5 dark:bg-slate-950">
            <h3 className="font-black">Register</h3>
            <input className="field" placeholder="Full name" />
            <input className="field" type="email" placeholder="Email address" />
            <input className="field" type="password" placeholder="Create password" />
            <button className="w-full rounded-md bg-clinical py-3 font-bold text-white">Create Account</button>
            <p className="text-xs text-slate-500">Verification email is sent automatically after signup.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999?text=Hello%20MediSurg%20Supplies"
      className="fixed bottom-5 right-5 z-30 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-soft"
      target="_blank"
      rel="noreferrer"
    >
      WhatsApp Chat
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 text-sm text-slate-600 sm:px-6 md:grid-cols-4 lg:px-8 dark:text-slate-300">
        <div>
          <p className="text-lg font-black text-ink dark:text-white">MediSurg Supplies</p>
          <p className="mt-2">Professional surgical and medical product procurement.</p>
        </div>
        <div>
          <p className="font-bold text-ink dark:text-white">Contact</p>
          <p className="mt-2">support@medisurgsupplies.com</p>
          <p>+91 99999 99999</p>
        </div>
        <div>
          <p className="font-bold text-ink dark:text-white">Compliance</p>
          <p className="mt-2">GST invoices, verified vendors, traceable batches.</p>
        </div>
        <div>
          <p className="font-bold text-ink dark:text-white">Payments</p>
          <p className="mt-2">Razorpay, Stripe, cards, UPI, and net banking.</p>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
