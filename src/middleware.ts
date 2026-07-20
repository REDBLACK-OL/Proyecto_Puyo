import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Clave secreta para desencriptar y verificar la firma digital de la cookie JWT
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'clave_secreta_super_segura_suiza_2026');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Rutas públicas que no requieren iniciar sesión (/login, APIs de auth e imágenes estáticas)
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // 2. Intentar obtener la cookie 'session' del navegador del usuario
  const session = request.cookies.get('session')?.value;

  // 3. Si no hay cookie, redirigir inmediatamente a la pantalla de login (/login)
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 4. Verificar criptográficamente que la cookie sea válida y no haya sido alterada por hackers
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ['HS256'],
    });

    // 5. Protección de roles: Si intenta entrar al panel /admin y su rol no es 'ADMIN', regresarlo al Tablero (/)
    if (pathname.startsWith('/admin') && payload.rol !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 6. Si todo es correcto, permitir que continúe hacia la página solicitada
    return NextResponse.next();
  } catch (error) {
    // Si la cookie expiró o es inválida, redirigir al login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

