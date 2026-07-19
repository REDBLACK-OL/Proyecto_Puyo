const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Iniciando importación completa de usuarios, administradores y ambientes...');

  // 1. Usuarios Oficiales / Equipo de Desarrollo
  const usuariosEquipo = [
    { dni: '76866377', nombres: 'Omar Farhan Sahi', rol: 'ADMIN', turno: 'MANANA' },
    { dni: '61006146', nombres: 'Geric Aldair Salas Ormeño', rol: 'ADMIN', turno: 'TARDE' },
    { dni: '71111111', nombres: 'Jacobo Martel, Luz Lizbeth (Directora)', rol: 'ADMIN', turno: 'MANANA' },
    { dni: '72222222', nombres: 'Melgarejo Huaman, Anllely Sileny', rol: 'DOCENTE', turno: 'MANANA' },
    { dni: '73333333', nombres: 'Macedo Macedo, Cristiam Saul', rol: 'USER', turno: 'TARDE' },
    { dni: '74444444', nombres: 'Rodriguez Cari, Christian Jhoel', rol: 'USER', turno: 'MANANA' },
  ];

  for (const u of usuariosEquipo) {
    await prisma.usuario.upsert({
      where: { dni: u.dni },
      update: { nombres: u.nombres, rol: u.rol, turno: u.turno },
      create: u
    });
  }
  console.log('✅ 6 Usuarios (Admins, Docentes y Estudiantes) cargados en PostgreSQL');

  // 2. Ambientes / Aulas
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
      update: { activo: true },
      create: { nombre, activo: true }
    });
  }
  console.log('✅ 7 Ambientes oficiales cargados en PostgreSQL');

  const allUsers = await prisma.usuario.findMany();
  console.log('\n--- RESUMEN FINAL DE USUARIOS EN BASE DE DATOS ---');
  console.table(allUsers.map(u => ({ dni: u.dni, nombres: u.nombres, rol: u.rol, turno: u.turno })));

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
