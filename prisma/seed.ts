import {AddressType, ControlledValue, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.sceneControlledDeviceSchema.deleteMany();
  await prisma.sceneScheduleDaySchema.deleteMany();
  await prisma.sceneScheduleSchema.deleteMany();
  await prisma.sceneSchema.deleteMany();
  await prisma.deviceAddressSchema.deleteMany()
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
  const room = await prisma.roomSchema.findFirstOrThrow()

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

  const device = await prisma.deviceSchema.findFirstOrThrow({where: {name: 'Device 2'}})

  await prisma.deviceAddressSchema.createMany({
    data: [
      {address: '1.0', addressType: AddressType.DO, controlledValue: ControlledValue.WRITE_STATE, deviceId: device.id},
      {address: '5.3', addressType: AddressType.AO, controlledValue: ControlledValue.WRITE_SETPOINT, deviceId: device.id}
    ]
  })

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
      },
    ],
  });

  const sceneSchedule = await prisma.sceneScheduleSchema.findFirstOrThrow();

  await prisma.sceneScheduleDaySchema.createMany({
    data: [
      {
        startTimeMinutes: 0,
        startTimeHours: 10,
        dayOfWeek: 0,
        sceneScheduleId: sceneSchedule.id,
      },
      {
        startTimeMinutes: 0,
        startTimeHours: 12,
        dayOfWeek: 1,
        sceneScheduleId: sceneSchedule.id,
      },
      {
        startTimeMinutes: 30,
        startTimeHours: 15,
        dayOfWeek: 2,
        sceneScheduleId: sceneSchedule.id,
      },
    ],
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
