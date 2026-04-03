'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
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

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: { message?: string } };
      setError(data.error?.message ?? 'Login failed');
      setLoading(false);
      return;
    }

    router.push('/studio');
    router.refresh();
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1.25rem' }}>
      <section
        style={{
          width: '100%',
          maxWidth: 460,
          backgroundColor: '#fff',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
          padding: '1.75rem',
        }}
      >
        <p style={{ margin: 0, color: '#2563eb', fontWeight: 600, fontSize: '0.9rem' }}>Welcome back</p>
        <h1 style={{ margin: '0.55rem 0 0.5rem', fontSize: '1.75rem' }}>Log in</h1>
        <p style={{ marginTop: 0, color: '#64748b' }}>Continue where you left off in your studio workspace.</p>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: '1.1rem' }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            style={{ padding: '0.72rem 0.8rem', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.98rem' }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            style={{ padding: '0.72rem 0.8rem', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.98rem' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem',
              borderRadius: 10,
              border: 'none',
              backgroundColor: '#2563eb',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {error ? <p style={{ color: 'crimson', marginBottom: 0 }}>{error}</p> : null}

        <p style={{ color: '#64748b', marginBottom: 0 }}>
          Need an account?{' '}
          <Link href="/signup" style={{ color: '#1d4ed8', fontWeight: 600, textDecoration: 'none' }}>
            Create one
          </Link>
        </p>
        <p style={{ marginTop: 8 }}>
          <Link href="/" style={{ color: '#475569', textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </p>
      </section>
    </main>
  );
}
