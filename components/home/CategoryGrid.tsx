'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORY_META: Record<string, { icon: string; desc: string }> = {
  Audio:       { icon: '🎧', desc: 'Headphones & earbuds' },
  Cables:      { icon: '🔌', desc: 'Premium braided cables' },
  Chargers:    { icon: '⚡', desc: 'GaN & fast charging' },
  Cases:       { icon: '💼', desc: 'Protection & style' },
  Displays:    { icon: '🖥️', desc: 'Monitor accessories' },
  Accessories: { icon: '⌨️', desc: 'Workspace essentials' },
};

// Ordered display list so they always appear in the same sequence
const CATEGORY_ORDER = ['Audio', 'Cables', 'Chargers', 'Cases', 'Displays', 'Accessories'];

interface CategoryGridProps {
  counts: Record<string, number>;
}

export default function CategoryGrid({ counts }: CategoryGridProps) {
  return (
    <section
      id="categories"
      className="py-24 px-5 lg:px-10"
      style={{ background: 'var(--muted)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
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
            Shop by Category
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
            Everything you need
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORY_ORDER.map((name, i) => {
            const meta = CATEGORY_META[name];
            if (!meta) return null;
            const count = counts[name] ?? 0;

            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/products?category=${name}`}
                  className="flex flex-col items-center text-center p-5 rounded-2xl cursor-pointer transition-shadow hover:shadow-md"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    display: 'flex',
                  }}
                >
                  <span className="text-3xl mb-3">{meta.icon}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      marginBottom: '3px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      color: 'var(--muted-fg)',
                      lineHeight: 1.4,
                      marginBottom: '10px',
                    }}
                  >
                    {meta.desc}
                  </span>
                  {count > 0 && (
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        background: 'var(--accent)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6rem',
                        color: 'var(--primary)',
                        fontWeight: 600,
                      }}
                    >
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
