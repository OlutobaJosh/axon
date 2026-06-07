'use client';
import Link from 'next/link';

const SHOP    = ['New Arrivals', 'Audio', 'Chargers', 'Cables', 'Cases', 'Displays', 'Accessories'];
const COMPANY = ['About Axon', 'Careers', 'Press', 'Sustainability'];
const SUPPORT = ['Help Centre', 'Shipping', 'Returns', 'Warranty', 'Contact'];

export default function Footer() {
  return (
    <footer
      className="border-t pt-14 pb-8 px-5 lg:px-10"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand + newsletter */}
          <div className="col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--foreground)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    color: 'var(--background)',
                    fontWeight: 700,
                  }}
                >
                  AX
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.03em',
                }}
              >
                axon
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: 'var(--muted-fg)',
                lineHeight: 1.75,
                maxWidth: '260px',
              }}
            >
              Premium gadgets and accessories for the way you work, create, and live — engineered
              for everyday excellence.
            </p>

            {/* Newsletter */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                }}
              >
                Get deals in your inbox
              </p>
              <div
                className="flex rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 px-3 py-2 bg-transparent outline-none"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--foreground)',
                    border: 'none',
                  }}
                />
                <button
                  className="px-4 py-2 transition-opacity"
                  style={{
                    background: 'var(--foreground)',
                    color: 'var(--background)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--foreground)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              Shop
            </h5>
            <ul className="flex flex-col gap-2.5">
              {SHOP.map(l => (
                <li key={l}>
                  <Link
                    href={l === 'New Arrivals' ? '/products' : `/products?category=${l}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--muted-fg)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-fg)')}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--foreground)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              Company
            </h5>
            <ul className="flex flex-col gap-2.5">
              {COMPANY.map(l => (
                <li key={l}>
                  <Link
                    href="#"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--muted-fg)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-fg)')}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--foreground)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              Support
            </h5>
            <ul className="flex flex-col gap-2.5">
              {SUPPORT.map(l => (
                <li key={l}>
                  <Link
                    href="#"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--muted-fg)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-fg)')}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--border)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'var(--muted-fg)',
            }}
          >
            © {new Date().getFullYear()} Axon. All rights reserved.
          </span>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <Link
                key={item}
                href="#"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'var(--muted-fg)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-fg)')}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
