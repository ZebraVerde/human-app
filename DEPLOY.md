# HUMAN App — Deploy Guide

## What you need before deploying
- Supabase project (already created ✅)
- Stripe account (already created ✅)
- GitHub repo `human-app` (already created ✅)
- Domain `dsn.show` on Namecheap (already have ✅)

---

## Step 1 — Run the database migration

1. Go to **supabase.com → your project → SQL Editor**
2. Paste the contents of `supabase/migrations/001_init.sql`
3. Click **Run**

---

## Step 2 — Get your Supabase keys

1. Go to **Project Settings → API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 3 — Get your Stripe keys

1. Go to **stripe.com/dashboard → Developers → API keys**
2. Copy:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

(Leave `STRIPE_WEBHOOK_SECRET` blank for now — you'll get it in Step 6.)

---

## Step 4 — Push code to GitHub

Open Terminal and run:

```bash
cd /Users/zebraverde/Claude/Projects/v3/human-app
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/ZebraVerde/human-app.git
git push -u origin main
```

---

## Step 5 — Deploy to Vercel

1. Go to **vercel.com → Add New Project**
2. Import the `human-app` GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Add these **Environment Variables** before deploying:

```
NEXT_PUBLIC_SUPABASE_URL=https://nrayqwjduomuapuivksq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://dsn.show
STRIPE_WEBHOOK_SECRET=  ← fill in after Step 6
```

5. Click **Deploy**

---

## Step 6 — Set up Stripe webhook

1. Go to **stripe.com → Developers → Webhooks → Add endpoint**
2. URL: `https://dsn.show/api/stripe/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `checkout.session.expired`
4. Copy the **Signing secret** → paste as `STRIPE_WEBHOOK_SECRET` in Vercel
5. In Vercel: **Settings → Environment Variables** → add it → **Redeploy**

---

## Step 7 — Point dsn.show to Vercel

In **Vercel → your project → Settings → Domains**:
1. Add `dsn.show`
2. Vercel will show you DNS records to add

In **Namecheap → dsn.show → Manage → Advanced DNS**:
- Delete existing A/CNAME records
- Add the records Vercel gives you (usually an A record + CNAME)

DNS propagates in ~10–30 minutes.

---

## Step 8 — Enable Google Sign-In (optional)

1. Go to **Supabase → Authentication → Providers → Google**
2. Follow the guide to create OAuth credentials in Google Cloud Console
3. Paste the Client ID + Secret into Supabase
4. Add `https://dsn.show` as an authorised redirect URI

---

## Step 9 — Enable Supabase email auth

1. Go to **Supabase → Authentication → URL Configuration**
2. Set **Site URL** to `https://dsn.show`
3. Add `https://dsn.show/**` to **Redirect URLs**

---

## Content to fill in before launch

Edit these files with real content:

| File | What to fill in |
|------|----------------|
| `app/page.tsx` line ~80 | About section description (2–3 sentences about HUMAN) |
| `app/getting-there/page.tsx` | Parking lot names / addresses |
| `app/layout.tsx` | OG image once you have event artwork |

---

## Local development

```bash
cd human-app
npm install
cp .env.example .env.local
# fill in .env.local with your keys
npm run dev
```

Open http://localhost:3000
