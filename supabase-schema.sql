-- Constructor × A2RL — backend schema (run once in Supabase → SQL Editor)
-- Creates the tables the app syncs to. Safe to re-run.

-- Shared + per-user JSON documents:
--   'cxa2rl.tasks'            → the Event Control board (shared)
--   'cxa2rl.guests'          → the guest list (shared)
--   'cxa2rl.predict:<name>'  → a VIP's podium bet order (per user)
--   'cxa2rl.predictLocked:<name>' → whether their bet is locked (per user)
--   'cxa2rl.booking:<name>'  → a VIP's garage-visit booking (per user)
create table if not exists public.app_state (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

-- Append-only activity log (sign-ins, page views, key actions)
create table if not exists public.activity (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null,
  action text not null,
  detail text,
  created_at timestamptz default now()
);
create index if not exists activity_created_idx on public.activity (created_at);

-- Realtime (ignore "already member" errors if you re-run)
do $$ begin
  alter publication supabase_realtime add table public.app_state;
exception when others then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.activity;
exception when others then null; end $$;

-- Row Level Security.
-- DEMO policy: the public anon key gets full access. This is fine for an
-- invite-only demo; tighten (e.g. auth-based policies) before real production.
alter table public.app_state enable row level security;
alter table public.activity  enable row level security;

drop policy if exists "anon all app_state" on public.app_state;
drop policy if exists "anon all activity"  on public.activity;
create policy "anon all app_state" on public.app_state for all using (true) with check (true);
create policy "anon all activity"  on public.activity  for all using (true) with check (true);
