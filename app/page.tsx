import Link from 'next/link';
import { supabase, Product } from '@/lib/supabase';

import Hero            from '@/components/home/Hero';
import TrustBadges     from '@/components/home/TrustBadges';
import CategoryGrid    from '@/components/home/CategoryGrid';
import EditorialBanner from '@/components/home/EditorialBanner';
import ProductCard     from '@/components/shop/ProductCard';
import Footer          from '@/components/layout/Footer';

/* ── Data fetching ─────────────────────────────── */

async function getFeatured(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(4);
  return data ?? [];
}

async function getCategoryCounts(): Promise<Record<string, number>> {
  const { data } = await supabase.from('products').select('category');
  const counts: Record<string, number> = {};
  (data ?? []).forEach(p => {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  });
  return counts;
}

/* ── Featured section (server wrapper) ─────────── */

function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <section
      id="products"
      className="py-24 px-5 lg:px-10"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Featured Products
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--foreground)',
                letterSpacing: '-0.03em',
              }}
            >
              The Edit
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--primary)',
              textDecoration: 'none',
            }}
          >
            View all products →
          </Link>
        </div>

        {products.length === 0 ? (
          <div
            className="text-center py-20"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--muted-fg)',
              fontSize: '0.9rem',
            }}
          >
            No featured products yet — mark some as featured in Supabase.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────── */

export default async function HomePage() {
  const [featured, counts] = await Promise.all([
    getFeatured(),
    getCategoryCounts(),
  ]);

  return (
    <div>
      {/* Hero receives real products for floating cards */}
      <Hero featuredProducts={featured} />

      <TrustBadges />

      <CategoryGrid counts={counts} />

      <FeaturedSection products={featured} />

      <EditorialBanner />

      <Footer />
    </div>
  );
}
