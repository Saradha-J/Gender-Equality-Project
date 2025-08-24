# Gender Equality Platform — Backend (Express + SQLite)
## Quick Start
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
API:
- GET /api/health
- GET /api/reports
- POST /api/reports { is_anonymous, category, description }
- GET /api/reports/:id
- PATCH /api/reports/:id { status }
- GET /api/reports/:id/messages
- POST /api/reports/:id/messages { sender_role, message }
- GET /api/resources[?kind=article|video|policy|helpline]
- POST /api/resources { title, kind, url?, content?, tags? }

DB file at `./data/app.db` (auto-created). To reset: `npm run db:reset`.
