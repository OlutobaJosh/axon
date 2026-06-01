-- ── 1. TABLES ──────────────────────────────────────────────────

create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric not null,
  category    text not null,
  image_url   text default '',
  stock       integer default 10,
  featured    boolean default false,
  created_at  timestamptz default now()
);

create table if not exists orders (
  id                 uuid primary key default gen_random_uuid(),
  customer_name      text not null,
  customer_email     text not null,
  amount_total       numeric not null,
  status             text default 'pending',
  stripe_payment_id  text,
  created_at         timestamptz default now()
);

-- ── 2. RLS ─────────────────────────────────────────────────────

alter table products enable row level security;
alter table orders   enable row level security;

create policy "Public read products" on products for select using (true);
create policy "Public insert orders" on orders  for insert with check (true);

-- ── 3. SEED — 12 Products ──────────────────────────────────────

insert into products (name, description, price, category, stock, featured) values

-- Audio (2)
('AirMax Pro Headphones',
 'Over-ear wireless headphones with 40-hour battery life, active noise cancellation, and premium 40mm drivers. Foldable design for travel.',
 189.99, 'Audio', 15, true),

('NovaBuds Elite',
 'True wireless earbuds with hybrid ANC, 8-hour playtime (32h with case), IPX5 water resistance, and custom EQ via companion app.',
 129.99, 'Audio', 20, false),

-- Cables (2)
('ProBraid USB-C Cable 2m',
 'Double-braided nylon USB-C to USB-C cable. 240W power delivery, 40Gbps data transfer, 4K@60Hz video output. Rated for 30,000 bends.',
 34.99, 'Cables', 50, false),

('MagLink Charging Cable',
 'Magnetic USB-C cable with 360° connector. 140W fast charging, automatic alignment, and a satisfying magnetic click every time.',
 44.99, 'Cables', 35, true),

-- Chargers (2)
('NanoCharge 65W GaN',
 'Gallium nitride charger smaller than your thumb. 65W USB-C PD charges a MacBook Pro in under 90 minutes. Universal voltage 100–240V.',
 69.99, 'Chargers', 30, true),

('DualPad Wireless Charger',
 'Dual-coil Qi2 wireless charging pad. Simultaneously charges phone at 15W and earbuds at 5W. Ultra-slim 4mm profile.',
 59.99, 'Chargers', 25, false),

-- Cases (2)
('SlimShell MacBook Sleeve',
 'Full-grain leather MacBook sleeve with microfibre interior. Fits MacBook Pro 14" and 16". Ages beautifully with daily use.',
 89.99, 'Cases', 18, false),

('ArmorShell iPhone Case',
 'Dual-layer protection with military-grade drop rating (MIL-STD-810H). Raised camera and screen bezels. MagSafe compatible.',
 49.99, 'Cases', 40, false),

-- Displays (2)
('LumiBar Monitor Light',
 'Asymmetric optical design illuminates your desk without screen glare. Touch dimmer, adjustable colour temperature (2700–6500K), USB-C powered.',
 79.99, 'Displays', 22, true),

('ClearShield Privacy Filter 27"',
 'Premium micro-louvre privacy filter for 27" monitors. Blocks side-view beyond 60°. Anti-glare coating reduces eye strain.',
 69.99, 'Displays', 12, false),

-- Accessories (2)
('HexDesk Mat XL',
 'Full-desk mat (90×45cm) in merino wool-blend surface. Stitched edges, non-slip silicone base. Elevates any workspace instantly.',
 59.99, 'Accessories', 28, false),

('Apex USB-C Hub 11-in-1',
 '11 ports including 4K HDMI, 2× USB-A 3.0, 2× USB-C PD, SD/microSD, Ethernet, and audio. Plug-and-play on Mac and Windows.',
 99.99, 'Accessories', 16, false);
