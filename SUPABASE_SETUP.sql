-- WARNING: This script will DROP existing tables to ensure correct schema.
-- This is necessary because your existing 'users' table likely has an integer ID,
-- but Supabase Auth requires UUIDs.

-- 1. Drop existing tables (Reverse order of dependencies)
drop table if exists public.feedback;
drop table if exists public.users;

-- 2. Create a public 'users' table to store profile data
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  username text,
  display_name text,
  email text,
  role text check (role in ('student', 'trainer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- 4. Create policies
create policy "Public profiles are viewable by everyone"
  on public.users for select
  using ( true );

create policy "Users can insert their own profile"
  on public.users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.users for update
  using ( auth.uid() = id );

-- 5. Create 'feedback' table
create table public.feedback (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id),
  feedback_type text,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Enable RLS for feedback
alter table public.feedback enable row level security;

-- 7. Create policies for feedback
create policy "Anyone can insert feedback"
  on public.feedback for insert
  with check ( true );

create policy "Anyone can view feedback"
  on public.feedback for select
  using ( true );
