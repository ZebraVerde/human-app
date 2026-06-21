import BottomNav from '@/components/BottomNav'
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

export default function FaqPage() {
  return (
    <div className="phone-shell flex flex-col pb-24">
      {/* Header */}
      <div className="pt-14 pb-6 px-6">
        <p className="sec-label">Help</p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>FAQs</h1>
      </div>

      {/* Questions */}
      <div className="px-6 flex flex-col">
        {FAQS.map(({ q, a }, i) => (
          <div
            key={i}
            className="py-4"
            style={{ borderBottom: '1px solid rgba(197,96,58,0.2)' }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--cream)' }}>{q}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-dim)' }}>{a}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="px-6 mt-8">
        <p className="text-sm mb-2" style={{ color: 'var(--cream-dim)' }}>More questions?</p>
        <a
          href="mailto:human@danielsanogueira.com"
          className="text-sm"
          style={{ color: 'var(--coral)' }}
        >
          human@danielsanogueira.com
        </a>
      </div>

      <BottomNav />
    </div>
  )
}
