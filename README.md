# Idea Spark Board

A two-part application:  
1. **Landing page** – marketing site with hero, features, and CTA.  
2. **Idea Board** – anonymous, persistent board where users can post ideas (max 280 chars) and upvote them.

---

## 🚀 Overview & Architecture

- **Frontend**: React.js (Vite) + TailwindCSS  

  - By default, communicates directly with **Supabase** using the anon key.  

- **Backend**: Node.js + Express (TypeScript)  
  - Provides REST API that wraps Supabase operations (`/ideas`, `/ideas/:id/upvote`).  
  - Uses **service role key** (secure, not exposed to clients).  

- **Database**: Supabase (Postgres)  
  - Table: `ideas` with columns:
    - `id` (uuid, primary key)  
    - `text` (max 280 chars)  
    - `upvotes` (int, default 0)  
    - `created_at` (timestamp, default now)  

- **Containerization**:  
  - `Dockerfile` in `frontend/` and `backend/`  
  - `docker-compose.yml` in repo root  
  - Optional Kubernetes manifests in `k8s/`  

- **Why this design**:  
  - Frontend-only (Supabase direct) = fastest demo.  
  - Backend included = shows API design, Docker, and production-ready patterns.  

---



---

## ⚙️ Environment Variables

### Root `.env` (not committed)
```env
SUPABASE_URL=https://<your-supabase-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
SUPABASE_ANON_KEY=<your-anon-key>


VITE_SUPABASE_URL=https://<your-supabase-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
# If using backend API instead of direct Supabase:
# VITE_API_URL=http://localhost:4000


SUPABASE_URL=https://<your-supabase-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
PORT=4000



🐳 Run Locally with Docker Compose (Recommended)

Copy .env.example files into .env and fill in values.

Build & start:

docker compose up --build


📡 API Endpoints (Backend)

Base URL: http://localhost:4000

GET /ideas

Get all ideas.

[
  { "id": "uuid", "text": "My idea", "upvotes": 3, "created_at": "2025-10-01T..." }
]

POST /ideas

Create a new idea.

{ "text": "My new idea" }

POST /ideas/:id/upvote

Increment upvotes for an idea.

🗄️ Database Schema (Supabase)
CREATE TABLE public.ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL CHECK (char_length(text) <= 280),
  upvotes integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);


Optional RPC for atomic upvote:

create or replace function public.increment_upvote(idea_id uuid)
returns void as $$
begin
  update public.ideas set upvotes = upvotes + 1 where id = idea_id;
end;
$$ language plpgsql;

☸️ Kubernetes (Bonus)

k8s/ contains manifests for frontend & backend:

deployment-frontend.yaml

deployment-backend.yaml

service-frontend.yaml

service-backend.yaml

ingress.yaml

secret-supabase.yaml (example only — don’t commit real keys)

Apply with:

kubectl apply -f k8s/

🛠️ Troubleshooting Docker (DNS/Network)

If you see errors like:

failed to resolve source metadata for docker.io/library/node:20-bullseye
no such host


This is a Docker DNS issue, not app code.

✅ Fix:

Create C:\ProgramData\Docker\config\daemon.json:

{
  "dns": ["1.1.1.1", "8.8.8.8", "8.8.4.4"],
  "features": { "buildkit": true }
}


Restart Docker:

wsl --shutdown


Then restart Docker Desktop.

Test:

docker run --rm alpine nslookup google.com
docker pull hello-world

🔑 Security Notes

Never commit .env with secrets.

Frontend → only uses anon key.

Backend → uses service role key (server-only).

.env.example files included for safe reference.

📌 Trade-offs & Notes for Reviewers

Frontend defaults to direct Supabase for easiest demo.

Backend included to demonstrate API design + Docker + K8s.

If Docker is blocked by network/proxy, run via npm run dev as documented.

All requirements met; K8s manifests included as bonus.
