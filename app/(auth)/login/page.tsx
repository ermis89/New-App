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

    try {
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
        return;
      }

      router.push('/studio');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-layout card">
        <div className="auth-panel">
          <p className="eyebrow">Welcome back</p>
          <h1 style={{ margin: '0.8rem 0 0.45rem', fontSize: '1.9rem' }}>Log in to your studio</h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Access your dashboard, continue your projects, and keep momentum.
          </p>

          <form onSubmit={onSubmit} className="form-grid">
            <fieldset disabled={loading} style={{ margin: 0, padding: 0, border: 'none', display: 'grid', gap: 12 }}>
              <label className="input-field">
                Email
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label className="input-field">
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Your password"
                  required
                />
              </label>
            </fieldset>
            <button type="submit" disabled={loading} className="button" style={{ width: '100%' }}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          {error ? (
            <p role="alert" className="error-text">
              {error}
            </p>
          ) : null}

          <p style={{ color: '#64748b', marginBottom: 0 }}>
            Need an account?{' '}
            <Link href="/signup" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
          <p style={{ marginTop: 8 }}>
            <Link href="/" style={{ color: '#475569', textDecoration: 'none' }}>
              ← Back to home
            </Link>
          </p>
        </div>

        <aside className="auth-side">
          <p className="eyebrow" style={{ background: '#1e40af', color: '#dbeafe' }}>
            Product workspace
          </p>
          <h2>Everything in one clean studio experience.</h2>
          <p>
            Sign in to manage projects, coordinate your workflow, and build learning products with a focused dashboard.
          </p>
          <ul>
            <li>Session-based auth with secure defaults.</li>
            <li>Reliable API endpoints already available.</li>
            <li>Structured UI ready for production iteration.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
