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
- Auth routes + protected project routes
- App routes for signup, login, and studio

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

7. Verify the app routes
   ```bash
   npm run build
   npm run dev
   ```
   In another terminal:
   ```bash
   curl -i http://localhost:3000/
   curl -i http://localhost:3000/login
   curl -i http://localhost:3000/signup
   curl -i http://localhost:3000/studio
   curl -i http://localhost:3000/api/health
   ```

> Note: Docker is required for the local PostgreSQL workflow above.

## API summary

### Health
- `GET /api/health`

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
- [ ] Homepage loads at `http://localhost:3000`.
- [ ] `/signup`, `/login`, and `/studio` routes load.
- [ ] Signup creates account and authenticates user.
- [ ] Login works with valid credentials.
- [ ] Logout revokes only current session.
- [ ] `/studio` redirects to `/login` when unauthenticated.
- [ ] Authenticated user can create/list/read own projects.
