'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const NAV_LINKS = [
  { label: 'Products',   href: '/products' },
  { label: 'Categories', href: '#categories' },
  { label: 'Deals',      href: '#deals' },
  { label: 'About',      href: '#about' },
];

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(250,250,248,0.9)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(v => !v)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted-fg)',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none" style={{ textDecoration: 'none' }}>
            <div
              className="w-8 h-8 flex items-center justify-center rounded-lg"
              style={{ background: 'var(--foreground)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  color: 'var(--background)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                AX
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: 'var(--foreground)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
              }}
            >
              axon
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-150"
                style={{
                  color: 'var(--muted-fg)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-fg)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{
                color: 'var(--muted-fg)',
                background: searchOpen ? 'var(--accent)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--muted)')}
              onMouseLeave={e =>
                (e.currentTarget.style.background = searchOpen ? 'var(--accent)' : 'transparent')
              }
            >
              <Search size={17} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-opacity"
              style={{
                background: 'var(--foreground)',
                color: 'var(--background)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline">Bag</span>
              {count > 0 && (
                <span
                  className="flex items-center justify-center w-4 h-4 rounded-full"
                  style={{
                    background: 'var(--primary)',
                    color: '#fff',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t py-3" style={{ borderColor: 'var(--border)' }}>
            <input
              autoFocus
              type="text"
              placeholder="Search gadgets, accessories…"
              className="w-full bg-transparent outline-none"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--foreground)',
                border: 'none',
              }}
            />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
        >
          <nav className="flex flex-col px-5 py-5 gap-5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
