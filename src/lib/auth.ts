import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Clave secreta para encriptar y firmar las sesiones de los usuarios
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'clave_secreta_super_segura_suiza_2026');

// 1. createSession: Firma digitalmente los datos del usuario en un token JWT y lo guarda en una cookie segura
export async function createSession(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // La sesión expira en 24 horas exactas
    .sign(SECRET_KEY);

  cookies().set('session', token, {
    httpOnly: true, // Protege la cookie contra robo por JavaScript del cliente (XSS)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 horas en segundos
  });
}

// 2. getSession: Desencripta y valida la cookie del servidor para saber qué usuario está conectado actualmente
export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ['HS256'],
    });
    return payload as { id: number; dni: string; nombres: string; rol: string; turno: string };
  } catch (error) {
    return null; // Si el token fue alterado o expiró, devolvemos null
  }
}

// 3. logout: Elimina la cookie del navegador para cerrar sesión
export async function logout() {
  cookies().delete('session');
}

