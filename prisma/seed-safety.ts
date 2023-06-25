import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
const homeId = '51e93387-8e2c-4b59-88ca-e6f4f43c56f6'

async function main() {
    await prisma.alarmSchema.create({
        data: {
            homeId,
            state: true,
            stateAddress: '10.0',
            stateAddressType: 'DO',
            status: true,
            statusAddress: '10.1',
            statusAddressType: 'DI'
        }
    })
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