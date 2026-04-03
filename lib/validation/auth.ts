export type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (!email || !email.includes('@') || email.length > 254) return null;
  return email;
}

function normalizePassword(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  if (value.length < 8 || value.length > 128) return null;
  return value;
}

export function parseAuthPayload(payload: unknown, allowName = false): AuthPayload | null {
  if (!payload || typeof payload !== 'object') return null;
  const body = payload as Record<string, unknown>;

  const email = normalizeEmail(body.email);
  const password = normalizePassword(body.password);

  if (!email || !password) return null;

  const result: AuthPayload = { email, password };

  if (allowName && typeof body.name === 'string') {
    const name = body.name.trim();
    if (name.length > 0) result.name = name.slice(0, 120);
  }

  return result;
}
