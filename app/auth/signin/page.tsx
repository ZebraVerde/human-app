'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignInPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else { router.push('/home'); router.refresh() }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
  }

  return (
    <div className="phone-shell flex flex-col" style={{ position: 'relative', background: 'var(--navy)', overflow: 'hidden' }}>
      <img src="/poster.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,15,40,0.55)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to bottom,transparent,rgba(5,10,25,1))', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, padding: '0 20px' }}>
        <div style={{ height: 60 }} />
        <form onSubmit={handleSignIn} style={{ background: 'rgba(5,10,28,0.78)', border: '1px solid rgba(197,96,58,0.35)', borderRadius: 14, padding: 22, backdropFilter: 'blur(6px)' }}>
          <label style={{ display: 'block', fontSize: 10, color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Email</label>
          <input className="inp" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" style={{ marginBottom: 12 }} />

          <label style={{ display: 'block', fontSize: 10, color: 'var(--coral)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Password</label>
          <input className="inp" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" style={{ marginBottom: 12 }} />

          {error && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 10 }}>{error}</p>}

          <button type="submit" className="btn-orange" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0' }}>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(197,96,58,0.25)' }} />
            <div style={{ fontSize: 10, color: 'rgba(240,232,206,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>or</div>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(197,96,58,0.25)' }} />
          </div>

          <button type="button" className="btn-ghost" onClick={handleGoogle}>Continue with Google</button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14 }}>
          <Link href="/auth/forgot-password" style={{ fontSize: 12, color: '#2A6DD9', textDecoration: 'none' }}>Forgot password?</Link>
          <span style={{ fontSize: 12, color: 'rgba(240,232,206,0.25)' }}>·</span>
          <Link href="/auth/signup" style={{ fontSize: 12, color: '#2A6DD9', textDecoration: 'none' }}>Create account</Link>
        </div>
      </div>
    </div>
  )
}
