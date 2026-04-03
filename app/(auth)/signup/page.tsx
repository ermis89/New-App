'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const name = String(formData.get('name') ?? '');

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: { message?: string } };
      setError(data.error?.message ?? 'Signup failed');
      setLoading(false);
      return;
    }

    router.push('/studio');
    router.refresh();
  }

  return (
    <main style={{ maxWidth: 420, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input name="name" placeholder="Name (optional)" />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password (min 8 chars)" required minLength={8} />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      </form>
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
    </main>
  );
}
