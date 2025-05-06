import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/context/AuthProvider';

export const metadata: Metadata = {
  title: 'Circuit Cart Admin',
  description: 'Admin panel for Circuit Cart system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}