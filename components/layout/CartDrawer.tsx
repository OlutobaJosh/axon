'use client';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay fade-in" onClick={() => setIsOpen(false)} />
      <div className="cart-drawer slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold" style={{ color: 'var(--dark)' }}>Cart</h2>
            {count > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--gray)', color: 'var(--mid)' }}>
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'var(--gray)', border: 'none', cursor: 'pointer', color: 'var(--mid)' }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--gray)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--light)' }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="font-medium mb-1" style={{ color: 'var(--dark)' }}>Your cart is empty</p>
                <p className="text-sm" style={{ color: 'var(--light)' }}>Add some products to get started</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="btn-secondary text-sm">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-4 py-4" style={{ borderBottom: '1px solid var(--gray)' }}>
                  {/* Image placeholder */}
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: 'var(--gray)' }}>
                    <span className="text-2xl">📦</span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--dark)' }}>{item.name}</p>
                    <p className="text-xs mt-0.5 mb-2" style={{ color: 'var(--light)' }}>{item.category}</p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-full" style={{ border: '1px solid var(--border)' }}>
                        <button onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm transition-colors hover:bg-gray-50 rounded-full"
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--mid)' }}>
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium" style={{ color: 'var(--dark)' }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm transition-colors hover:bg-gray-50 rounded-full"
                          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--mid)' }}>
                          +
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)}
                        className="text-xs transition-colors hover:text-red-500"
                        style={{ color: 'var(--light)', border: 'none', background: 'none', cursor: 'pointer' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                  {/* Price */}
                  <p className="text-sm font-semibold flex-shrink-0" style={{ color: 'var(--dark)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: 'var(--mid)' }}>Subtotal</span>
              <span className="font-semibold" style={{ color: 'var(--dark)' }}>${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-sm"
              style={{ display: 'flex' }}
            >
              Checkout →
            </Link>
            <p className="text-center text-xs mt-3" style={{ color: 'var(--light)' }}>
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
