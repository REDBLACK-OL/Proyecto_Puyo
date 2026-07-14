import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { dni } = await req.json();
    
    if (!dni) {
      return NextResponse.json({ error: 'Falta el DNI' }, { status: 400 });
    }

    const user = await prisma.usuario.findUnique({
      where: { dni }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no registrado en el sistema. Comunícate con el administrador.' }, { status: 404 });
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
