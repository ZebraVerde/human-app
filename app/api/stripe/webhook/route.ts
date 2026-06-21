import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status === 'paid') {
      const { ticket_id, user_id, quantity } = session.metadata || {}

      if (!ticket_id || !user_id) {
        console.error('Missing metadata in session', session.id)
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
      }

      const supabase = createClient()

      const { error } = await supabase
        .from('tickets')
        .update({
          status: 'confirmed',
          stripe_payment_intent_id: session.payment_intent as string,
          attendee_name: session.customer_details?.name,
          attendee_email: session.customer_details?.email,
          attendee_phone: session.customer_details?.phone,
        })
        .eq('id', ticket_id)
        .eq('user_id', user_id)

      if (error) {
        console.error('Failed to confirm ticket:', error)
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
      }

      console.log(`✅ Ticket ${ticket_id} confirmed for user ${user_id}`)
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    const { ticket_id } = session.metadata || {}

    if (ticket_id) {
      const supabase = createClient()
      await supabase
        .from('tickets')
        .update({ status: 'cancelled' })
        .eq('id', ticket_id)
        .eq('status', 'pending')
    }
  }

  return NextResponse.json({ received: true })
}

// Required: disable body parsing so Stripe can verify the raw body
export const config = {
  api: { bodyParser: false },
}
