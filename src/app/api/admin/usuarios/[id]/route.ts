import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    const { dni, nombres, turno, rol } = body;

    if (!dni || !nombres || !turno || !rol) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const updatedUser = await prisma.usuario.update({
      where: { id },
      data: {
        dni,
        nombres,
        turno,
        rol,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'El DNI ya está registrado por otro usuario' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    
    // Primero, verificamos si existe el usuario
    const user = await prisma.usuario.findUnique({
      where: { id }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Eliminamos las incidencias asociadas para evitar problemas de llave foránea (simulando CASCADE)
    await prisma.incidencia.deleteMany({
      where: { usuarioId: id }
    });

    // Luego eliminamos el usuario
    await prisma.usuario.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
