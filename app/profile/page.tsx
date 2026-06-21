import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import SignOutButton from '@/components/SignOutButton'

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone')
    .eq('id', user!.id)
    .maybeSingle()

  return (
    <div className="phone-shell flex flex-col pb-24">
      <div className="pt-14 pb-6 px-6">
        <p className="sec-label">Account</p>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--cream)' }}>Profile</h1>
      </div>

      <div className="px-6 flex flex-col gap-4">
        {/* Email */}
        <div style={{ borderBottom: '1px solid rgba(197,96,58,0.2)', paddingBottom: 16 }}>
          <p className="sec-label">Email</p>
          <p className="text-sm" style={{ color: 'var(--cream)' }}>{user?.email}</p>
        </div>

        {/* Name */}
        {profile?.full_name && (
          <div style={{ borderBottom: '1px solid rgba(197,96,58,0.2)', paddingBottom: 16 }}>
            <p className="sec-label">Name</p>
            <p className="text-sm" style={{ color: 'var(--cream)' }}>{profile.full_name}</p>
          </div>
        )}

        {/* Sign out */}
        <div className="mt-4">
          <SignOutButton />
        </div>

        {/* Contact */}
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(197,96,58,0.2)' }}>
          <p className="text-xs mb-2" style={{ color: 'var(--cream-dim)' }}>Need help?</p>
          <a
            href="mailto:human@danielsanogueira.com"
            className="text-sm"
            style={{ color: 'var(--coral)' }}
          >
            human@danielsanogueira.com
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
