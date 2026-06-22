# MediSurg Supplies

MediSurg Supplies is a full-stack medical and surgical e-commerce project with a React customer storefront, customer portal, admin portal, Express API, MongoDB schemas, JWT authentication, Cloudinary-ready image upload, and Razorpay/Stripe payment endpoints.

## Features

- Customer registration, login, forgot password, email verification endpoint, profile-ready schema
- Medical storefront with hero banner, categories, featured products, best sellers, testimonials, newsletter, WhatsApp chat
- Product search, category filters, product specs, ratings, wishlist, cart, buy-now actions
- Customer portal for profile, saved addresses, wishlist, orders, tracking, invoices, returns, support tickets
- Admin dashboard with revenue, order, customer, product, inventory, reports, customer blocking, and website settings APIs
- MongoDB models for users, products, orders, and support tickets
- JWT protected routes with admin role middleware
- Razorpay and Stripe payment creation endpoints
- Cloudinary-ready multi-image upload endpoint
- Responsive light/dark UI built with React, Tailwind CSS, and lucide-react

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── frontend
│   └── src
│       ├── data
│       │   └── catalog.js
│       ├── main.jsx
│       └── styles.css
└── backend
    └── src
        ├── config
        ├── controllers
        ├── data
        ├── middleware
        ├── models
        ├── routes
        └── server.js
```

## Setup

1. Install Node.js 20+ and MongoDB.
2. Install dependencies:

```bash
npm install
```

3. Create environment variables:

```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI, JWT secret, Cloudinary credentials, Razorpay keys, and Stripe secret.
5. Seed sample data:

```bash
npm run seed
```

6. Start the backend:

```bash
npm run server
```

7. In another terminal, start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Demo Accounts

- Admin: `admin@medisurgsupplies.com` / `Admin@12345`
- Customer: `customer@medisurgsupplies.com` / `Customer@12345`

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-email`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/products` admin
- `PUT /api/products/:id` admin
- `DELETE /api/products/:id` admin
- `POST /api/orders`
- `GET /api/orders/mine`
- `GET /api/orders` admin
- `PATCH /api/orders/:id/status` admin
- `POST /api/orders/:id/return`
- `GET /api/admin/dashboard` admin
- `GET /api/admin/customers` admin
- `PATCH /api/admin/customers/:id/block` admin
- `GET /api/admin/reports/sales` admin
- `PUT /api/admin/website/settings` admin
- `POST /api/payments/razorpay/order`
- `POST /api/payments/stripe/intent`

## Production Notes

- Replace demo credentials and use a strong `JWT_SECRET`.
- Add transactional email provider integration for verification, password reset, invoices, and order notifications.
- Complete Cloudinary streaming in `POST /api/products/:id/images` using your preferred upload helper.
- Add payment webhook verification for Razorpay and Stripe before marking orders paid.
- Serve the Vite build from a CDN or static host and deploy the Express API separately.
