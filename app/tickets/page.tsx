import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import QRTicket from '@/components/QRTicket'

export default async function TicketsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: tickets } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', user!.id)
    .eq('status', 'confirmed')
    .order('created_at', { ascending: false })

  return (
    <div className="phone-shell flex flex-col pb-20">
      {/* Header */}
      <div className="pt-14 pb-6 px-6">
        <p className="sec-label">My Tickets</p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>HUMAN</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--cream-dim)' }}>10 October 2026 · Parque das Nações</p>
      </div>

      {tickets && tickets.length > 0 ? (
        <div className="px-6 flex flex-col gap-6">
          {tickets.map(ticket => (
            <QRTicket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="px-6 flex flex-col items-center text-center pt-8">
          <div className="text-5xl mb-4">🎟</div>
          <p className="text-sm mb-6" style={{ color: 'var(--cream-dim)' }}>
            You don't have a ticket yet.
          </p>
          <Link href="/ticket-selection">
            <button className="btn-orange" style={{ maxWidth: 240 }}>
              Get your ticket · €99
            </button>
          </Link>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
