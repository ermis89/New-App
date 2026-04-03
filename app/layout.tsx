import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Interactive Learning Studio',
  description: 'Build and manage learning products in one focused studio.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
