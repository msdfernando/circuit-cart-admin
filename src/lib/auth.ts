import { auth } from '@/config/firebase';
import { redirect } from 'next/navigation';

export async function checkAdminAccess() {
  try {
    await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        if (!user) {
          redirect('/login');
        }
        resolve(user);
      }, reject);
    });
  } catch (error) {
    console.error('Auth check failed:', error);
    redirect('/login');
  }
}