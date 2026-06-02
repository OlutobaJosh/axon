'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/shop/ProductCard';
import Footer from '@/components/layout/Footer';

const CATEGORIES = ['All', 'Audio', 'Cables', 'Chargers', 'Cases', 'Displays', 'Accessories'];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get('category') ?? 'All';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initCat);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase.from('products').select('*').order('name').then(({ data }) => {
      setProducts(data ?? []);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh', background: 'var(--white)' }}>
      {/* Header */}
      <div style={{ background: 'var(--gray)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="font-semibold tracking-tight mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--dark)', letterSpacing: '-0.02em' }}>
            All Products
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)' }}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="field"
            style={{ maxWidth: '280px' }}
          />
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="text-sm font-medium px-4 py-2 rounded-full transition-all"
                style={{
                  background: category === c ? 'var(--dark)' : 'var(--gray)',
                  color: category === c ? 'white' : 'var(--mid)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--blue)', borderTopColor: 'transparent' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium mb-1" style={{ color: 'var(--dark)' }}>No products found</p>
            <p className="text-sm" style={{ color: 'var(--light)' }}>Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
  style={{ contentVisibility: 'auto' }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
