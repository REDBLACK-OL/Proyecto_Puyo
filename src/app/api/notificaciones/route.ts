import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getSession();
    if (!user || user.rol !== 'ADMIN') {
      return NextResponse.json({ notificaciones: [], unreadCount: 0 });
    }

    const notificaciones = await prisma.notificacion.findMany({
      orderBy: { fecha: 'desc' },
      take: 15
    });

    const unreadCount = await prisma.notificacion.count({
      where: { leido: false }
    });

    return NextResponse.json({ notificaciones, unreadCount });
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return NextResponse.json({ notificaciones: [], unreadCount: 0 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getSession();
    if (!user || user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const body = await req.json();
    if (body.marcarTodas) {
      await prisma.notificacion.updateMany({
        where: { leido: false },
        data: { leido: true }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar notificaciones:", error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
