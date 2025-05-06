'use client'; // Add this at the top
import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { checkAdminAccess } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAdminAccess()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}