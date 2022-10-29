import { PrismaClient } from '@prisma/client';

const tommorow = new Date();
tommorow.setDate(tommorow.getDate() + 1);

const prisma = new PrismaClient();

async function main() {
  await prisma.homeSchema.deleteMany();
  await prisma.homeSchema.createMany({ data: [{}, {}, {}] });

  const homes = await prisma.homeSchema.findMany();

  await prisma.roomSchema.deleteMany();
  await prisma.roomSchema.createMany({
    data: [
      { homeId: homes[0].id, name: 'Living room', favourite: true, imgUrl: '' },
      { homeId: homes[0].id, name: 'Kitchen', favourite: true, imgUrl: '' },
      { homeId: homes[0].id, name: 'Batchroom', favourite: false, imgUrl: '' },
      {
        homeId: homes[1].id,
        name: 'Living room 2nd floor',
        favourite: false,
        imgUrl: '',
      },
    ],
  });

  await prisma.sceneSchema.deleteMany();
  await prisma.sceneSchema.createMany({
    data: [
      {
        homeId: homes[0].id,
        name: 'Good morning',
        active: false,
        favourite: true,
        cron: '15 7 * * 1',
        expireDate: tommorow,
      },
      {
        homeId: homes[0].id,
        name: "I'm leaving",
        active: false,
        favourite: false,
        cron: '0 8 * * 1',
        expireDate: tommorow,
      },
      {
        homeId: homes[1].id,
        name: 'Good night',
        active: false,
        favourite: false,
      },
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
