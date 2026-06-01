'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const params = useSearchParams();
  const pid = params.get('pid') ?? '';

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ paddingTop: '56px', background: 'var(--gray)' }}>
      <div className="max-w-md w-full text-center slide-up">
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: '#34c759' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 className="font-semibold mb-3 tracking-tight" style={{ fontSize: '2rem', color: 'var(--dark)', letterSpacing: '-0.02em' }}>
          Order confirmed!
        </h1>
        <p className="text-sm mb-2" style={{ color: 'var(--mid)' }}>
          Thank you for your purchase. We'll send a confirmation to your email shortly.
        </p>

        {pid && (
          <div className="my-6 p-4 rounded-xl" style={{ background: 'white', border: '1px solid var(--border)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--light)' }}>Order reference</p>
            <p className="text-xs font-mono font-medium" style={{ color: 'var(--mid)' }}>{pid.slice(0, 24)}…</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/products" className="btn-secondary">Continue shopping</Link>
        </div>

        <p className="text-xs mt-8" style={{ color: 'var(--light)' }}>
          Ships within 24 hours · Free returns within 30 days
        </p>
      </div>
    </div>
  );
}
