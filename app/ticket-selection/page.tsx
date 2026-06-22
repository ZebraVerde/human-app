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

  function handleContinue() {
    setLoading(true)
    router.push(`/checkout?qty=${qty}`)
  }

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
        <Link href="/home" style={{ color: '#888', textDecoration: 'none', fontSize: 12 }}>← Back</Link>
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
            {/* Qty picker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--coral)', background: 'transparent', color: 'var(--coral)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >−</button>
              <span style={{ fontSize: 15, fontWeight: 500, minWidth: 14, textAlign: 'center', color: 'var(--navy)' }}>{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(MAX_QTY, q + 1))}
                style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--coral)', background: 'transparent', color: 'var(--coral)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <div style={{ margin: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid rgba(13,27,62,0.12)', borderBottom: '1px solid rgba(13,27,62,0.12)' }}>
        <span style={{ fontSize: 13, color: '#888' }}>Total</span>
        <span style={{ fontFamily: "'Pirata One', serif", fontSize: 22, color: 'var(--navy)' }}>€{qty * PRICE}</span>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 18px' }}>
        <button className="btn-orange" onClick={handleContinue} disabled={loading}>
          {loading ? 'Loading…' : `Continue to payment · €${qty * PRICE}`}
        </button>
      </div>
    </div>
  )
}
