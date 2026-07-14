import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.usuario.upsert({
    where: { dni: '76866377' },
    update: {},
    create: {
      dni: '76866377',
      nombres: 'Omar Farhan Sahi',
      rol: 'ADMIN',
      turno: 'MANANA',
    },
  })
  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
