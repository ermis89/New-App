'use client';

import Link from 'next/link';
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

    try {
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
          <p className="eyebrow">Create your workspace</p>
          <h1 style={{ margin: '0.8rem 0 0.45rem', fontSize: '1.9rem' }}>Get started in minutes</h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Build your account once and jump straight into your studio dashboard.
          </p>

          <form onSubmit={onSubmit} className="form-grid">
            <fieldset disabled={loading} style={{ margin: 0, padding: 0, border: 'none', display: 'grid', gap: 12 }}>
              <label className="input-field">
                Name (optional)
                <input name="name" autoComplete="name" placeholder="Jane Doe" />
              </label>
              <label className="input-field">
                Email
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label className="input-field">
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                />
              </label>
            </fieldset>
            <button type="submit" disabled={loading} className="button" style={{ width: '100%' }}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {error ? (
            <p role="alert" className="error-text">
              {error}
            </p>
          ) : null}

          <p style={{ color: '#64748b', marginBottom: 0 }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>
              Log in
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
            New account perks
          </p>
          <h2>Launch your product with a polished starting point.</h2>
          <p>Create an account to unlock the studio and start organizing your first learning project.</p>
          <ul>
            <li>Fast onboarding with clear form hierarchy.</li>
            <li>Dashboard UX focused on action and clarity.</li>
            <li>Backend flows untouched and fully compatible.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
