import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

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
          {/* No sidebar here - it's in (admin) layout */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}