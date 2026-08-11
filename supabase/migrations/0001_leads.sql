-- Shared lead table for every Team Arora landing page.
--
-- One table, one Supabase project, one dashboard. Each site stamps its own
-- `project` slug on insert, so filtering by campaign is a WHERE clause rather
-- than a separate database.
--
-- Generic columns are the ones every landing page has. Anything site-specific
-- (here: realtor status, budget band, move-in timeline) goes in `details` as
-- JSONB, so launching a new site never requires a migration. That is the part
-- that actually makes this scale to unlimited pages.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  -- Which site this came from. Never null: an unattributed lead is unusable.
  project      text not null,
  domain       text,

  -- The generic contact shape shared across every landing page.
  name         text,
  email        text not null,
  phone        text,
  message      text,

  -- Per-site answers. Keeps the schema stable as new sites are added.
  details      jsonb not null default '{}'::jsonb,

  -- Attribution, for when ads are running.
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  referer      text,

  -- Light forensics for spam triage. No raw IP is stored.
  user_agent   text,
  ip_hash      text
);

-- The dashboard query is "latest leads for one project", so index for it.
create index if not exists leads_project_created_idx
  on public.leads (project, created_at desc);

create index if not exists leads_created_idx
  on public.leads (created_at desc);

create index if not exists leads_email_idx
  on public.leads (lower(email));

-- RLS on with NO policies: anon and authenticated can do nothing at all.
-- Inserts happen server-side with the service role key, which bypasses RLS.
--
-- This is the important line. Without it, the anon key that ships in any
-- browser bundle could read every lead the brokerage has ever captured.
alter table public.leads enable row level security;

comment on table public.leads is
  'Landing page lead captures across all Team Arora project sites. Written server-side with the service role key only; RLS denies all client access.';
