import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session || session.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const usuarios = await prisma.usuario.findMany({
    orderBy: { fecha: 'desc' }
  });
  return NextResponse.json(usuarios);
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { dni, nombres, turno, rol } = await req.json();

    const existente = await prisma.usuario.findUnique({ where: { dni } });
    if (existente) {
      return NextResponse.json({ error: 'El DNI ya está registrado' }, { status: 400 });
    }

    const nuevo = await prisma.usuario.create({
      data: { dni, nombres, turno, rol }
    });

    return NextResponse.json(nuevo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
