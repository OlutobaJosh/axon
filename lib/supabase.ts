import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  featured: boolean;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  amount_total: number;
  status: string;
  stripe_payment_id: string;
  created_at: string;
};
