'use client';
import Link from 'next/link';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const CATEGORY_ICONS: Record<string, string> = {
  Audio:       '🎧',
  Cables:      '🔌',
  Chargers:    '⚡',
  Cases:       '💼',
  Displays:    '🖥️',
  Accessories: '⌨️',
};

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="cart-overlay fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="cart-drawer slide-in">

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} style={{ color: 'var(--foreground)' }} strokeWidth={1.8} />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--foreground)',
              }}
            >
              Your Bag
            </h2>
            {count > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: 'var(--accent)', color: 'var(--primary)' }}
              >
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{
              background: 'var(--muted)',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted-fg)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--muted)')}
          >
            <X size={15} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 py-20">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--muted)' }}
              >
                <ShoppingBag size={26} style={{ color: 'var(--muted-fg)' }} strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    marginBottom: '4px',
                  }}
                >
                  Your bag is empty
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--muted-fg)',
                  }}
                >
                  Add some products to get started
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-secondary text-sm"
                style={{ padding: '10px 20px' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 py-5"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  {/* Icon/image */}
                  <div
                    className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'var(--muted)', fontSize: '1.6rem' }}
                  >
                    {CATEGORY_ICONS[item.category] ?? '📦'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        marginBottom: '2px',
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        color: 'var(--muted-fg)',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 500,
                      }}
                    >
                      {item.category}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center rounded-lg"
                        style={{ border: '1px solid var(--border)' }}
                      >
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg"
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: 'var(--muted-fg)',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--muted)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                        >
                          <Minus size={11} />
                        </button>
                        <span
                          className="w-6 text-center"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            color: 'var(--foreground)',
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg"
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: 'var(--muted-fg)',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--muted)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--muted-fg)',
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#c0392b')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--muted-fg)')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p
                    className="flex-shrink-0"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 flex-shrink-0"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--muted-fg)',
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full"
              style={{ display: 'flex', justifyContent: 'center', fontSize: '0.88rem' }}
            >
              Checkout →
            </Link>
            <p
              className="text-center mt-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                color: 'var(--muted-fg)',
              }}
            >
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
