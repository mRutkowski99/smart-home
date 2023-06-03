import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.sceneControlledDeviceSchema.deleteMany();
  await prisma.sceneScheduleSchema.deleteMany();
  await prisma.sceneSchema.deleteMany();
  await prisma.deviceSchema.deleteMany();
  await prisma.roomSchema.deleteMany();
  await prisma.homeSchema.deleteMany();

  // Home
  await prisma.homeSchema.create({
    data: { id: '51e93387-8e2c-4b59-88ca-e6f4f43c56f6' },
  });

  const home = await prisma.homeSchema.findFirstOrThrow();

  // Room
  const imgUrl =
    'https://images.unsplash.com/photo-1623920996377-9c5cd536143e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';

  await prisma.roomSchema.createMany({
    data: [
      { homeId: home.id, name: 'Room1', imgUrl },
      { homeId: home.id, name: 'Room2', imgUrl },
    ],
  });

  // Device
  const room = await prisma.roomSchema.findFirstOrThrow();

  await prisma.deviceSchema.createMany({
    data: [
      {
        name: 'Device 1',
        state: true,
        setpoint: 1,
        valueType: 'DIGITAL',
        roomId: room.id,
      },
      {
        name: 'Device 2',
        state: true,
        setpoint: 20,
        valueType: 'PERCENT',
        roomId: room.id,
      },
      {
        name: 'Device 3',
        state: true,
        setpoint: 23,
        valueType: 'TEMPERATURE',
        roomId: room.id,
      },
    ],
  });

  // Scene
  await prisma.sceneSchema.createMany({
    data: [{ name: 'Scene 1', homeId: home.id, state: false }],
  });

  const scene = await prisma.sceneSchema.findFirstOrThrow();

  await prisma.sceneScheduleSchema.createMany({
    data: [
      {
        active: true,
        sceneId: scene.id,
        startTimeHours: 10,
        startTimeMinutes: 0,
        daysOfWeek: '0/1/2/3/4/5/6',
        cron: '10 0 * * *',
      },
    ],
  });

  const device = await prisma.deviceSchema.findFirstOrThrow({
    where: { valueType: 'TEMPERATURE' },
  });
  await prisma.sceneControlledDeviceSchema.createMany({
    data: [
      {
        sceneId: scene.id,
        deviceId: device.id,
        setpoint: 24,
        state: true,
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
