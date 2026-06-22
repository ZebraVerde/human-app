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
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: qty }),
        })
        const data = await res.json()
        if (!mounted) return
        if (data.error || !data.clientSecret) { setError(data.error || 'Failed to initialise checkout'); setLoading(false); return }
        const stripe = await stripePromise
        if (!stripe || !mounted) return
        const checkout = await (stripe as any).initEmbeddedCheckout({ clientSecret: data.clientSecret })
        checkoutRef.current = checkout
        if (containerRef.current && mounted) { checkout.mount(containerRef.current); setLoading(false) }
      } catch (err: any) {
        if (mounted) { setError(err.message || 'Something went wrong'); setLoading(false) }
      }
    }
    init()
    return () => { mounted = false; checkoutRef.current?.destroy() }
  }, [qty])

  return (
    <div className="phone-shell flex flex-col" style={{ background: '#FAE0CC', minHeight: '100dvh' }}>
      {/* Creature banner */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden', flexShrink: 0 }}>
        <img src="/creature.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, #FAE0CC 100%)' }} />
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: 'var(--coral)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>🔒 Secure checkout</div>
        </div>
      </div>

      {/* Back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#888', padding: '10px 16px', borderBottom: '1px solid rgba(13,27,62,0.1)', background: '#FAE0CC' }}>
        <Link href="/ticket-selection" style={{ color: '#888', textDecoration: 'none', fontSize: 12 }}>← Back</Link>
      </div>

      {/* Ticket summary */}
      <div style={{ padding: '16px 18px 4px' }}>
        <div style={{ fontFamily: "'Pirata One', serif", fontSize: 22, color: 'var(--navy)', marginBottom: 3 }}>Your ticket</div>
        <div style={{ fontSize: 12, color: '#888', marginBottom: 14 }}>Full-day access · 10:00–20:00</div>

        <div style={{ border: '1px solid var(--coral)', borderRadius: 12, padding: 16, background: '#fff' }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--navy)', marginBottom: 4 }}>General Admission</div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 14, lineHeight: 1.55 }}>
            Access to all sessions and activities. Entry only — food, drinks, coffee, and parking not included.
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Pirata One', serif", fontSize: 28, color: 'var(--navy)' }}>€{PRICE}</div>
              <div style={{ fontSize: 10, color: '#aaa' }}>VAT included</div>
            </div>
            <div style={{ fontSize: 14, color: '#666' }}>× {qty}</div>
          </div>
        </div>
      </div>

      {/* Stripe Embedded Checkout */}
      <div style={{ flex: 1, padding: '8px 4px 32px' }}>
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
            <p style={{ fontSize: 13, color: 'rgba(13,27,62,0.45)' }}>Loading payment…</p>
          </div>
        )}
        {error && (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 12 }}>{error}</p>
            <Link href="/ticket-selection" style={{ fontSize: 13, color: 'var(--coral)', textDecoration: 'none' }}>← Go back</Link>
          </div>
        )}
        <div ref={containerRef} />
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return <Suspense><CheckoutContent /></Suspense>
}
