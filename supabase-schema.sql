-- SamuiKids.com Activity Table
-- Run this in Supabase SQL Editor

create table if not exists activities (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  short_desc       text not null,
  description      text not null,
  category         text not null,
  tags             text[] default '{}',
  age_groups       text[] default '{}',
  price_range      text not null default 'budget',
  price_note       text not null default '',
  lat              numeric not null,
  lng              numeric not null,
  address          text not null default '',
  area             text not null default '',
  photos           text[] default '{}',
  opening_hours    text,
  website          text,
  phone            text,
  featured         boolean not null default false,
  popularity       int not null default 5,
  audience         text not null default 'family',
  drop_off         boolean default false,
  member_discount  boolean default false,
  session_type     text,
  session_lengths  text[] default '{}',
  all_day_option   boolean default false,
  age_min          int,
  age_max          int,
  english_spoken   boolean default false,
  has_food         boolean default false,
  has_drinks       boolean default false,
  legally_registered boolean default true,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-update updated_at on any row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger activities_updated_at
  before update on activities
  for each row execute function update_updated_at();

-- Public read access (site reads all activities)
alter table activities enable row level security;
create policy "Public read" on activities for select using (true);

-- Service role can do everything (admin panel uses service role key)
create policy "Service role full access" on activities
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
