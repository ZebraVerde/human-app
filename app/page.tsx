import Link from 'next/link'

const FAQS = [
  {
    q: "What's included?",
    a: "Access to all sessions 10:00–20:00. Food, drinks, coffee, and parking are not included.",
  },
  {
    q: "Where exactly?",
    a: "Parque das Nações, Lisbon. Exact address sent to ticket holders 2 weeks before the event.",
  },
  {
    q: "Age requirement?",
    a: "18+ only. Valid ID required at the door.",
  },
  {
    q: "Accessibility?",
    a: "Accessible seating available upon request. Email us in advance to arrange.",
  },
]

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--navy)', color: 'var(--cream)', minHeight: '100dvh' }}>
      {/* ── Sticky nav ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(13,27,62,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(197,96,58,0.2)',
        }}
      >
        <span className="font-display text-2xl" style={{ color: 'var(--cream)' }}>HUMAN</span>
        <Link href="/ticket-selection">
          <button
            className="px-5 py-2 rounded-xl text-sm font-medium"
            style={{ background: 'var(--orange)', color: '#fff' }}
          >
            Buy ticket · €99
          </button>
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{
          minHeight: '85dvh',
          background: 'linear-gradient(180deg, #080f20 0%, #0D1B3E 50%, #1a0a02 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, rgba(232,101,24,0.18) 0%, transparent 65%)',
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--coral)' }}>
            Daniel Sá Nogueira
          </p>
          <h1 className="font-display leading-none mb-6" style={{ fontSize: 'clamp(5rem, 22vw, 10rem)', color: 'var(--cream)' }}>
            HUMAN
          </h1>
          <p className="text-base mb-2" style={{ color: 'var(--cream-dim)' }}>
            10 October 2026 · Saturday
          </p>
          <p className="text-base mb-2" style={{ color: 'var(--cream-dim)' }}>
            10:00 – 20:00
          </p>
          <p className="text-base mb-10" style={{ color: 'var(--cream-dim)' }}>
            Parque das Nações, Lisbon
          </p>
          <Link href="/ticket-selection">
            <button className="btn-orange" style={{ maxWidth: 300, margin: '0 auto' }}>
              Buy your ticket · €99
            </button>
          </Link>
          <p className="mt-3 text-xs" style={{ color: 'rgba(240,232,206,0.35)' }}>
            VAT included · Secured by Stripe
          </p>
        </div>
      </section>

      {/* ── Details strip ── */}
      <section className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: '1px solid rgba(197,96,58,0.2)', borderBottom: '1px solid rgba(197,96,58,0.2)' }}>
        {[
          { label: 'Date', value: '10.10.26 · Saturday' },
          { label: 'Time', value: '10:00 – 20:00 · Full day' },
          { label: 'Location', value: 'Parque das Nações, Lisbon' },
          { label: 'Ticket', value: '€99 · VAT included' },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="px-6 py-5"
            style={{ borderRight: '1px solid rgba(197,96,58,0.15)' }}
          >
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--coral)' }}>{label}</p>
            <p className="text-sm" style={{ color: 'var(--cream)' }}>{value}</p>
          </div>
        ))}
      </section>

      {/* ── About ── */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <p className="sec-label mb-2">About</p>
        <h2 className="text-3xl font-semibold mb-6" style={{ color: 'var(--cream)' }}>What is HUMAN?</h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--cream-dim)' }}>
          {/* TODO: Replace with your event description */}
          A full-day gathering at Parque das Nações, Lisbon. More details coming soon.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <p className="sec-label mb-2">FAQ</p>
        <h2 className="text-3xl font-semibold mb-6" style={{ color: 'var(--cream)' }}>Questions</h2>
        <div className="flex flex-col">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="py-5"
              style={{ borderBottom: '1px solid rgba(197,96,58,0.2)' }}
            >
              <p className="font-medium mb-2" style={{ color: 'var(--cream)' }}>{q}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-dim)' }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="text-center px-6 py-20"
        style={{ background: 'linear-gradient(0deg, #080f20 0%, var(--navy) 100%)' }}
      >
        <h2 className="text-3xl font-semibold mb-2" style={{ color: 'var(--cream)' }}>Get your ticket</h2>
        <p className="text-sm mb-2" style={{ color: 'var(--cream-dim)' }}>
          10 October 2026 · Parque das Nações · Lisbon
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--cream-dim)' }}>€99 · VAT included</p>
        <Link href="/ticket-selection">
          <button className="btn-orange" style={{ maxWidth: 280, margin: '0 auto' }}>
            Buy now
          </button>
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
        style={{
          borderTop: '1px solid rgba(197,96,58,0.2)',
          color: 'rgba(240,232,206,0.4)',
        }}
      >
        <span className="font-display text-xl" style={{ color: 'var(--cream)' }}>HUMAN</span>
        <span>© 2026 Daniel Sá Nogueira</span>
        <a href="mailto:human@danielsanogueira.com" style={{ color: 'var(--coral)' }}>
          human@danielsanogueira.com
        </a>
      </footer>
    </div>
  )
}
