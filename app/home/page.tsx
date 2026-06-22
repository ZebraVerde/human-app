import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: ticket } = await supabase
    .from('tickets').select('id').eq('user_id', user!.id).eq('status', 'confirmed').maybeSingle()

  return (
    <div className="phone-shell flex flex-col" style={{ position: 'relative', background: 'var(--navy)', overflow: 'hidden', minHeight: '100dvh' }}>
      {/* Poster background */}
      <img src="/poster.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,10,25,0.97) 80%)', zIndex: 1 }} />

      {/* Content — floats to bottom like design */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-end', paddingBottom: 0 }}>
        <div style={{ flex: 1 }} />

        {/* CTA button */}
        <div style={{ padding: '0 20px 12px' }}>
          {ticket ? (
            <Link href="/tickets" style={{ textDecoration: 'none' }}>
              <button className="btn-orange">View my ticket</button>
            </Link>
          ) : (
            <Link href="/ticket-selection" style={{ textDecoration: 'none' }}>
              <button className="btn-orange">Get your ticket · €99</button>
            </Link>
          )}
        </div>

        {/* Quick links */}
        <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8 }}>
          <Link href="/faq" style={{ flex: 1, padding: '10px 4px', border: '1px solid rgba(197,96,58,0.35)', borderRadius: 8, textAlign: 'center', fontSize: 10, color: 'var(--cream)', background: 'rgba(5,12,30,0.5)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 14 }}>💬</span>FAQs
          </Link>
          <Link href="/getting-there" style={{ flex: 1, padding: '10px 4px', border: '1px solid rgba(197,96,58,0.35)', borderRadius: 8, textAlign: 'center', fontSize: 10, color: 'var(--cream)', background: 'rgba(5,12,30,0.5)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 14 }}>📍</span>Getting there
          </Link>
          <Link href="/crew" style={{ flex: 1, padding: '10px 4px', border: '1px solid rgba(197,96,58,0.35)', borderRadius: 8, textAlign: 'center', fontSize: 10, color: 'var(--cream)', background: 'rgba(5,12,30,0.5)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 14 }}>👥</span>Invite crew
          </Link>
        </div>

        <BottomNav />
      </div>
    </div>
  )
}
