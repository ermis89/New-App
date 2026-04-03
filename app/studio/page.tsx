import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUserFromSession } from '@/lib/auth/session';

export default async function StudioPage() {
  const user = await getCurrentUserFromSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="page-shell">
      <header className="top-nav card">
        <div>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 700, fontSize: '0.85rem' }}>Studio Dashboard</p>
          <h1 style={{ margin: '0.35rem 0 0', fontSize: '1.45rem' }}>Welcome back, {user.name ?? user.email}</h1>
        </div>
        <div className="action-row">
          <Link href="/" className="ghost-button">
            Home
          </Link>
          <Link href="/studio" className="soft-button">
            Refresh view
          </Link>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="danger-button">
              Log out
            </button>
          </form>
        </div>
      </header>

      <section className="dashboard-grid">
        <article className="card panel">
          <h2>Project workspace</h2>
          <p>
            Use this dashboard as the command center for your learning product. Your current setup is connected to
            auth, API routes, and Prisma-backed storage.
          </p>
          <p className="code-pill">POST /api/projects</p>
          <div className="grid-3" style={{ marginTop: '0.9rem' }}>
            <div className="metric">
              <strong>Projects API</strong>
              <span style={{ color: '#64748b' }}>Create and list projects via existing backend routes.</span>
            </div>
            <div className="metric">
              <strong>Session state</strong>
              <span style={{ color: '#64748b' }}>User context is protected by server-side session checks.</span>
            </div>
            <div className="metric">
              <strong>Growth ready</strong>
              <span style={{ color: '#64748b' }}>Add widgets, charts, and editing flows on top of this layout.</span>
            </div>
          </div>
        </article>

        <aside className="stack">
          <section className="card panel">
            <h3>Quick actions</h3>
            <ul>
              <li>Open an API client and create a new project record.</li>
              <li>Expand studio modules with your own data visualizations.</li>
              <li>Iterate on user workflows without touching auth internals.</li>
            </ul>
          </section>

          <section className="card panel" style={{ background: 'linear-gradient(165deg, #ffffff, #f8fafc)' }}>
            <h3>Current account</h3>
            <p style={{ margin: 0 }}>
              Signed in as <strong>{user.email}</strong>
            </p>
            <p style={{ marginBottom: 0 }}>Keep this panel for profile details, workspace switching, or billing info.</p>
          </section>
        </aside>
      </section>
    </main>
  );
}
