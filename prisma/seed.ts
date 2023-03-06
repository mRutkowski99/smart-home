import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.homeSchema.create({
    data: { id: '51e93387-8e2c-4b59-88ca-e6f4f43c56f6' },
  });

  const home = await prisma.homeSchema.findFirstOrThrow();

  await prisma.roomSchema.createMany({
    data: [
      { homeId: home.id, name: 'Room1', imgUrl: '' },
      { homeId: home.id, name: 'Room2', imgUrl: '' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
