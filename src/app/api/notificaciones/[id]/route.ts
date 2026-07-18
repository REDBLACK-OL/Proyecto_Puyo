import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSession();
    if (!user || user.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const notificacionActualizada = await prisma.notificacion.update({
      where: { id: Number(params.id) },
      data: { leido: true }
    });

    return NextResponse.json(notificacionActualizada);
  } catch (error) {
    console.error("Error al marcar notificación como leída:", error);
    return NextResponse.json({ error: 'Error al marcar' }, { status: 500 });
  }
}
