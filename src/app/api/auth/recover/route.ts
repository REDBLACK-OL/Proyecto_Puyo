import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { dni, nombres, newPassword } = await req.json();
    
    if (!dni || !nombres || !newPassword) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const user = await prisma.usuario.findUnique({
      where: { dni }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    if (user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'Solo los administradores pueden recuperar su contraseña' }, { status: 403 });
    }

    // Validar nombres (ignorando mayúsculas y espacios extras)
    if (user.nombres.trim().toLowerCase() !== nombres.trim().toLowerCase()) {
      return NextResponse.json({ error: 'Los nombres no coinciden con nuestros registros' }, { status: 401 });
    }

    // Actualizar contraseña
    await prisma.usuario.update({
      where: { dni },
      data: { password: newPassword }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
