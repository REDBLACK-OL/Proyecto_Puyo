import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { dni } = await req.json();
    
    if (!dni || dni.length !== 8) {
      return NextResponse.json({ role: 'USER' });
    }

    const user = await prisma.usuario.findUnique({
      where: { dni }
    });

    if (user && user.rol === 'ADMIN') {
      return NextResponse.json({ role: 'ADMIN' });
    }

    return NextResponse.json({ role: 'USER' });
  } catch (error) {
    return NextResponse.json({ role: 'USER' });
  }
}
