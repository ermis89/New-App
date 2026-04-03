import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUserFromSession } from '@/lib/auth/session';

export default async function StudioPage() {
  const user = await getCurrentUserFromSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <main style={{ maxWidth: 1120, margin: '0 auto', padding: '1.25rem 1.25rem 2.5rem' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Studio</p>
          <h1 style={{ margin: '0.3rem 0 0', fontSize: '1.6rem' }}>Welcome, {user.name ?? user.email}</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link
            href="/"
            style={{
              padding: '0.6rem 0.9rem',
              border: '1px solid #cbd5e1',
              borderRadius: 10,
              textDecoration: 'none',
              color: '#0f172a',
              backgroundColor: '#fff',
            }}
          >
            Home
          </Link>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              style={{
                padding: '0.6rem 0.9rem',
                border: '1px solid #fecaca',
                borderRadius: 10,
                backgroundColor: '#fff5f5',
                color: '#b91c1c',
                cursor: 'pointer',
              }}
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 14,
          alignItems: 'start',
        }}
      >
        <article
          style={{
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            backgroundColor: '#fff',
            padding: '1.2rem',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
          }}
        >
          <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.15rem' }}>Project workspace</h2>
          <p style={{ color: '#475569', marginTop: 0, lineHeight: 1.6 }}>
            Your project canvas will appear here as features are added. For now, use the existing API endpoint to
            create projects and manage data in v1.
          </p>
          <p
            style={{
              margin: 0,
              padding: '0.8rem',
              borderRadius: 10,
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '0.9rem',
            }}
          >
            POST /api/projects
          </p>
        </article>

        <aside
          style={{
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            backgroundColor: '#fff',
            padding: '1.1rem',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
          }}
        >
          <h3 style={{ margin: '0 0 0.6rem', fontSize: '1rem' }}>Quick actions</h3>
          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#475569', lineHeight: 1.7 }}>
            <li>Open your project API client.</li>
            <li>Create a new project record.</li>
            <li>Iterate on the studio experience.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
