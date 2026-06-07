'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added,   setAdded]   = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      quantity: 1,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="product-card group block"
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: '220px', background: 'var(--muted)' }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ fontSize: '3rem', opacity: 0.25 }}
          >
            📦
          </div>
        )}

        {product.stock === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(250,250,248,0.85)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: 'var(--muted-fg)',
              }}
            >
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.63rem',
            color: 'var(--primary)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {product.category}
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--foreground)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
            }}
          >
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: added ? 'var(--primary)' : 'var(--foreground)',
              color:      'var(--background)',
              fontFamily: 'var(--font-body)',
              fontSize:   '0.78rem',
              border:     'none',
              cursor:     product.stock === 0 ? 'not-allowed' : 'pointer',
              opacity:    product.stock === 0 ? 0.4 : 1,
            }}
            onMouseEnter={e => { if (!added) e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            <ShoppingBag size={13} />
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  );
}
