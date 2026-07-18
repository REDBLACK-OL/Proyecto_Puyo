import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { dni, password } = await req.json();
    
    if (!dni) {
      return NextResponse.json({ error: 'Falta el DNI' }, { status: 400 });
    }

    const user = await prisma.usuario.findUnique({
      where: { dni }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no registrado en el sistema. Comunícate con el administrador.' }, { status: 404 });
    }

    if (user.rol === 'ADMIN') {
      if (password === undefined) {
        return NextResponse.json({ requiresPassword: true, success: false });
      }

      // Si tiene contraseña en DB, la validamos
      if (user.password && user.password !== password) {
        return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
      }

      // Si no tiene contraseña en DB (primera vez), se la guardamos
      if (!user.password && password) {
        await prisma.usuario.update({
          where: { dni },
          data: { password }
        });
      }
    }

    // Crear la sesión en la cookie
    await createSession({
      id: user.id,
      dni: user.dni,
      nombres: user.nombres,
      rol: user.rol,
      turno: user.turno
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
