import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const TICKET_PRICE_CENTS = 9900 // €99.00
export const EVENT_NAME = 'HUMAN'
export const EVENT_DATE = '10 October 2026'
