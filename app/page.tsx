import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: '3rem auto', padding: '0 1rem' }}>
      <h1>Interactive Learning Studio</h1>
      <p>Local-first single app with PostgreSQL, Prisma, and server-side session auth.</p>

      <ul>
        <li>Next.js single app</li>
        <li>PostgreSQL + Prisma</li>
        <li>Shared API error contract</li>
        <li>Session auth via httpOnly cookie</li>
      </ul>

      <p style={{ display: 'flex', gap: 12 }}>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Log in</Link>
        <Link href="/studio">Studio</Link>
      </p>
    </main>
  );
}
