import type { ReactNode } from 'react';

export const metadata = {
  title: 'Interactive Learning Studio',
  description: 'Local-first v1 foundation',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>{children}</body>
    </html>
  );
}
