import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'clave_secreta_super_segura_suiza_2026');

export async function createSession(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY);

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ['HS256'],
    });
    return payload as { id: number; dni: string; nombres: string; rol: string; turno: string };
  } catch (error) {
    return null;
  }
}

export async function logout() {
  cookies().delete('session');
}
