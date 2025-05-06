import Sidebar from '@/components/admin/Sidebar';
import { checkAdminAccess } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAdminAccess();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}