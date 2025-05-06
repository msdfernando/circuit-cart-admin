import { NextResponse } from 'next/server';
import { auth } from '@/config/firebase';

export async function middleware(request: Request) {
  const url = new URL(request.url);
  
  // Handle /dashboard redirect
  if (url.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/(admin)/dashboard', url.origin));
  }

  // Protect admin routes
  if (url.pathname.startsWith('/(admin)')) {
    await auth.authStateReady(); // Removed unused session assignment
    if (!auth.currentUser) {
      return NextResponse.redirect(new URL('/login', url.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/(admin)/:path*'],
};