import Link from 'next/link';

const features = [
  {
    title: 'Unified product workflow',
    description: 'Define learning goals, structure content, and move from idea to launch in a single studio.',
  },
  {
    title: 'Reliable API + data layer',
    description: 'Backed by Prisma and PostgreSQL foundations so your project flow stays predictable at scale.',
  },
  {
    title: 'Auth-ready foundation',
    description: 'Secure session-based authentication keeps onboarding and day-to-day usage dependable.',
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <nav className="top-nav card">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Interactive Learning Studio</span>
        </div>
        <div className="nav-links">
          <Link href="/login" className="ghost-button">
            Log in
          </Link>
          <Link href="/signup" className="button">
            Start free
          </Link>
        </div>
      </nav>

      <section className="hero">
        <article className="card hero-main">
          <p className="eyebrow">Product-ready Next.js starter</p>
          <h1>Design, launch, and manage learning experiences with confidence.</h1>
          <p className="lead">
            This is more than a scaffold: it is a polished application shell with clear information hierarchy, auth
            flows, and a studio workspace ready for feature growth.
          </p>
          <div className="action-row" style={{ marginTop: '1.2rem' }}>
            <Link href="/signup" className="button">
              Create workspace
            </Link>
            <Link href="/studio" className="ghost-button">
              Open studio dashboard
            </Link>
          </div>

          <div className="metrics">
            <div className="metric">
              <strong>Fast setup</strong>
              <span style={{ color: '#64748b' }}>Routing, auth, and data primitives already wired.</span>
            </div>
            <div className="metric">
              <strong>3 Core APIs</strong>
              <span style={{ color: '#64748b' }}>Session, auth, and projects endpoints available immediately.</span>
            </div>
            <div className="metric">
              <strong>Production feel</strong>
              <span style={{ color: '#64748b' }}>Layout, typography, and spacing designed like a real product.</span>
            </div>
          </div>
        </article>

        <aside className="card hero-side">
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Why teams use this foundation</h2>
          <ul>
            <li>Clear homepage messaging and conversion-focused call-to-action flow.</li>
            <li>Improved onboarding pages that reduce friction in signup and login.</li>
            <li>A dashboard-like studio layout that feels usable from day one.</li>
          </ul>
          <div className="card" style={{ padding: '0.9rem', background: '#f8fafc' }}>
            <p style={{ margin: 0, fontWeight: 600 }}>Built for momentum</p>
            <p style={{ margin: '0.35rem 0 0', color: '#64748b' }}>
              Keep your current backend and auth logic while shipping a significantly upgraded frontend.
            </p>
          </div>
        </aside>
      </section>

      <section className="section">
        <h2>Everything you need to ship version one</h2>
        <p className="section-subtitle">A polished structure with modern UI patterns and room for rapid iteration.</p>
        <div className="grid-3">
          {features.map((feature) => (
            <article key={feature.title} className="card feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
