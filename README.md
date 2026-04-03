# Interactive Learning Studio (Local-first v1)

Single Next.js application with PostgreSQL + Prisma and explicit server-side session auth.

## Implemented

- Single app architecture (no separate API service)
- Local PostgreSQL via Docker Compose
- Prisma models: `User`, `Session`, `Project`
- Server-side session authentication using `httpOnly` cookie (`sid`)
- Multiple sessions per user supported
- No session rotation
- Session revoked only on logout (or expiry)
- Centralized API error response contract
- Basic project APIs with ownership checks

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
   npm run prisma:migrate -- --name init
   ```
5. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
6. Start app:
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

## Shared API error contract

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
- [ ] Signup creates account and logs in user.
- [ ] Login works with valid credentials.
- [ ] Logout revokes only current session.
- [ ] `/studio` redirects to `/login` when not authenticated.
- [ ] Authenticated user can call `POST /api/projects` and then `GET /api/projects`.
