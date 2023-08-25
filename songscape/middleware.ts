import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line consistent-return
export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/') {
    return NextResponse.redirect(new URL('home', request.url));
  }
}
