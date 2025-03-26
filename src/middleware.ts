import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest,) {
  const { pathname } = req.nextUrl;

  // Only process requests starting with "/backend"
  if (pathname.startsWith('/backend')) {
    console.log('Middleware triggered for:', pathname);
    
    // Determine cookie name based on environment
    const isProd = process.env.NODE_ENV === 'production';
    const cookieName = isProd
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token';
      const api_url = process.env.NEXT_PUBLIC_BACKEND_URL
      const forwardedPath = req.nextUrl.pathname.replace("/backend", "");
      const url = new URL(api_url + forwardedPath + req.nextUrl.search);
      console.log('URL:', url.toString());

    const token = req.cookies.get(cookieName)?.value;
    console.log('Token found:', token);
    
    if (token) {
      // Clone the request headers and add the Authorization header
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('Authorization', `Bearer ${token}`);

      // Forward the request with the updated headers
      return NextResponse.rewrite(url.toString(),{
        request: {
          headers: requestHeaders,
        },
      });
    }
  }
  
  return NextResponse.next();
}

// Ensure middleware runs only on routes starting with /backend
export const config = {
  matcher: '/backend/:path*',
};
