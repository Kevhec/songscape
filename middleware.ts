import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import RateLimiter from './app/_lib/rateLimiter';

// eslint-disable-next-line consistent-return
export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/') {
    return NextResponse.redirect(new URL('home', request.url));
  }

  const rateLimiter = RateLimiter.getInstance();
  rateLimiter.reset();
}
