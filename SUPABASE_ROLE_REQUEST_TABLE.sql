-- Create 'request_role_change' table
create table if not exists public.request_role_change (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id),
  name text,
  email text,
  requested_role text,
  description text,
  status text default 'pending', -- pending, approved, rejected
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for request_role_change
alter table public.request_role_change enable row level security;

-- Create policies
create policy "Anyone can insert role change requests"
  on public.request_role_change for insert
  with check ( true );

create policy "Users can view their own requests"
  on public.request_role_change for select
  using ( auth.uid() = user_id );

create policy "Admins can view all requests"
  on public.request_role_change for select
  using ( exists (
    select 1 from public.users
    where users.id = auth.uid() and users.role = 'admin'
  ));
