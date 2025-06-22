import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // Allow the root route ("/") for everyone
  if (path === "/") {
    return NextResponse.next();
  }

  // Allow all API routes (optional: remove this block if you want API to be protected too)
  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  // If not logged in, redirect to "/"
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If logged in, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};