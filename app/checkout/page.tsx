'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Footer from '@/components/layout/Footer';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CARD_STYLE = {
  style: {
    base: {
      fontSize: '15px',
      color: '#1d1d1f',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': { color: '#86868b' },
    },
    invalid: { color: '#ff3b30' },
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', postcode: '', country: '',
  });

  const set = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || items.length === 0) return;
    setError(''); setLoading(true);

    try {
      // Create payment intent
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          customerName: form.name,
          customerEmail: form.email,
          items,
        }),
      });
      const { clientSecret, error: apiErr } = await res.json();
      if (apiErr) { setError(apiErr); setLoading(false); return; }

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: form.name, email: form.email },
        },
      });

      if (result.error) {
        setError(result.error.message ?? 'Payment failed.');
        setLoading(false);
      } else {
        clearCart();
        router.push(`/success?pid=${result.paymentIntent.id}`);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-4xl">🛍️</p>
        <p className="font-medium" style={{ color: 'var(--dark)' }}>Your cart is empty</p>
        <a href="/products" className="btn-primary">Shop now</a>
      </div>
    );
  }

  const ICONS: Record<string, string> = {
    Audio: '🎧', Cables: '🔌', Chargers: '⚡', Cases: '💼', Displays: '🖥️', Accessories: '⌨️',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left — form */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-4 tracking-tight" style={{ color: 'var(--dark)' }}>Contact</h2>
            <div className="space-y-3">
              <input name="name" value={form.name} onChange={set} placeholder="Full name" required className="field" />
              <input name="email" type="email" value={form.email} onChange={set} placeholder="Email address" required className="field" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-4 tracking-tight" style={{ color: 'var(--dark)' }}>Shipping</h2>
            <div className="space-y-3">
              <input name="address" value={form.address} onChange={set} placeholder="Address" required className="field" />
              <div className="grid grid-cols-2 gap-3">
                <input name="city" value={form.city} onChange={set} placeholder="City" required className="field" />
                <input name="postcode" value={form.postcode} onChange={set} placeholder="Postcode" required className="field" />
              </div>
              <input name="country" value={form.country} onChange={set} placeholder="Country" required className="field" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-4 tracking-tight" style={{ color: 'var(--dark)' }}>Payment</h2>
            <div className="p-4 rounded-xl" style={{ border: '1px solid var(--border)' }}>
              <CardElement options={CARD_STYLE} />
            </div>
            <p className="text-xs mt-2 flex items-center gap-1" style={{ color: 'var(--light)' }}>
              🔒 Secured by Stripe. Test card: 4242 4242 4242 4242
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl text-sm" style={{ background: '#fff2f2', color: '#ff3b30', border: '1px solid #ffc9c9' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading || !stripe} className="btn-primary w-full" style={{ padding: '16px', fontSize: '0.95rem' }}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'white', borderTopColor: 'transparent' }} />
                Processing…
              </span>
            ) : `Pay $${total.toFixed(2)}`}
          </button>
        </div>

        {/* Right — summary */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-6 sticky" style={{ top: '80px', background: 'var(--gray)' }}>
            <h2 className="font-semibold mb-5 tracking-tight" style={{ color: 'var(--dark)' }}>Order Summary</h2>
            <div className="space-y-3 mb-5">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'white' }}>
                    <span className="text-lg">{ICONS[item.category] ?? '📦'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--dark)' }}>{item.name}</p>
                    <p className="text-xs" style={{ color: 'var(--light)' }}>Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold flex-shrink-0" style={{ color: 'var(--dark)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex justify-between text-sm" style={{ color: 'var(--mid)' }}>
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: 'var(--mid)' }}>
                <span>Shipping</span><span style={{ color: '#34c759' }}>Free</span>
              </div>
              <div className="flex justify-between font-semibold pt-2" style={{ borderTop: '1px solid var(--border)', color: 'var(--dark)' }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div style={{ background: 'var(--gray)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--dark)', letterSpacing: '-0.02em' }}>
            Checkout
          </h1>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <Footer />
    </div>
  );
}
