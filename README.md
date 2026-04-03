# Interactive Learning Studio

Local-first, self-hostable v1 foundation using a **single Next.js app** with **PostgreSQL + Prisma** and explicit **server-side session auth**.

## What is currently included

- Single app architecture (no separate API service)
- Prisma schema with `User`, `Session`, and `Project`
- Local PostgreSQL via Docker Compose
- Session auth with `httpOnly` cookie (`sid`)
  - multiple sessions per user supported
  - no rotation
  - revoke on logout (or expiry)
- Shared API error contract helper
- Auth routes + basic protected project routes

## Local run steps

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy environment file
   ```bash
   cp .env.example .env
   ```
3. Start PostgreSQL locally
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```
4. Run migrations
   ```bash
   npm run prisma:migrate -- --name init
   ```
5. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
6. Start the app
   ```bash
   npm run dev
   ```

## API summary

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

### Projects
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:projectId`

## Shared API error response contract

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Manual verification checklist

- [ ] `GET /api/health` returns 200.
- [ ] Signup creates account and authenticates user.
- [ ] Login works with valid credentials.
- [ ] Logout revokes only current session.
- [ ] `/studio` redirects to `/login` when unauthenticated.
- [ ] Authenticated user can create/list/read own projects.
