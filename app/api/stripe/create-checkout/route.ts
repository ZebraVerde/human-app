import { NextResponse } from 'next/server'
import { stripe, TICKET_PRICE_CENTS } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Check if user already has a confirmed ticket
    const { data: existing } = await supabase
      .from('tickets')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'confirmed')
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'You already have a ticket for this event.' }, { status: 400 })
    }

    const body = await req.json()
    const quantity = body.quantity ?? 1

    if (quantity < 1 || quantity > 4) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create a pending ticket record first
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        user_id: user.id,
        quantity,
        unit_price_cents: TICKET_PRICE_CENTS,
        total_cents: TICKET_PRICE_CENTS * quantity,
        status: 'pending',
        attendee_email: user.email,
      })
      .select('id')
      .single()

    if (ticketError || !ticket) {
      return NextResponse.json({ error: 'Failed to create ticket record' }, { status: 500 })
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      ui_mode: 'embedded',
      currency: 'eur',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'HUMAN — General Admission',
              description: `10 October 2026 · Parque das Nações, Lisbon · 10:00–20:00`,
            },
            unit_amount: TICKET_PRICE_CENTS,
          },
          quantity,
        },
      ],
      customer_email: user.email,
      metadata: {
        ticket_id: ticket.id,
        user_id: user.id,
        quantity: String(quantity),
      },
      return_url: `${appUrl}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    // Store session ID on ticket
    await supabase
      .from('tickets')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', ticket.id)

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (err: any) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}
