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
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--navy)' }}>
      <div className="pt-16 pb-6 px-6">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--coral)' }}>
          Account Recovery
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>
          Reset your password
        </h1>
      </div>

      {done ? (
        <div className="px-6">
          <p className="text-sm" style={{ color: 'var(--cream-dim)' }}>
            Reset link sent to <strong style={{ color: 'var(--cream)' }}>{email}</strong>. Check your inbox.
          </p>
          <div className="mt-6">
            <Link href="/auth/signin" className="text-sm" style={{ color: 'var(--coral)' }}>
              ← Back to sign in
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleReset} className="px-6 flex flex-col gap-4">
          <div>
            <label className="sec-label block">Email address</label>
            <input className="inp" type="email" placeholder="you@email.com" value={email}
              onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" className="btn-orange" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </button>

          <div className="mt-2">
            <Link href="/auth/signin" className="text-sm" style={{ color: 'var(--coral)' }}>
              ← Back to sign in
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
