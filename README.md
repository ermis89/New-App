# Interactive Learning Studio (Phase 0)

This repository contains the **Phase 0 foundation** for a local-first, self-hostable v1 architecture.

## Implemented in Phase 0

- Single Next.js application foundation
- Local PostgreSQL setup via Docker Compose
- Prisma integration
- Locked core models: `User`, `Session`, `Project`
- Shared API error response contract (`error.code`, `message`, `details`)
- Health endpoint (`/api/health`)

## Local run steps

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Start PostgreSQL locally:
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```
4. Run migrations:
   ```bash
   npm run prisma:migrate -- --name init_phase0
   ```
5. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
6. Start the app:
   ```bash
   npm run dev
   ```

## API error response contract

All API routes should return errors in this shape:

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Manual verification checklist (Phase 0)

- [ ] `docker compose` Postgres is healthy.
- [ ] Prisma migration succeeds.
- [ ] App runs at `http://localhost:3000`.
- [ ] `GET /api/health` returns `200` and `{ "status": "ok" ... }`.
- [ ] Landing page loads and shows Phase 0 foundation text.

## Notes

- Auth flows are intentionally deferred to **Phase 1**.
- This phase includes only foundational setup and locked schema prerequisites.
