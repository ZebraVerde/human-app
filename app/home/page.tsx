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
        <div style={{ padding: '0 20px calc(80px + env(safe-area-inset-bottom))' }}>
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

        <BottomNav />
      </div>
    </div>
  )
}
