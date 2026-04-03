import { prisma } from '@/lib/db/prisma';
import { errorResponse } from '@/lib/api/errors';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { setSessionCookie } from '@/lib/auth/cookies';
import { parseAuthPayload } from '@/lib/validation/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseAuthPayload(body);

    if (!payload) {
      return errorResponse('VALIDATION_ERROR', 'Invalid login payload.', 400);
    }

    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user || !verifyPassword(payload.password, user.passwordHash)) {
      return errorResponse('UNAUTHORIZED', 'Invalid email or password.', 401);
    }

    const session = await createSession(user.id);
    await setSessionCookie(session.token, session.expiresAt);

    return Response.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 },
    );
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Login failed.', 500);
  }
}
