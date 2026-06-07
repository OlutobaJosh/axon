'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/lib/supabase';

const WORDS = ['Precision.', 'Performance.', 'Power.', 'Perfection.'];

const STATS = [
  { value: '50K+', label: 'Customers' },
  { value: '200+', label: 'Products' },
  { value: '4.9★', label: 'Rating' },
];

const CATEGORY_ICONS: Record<string, string> = {
  Audio: '🎧', Cables: '🔌', Chargers: '⚡',
  Cases: '💼', Displays: '🖥️', Accessories: '⌨️',
};

/* ── Right-side product showcase ─────────────────────────── */

function ProductShowcase({ products }: { products: Product[] }) {
  const [main, second, third] = products;
  if (!main) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.45, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', width: '100%' }}
    >
      {/* Soft background glow behind the cards */}
      <div style={{
        position: 'absolute', inset: '-40px',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(232,223,208,0.7) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Main featured product card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          position: 'relative', zIndex: 1,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '14px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* Product image */}
        <div style={{
          height: '200px', borderRadius: '14px',
          background: 'var(--muted)', marginBottom: '18px',
          overflow: 'hidden', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          {main.image_url ? (
            <img src={main.image_url} alt={main.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '4.5rem', opacity: 0.45 }}>
              {CATEGORY_ICONS[main.category] ?? '📦'}
            </span>
          )}
        </div>

        {/* Category label */}
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.6rem',
          color: 'var(--primary)', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          display: 'block', marginBottom: '4px',
        }}>
          {main.category}
        </span>

        {/* Name + price row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600,
              color: 'var(--foreground)', letterSpacing: '-0.02em',
              lineHeight: 1.2, marginBottom: '6px',
            }}>
              {main.name}
            </div>
            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={11} fill="#9c7c52" stroke="none" />
              ))}
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.68rem',
                color: 'var(--muted-fg)', marginLeft: '5px',
              }}>
                4.9 · 124 reviews
              </span>
            </div>
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
            color: 'var(--foreground)', letterSpacing: '-0.03em', flexShrink: 0,
          }}>
            ${main.price.toFixed(2)}
          </span>
        </div>
      </motion.div>

      {/* Two secondary mini-cards */}
      {(second || third) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', position: 'relative', zIndex: 1 }}>
          {[second, third].filter(Boolean).map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'var(--muted)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '1.3rem' }}>
                    {CATEGORY_ICONS[p.category] ?? '📦'}
                  </span>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 600,
                  color: 'var(--foreground)', letterSpacing: '-0.01em',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700,
                  color: 'var(--primary)', marginTop: '2px',
                }}>
                  ${p.price.toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ── Main Hero ───────────────────────────────────────────── */

interface HeroProps {
  featuredProducts: Product[];
}

export default function Hero({ featuredProducts }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        paddingTop: '64px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Warm radial blobs — CSS only, no JS animation = zero lag */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-8%',
        width: '55vw', height: '55vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,223,208,0.55) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-12%',
        width: '45vw', height: '45vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(211,194,172,0.32) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Two-column layout */}
      <div
        className="w-full max-w-7xl mx-auto px-5 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* ── Left: text content ── */}
        <div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '6px 14px', borderRadius: '999px', marginBottom: '28px',
              background: 'var(--accent)', border: '1px solid var(--border)',
            }}
          >
            <Zap size={11} style={{ color: 'var(--primary)' }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem',
              fontWeight: 500, color: 'var(--primary)', letterSpacing: '0.04em',
            }}>
              New arrivals — Summer 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
              fontWeight: 700, color: 'var(--foreground)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              marginBottom: '10px',
            }}
          >
            Built for how<br />you work today.
          </motion.h1>

          {/* Cycling word */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            style={{ height: '52px', overflow: 'hidden', marginBottom: '20px' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 38, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -38, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                  fontWeight: 700, color: 'var(--primary)',
                  letterSpacing: '-0.03em', lineHeight: 1.1,
                }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'var(--muted-fg)', lineHeight: 1.7,
              maxWidth: '420px', marginBottom: '28px',
            }}
          >
            Premium gadgets and accessories, engineered for those who demand
            more from every tool in their life.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}
          >
            <Link
              href="/products"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 26px', borderRadius: '12px',
                background: 'var(--foreground)', color: 'var(--background)',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                fontWeight: 500, textDecoration: 'none',
                transition: 'opacity 0.18s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Shop Now <ArrowRight size={15} />
            </Link>
            <Link
              href="#categories"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 26px', borderRadius: '12px',
                border: '1.5px solid var(--border)', color: 'var(--foreground)',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                fontWeight: 500, textDecoration: 'none', background: 'transparent',
                transition: 'background 0.18s, border-color 0.18s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              Browse Categories
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.5 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '28px',
              paddingTop: '24px', borderTop: '1px solid var(--border)',
            }}
          >
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.35rem',
                  fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.02em',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                  color: 'var(--muted-fg)', marginTop: '1px',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: product showcase — desktop only ── */}
        <div className="hidden lg:block">
          <ProductShowcase products={featuredProducts} />
        </div>
      </div>

      {/* Trusted-by strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          borderTop: '1px solid var(--border)',
          background: 'rgba(250,250,248,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', gap: '18px',
          padding: '10px 20px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.6rem',
          color: 'var(--muted-fg)', fontWeight: 600,
          letterSpacing: '0.1em', whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}>
          Trusted by
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', overflow: 'hidden' }}>
          {['TechRadar', 'The Verge', 'WIRED', 'Engadget', '9to5Mac'].map(brand => (
            <span key={brand} style={{
              fontFamily: 'var(--font-display)', fontSize: '0.78rem',
              fontWeight: 600, color: 'var(--foreground)',
              opacity: 0.32, whiteSpace: 'nowrap',
            }}>
              {brand}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto', flexShrink: 0 }}>
          <Shield size={11} style={{ color: 'var(--primary)' }} />
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.62rem',
            color: 'var(--muted-fg)', whiteSpace: 'nowrap',
          }}>
            Secure checkout
          </span>
        </div>
      </motion.div>
    </section>
  );
}
