'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const PRICE = 99

function CheckoutContent() {
  const searchParams = useSearchParams()
  const qty = Math.max(1, Math.min(4, Number(searchParams.get('qty') || 1)))
  const containerRef = useRef<HTMLDivElement>(null)
  const checkoutRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        const res = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: qty }),
        })
        const data = await res.json()

        if (!mounted) return

        if (data.error || !data.clientSecret) {
          setError(data.error || 'Failed to initialise checkout')
          setLoading(false)
          return
        }

        const stripe = await stripePromise
        if (!stripe || !mounted) return

        const checkout = await (stripe as any).initEmbeddedCheckout({
          clientSecret: data.clientSecret,
        })

        checkoutRef.current = checkout

        if (containerRef.current && mounted) {
          checkout.mount(containerRef.current)
          setLoading(false)
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Something went wrong')
          setLoading(false)
        }
      }
    }

    init()

    return () => {
      mounted = false
      checkoutRef.current?.destroy()
    }
  }, [qty])

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--cream)', minHeight: '100dvh' }}>
      {/* Header */}
      <div
        className="w-full flex flex-col items-center justify-end pb-3 pt-12"
        style={{ background: 'var(--navy)', minHeight: 120 }}
      >
        <h1
          className="text-4xl tracking-widest uppercase"
          style={{ fontFamily: 'Pirata One, serif', color: 'var(--cream)', letterSpacing: '0.2em' }}
        >
          HUMAN
        </h1>
        <p className="text-xs tracking-widest mt-1" style={{ color: 'var(--coral)' }}>
          🔒 SECURE CHECKOUT
        </p>
      </div>

      {/* Back */}
      <div className="px-5 pt-4">
        <Link href="/ticket-selection" className="text-xs" style={{ color: 'var(--coral)' }}>
          ← Back
        </Link>
      </div>

      {/* Ticket summary */}
      <div className="px-5 pt-3 pb-4">
        <h2
          className="text-xl font-semibold mb-1"
          style={{ fontFamily: 'Pirata One, serif', color: 'var(--navy)' }}
        >
          Your ticket
        </h2>
        <p className="text-xs mb-4" style={{ color: 'rgba(13,27,62,0.55)' }}>
          Full-day access · 10:00–20:00
        </p>

        <div
          className="rounded-xl p-4"
          style={{ background: '#fff', border: '1px solid rgba(197,96,58,0.25)' }}
        >
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--navy)' }}>
            General Admission
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#666' }}>
            Access to all sessions and activities. Entry only — food, drinks, coffee, and parking not included.
          </p>
          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>€{PRICE}</span>
              <span className="text-xs ml-1" style={{ color: '#999' }}>VAT included</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: '#666' }}>×</span>
              <span className="text-lg font-semibold" style={{ color: 'var(--navy)' }}>{qty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Embedded Checkout */}
      <div className="flex-1 px-2 pb-8">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm" style={{ color: 'rgba(13,27,62,0.45)' }}>Loading payment…</p>
          </div>
        )}
        {error && (
          <div className="px-4 py-4 text-center">
            <p className="text-sm text-red-500 mb-3">{error}</p>
            <Link href="/ticket-selection" className="text-sm" style={{ color: 'var(--coral)' }}>
              ← Go back
            </Link>
          </div>
        )}
        <div ref={containerRef} />
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  )
}
