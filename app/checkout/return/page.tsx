'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ReturnContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'complete' | 'open' | 'error'>('loading')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }
    fetch(`/api/stripe/checkout-status?session_id=${sessionId}`)
      .then(r => r.json())
      .then(({ status: s }) => {
        setStatus(s === 'complete' ? 'complete' : s === 'open' ? 'open' : 'error')
      })
      .catch(() => setStatus('error'))
  }, [sessionId])

  if (status === 'loading') {
    return (
      <div className="phone-shell flex items-center justify-center min-h-dvh">
        <p style={{ color: 'var(--cream-dim)' }}>Confirming payment…</p>
      </div>
    )
  }

  if (status === 'complete') {
    return (
      <div className="phone-shell flex flex-col items-center justify-center px-6 text-center min-h-dvh">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl"
          style={{ background: 'rgba(232,101,24,0.15)', border: '2px solid var(--orange)' }}
        >
          🎟
        </div>
        <h1 className="text-2xl font-semibold mb-3" style={{ color: 'var(--cream)' }}>
          You&apos;re in!
        </h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--cream-dim)' }}>
          Payment confirmed. Your ticket for{' '}
          <strong style={{ color: 'var(--cream)' }}>HUMAN</strong> is ready.
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--cream-dim)' }}>
          Saturday 10 October 2026 · Parque das Nações, Lisbon
        </p>
        <Link href="/tickets" style={{ width: '100%', maxWidth: 280 }}>
          <button className="btn-orange">View my ticket</button>
        </Link>
        <Link href="/crew" className="mt-4 text-sm" style={{ color: 'var(--coral)' }}>
          Bring your crew →
        </Link>
      </div>
    )
  }

  // open or error
  return (
    <div className="phone-shell flex flex-col items-center justify-center px-6 text-center min-h-dvh">
      <p className="mb-4" style={{ color: 'var(--cream)' }}>
        {status === 'open' ? 'Payment not completed.' : 'Something went wrong.'}
      </p>
      <Link href="/ticket-selection" style={{ color: 'var(--coral)' }}>
        ← Try again
      </Link>
    </div>
  )
}

export default function CheckoutReturnPage() {
  return (
    <Suspense>
      <ReturnContent />
    </Suspense>
  )
}
