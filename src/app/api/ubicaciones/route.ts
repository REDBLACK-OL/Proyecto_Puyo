import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const UBICACIONES_INICIALES = [
  "Laboratorio de Cómputo 1",
  "Laboratorio de Cómputo 2",
  "Laboratorio de Cómputo 3",
  "Taller de Electrónica",
  "Taller de Mecánica",
  "Aula 101",
  "Biblioteca"
];

export async function GET() {
  try {
    let ubicaciones = await prisma.ubicacion.findMany({
      orderBy: { id: 'asc' }
    });

    if (ubicaciones.length === 0) {
      await prisma.ubicacion.createMany({
        data: UBICACIONES_INICIALES.map(nombre => ({ nombre, activo: true })),
        skipDuplicates: true
      });
      ubicaciones = await prisma.ubicacion.findMany({
        orderBy: { id: 'asc' }
      });
    }

    return NextResponse.json(ubicaciones);
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    return NextResponse.json({ error: "Error al cargar ubicaciones" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSession();
    if (!user || user.rol !== 'ADMIN') {
      return NextResponse.json({ error: "No autorizado. Solo Administradores pueden agregar ubicaciones." }, { status: 403 });
    }

    const { nombre } = await req.json();
    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: "El nombre de la ubicación es obligatorio" }, { status: 400 });
    }

    const nuevaUbicacion = await prisma.ubicacion.create({
      data: {
        nombre: nombre.trim(),
        activo: true
      }
    });

    return NextResponse.json(nuevaUbicacion, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Esa ubicación ya existe" }, { status: 400 });
    }
    console.error("Error al crear ubicación:", error);
    return NextResponse.json({ error: "Error al crear ubicación" }, { status: 500 });
  }
}
