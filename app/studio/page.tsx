import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUserFromSession } from '@/lib/auth/session';

export default async function StudioPage() {
  const user = await getCurrentUserFromSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Studio</h1>
      <p>Welcome, {user.name ?? user.email}.</p>
      <form action="/api/auth/logout" method="post">
        <button type="submit">Log out</button>
      </form>
      <p>
        Use the API to create projects in v1: <code>POST /api/projects</code>
      </p>
      <Link href="/">Back to home</Link>
    </main>
  );
}
