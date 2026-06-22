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
      let { data: existing } = await supabase.from('invite_links').select('code').eq('user_id', user.id).maybeSingle()
      if (!existing) {
        const { data: created } = await supabase.from('invite_links').insert({ user_id: user.id }).select('code').single()
        existing = created
      }
      if (existing) setInviteLink(`${window.location.origin}/?ref=${existing.code}`)
      setLoading(false)
    }
    getOrCreateInvite()
  }, [])

  async function copyLink() {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const shareText = `Join me at HUMAN — 10 October 2026, Lisbon. Get your ticket: ${inviteLink}`

  const socials = [
    { label: 'WhatsApp', color: '#25D366', emoji: '💬', href: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { label: 'Instagram', color: '#E1306C', emoji: '📸', href: '#', onClick: copyLink },
    { label: 'Facebook', color: '#1877F2', emoji: '📘', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}` },
    { label: 'LinkedIn', color: '#0A66C2', emoji: '💼', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(inviteLink)}` },
  ]

  return (
    <div className="phone-shell flex flex-col" style={{ position: 'relative', background: 'var(--navy)', overflow: 'hidden', minHeight: '100dvh' }}>
      <img src="/crew-bg.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,25,0.65)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100dvh' }}>
        {/* Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--cream-dim)', padding: '10px 16px', borderBottom: '1px solid rgba(197,96,58,0.28)', flexShrink: 0, background: 'rgba(8,15,32,0.7)' }}>
          <Link href="/home" style={{ color: 'var(--cream-dim)', textDecoration: 'none', fontSize: 12 }}>← Back</Link>
        </div>

        <div style={{ flex: 1 }} />

        {/* Bottom share panel */}
        <div style={{ padding: '16px 22px 20px', background: 'rgba(5,12,30,0.82)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(197,96,58,0.3)' }}>
          <div style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Bring your crew</div>
          <div style={{ fontSize: 13, color: 'var(--cream-dim)', lineHeight: 1.7, marginBottom: 14 }}>Share HUMAN with your people. Get your crew to the event.</div>

          {/* Invite link box */}
          <div style={{ background: 'rgba(5,12,30,0.6)', border: '1px solid rgba(197,96,58,0.28)', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 9, color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Your invite link</div>
            <div style={{ fontSize: 12, color: '#2A6DD9' }}>{loading ? 'Generating…' : inviteLink}</div>
          </div>

          <button className="btn-orange" onClick={copyLink} disabled={loading} style={{ marginBottom: 12 }}>
            {copied ? '✓ Copied!' : 'Copy link'}
          </button>

          {/* Share grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {socials.map(({ label, color, emoji, href, onClick }) => (
              <a
                key={label}
                href={loading ? '#' : href}
                onClick={onClick}
                target={href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{ padding: '11px 8px', borderRadius: 10, border: '1px solid rgba(197,96,58,0.28)', background: 'rgba(5,12,30,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: 12, color: 'var(--cream)', textDecoration: 'none' }}
              >
                <span style={{ fontSize: 16 }}>{emoji}</span>
                <span style={{ color }}>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  )
}
