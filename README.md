# Axon — Premium Tech Accessories Store

Full-stack e-commerce storefront built with Next.js 14, Supabase, and Stripe.

## Stack
- **Next.js 14** (App Router)
- **Supabase** (products + orders database)
- **Stripe** (test mode payments)
- **Tailwind CSS** (Apple Store aesthetic)
- **React Context** (cart state with localStorage persistence)

## Pages
| Route | Description |
|---|---|
| `/` | Homepage — hero, categories, featured products, CTA |
| `/products` | All products — search, filter by category |
| `/product/[id]` | Single product — qty selector, add to cart |
| `/checkout` | Checkout — shipping form + Stripe card element |
| `/success` | Order confirmation |

## Setup

### 1. Install
```bash
cd axon
npm install
```

### 2. Environment
```bash
cp .env.example .env.local
```
Fill in your 4 env vars.

### 3. Supabase SQL
Run `supabase-setup.sql` in Supabase SQL Editor.
Creates products + orders tables, RLS policies, and seeds 12 products.

### 4. Run locally
```bash
npm run dev
```

## Deploy to Render
- Build: `npm install && npm run build`
- Start: `npm start`
- Add all 4 env vars in Render dashboard

## Test Stripe Payment
Use card: **4242 4242 4242 4242**
- Expiry: any future date
- CVC: any 3 digits
- Postcode: any

## ENV Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```
