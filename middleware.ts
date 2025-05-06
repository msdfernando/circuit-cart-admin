import { NextResponse } from 'next/server';
import { auth } from '@/config/firebase';

export async function middleware(request: Request) {
  const pathname = new URL(request.url).pathname;

  // Protect all admin routes
  if (pathname.startsWith('/(admin)')) {
    const user = auth.currentUser;
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/(admin)/:path*'],
};