const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const ubicacionesIniciales = [
    "Laboratorio de Cómputo 1",
    "Laboratorio de Cómputo 2",
    "Laboratorio de Cómputo 3",
    "Taller de Electrónica",
    "Taller de Mecánica",
    "Aula 101",
    "Biblioteca"
  ];

  for (const nombre of ubicacionesIniciales) {
    await prisma.ubicacion.upsert({
      where: { nombre },
      update: {},
      create: { nombre, activo: true }
    });
  }
  console.log('✅ Ubicaciones oficiales cargadas en PostgreSQL');
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
