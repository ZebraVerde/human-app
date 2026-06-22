import BottomNav from '@/components/BottomNav'

const FAQS = [
  { q: "What's included?", a: "Access to all sessions 10:00–20:00. Food, drinks, coffee, and parking not included." },
  { q: "Where exactly?", a: "Parque das Nações, Lisbon. Exact address sent 2 weeks before the event." },
  { q: "Age requirement?", a: "18+ only. Valid ID required at the door." },
  { q: "Accessibility?", a: "Accessible seating available. Email us in advance." },
]

export default function FaqPage() {
  return (
    <div className="phone-shell flex flex-col" style={{ position: 'relative', background: 'var(--navy)', overflow: 'hidden', minHeight: '100dvh' }}>
      <img src="/poster.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,25,0.7)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100dvh' }}>
        {/* Big FAQ heading */}
        <div style={{ padding: '28px 22px 14px' }}>
          <div style={{ fontFamily: "'Pirata One', serif", fontSize: 48, color: '#2A6DD9', lineHeight: 1 }}>FAQ</div>
        </div>

        {/* Questions */}
        <div style={{ padding: '0 22px calc(80px + env(safe-area-inset-bottom)) 22px', flex: 1, overflowY: 'auto' }}>
          {FAQS.map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(197,96,58,0.2)', padding: '13px 0' }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--cream)', marginBottom: 5 }}>{q}</p>
              <p style={{ fontSize: 12, color: 'var(--cream-dim)', lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
          <div style={{ padding: '13px 0' }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--cream)', marginBottom: 5 }}>More questions?</p>
            <a href="mailto:human@danielsanogueira.com" style={{ fontSize: 12, color: '#2A6DD9', textDecoration: 'none' }}>human@danielsanogueira.com</a>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  )
}
