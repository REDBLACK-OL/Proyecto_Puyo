import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSession();
    if (!user || user.rol !== 'ADMIN') {
      return NextResponse.json({ error: "No autorizado. Solo Administradores pueden editar ubicaciones." }, { status: 403 });
    }

    const { nombre } = await req.json();
    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: "El nombre de la ubicación es obligatorio" }, { status: 400 });
    }

    const ubicacionActualizada = await prisma.ubicacion.update({
      where: { id: Number(params.id) },
      data: { nombre: nombre.trim() }
    });

    return NextResponse.json(ubicacionActualizada);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Ya existe otra ubicación con ese nombre" }, { status: 400 });
    }
    console.error("Error al actualizar ubicación:", error);
    return NextResponse.json({ error: "Error al actualizar ubicación" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSession();
    if (!user || user.rol !== 'ADMIN') {
      return NextResponse.json({ error: "No autorizado. Solo Administradores pueden eliminar ubicaciones." }, { status: 403 });
    }

    await prisma.ubicacion.delete({
      where: { id: Number(params.id) }
    });

    return NextResponse.json({ mensaje: "Ubicación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar ubicación:", error);
    return NextResponse.json({ error: "Error al eliminar ubicación" }, { status: 500 });
  }
}
