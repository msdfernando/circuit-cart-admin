import { auth } from '@/config/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'next/navigation';

// Helper function to check admin access
export async function checkAdminAccess() {
  return new Promise<void>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      unsubscribe(); // Clean up the listener
      if (!user) {
        redirect('/login');
      } else {
        resolve();
      }
    }, reject);
  });
}

// Type for our auth user
export interface AuthUser {
  uid: string;
  email: string | null;
  // Add other user properties you need
}

// Get current user (client-side)
export function getCurrentUser(): Promise<AuthUser | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user ? {
        uid: user.uid,
        email: user.email
      } : null);
    });
  });
}