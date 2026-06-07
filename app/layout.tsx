import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/layout/Navbar';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  title: 'Axon — Premium Tech Accessories',
  description: 'Premium gadgets and accessories, engineered for the way you work, create, and live.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
