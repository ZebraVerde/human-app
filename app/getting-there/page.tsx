import BottomNav from '@/components/BottomNav'
import Link from 'next/link'

const TRANSPORT = [
  {
    icon: '🚆',
    name: 'Train',
    detail: 'Oriente Station · 5 min walk to venue',
  },
  {
    icon: '🚇',
    name: 'Metro',
    detail: 'Red Line · Oriente · Direct connection',
  },
  {
    icon: '🚌',
    name: 'Bus',
    detail: 'Lines 705, 725 · Stop: Parque das Nações',
  },
  {
    icon: '🚗',
    name: 'Parking',
    detail: 'Not included in ticket · Paid parking nearby',
  },
]

export default function GettingTherePage() {
  return (
    <div className="phone-shell flex flex-col pb-24">
      {/* Back */}
      <div className="pt-14 px-6 pb-2">
        <Link href="/home" className="text-xs" style={{ color: 'var(--coral)' }}>← Back</Link>
      </div>

      {/* Header */}
      <div className="px-6 pb-6">
        <p className="sec-label">Transport & Parking</p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>Getting There</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--cream-dim)' }}>
          Parque das Nações, Lisbon
        </p>
      </div>

      {/* Map placeholder */}
      <div
        className="mx-6 rounded-xl mb-6 flex items-center justify-center"
        style={{
          height: 160,
          background: 'rgba(240,232,206,0.05)',
          border: '1px solid rgba(197,96,58,0.2)',
        }}
      >
        <a
          href="https://maps.google.com/?q=Parque+das+Nações+Lisbon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
          style={{ color: 'var(--coral)' }}
        >
          Open in Google Maps →
        </a>
      </div>

      {/* Transport options */}
      <div className="px-6 flex flex-col">
        {TRANSPORT.map(({ icon, name, detail }, i) => (
          <div
            key={i}
            className="flex gap-4 py-4"
            style={{ borderBottom: '1px solid rgba(197,96,58,0.2)' }}
          >
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{name}</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--cream-dim)' }}>{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
