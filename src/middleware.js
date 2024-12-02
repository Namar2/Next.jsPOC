import { NextResponse } from 'next/server';

export function middleware(req) {
  const response = NextResponse.next();

  // Check if the request is an API route
  if (req.nextUrl.pathname.startsWith('/api/')) {
    // Apply caching headers to all API responses
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  return response;
}

// Apply middleware only to API routes
export const config = {
  matcher: '/api/:path*',
};