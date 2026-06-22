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
  const shareTitle = 'HUMAN — Oct 10, Lisbon'

  // Instagram: Web Share API triggers native share sheet (iOS/Android) → user picks Stories or DM
  async function shareInstagram(e: React.MouseEvent) {
    e.preventDefault()
    if (loading) return
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: inviteLink })
        return
      } catch {}
    }
    // Fallback: copy link and open Instagram
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
    window.open('https://www.instagram.com/', '_blank')
  }

  const socials = [
    {
      label: 'WhatsApp', color: '#25D366',
      // Opens WhatsApp with message pre-filled — one tap to send
      href: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    },
    {
      label: 'Instagram', color: '#E1306C',
      href: '#', onClick: shareInstagram,
      // Web Share API → native share sheet → user picks Instagram Stories or DM
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#ig-grad)"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#F58529"/><stop offset="50%" stopColor="#DD2A7B"/><stop offset="100%" stopColor="#8134AF"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    },
    {
      label: 'Facebook', color: '#1877F2',
      // Opens FB share dialog with post text pre-filled
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}&quote=${encodeURIComponent(shareText)}`,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
    {
      label: 'LinkedIn', color: '#0A66C2',
      // shareArticle endpoint pre-fills title + summary
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(inviteLink)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
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
        <div style={{ padding: '16px 22px calc(80px + env(safe-area-inset-bottom))', background: 'rgba(5,12,30,0.82)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(197,96,58,0.3)' }}>
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
            {socials.map(({ label, color, icon, href, onClick }) => (
              <a
                key={label}
                href={loading ? '#' : href}
                onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
                target={href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{ padding: '11px 8px', borderRadius: 10, border: '1px solid rgba(197,96,58,0.28)', background: 'rgba(5,12,30,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: 12, color: 'var(--cream)', textDecoration: 'none', opacity: loading ? 0.5 : 1 }}
              >
                {icon}
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
