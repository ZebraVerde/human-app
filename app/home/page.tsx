import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if user already has a confirmed ticket
  const { data: ticket } = await supabase
    .from('tickets')
    .select('id')
    .eq('user_id', user!.id)
    .eq('status', 'confirmed')
    .maybeSingle()

  return (
    <div className="phone-shell flex flex-col pb-20">
      {/* Poster / Hero */}
      <div
        className="relative flex flex-col items-center justify-end"
        style={{
          minHeight: 420,
          background: 'linear-gradient(180deg, #0D1B3E 0%, #1a0a02 60%, #0D1B3E 100%)',
        }}
      >
        {/* Decorative overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(232,101,24,0.15) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 text-center px-6 pb-8">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--coral)' }}>
            Daniel Sá Nogueira presents
          </p>
          <h1 className="font-display text-8xl leading-none mb-4" style={{ color: 'var(--cream)' }}>
            HUMAN
          </h1>
          <p className="text-sm mb-1" style={{ color: 'var(--cream-dim)' }}>
            Saturday · 10 October 2026
          </p>
          <p className="text-sm" style={{ color: 'var(--cream-dim)' }}>
            10:00 – 20:00 · Parque das Nações, Lisbon
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 mt-6">
        {ticket ? (
          <Link href="/tickets">
            <button className="btn-orange">View my ticket</button>
          </Link>
        ) : (
          <Link href="/ticket-selection">
            <button className="btn-orange">Get your ticket · €99</button>
          </Link>
        )}
      </div>

      {/* Quick links */}
      <div className="px-6 mt-6 flex gap-3">
        {[
          { href: '/faq', label: 'FAQs' },
          { href: '/getting-there', label: 'Getting there' },
          { href: '/crew', label: 'Invite crew' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="flex-1 text-center py-3 rounded-xl text-xs font-medium"
            style={{
              background: 'rgba(240,232,206,0.06)',
              border: '1px solid rgba(197,96,58,0.2)',
              color: 'var(--cream-dim)',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
