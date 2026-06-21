import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="phone-shell flex flex-col items-center justify-center px-6 text-center min-h-dvh">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl"
        style={{ background: 'rgba(232,101,24,0.15)', border: '2px solid var(--orange)' }}
      >
        🎟
      </div>
      <h1 className="text-2xl font-semibold mb-3" style={{ color: 'var(--cream)' }}>
        You're in!
      </h1>
      <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--cream-dim)' }}>
        Payment confirmed. Your ticket for <strong style={{ color: 'var(--cream)' }}>HUMAN</strong> is ready.
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
