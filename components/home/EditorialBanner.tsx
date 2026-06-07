'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// This section is editorial — update the product/deal details here as needed.
// To make it fully dynamic, pass a "deal" product from page.tsx and replace
// the constants below.
const DEAL = {
  label:       'Deal of the Week',
  title:       'AirMax Pro Headphones — 15% off',
  desc:        'Over-ear wireless with 40-hour battery, active noise cancellation, and premium 40mm drivers. Built for the commute, the studio, and everywhere in between.',
  salePrice:   '161.99',
  origPrice:   '189.99',
  saving:      '$28',
  image:       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  href:        '/products?category=Audio',
};

export default function EditorialBanner() {
  return (
    <section
      className="py-24 px-5 lg:px-10"
      style={{ background: 'var(--secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            minHeight: '420px',
          }}
        >
          {/* Text side */}
          <div className="flex flex-col justify-center px-10 lg:px-14 py-14">
            <span
              className="inline-block px-3 py-1 rounded-full mb-6 self-start"
              style={{
                background: 'var(--accent)',
                color: 'var(--primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {DEAL.label}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--foreground)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              {DEAL.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--muted-fg)',
                lineHeight: 1.75,
                maxWidth: '360px',
                marginBottom: '2rem',
              }}
            >
              {DEAL.desc}
            </p>

            {/* Pricing */}
            <div
              className="flex items-center gap-4 mb-8"
              style={{ flexWrap: 'wrap' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.03em',
                }}
              >
                ${DEAL.salePrice}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--muted-fg)',
                  textDecoration: 'line-through',
                }}
              >
                ${DEAL.origPrice}
              </span>
              <span
                className="px-2 py-1 rounded-md"
                style={{
                  background: '#dcfce7',
                  color: '#166534',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                }}
              >
                Save {DEAL.saving}
              </span>
            </div>

            <Link
              href={DEAL.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm self-start transition-opacity"
              style={{
                background: 'var(--foreground)',
                color: 'var(--background)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Shop the Deal <ArrowRight size={15} />
            </Link>
          </div>

          {/* Image side */}
          <div
            className="relative h-72 lg:h-auto overflow-hidden"
            style={{ background: 'var(--muted)' }}
          >
            <img
              src={DEAL.image}
              alt="AirMax Pro Headphones"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
