'use client';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

const ICONS: Record<string, string> = {
  Audio: '🎧', Cables: '🔌', Chargers: '⚡',
  Cases: '💼', Displays: '🖥️', Accessories: '⌨️',
};

export default function CartSidebar() {
  const { items, count, total, removeItem, updateQty, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="cart-overlay fade-in"
        onClick={() => setIsOpen(false)}
      />
      <div className="cart-drawer slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold" style={{ color: 'var(--dark)' }}>Cart</h2>
            {count > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'var(--gray)', color: 'var(--mid)' }}>
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'var(--gray)', border: 'none', cursor: 'pointer',
              color: 'var(--mid)', width: '32px', height: '32px',
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center' }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <p className="font-medium" style={{ color: 'var(--dark)' }}>
                Your cart is empty
              </p>
              <button onClick={() => setIsOpen(false)} className="btn-secondary text-sm">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-4 py-4"
                  style={{ borderBottom: '1px solid var(--gray)' }}>
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'var(--gray)', fontSize: '2rem' }}>
                    {ICONS[item.category] ?? '📦'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--dark)' }}>
                      {item.name}
                    </p>
                    <p className="text-xs mt-0.5 mb-2" style={{ color: 'var(--light)' }}>
                      {item.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-full"
                        style={{ border: '1px solid var(--border)' }}>
                        <button onClick={() => updateQty(item.id, item.quantity - 1)}
                          style={{ width:'28px', height:'28px', border:'none',
                            background:'none', cursor:'pointer', color:'var(--mid)',
                            borderRadius:'50%', fontSize:'1rem' }}>−</button>
                        <span className="w-6 text-center text-sm font-medium"
                          style={{ color: 'var(--dark)' }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)}
                          style={{ width:'28px', height:'28px', border:'none',
                            background:'none', cursor:'pointer', color:'var(--mid)',
                            borderRadius:'50%', fontSize:'1rem' }}>+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)}
                        style={{ color:'var(--light)', border:'none',
                          background:'none', cursor:'pointer', fontSize:'0.75rem',
                          fontFamily:'inherit' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold flex-shrink-0"
                    style={{ color: 'var(--dark)' }}>
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
              <span className="font-semibold" style={{ color: 'var(--dark)' }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <Link href="/checkout" onClick={() => setIsOpen(false)}
              className="btn-primary w-full"
              style={{ display: 'flex', justifyContent: 'center' }}>
              Checkout →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}