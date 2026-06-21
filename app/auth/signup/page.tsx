'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="phone-shell flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-6">✉️</div>
        <h1 className="text-xl font-semibold mb-3" style={{ color: 'var(--cream)' }}>Check your email</h1>
        <p className="text-sm" style={{ color: 'var(--cream-dim)' }}>
          We sent a confirmation link to <strong style={{ color: 'var(--cream)' }}>{email}</strong>. Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--navy)' }}>
      <div className="pt-16 pb-6 px-6">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--coral)' }}>
          HUMAN · Ticket App
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>
          Create account
        </h1>
      </div>

      <form onSubmit={handleSignUp} className="flex-1 px-6 flex flex-col gap-4">
        <div>
          <label className="sec-label block">Email</label>
          <input className="inp" type="email" placeholder="you@email.com" value={email}
            onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        </div>
        <div>
          <label className="sec-label block">Password</label>
          <input className="inp" type="password" placeholder="8+ characters" value={password}
            onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button type="submit" className="btn-orange mt-2" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-center text-sm mt-4" style={{ color: 'var(--cream-dim)' }}>
          Already have one?{' '}
          <Link href="/auth/signin" style={{ color: 'var(--coral)' }}>Sign in</Link>
        </p>
      </form>
      <div className="h-8" />
    </div>
  )
}
