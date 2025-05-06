import Sidebar from '@/components/admin/Sidebar';
import { checkAdminAccess } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAdminAccess();
  
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