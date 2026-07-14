import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const actualizada = await prisma.incidencia.update({
      where: { id: Number(params.id) },
      data: { 
        estado: 'Solucionado',
        fechaSolucion: new Date()
      }
    });

    return NextResponse.json(actualizada);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 400 });
  }
}
