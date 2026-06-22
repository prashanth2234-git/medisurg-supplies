export const categories = [
  'Surgical Instruments',
  'Surgical Gloves',
  'Face Masks',
  'Syringes & Needles',
  'Hospital Equipment',
  'Diagnostic Devices',
  'Medical Consumables',
  'First Aid Products'
];

export const products = [
  {
    id: 'ms-101',
    name: 'German Steel Surgical Instrument Set',
    category: 'Surgical Instruments',
    price: 18999,
    rating: 4.9,
    stock: 42,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=900&q=80',
    specs: ['24-piece sterile kit', 'Autoclavable', 'ISO 13485 supplier'],
    description: 'Precision-grade instruments for operating rooms, emergency care, and speciality clinics.'
  },
  {
    id: 'ms-102',
    name: 'Nitrile Surgical Gloves Box',
    category: 'Surgical Gloves',
    price: 899,
    rating: 4.7,
    stock: 320,
    badge: 'In Stock',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80',
    specs: ['Powder free', 'Latex free', '100 pieces'],
    description: 'High-tactility gloves for sterile medical environments and daily clinical usage.'
  },
  {
    id: 'ms-103',
    name: '3-Ply Medical Face Masks',
    category: 'Face Masks',
    price: 499,
    rating: 4.6,
    stock: 18,
    badge: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=900&q=80',
    specs: ['BFE 98%', '50 masks', 'Adjustable nose clip'],
    description: 'Comfortable disposable masks for hospitals, labs, and visitor protection.'
  },
  {
    id: 'ms-104',
    name: 'Disposable Syringe Pack',
    category: 'Syringes & Needles',
    price: 650,
    rating: 4.8,
    stock: 210,
    badge: 'Recommended',
    image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=80',
    specs: ['Sterile packed', '5 ml', '100 units'],
    description: 'Single-use syringes with smooth plunger action and clear dosage markings.'
  },
  {
    id: 'ms-105',
    name: 'Portable Patient Monitor',
    category: 'Hospital Equipment',
    price: 64500,
    rating: 4.9,
    stock: 12,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80',
    specs: ['ECG, SpO2, NIBP', '8-hour battery', 'Alarm history'],
    description: 'Compact multiparameter monitor for critical care beds, ambulances, and recovery rooms.'
  },
  {
    id: 'ms-106',
    name: 'Digital Blood Pressure Monitor',
    category: 'Diagnostic Devices',
    price: 2799,
    rating: 4.5,
    stock: 76,
    badge: 'Clinic Pick',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=900&q=80',
    specs: ['Large display', 'Memory recall', 'Cuff included'],
    description: 'Accurate upper-arm BP monitoring for clinics, pharmacies, and home-care programs.'
  },
  {
    id: 'ms-107',
    name: 'Sterile Gauze Swab Bundle',
    category: 'Medical Consumables',
    price: 349,
    rating: 4.4,
    stock: 480,
    badge: 'Value Pack',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=80',
    specs: ['8 ply', '100 packs', 'Sterile sealed'],
    description: 'Absorbent gauze swabs for wound dressing, operating rooms, and outpatient care.'
  },
  {
    id: 'ms-108',
    name: 'Emergency First Aid Cabinet',
    category: 'First Aid Products',
    price: 5299,
    rating: 4.7,
    stock: 31,
    badge: 'Workplace Ready',
    image: 'https://images.unsplash.com/photo-1603398938423-e54eab446dde?auto=format&fit=crop&w=900&q=80',
    specs: ['Wall mountable', 'ANSI-ready layout', '120 supplies'],
    description: 'Organized first-aid station for hospitals, offices, schools, and factories.'
  }
];

export const testimonials = [
  {
    name: 'Dr. Neha Raman',
    role: 'Surgical Director, Apex Care',
    quote: 'Reliable stock visibility and fast dispatch have made procurement much calmer for our OR team.'
  },
  {
    name: 'Amit Shah',
    role: 'Hospital Purchase Manager',
    quote: 'The admin controls, invoices, and order tracking are exactly what a medical buyer expects.'
  },
  {
    name: 'Sarah Mathew',
    role: 'Clinic Owner',
    quote: 'Clean catalog, transparent specs, and responsive support. It feels built for healthcare.'
  }
];

export const orders = [
  { id: 'ORD-23091', customer: 'Apex Care Hospital', total: 74500, status: 'Processing', date: '2026-06-20' },
  { id: 'ORD-23088', customer: 'Greenline Clinic', total: 12890, status: 'Shipped', date: '2026-06-19' },
  { id: 'ORD-23081', customer: 'City Diagnostics', total: 42300, status: 'Delivered', date: '2026-06-17' }
];

export const currency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
