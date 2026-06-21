'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/BottomNav'
import Link from 'next/link'

export default function CrewPage() {
  const supabase = createClient()
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getOrCreateInvite() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      let { data: existing } = await supabase
        .from('invite_links')
        .select('code')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!existing) {
        const { data: created } = await supabase
          .from('invite_links')
          .insert({ user_id: user.id })
          .select('code')
          .single()
        existing = created
      }

      if (existing) {
        setInviteLink(`${window.location.origin}/?ref=${existing.code}`)
      }
      setLoading(false)
    }
    getOrCreateInvite()
  }, [])

  async function copyLink() {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareText = `Join me at HUMAN — 10 October 2026, Lisbon. Get your ticket: ${inviteLink}`

  return (
    <div className="phone-shell flex flex-col pb-24">
      <div className="pt-14 px-6 pb-2">
        <Link href="/home" className="text-xs" style={{ color: 'var(--coral)' }}>← Back</Link>
      </div>

      <div className="px-6 pb-6">
        <p className="sec-label">Bring your crew</p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>Share HUMAN</h1>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--cream-dim)' }}>
          Share the event with your people. Send your link and get your crew to HUMAN.
        </p>
      </div>

      {/* Invite link box */}
      <div className="mx-6 mb-6 rounded-xl p-4" style={{ background: 'rgba(240,232,206,0.05)', border: '1px solid rgba(197,96,58,0.2)' }}>
        <p className="sec-label mb-2">Your invite link</p>
        <p className="text-sm break-all" style={{ color: 'var(--cream-dim)' }}>
          {loading ? 'Generating…' : inviteLink}
        </p>
      </div>

      {/* Buttons */}
      <div className="px-6 flex flex-col gap-3">
        <button className="btn-orange" onClick={copyLink} disabled={loading}>
          {copied ? '✓ Copied!' : 'Copy link'}
        </button>

        {/* Share targets */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            {
              label: 'WhatsApp',
              href: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
              color: '#25D366',
            },
            {
              label: 'Instagram',
              href: '#',
              onClick: copyLink,
              note: '(copies link)',
              color: '#E1306C',
            },
            {
              label: 'Facebook',
              href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`,
              color: '#1877F2',
            },
            {
              label: 'LinkedIn',
              href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(inviteLink)}`,
              color: '#0A66C2',
            },
          ].map(({ label, href, onClick, color }) => (
            <a
              key={label}
              href={loading ? '#' : href}
              onClick={onClick}
              target={href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
              style={{
                background: 'rgba(240,232,206,0.06)',
                border: '1px solid rgba(197,96,58,0.2)',
                color: 'var(--cream)',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
