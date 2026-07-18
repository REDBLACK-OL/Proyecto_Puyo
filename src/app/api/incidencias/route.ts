import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getSession } from '@/lib/auth';

export async function GET() {
  // Limpieza automática (Lazy Cron): Borramos incidencias solucionadas hace más de 24 horas
  const unDiaAtras = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await prisma.incidencia.deleteMany({
    where: {
      estado: 'Solucionado',
      fechaSolucion: {
        lt: unDiaAtras
      }
    }
  });

  const incidencias = await prisma.incidencia.findMany({
    orderBy: { fecha: 'desc' },
    include: { usuario: true }
  });
  return NextResponse.json(incidencias);
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const data = await req.formData();
    
    const titulo = data.get('titulo') as string;
    const descripcion = data.get('descripcion') as string;
    const aula = data.get('aula') as string;
    const imagenesFiles = data.getAll('imagenes') as File[];
    
    let imagenUrls: string[] = [];

    for (const file of imagenesFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const path = join(process.cwd(), 'public/uploads', filename);
        
        await writeFile(path, buffer);
        imagenUrls.push('/uploads/' + filename);
      }
    }

    const imagenString = imagenUrls.length > 0 ? imagenUrls.join(',') : null;

    const nueva = await prisma.incidencia.create({
      data: { 
        titulo, 
        descripcion, 
        aula, 
        usuarioId: session.id,
        imagen: imagenString
      },
      include: { usuario: true }
    });

    // Crear notificación para los administradores según indicación de la jefa
    try {
      await prisma.notificacion.create({
        data: {
          titulo: `Nueva Incidencia: ${titulo}`,
          mensaje: `Reportada en ${aula} por ${session.nombres} (DNI: ${session.dni})`,
          tipo: 'INCIDENCIA',
          leido: false,
          incidenciaId: nueva.id
        }
      });
    } catch (e) {
      console.error("Error al generar notificación:", e);
    }

    return NextResponse.json(nueva);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Error al reportar' }, { status: 400 });
  }
}
