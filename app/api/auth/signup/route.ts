import { prisma } from '@/lib/db/prisma';
import { errorResponse } from '@/lib/api/errors';
import { hashPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { setSessionCookie } from '@/lib/auth/cookies';
import { parseAuthPayload } from '@/lib/validation/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseAuthPayload(body, true);

    if (!payload) {
      return errorResponse('VALIDATION_ERROR', 'Invalid signup payload.', 400);
    }

    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      return errorResponse('CONFLICT', 'Email already exists.', 409);
    }

    const user = await prisma.user.create({
      data: {
        email: payload.email,
        passwordHash: hashPassword(payload.password),
        name: payload.name,
      },
    });

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
      { status: 201 },
    );
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Signup failed.', 500);
  }
}
