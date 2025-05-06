import { auth } from '@/config/firebase';
import { redirect } from 'next/navigation';

export async function checkAdminAccess() {
  const { user } = await auth;
  if (!user) {
    redirect('/login');
  }
  // Add additional admin checks if needed
}