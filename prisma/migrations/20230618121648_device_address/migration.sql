/*
  Warnings:

  - A unique constraint covering the columns `[addressId]` on the table `DeviceSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `DeviceSchema` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('DI', 'DO', 'AI', 'AO');

-- CreateEnum
CREATE TYPE "ControlledValue" AS ENUM ('READ_VALUE', 'WRITE_STATE', 'WRITE_SETPOINT');

-- AlterTable
ALTER TABLE "DeviceSchema" ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DeviceAddressSchema" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressType" "AddressType" NOT NULL,
    "controlledValue" "ControlledValue" NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "DeviceAddressSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceSchema_addressId_key" ON "DeviceSchema"("addressId");

-- AddForeignKey
ALTER TABLE "DeviceSchema" ADD CONSTRAINT "DeviceSchema_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "DeviceAddressSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
