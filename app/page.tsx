import Link from 'next/link';

const features = [
  {
    title: 'Single app workflow',
    description: 'Plan, build, and refine learning projects in one focused studio experience.',
  },
  {
    title: 'Reliable project foundation',
    description: 'Built on PostgreSQL + Prisma with a shared API contract for predictable behavior.',
  },
  {
    title: 'Secure by default',
    description: 'Session-based authentication with httpOnly cookies keeps sign-in secure and familiar.',
  },
];

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '4rem 1.25rem 5rem' }}>
      <section
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          borderRadius: 24,
          backgroundColor: '#ffffff',
          boxShadow: '0 15px 45px rgba(15, 23, 42, 0.08)',
          border: '1px solid #e2e8f0',
        }}
      >
        <p
          style={{
            margin: 0,
            display: 'inline-block',
            padding: '0.35rem 0.75rem',
            borderRadius: 999,
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          Interactive Learning Studio
        </p>

        <h1 style={{ margin: '1.25rem 0 1rem', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15 }}>
          Build learning projects with a clean, local-first studio
        </h1>

        <p style={{ maxWidth: 680, margin: '0 auto', color: '#475569', fontSize: '1.1rem', lineHeight: 1.7 }}>
          Ship faster with a minimal Next.js foundation that already includes project APIs, auth flows, and a focused
          workspace for creators.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link
            href="/signup"
            style={{
              padding: '0.75rem 1.2rem',
              borderRadius: 10,
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Get Started
          </Link>
          <Link
            href="/login"
            style={{
              padding: '0.75rem 1.2rem',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              textDecoration: 'none',
              backgroundColor: '#fff',
              fontWeight: 600,
            }}
          >
            Log in
          </Link>
          <Link
            href="/studio"
            style={{
              padding: '0.75rem 1.2rem',
              borderRadius: 10,
              color: '#334155',
              textDecoration: 'none',
              backgroundColor: '#f8fafc',
              fontWeight: 600,
            }}
          >
            Open Studio
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Everything you need to start quickly</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>A simple product shell designed for clarity and momentum.</p>

        <div
          style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: '1.1rem',
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.04)',
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{feature.title}</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
