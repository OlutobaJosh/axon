'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/lib/supabase';

const WORDS = ['Precision.', 'Performance.', 'Power.', 'Perfection.'];

const STATS = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '200+', label: 'Products' },
  { value: '4.9★', label: 'Avg. Rating' },
];

const CARD_POSITIONS = [
  { x: '72%', y: '18%', delay: 0.4 },
  { x: '76%', y: '58%', delay: 0.65 },
  { x: '4%',  y: '58%', delay: 0.85 },
];

const CATEGORY_ICONS: Record<string, string> = {
  Audio:       '🎧',
  Cables:      '🔌',
  Chargers:    '⚡',
  Cases:       '💼',
  Displays:    '🖥️',
  Accessories: '⌨️',
};

function FloatingCard({
  product,
  position,
}: {
  product: Product;
  position: (typeof CARD_POSITIONS)[0];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: position.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(156,124,82,0.18)',
        borderRadius: '16px',
        padding: '14px 18px',
        minWidth: '170px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(156,124,82,0.08)',
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.5 + position.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '1.25rem' }}>
            {CATEGORY_ICONS[product.category] ?? '📦'}
          </span>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--foreground)',
                lineHeight: 1.2,
                maxWidth: '110px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.63rem',
                color: 'var(--muted-fg)',
              }}
            >
              {product.category}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--primary)',
            }}
          >
            ${product.price.toFixed(2)}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={10} fill="#9c7c52" stroke="none" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                color: 'var(--muted-fg)',
                fontWeight: 500,
              }}
            >
              4.9
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnimatedBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Warm radial blobs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          right: '-10%',
          top: '-15%',
          width: '65vw',
          height: '65vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(232,223,208,0.55) 0%, rgba(250,250,248,0) 70%)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          left: '-15%',
          bottom: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(211,194,172,0.38) 0%, rgba(250,250,248,0) 65%)',
        }}
      />

      {/* Subtle grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035 }}
      >
        <defs>
          <pattern id="axon-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#9c7c52" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#axon-grid)" />
      </svg>

      {/* Rotating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          right: '28%',
          top: '10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px solid rgba(156,124,82,0.1)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          right: '26%',
          top: '8%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          border: '1px solid rgba(156,124,82,0.06)',
        }}
      />
    </div>
  );
}

interface HeroProps {
  featuredProducts: Product[];
}

export default function Hero({ featuredProducts }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(((e.clientX - cx) / rect.width) * 18);
    mouseY.set(((e.clientY - cy) / rect.height) * 12);
  }

  // Use up to 3 featured products for floating cards
  const floatProducts = featuredProducts.slice(0, 3);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        paddingTop: '64px',
      }}
    >
      <AnimatedBackground />

      {/* Floating product cards — desktop only, with mouse parallax */}
      <motion.div
        className="hidden lg:block"
        style={{ x: springX, y: springY }}
      >
        {floatProducts.map((product, i) => (
          <FloatingCard
            key={product.id}
            product={product}
            position={CARD_POSITIONS[i]}
          />
        ))}
      </motion.div>

      {/* Main content */}
      <div
        className="relative w-full max-w-7xl mx-auto px-5 lg:px-10 py-24"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{ background: 'var(--accent)', border: '1px solid var(--border)' }}
          >
            <Zap size={12} style={{ color: 'var(--primary)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                fontWeight: 500,
                color: 'var(--primary)',
                letterSpacing: '0.04em',
              }}
            >
              New arrivals — Summer 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              fontWeight: 700,
              color: 'var(--foreground)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Built for how
            <br />
            you work today.
          </motion.h1>

          {/* Cycling word */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.55 }}
            style={{
              marginTop: '12px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="max-w-md mt-6"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--muted-fg)',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Premium gadgets and accessories, engineered for those who demand more
            from every tool in their life.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-opacity"
              style={{
                background: 'var(--foreground)',
                color: 'var(--background)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link
              href="#categories"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all"
              style={{
                border: '1.5px solid var(--border)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-body)',
                background: 'transparent',
                textDecoration: 'none',
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.55 }}
            className="flex items-center gap-8 mt-14 pt-8"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {STATS.map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--foreground)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    color: 'var(--muted-fg)',
                    marginTop: '2px',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--muted-fg)' }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--primary)' }}
          />
        </motion.div>
      </motion.div>

      {/* Trusted-by strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 border-t px-5 lg:px-10 py-3 flex items-center gap-5 overflow-hidden"
        style={{
          borderColor: 'var(--border)',
          background: 'rgba(250,250,248,0.75)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.63rem',
            color: 'var(--muted-fg)',
            whiteSpace: 'nowrap',
            fontWeight: 500,
            letterSpacing: '0.06em',
          }}
        >
          TRUSTED BY
        </span>
        <div className="flex items-center gap-6 overflow-hidden">
          {['TechRadar', 'The Verge', 'WIRED', 'Engadget', '9to5Mac'].map(brand => (
            <span
              key={brand}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--foreground)',
                opacity: 0.35,
                whiteSpace: 'nowrap',
              }}
            >
              {brand}
            </span>
          ))}
        </div>
        <div
          className="flex items-center gap-1.5 ml-auto"
          style={{ flexShrink: 0 }}
        >
          <Shield size={12} style={{ color: 'var(--primary)' }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              color: 'var(--muted-fg)',
              whiteSpace: 'nowrap',
            }}
          >
            Secure checkout
          </span>
        </div>
      </motion.div>
    </section>
  );
}
