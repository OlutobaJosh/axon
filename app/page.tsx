import Link from 'next/link';
import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/shop/ProductCard';
import Footer from '@/components/layout/Footer';

async function getFeatured(): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').eq('featured', true).limit(4);
  return data ?? [];
}

const CATEGORIES = [
  { name: 'Audio',       icon: '🎧', desc: 'Headphones & earbuds' },
  { name: 'Chargers',    icon: '⚡', desc: 'Fast charging solutions' },
  { name: 'Cables',      icon: '🔌', desc: 'Premium braided cables' },
  { name: 'Cases',       icon: '💼', desc: 'Protection & style' },
  { name: 'Displays',    icon: '🖥️', desc: 'Monitor accessories' },
  { name: 'Accessories', icon: '⌨️', desc: 'Workspace essentials' },
];

export default async function HomePage() {
  const featured = await getFeatured();

  return (
    <div style={{ paddingTop: '56px' }}>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: '92vh', background: 'linear-gradient(180deg, #f5f5f7 0%, #ffffff 60%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute pointer-events-none" style={{ width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div className="relative max-w-4xl mx-auto px-6 slide-up">
          <p className="text-sm font-medium mb-4" style={{ color: 'var(--blue)' }}>Introducing Axon ·</p>
          <h1
            className="font-semibold mb-6 tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 1.05, color: 'var(--dark)', letterSpacing: '-0.03em' }}
          >
            Built for how
            <br />
            you work today.
          </h1>
          <p className="text-base mb-10 mx-auto" style={{ color: 'var(--mid)', maxWidth: '480px', lineHeight: 1.7 }}>
            Premium tech accessories, obsessively engineered. Every detail matters — from the braid on the cable to the finish on the case.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/products" className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              Shop now →
            </Link>
            <Link href="#featured" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              See what's new
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1 opacity-30">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--mid)' }}>Scroll</p>
          <div className="w-px h-8" style={{ background: 'var(--mid)' }} />
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-center" style={{ color: 'var(--blue)' }}>Browse</p>
          <h2 className="text-center font-semibold mb-10 tracking-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--dark)', letterSpacing: '-0.02em' }}>
            Shop by category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map(c => (
              <Link
                key={c.name}
                href={`/products?category=${c.name}`}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ background: 'var(--gray)', textDecoration: 'none' }}
              >
                <span className="text-3xl">{c.icon}</span>
                <p className="text-sm font-medium text-center" style={{ color: 'var(--dark)' }}>{c.name}</p>
                <p className="text-xs text-center" style={{ color: 'var(--light)' }}>{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section id="featured" style={{ background: 'var(--gray)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--blue)' }}>New arrivals</p>
              <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--dark)', letterSpacing: '-0.02em' }}>
                Featured products
              </h2>
            </div>
            <Link href="/products" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--blue)' }}>
              View all →
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-16" style={{ color: 'var(--light)' }}>
              <p>No featured products yet. Add some in Supabase!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: '🚀', title: 'Fast Shipping', desc: 'Free delivery on all orders over $50. Ships within 24 hours.' },
            { icon: '🛡️', title: '2-Year Warranty', desc: 'Every product backed by our comprehensive warranty programme.' },
            { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns. No questions asked.' },
          ].map(v => (
            <div key={v.title} className="text-center">
              <span className="text-4xl mb-4 block">{v.icon}</span>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--dark)' }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="font-semibold mb-4 tracking-tight" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: 'white', letterSpacing: '-0.02em' }}>
            Elevate your setup.
          </h2>
          <p className="text-base mb-8 mx-auto" style={{ color: '#86868b', maxWidth: '400px' }}>
            Join thousands of professionals who trust Axon for their workspace.
          </p>
          <Link href="/products" className="btn-primary" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
            Shop the collection →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
