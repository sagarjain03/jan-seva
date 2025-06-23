import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // Allow the root, login, and register routes for everyone
  if (path === "/" || path === "/login" || path === "/register") {
    return NextResponse.next();
  }

  // Allow all API routes
  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  // If not logged in, redirect to "/login"
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};