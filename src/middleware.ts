import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'clave_secreta_super_segura_suiza_2026');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public paths
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ['HS256'],
    });

    // Check admin routes
    if (pathname.startsWith('/admin') && payload.rol !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
