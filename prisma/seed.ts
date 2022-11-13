import { PrismaClient } from '@prisma/client';

const tommorow = new Date();
tommorow.setDate(tommorow.getDate() + 1);

const prisma = new PrismaClient();

async function main() {
  await prisma.safetyLogSchema.deleteMany();
  await prisma.safetySchema.deleteMany();
  await prisma.alarmLogSchema.deleteMany();
  await prisma.alarmSchema.deleteMany();
  await prisma.sceneSchema.deleteMany();
  await prisma.roomSchema.deleteMany();
  await prisma.homeSchema.deleteMany();

  await prisma.homeSchema.createMany({
    data: [{ id: '51e93387-8e2c-4b59-88ca-e6f4f43c56f6' }],
  });

  const [home] = await prisma.homeSchema.findMany({
    where: { id: '51e93387-8e2c-4b59-88ca-e6f4f43c56f6' },
  });

  const imgUrl =
    'https://images.unsplash.com/photo-1623920996377-9c5cd536143e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';

  await prisma.roomSchema.createMany({
    data: [
      {
        homeId: home.id,
        name: 'Living room',
        favourite: true,
        imgUrl,
      },
      {
        homeId: home.id,
        name: 'Kitchen',
        favourite: true,
        imgUrl,
      },
      {
        homeId: home.id,
        name: 'Batchroom',
        favourite: false,
        imgUrl,
      },
    ],
  });

  await prisma.sceneSchema.createMany({
    data: [
      {
        homeId: home.id,
        name: 'Good morning',
        active: false,
        favourite: true,
        cron: '15 7 * * 1,2,3,4,5,6',
        expireDate: tommorow,
      },
      {
        homeId: home.id,
        name: "I'm leaving",
        active: false,
        favourite: false,
        cron: '0 8 * * 1,2,3,4,5,6',
        expireDate: tommorow,
      },
      {
        homeId: home.id,
        name: 'Good night',
        active: false,
        favourite: false,
      },
    ],
  });

  await prisma.alarmSchema.createMany({
    data: [
      {
        homeId: home.id,
        name: 'Alarm 1',
        active: false,
        defaulState: false,
      },
      {
        homeId: home.id,
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

  await prisma.safetySchema.createMany({
    data: [
      { homeId: home.id, name: 'Bathroom CO sensor', type: 'COSensor' },
      { homeId: home.id, name: 'Kitchen smoke sensor', type: 'SmokeSensor' },
      {
        homeId: home.id,
        name: 'Kitchen water leak sensor',
        type: 'WaterLeakSensor',
      },
    ],
  });

  const safety = await prisma.safetySchema.findMany();

  await prisma.safetyLogSchema.createMany({
    data: [
      {
        safetyId: safety[0].id,
        createDate: new Date(),
        message: 'System has lost connection with device',
        state: 'Disabled',
        confirmed: false,
      },
      {
        safetyId: safety[1].id,
        createDate: new Date(),
        message: 'Device has detected a danger',
        state: 'Danger',
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
