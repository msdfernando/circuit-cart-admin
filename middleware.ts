import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export async function middleware(request: Request) {
  const url = new URL(request.url);

  // Redirect /dashboard to admin panel if authenticated
  if (url.pathname === '/dashboard') {
    return isAuthenticated()
      ? NextResponse.redirect(new URL('/(admin)/dashboard', url.origin))
      : NextResponse.redirect(new URL('/(auth)/login', url.origin));
  }

  // Protect all admin routes
  if (url.pathname.startsWith('/(admin)') && !isAuthenticated()) {
    return NextResponse.redirect(new URL('/(auth)/login', url.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/(admin)/:path*'],
};