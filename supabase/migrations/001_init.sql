-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  phone text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Tickets table
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  quantity int not null default 1 check (quantity >= 1 and quantity <= 4),
  unit_price_cents int not null default 9900,
  total_cents int not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  qr_code text unique default gen_random_uuid()::text,
  attendee_name text,
  attendee_email text,
  attendee_phone text,
  created_at timestamptz default now() not null
);

-- Invite links table (for crew sharing)
create table public.invite_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  code text unique default substr(gen_random_uuid()::text, 1, 8),
  created_at timestamptz default now() not null
);

-- RLS: profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- RLS: tickets
alter table public.tickets enable row level security;

create policy "Users can view own tickets"
  on public.tickets for select
  using (auth.uid() = user_id);

create policy "Users can insert own tickets"
  on public.tickets for insert
  with check (auth.uid() = user_id);

-- RLS: invite_links
alter table public.invite_links enable row level security;

create policy "Users can view own invite links"
  on public.invite_links for select
  using (auth.uid() = user_id);

create policy "Users can insert own invite links"
  on public.invite_links for insert
  with check (auth.uid() = user_id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Grant access
grant usage on schema public to anon, authenticated;
grant all on public.profiles to authenticated;
grant all on public.tickets to authenticated;
grant all on public.invite_links to authenticated;
