import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { amount, customerName, customerEmail, items } = await req.json();

    if (!amount || amount < 50) {
      return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 });
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        customer_name: customerName,
        customer_email: customerEmail,
        items_count: items.length,
      },
    });

    // Save order to Supabase
    await supabase.from('axon_orders').insert({
      customer_name: customerName,
      customer_email: customerEmail,
      amount_total: amount / 100,
      status: 'pending',
      stripe_payment_id: paymentIntent.id,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error('Payment intent error:', err);
    return NextResponse.json({ error: err.message ?? 'Payment failed.' }, { status: 500 });
  }
}
