const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const usuarios = await prisma.usuario.findMany();
  console.log('=== USUARIOS (' + usuarios.length + ') ===');
  console.table(usuarios);

  const ubicaciones = await prisma.ubicacion.findMany();
  console.log('=== UBICACIONES (' + ubicaciones.length + ') ===');
  console.table(ubicaciones);

  const incidencias = await prisma.incidencia.findMany();
  console.log('=== INCIDENCIAS (' + incidencias.length + ') ===');
  console.table(incidencias.map(i => ({ id: i.id, titulo: i.titulo, aula: i.aula, estado: i.estado, usuarioId: i.usuarioId })));

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
