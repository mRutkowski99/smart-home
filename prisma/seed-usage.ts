import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';

const prisma = new PrismaClient();
const homeId = '51e93387-8e2c-4b59-88ca-e6f4f43c56f6';

async function main() {
  prisma.usageLogSchema.createMany({
    data: [
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 1).toDate(),
        value: 162.12,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 2).toDate(),
        value: 162.87,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 3).toDate(),
        value: 163.1,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 4).toDate(),
        value: 163.5,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 5).toDate(),
        value: 163.78,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 6).toDate(),
        value: 164.14,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 7).toDate(),
        value: 164.79,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 8).toDate(),
        value: 165.86,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 9).toDate(),
        value: 166.54,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 10).toDate(),
        value: 167.32,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 11).toDate(),
        value: 167.67,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 12).toDate(),
        value: 167.98,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 13).toDate(),
        value: 168.32,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 14).toDate(),
        value: 168.89,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 15).toDate(),
        value: 169.45,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 16).toDate(),
        value: 170.18,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 17).toDate(),
        value: 170.6,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 18).toDate(),
        value: 171.12,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 19).toDate(),
        value: 172.88,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 20).toDate(),
        value: 173.34,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 21).toDate(),
        value: 174.12,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 22).toDate(),
        value: 174.87,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 23).toDate(),
        value: 175.44,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 24).toDate(),
        value: 175.98,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 25).toDate(),
        value: 176.52,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 26).toDate(),
        value: 176.89,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 27).toDate(),
        value: 177.1,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 28).toDate(),
        value: 177.77,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 29).toDate(),
        value: 178.32,
      },
      {
        homeId,
        date: dayjs().set('month', 5).set('day', 30).toDate(),
        value: 179.21,
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
