import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'white' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <p className="font-semibold text-xl mb-3 tracking-tight" style={{ letterSpacing: '-0.02em' }}>axon</p>
            <p className="text-sm leading-relaxed" style={{ color: '#86868b', maxWidth: '280px' }}>
              Premium tech accessories designed for the modern workspace. Built to last, designed to impress.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#86868b' }}>Shop</p>
            <ul className="space-y-2.5">
              {[['/', 'Home'], ['/products', 'All Products']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: '#86868b' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#86868b' }}>Info</p>
            <ul className="space-y-2.5">
              {['Shipping Policy', 'Returns', 'Contact'].map(l => (
                <li key={l}><span className="text-sm" style={{ color: '#86868b' }}>{l}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #333336' }}>
          <p className="text-xs" style={{ color: '#86868b' }}>© {new Date().getFullYear()} Axon. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#86868b' }}>Powered by Next.js · Stripe · Supabase</p>
        </div>
      </div>
    </footer>
  );
}
