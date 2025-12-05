-- Supabase SQL schema for CMS
-- Run inside Supabase SQL editor.

create table if not exists public.users (
  id uuid primary key,
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

create table if not exists public.about (
  id text primary key,
  content text,
  updated_at timestamptz default now()
);

create table if not exists public.skills (
  id uuid primary key,
  name text not null,
  level text,
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key,
  title text not null,
  description text,
  url text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists public.blogs (
  id uuid primary key,
  title text not null,
  content text,
  cover_image text,
  published_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.experience (
  id uuid primary key,
  company text not null,
  role text,
  start_date date,
  end_date date,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key,
  author text not null,
  role text,
  message text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key,
  title text not null,
  description text,
  price text,
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.media (
  id uuid primary key,
  url text not null,
  filename text,
  created_at timestamptz default now()
);

-- Basic RLS policies (adjust as needed)
-- Enable RLS
alter table public.users enable row level security;
alter table public.about enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.blogs enable row level security;
alter table public.experience enable row level security;
alter table public.testimonials enable row level security;
alter table public.services enable row level security;
alter table public.messages enable row level security;
alter table public.media enable row level security;

-- Allow service role full access; public read for content tables
create policy if not exists "Public read content" on public.about for select using (true);
create policy if not exists "Public read content" on public.skills for select using (true);
create policy if not exists "Public read content" on public.projects for select using (true);
create policy if not exists "Public read content" on public.blogs for select using (true);
create policy if not exists "Public read content" on public.experience for select using (true);
create policy if not exists "Public read content" on public.testimonials for select using (true);
create policy if not exists "Public read content" on public.services for select using (true);

-- Admin inserts/updates/deletes are expected via service role key (server only)
-- Messages can be inserted publicly (contact form)
create policy if not exists "Public insert messages" on public.messages for insert with check (true);
create policy if not exists "Public insert media" on public.media for insert with check (auth.role() = 'service_role');

-- Storage bucket reminder
-- Create a bucket named 'media' with public access for read.
