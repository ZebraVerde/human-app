'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const PRICE = 99
const MAX_QTY = 4

export default function TicketSelectionPage() {
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)

  const total = qty * PRICE

  async function handleContinue() {
    setLoading(true)
    const res = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty }),
    })
    const { url, error } = await res.json()
    if (error) {
      alert(error)
      setLoading(false)
      return
    }
    window.location.href = url
  }

  return (
    <div className="phone-shell flex flex-col pb-10" style={{ background: 'var(--navy)' }}>
      {/* Header */}
      <div className="pt-14 px-6 pb-2">
        <Link href="/home" className="text-xs" style={{ color: 'var(--coral)' }}>← Back</Link>
      </div>
      <div className="px-6 pb-6">
        <p className="sec-label">Step 1 of 2</p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>Your ticket</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--cream-dim)' }}>
          Full-day access · 10:00–20:00
        </p>
      </div>

      {/* Ticket card */}
      <div
        className="mx-6 rounded-2xl p-5 mb-6"
        style={{ background: 'rgba(240,232,206,0.06)', border: '1px solid rgba(197,96,58,0.3)' }}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-medium" style={{ color: 'var(--cream)' }}>General Admission</p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--cream-dim)' }}>
              Access to all sessions and activities.{'\n'}Entry only — food, drinks & parking not included.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>€{PRICE}</span>
            <span className="text-xs ml-2" style={{ color: 'var(--cream-dim)' }}>VAT included</span>
          </div>

          {/* Qty picker */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: 'rgba(197,96,58,0.2)', color: 'var(--cream)' }}
            >
              −
            </button>
            <span className="text-lg font-semibold w-4 text-center" style={{ color: 'var(--cream)' }}>
              {qty}
            </span>
            <button
              onClick={() => setQty(q => Math.min(MAX_QTY, q + 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: 'rgba(197,96,58,0.2)', color: 'var(--cream)' }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Total */}
      <div
        className="mx-6 flex justify-between items-center py-4 mb-6"
        style={{ borderTop: '1px solid rgba(197,96,58,0.2)', borderBottom: '1px solid rgba(197,96,58,0.2)' }}
      >
        <span className="text-sm" style={{ color: 'var(--cream-dim)' }}>Total</span>
        <span className="text-xl font-semibold" style={{ color: 'var(--cream)' }}>€{total}</span>
      </div>

      {/* CTA */}
      <div className="px-6">
        <button className="btn-orange" onClick={handleContinue} disabled={loading}>
          {loading ? 'Redirecting…' : 'Continue to checkout'}
        </button>
      </div>
    </div>
  )
}
