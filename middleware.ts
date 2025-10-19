import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  const csp = [
    "default-src 'self'",
    "script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com https://www.paypal.com https://www.paypalobjects.com",
    "style-src 'self'",
    "img-src 'self' data: https: https://i.paypalobjects.com",
    "font-src 'self' data: https:",
    "connect-src 'self' https: https://api-m.paypal.com https://api-m.sandbox.paypal.com",
    "media-src 'self' https: data:",
    "frame-src https://www.paypal.com",
    "frame-ancestors 'none'"
  ].join('; ');
  res.headers.set('Content-Security-Policy', csp);
  return res;
}

export const config = { matcher: ['/:path*'] };
