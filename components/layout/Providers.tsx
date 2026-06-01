'use client';
import { CartProvider } from '@/hooks/useCart';
import CartSidebar from './CartSidebar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
    </CartProvider>
  );
}
