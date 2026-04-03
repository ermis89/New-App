import type { ReactNode } from 'react';

export const metadata = {
  title: 'Interactive Learning Studio',
  description: 'Local-first v1 foundation',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          margin: 0,
          color: '#0f172a',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 35%, #ffffff 100%)',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
