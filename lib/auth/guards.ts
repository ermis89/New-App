import { getCurrentUserFromSession } from '@/lib/auth/session';

export async function requireUser() {
  return getCurrentUserFromSession();
}
