import { NextRequest, NextResponse } from 'next/server';

// Beginner: middleware can block unauthenticated access early.
// Advanced: edge checks reduce server load and improve response latency.
export function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const isProtectedPath = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
