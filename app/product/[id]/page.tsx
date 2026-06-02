'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, Product } from '@/lib/supabase';
import { useCart } from '@/hooks/useCart';
import Footer from '@/components/layout/Footer';

const ICONS: Record<string, string> = {
  Audio: '🎧', Cables: '🔌', Chargers: '⚡', Cases: '💼', Displays: '🖥️', Accessories: '⌨️',
};

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase.from('products').select('*').eq('id', id).single()
      .then(({ data }) => { setProduct(data); setLoading(false); });
  }, [id]);

  function handleAdd() {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, quantity: qty, category: product.category });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '56px' }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--blue)', borderTopColor: 'transparent' }} />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ paddingTop: '56px' }}>
      <p className="text-4xl">🔍</p>
      <p className="font-medium" style={{ color: 'var(--dark)' }}>Product not found</p>
      <button onClick={() => router.push('/products')} className="btn-primary">Back to products</button>
    </div>
  );

  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--light)' }}>
          <button onClick={() => router.push('/')} className="hover:text-black transition-colors" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--light)', fontFamily: 'inherit', fontSize: 'inherit' }}>Home</button>
          <span>/</span>
          <button onClick={() => router.push('/products')} className="hover:text-black transition-colors" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--light)', fontFamily: 'inherit', fontSize: 'inherit' }}>Products</button>
          <span>/</span>
          <span style={{ color: 'var(--dark)' }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
<div>
  <div className="rounded-3xl overflow-hidden"
    style={{ aspectRatio: '1', background: 'var(--gray)' }}>
    {product.image_url ? (
      <img
        src={product.image_url}
        alt={product.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-8xl opacity-20">
        📦
      </div>
    )}
  </div>
</div>

          {/* Info */}
          <div className="lg:sticky" style={{ top: '80px' }}>
            <span className="pill mb-3 inline-block">{product.category}</span>
            <h1 className="font-semibold mb-3 tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--dark)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {product.name}
            </h1>
            <p className="font-semibold mb-6" style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--mid)' }}>
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: product.stock > 0 ? '#34c759' : '#ff3b30' }} />
              <span className="text-sm" style={{ color: 'var(--mid)' }}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Qty + Add to cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium" style={{ color: 'var(--dark)' }}>Qty</label>
                  <div className="flex items-center rounded-full" style={{ border: '1px solid var(--border)' }}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-gray-50 rounded-full"
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--mid)' }}>
                      −
                    </button>
                    <span className="w-8 text-center font-medium" style={{ color: 'var(--dark)' }}>{qty}</span>
                    <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-gray-50 rounded-full"
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--mid)' }}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAdd}
                  className="btn-primary w-full"
                  style={{ padding: '16px', fontSize: '0.95rem' }}
                >
                  {added ? '✓ Added to cart!' : 'Add to cart'}
                </button>
              </div>
            )}

            {/* Features */}
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              <ul className="space-y-3">
                {['Free shipping on orders over $50', '2-year warranty included', '30-day easy returns'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--mid)' }}>
                    <span style={{ color: 'var(--blue)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
