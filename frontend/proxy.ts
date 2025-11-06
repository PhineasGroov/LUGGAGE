import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Si l'utilisateur essaie d'accéder à /space sans token
  if (pathname.startsWith('/space') && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Si l'utilisateur est connecté et essaie d'accéder à /auth
  if ((pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) && token) {
    return NextResponse.redirect(new URL('/space/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/space/:path*', '/auth/:path*'],
};
