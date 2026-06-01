import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/layout/Navbar';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  title: 'Axon — Premium Tech Accessories',
  description: 'Clean, minimal tech accessories for the modern workspace.',
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
