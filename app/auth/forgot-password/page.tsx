'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleReset(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/reset-password` })
    if (error) { setError(error.message); setLoading(false) } else { setDone(true) }
  }

  return (
    <div className="phone-shell flex flex-col" style={{ position: 'relative', background: 'var(--navy)', overflow: 'hidden' }}>
      <img src="/poster.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,15,40,0.6)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, padding: '20px' }}>
        <div style={{ background: 'rgba(5,10,28,0.82)', border: '1px solid rgba(197,96,58,0.35)', borderRadius: 14, padding: 22 }}>
          <div style={{ fontFamily: "'Pirata One', serif", fontSize: 28, color: '#2A6DD9', textAlign: 'center', marginBottom: 4 }}>Account Recovery</div>
          <div style={{ fontSize: 10, color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 18 }}>Reset your password</div>

          {done ? (
            <>
              <p style={{ fontSize: 13, color: 'var(--cream-dim)', lineHeight: 1.6, marginBottom: 16 }}>
                Reset link sent to <strong style={{ color: 'var(--cream)' }}>{email}</strong>. Check your inbox.
              </p>
              <Link href="/auth/signin" style={{ fontSize: 13, color: '#2A6DD9', textDecoration: 'none' }}>← Back to sign in</Link>
            </>
          ) : (
            <form onSubmit={handleReset}>
              <label style={{ display: 'block', fontSize: 10, color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Email address</label>
              <input className="inp" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" style={{ marginBottom: 12 }} />
              {error && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 10 }}>{error}</p>}
              <button type="submit" className="btn-orange" disabled={loading}>{loading ? 'Sending…' : 'Send reset link'}</button>
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <Link href="/auth/signin" style={{ fontSize: 13, color: '#2A6DD9', textDecoration: 'none' }}>Back to sign in</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
