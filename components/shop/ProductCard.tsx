'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/lib/supabase';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, setIsOpen } = useCart();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category,
    });
    setIsOpen(true);
  }

  return (
    <Link href={`/product/${product.id}`} className="product-card group block">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px', background: 'var(--gray)' }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.4s ease',
            }}
            className="group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">📦</span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.8)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--mid)' }}>
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-medium text-sm leading-tight mb-1"
          style={{ color: 'var(--dark)' }}>
          {product.name}
        </h3>
        <p className="pill mb-3">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="font-semibold" style={{ color: 'var(--dark)' }}>
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="btn-primary text-xs"
            style={{ padding: '7px 16px' }}
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}