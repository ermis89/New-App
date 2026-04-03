import { cookies } from 'next/headers';
import { errorResponse } from '@/lib/api/errors';
import { clearSessionCookie } from '@/lib/auth/cookies';
import { revokeSessionByToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      await revokeSessionByToken(token);
    }

    await clearSessionCookie();
    return new Response(null, { status: 204 });
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Logout failed.', 500);
  }
}
