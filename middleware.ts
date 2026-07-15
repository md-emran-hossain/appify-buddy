import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = process.env.AUTH_COOKIE_NAME ?? "access_token";

export default function proxy(request: NextRequest) {
  const hasToken = request.cookies.has(AUTH_COOKIE);
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/login' || pathname === '/registration' || pathname === '/forgot-password';

  if (!hasToken && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('callbackUrl', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (hasToken && isAuthPage) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  return NextResponse.next();
}

// Define exactly which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets/ (public assets like images/fonts)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets/).*)',
  ],
};
