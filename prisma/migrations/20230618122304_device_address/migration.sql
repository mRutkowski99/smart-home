/*
  Warnings:

  - You are about to drop the column `addressId` on the `DeviceSchema` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeviceSchema" DROP CONSTRAINT "DeviceSchema_addressId_fkey";

-- DropIndex
DROP INDEX "DeviceSchema_addressId_key";

-- AlterTable
ALTER TABLE "DeviceSchema" DROP COLUMN "addressId";

-- AddForeignKey
ALTER TABLE "DeviceAddressSchema" ADD CONSTRAINT "DeviceAddressSchema_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "DeviceSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
