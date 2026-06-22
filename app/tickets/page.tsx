import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import QRTicket from '@/components/QRTicket'

export default async function TicketsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: tickets } = await supabase
    .from('tickets').select('*').eq('user_id', user!.id).eq('status', 'confirmed').order('created_at', { ascending: false })

  return (
    <div className="phone-shell flex flex-col" style={{ position: 'relative', background: 'var(--navy)', overflow: 'hidden', minHeight: '100dvh' }}>
      <img src="/ticket-bg.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,25,0.6)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100dvh' }}>
        {tickets && tickets.length > 0 ? (
          <div style={{ padding: '14px 16px 100px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {tickets.map(ticket => (
              <QRTicket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '80px 32px 32px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎟</div>
            <p style={{ fontSize: 13, color: 'var(--cream-dim)', marginBottom: 24 }}>You don't have a ticket yet.</p>
            <Link href="/ticket-selection" style={{ textDecoration: 'none', width: '100%', maxWidth: 240 }}>
              <button className="btn-orange">Get your ticket · €99</button>
            </Link>
          </div>
        )}
        <BottomNav />
      </div>
    </div>
  )
}
