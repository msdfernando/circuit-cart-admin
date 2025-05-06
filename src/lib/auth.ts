import { auth } from '@/config/firebase';
import { redirect } from 'next/navigation';

export async function checkAdminAccess() {
  return new Promise<void>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      if (!user) {
        // Use window.location for client-side redirect
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
          return;
        }
        // Server-side redirect
        redirect('/login');
      }
      resolve();
    });
  });
}