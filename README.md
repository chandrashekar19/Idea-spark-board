# Idea Board — Landing + Mini App

## Overview
Two-part web app:
- Landing page (React.Js + Tailwind)
- Idea Board with anonymous idea posting & upvotes.

Backend: Node.js + Javscript  + Express  
Database: Supabase (hosted)  
Containerization: Docker & docker-compose

## Quick start

1. Copy `.env.example` to `.env` and fill SUPABASE_URL and SUPABASE_ANON_KEY from your Supabase project.
2. Run:
   ```bash
   docker-compose up --build
   ```
3. Frontend: http://localhost:3000  
   Backend API: http://localhost:4000/api/ideas

## API
- GET /api/ideas
- POST /api/ideas { text }
- POST /api/ideas/:id/upvote

## Supabase table schema

```sql
create table if not exists public.ideas (
  id bigserial primary key,
  text varchar(280) not null,
  upvotes integer not null default 0,
  created_at timestamptz default now()
);
```
