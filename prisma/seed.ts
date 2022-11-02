import { PrismaClient } from '@prisma/client';

const tommorow = new Date();
tommorow.setDate(tommorow.getDate() + 1);

const prisma = new PrismaClient();

async function main() {
  await prisma.alarmLogSchema.deleteMany();
  await prisma.alarmSchema.deleteMany();
  await prisma.sceneSchema.deleteMany();
  await prisma.roomSchema.deleteMany();
  await prisma.homeSchema.deleteMany();

  await prisma.homeSchema.createMany({ data: [{}, {}, {}] });

  const homes = await prisma.homeSchema.findMany();

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

  await prisma.sceneSchema.createMany({
    data: [
      {
        homeId: homes[0].id,
        name: 'Good morning',
        active: false,
        favourite: true,
        cron: '15 7 * * 1,2,3,4,5,6',
        expireDate: tommorow,
      },
      {
        homeId: homes[0].id,
        name: "I'm leaving",
        active: false,
        favourite: false,
        cron: '0 8 * * 1,2,3,4,5,6',
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

  await prisma.alarmSchema.createMany({
    data: [
      {
        homeId: homes[0].id,
        name: 'Alarm 1',
        active: false,
        defaulState: false,
      },
      {
        homeId: homes[0].id,
        name: 'Alarm 2',
        active: true,
        defaulState: false,
      },
    ],
  });

  const alarms = await prisma.alarmSchema.findMany();

  await prisma.alarmLogSchema.createMany({
    data: [
      {
        alarmId: alarms[0].id,
        createDate: new Date(),
        danger: false,
        message: 'Message 1',
        confirmed: null,
      },
      {
        alarmId: alarms[0].id,
        createDate: new Date(),
        danger: false,
        message: 'Message 2',
        confirmed: null,
      },
      {
        alarmId: alarms[0].id,
        createDate: new Date(),
        danger: true,
        message: 'Message 3',
        confirmed: false,
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
