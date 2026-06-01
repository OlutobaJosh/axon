'use client';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg tracking-tight" style={{ color: 'var(--dark)', letterSpacing: '-0.02em' }}>
          axon
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/products', 'Products']].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm transition-colors hover:text-black" style={{ color: 'var(--mid)' }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Cart */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 text-sm transition-colors hover:text-black"
          style={{ color: 'var(--mid)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-white flex items-center justify-center" style={{ background: 'var(--blue)', fontSize: '0.6rem', fontWeight: 700 }}>
              {count}
            </span>
          )}
          <span className="hidden sm:inline">Cart</span>
        </button>
      </div>
    </header>
  );
}
