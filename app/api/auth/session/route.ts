import { errorResponse } from '@/lib/api/errors';
import { getCurrentUserFromSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const user = await getCurrentUserFromSession();

    if (!user) {
      return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
    }

    return Response.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Session check failed.', 500);
  }
}
