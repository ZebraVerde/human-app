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
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/home')
      router.refresh()
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--navy)' }}>
      {/* Header */}
      <div className="pt-16 pb-6 px-6">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--coral)' }}>
          HUMAN · Ticket App
        </p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>
          Sign in to your account
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSignIn} className="flex-1 px-6 flex flex-col gap-4">
        <div>
          <label className="sec-label block">Email</label>
          <input
            className="inp"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label className="sec-label block">Password</label>
          <input
            className="inp"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <div className="mt-2 text-right">
            <Link href="/auth/forgot-password" className="text-xs" style={{ color: 'var(--coral)' }}>
              Forgot password?
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button type="submit" className="btn-orange mt-2" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <button type="button" className="btn-ghost" onClick={handleGoogle}>
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4" style={{ color: 'var(--cream-dim)' }}>
          No account?{' '}
          <Link href="/auth/signup" style={{ color: 'var(--coral)' }}>
            Create account
          </Link>
        </p>
      </form>

      {/* Bottom safe area */}
      <div className="h-8" />
    </div>
  )
}
