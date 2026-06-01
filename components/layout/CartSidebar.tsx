'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format';

export default function CartSidebar() {
  const { items, count, total, removeItem, updateQty, isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />
      <div className="cart-panel">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--border-lt)' }}>
          <div>
            <h2 className="font-semibold text-base" style={{ color: 'var(--text)' }}>Your Cart</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{count} {count === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: '4px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--border)' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Your cart is empty</p>
              <button onClick={closeCart} className="btn-primary text-xs" style={{ padding: '8px 18px' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-3">
                {/* Image */}
                <div className="w-18 h-18 rounded-xl overflow-hidden flex-shrink-0" style={{ width: '72px', height: '72px', background: 'var(--bg-2)' }}>
                  <img src={item.product.image_url} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight truncate" style={{ color: 'var(--text)' }}>{item.product.name}</p>
                  <p className="text-xs mt-0.5 mb-2" style={{ color: 'var(--text-3)' }}>{item.product.category}</p>
                  <div className="flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center gap-1" style={{ background: 'var(--bg-2)', borderRadius: '8px', padding: '2px' }}>
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)} style={{ width: '24px', height: '24px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', fontSize: '1rem' }}>−</button>
                      <span className="mono text-xs w-5 text-center" style={{ color: 'var(--text)' }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} style={{ width: '24px', height: '24px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', fontSize: '1rem' }}>+</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="mono text-sm font-semibold" style={{ color: 'var(--text)' }}>{formatPrice(item.product.price * item.quantity)}</span>
                      <button onClick={() => removeItem(item.product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: '2px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 space-y-3" style={{ borderTop: '1px solid var(--border-lt)' }}>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-2)' }}>Subtotal</span>
              <span className="mono font-semibold text-base" style={{ color: 'var(--text)' }}>{formatPrice(total)}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Shipping & taxes calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart} className="btn-dark w-full" style={{ width: '100%' }}>
              Checkout — {formatPrice(total)}
            </Link>
            <button onClick={closeCart} className="btn-secondary w-full text-sm" style={{ width: '100%' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
