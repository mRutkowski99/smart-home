/*
  Warnings:

  - You are about to drop the `SafetyLog` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `SafetySchema` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SafetyDeviceSchemaEnum" AS ENUM ('WaterLeakSensor', 'COSensor', 'SmokeSensor');

-- CreateEnum
CREATE TYPE "SafetyStateSchemaEnum" AS ENUM ('Ok', 'Danger', 'Disabled');

-- DropForeignKey
ALTER TABLE "SafetyLog" DROP CONSTRAINT "SafetyLog_safetyId_fkey";

-- AlterTable
ALTER TABLE "SafetySchema" DROP COLUMN "type",
ADD COLUMN     "type" "SafetyDeviceSchemaEnum" NOT NULL;

-- DropTable
DROP TABLE "SafetyLog";

-- DropEnum
DROP TYPE "SafetyDevice";

-- DropEnum
DROP TYPE "SafetyState";

-- CreateTable
CREATE TABLE "SafetyLogSchema" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "state" "SafetyStateSchemaEnum" NOT NULL,
    "confirmed" BOOLEAN,
    "confirmedAt" TIMESTAMP(3),
    "confirmedBy" TEXT,
    "safetyId" TEXT NOT NULL,

    CONSTRAINT "SafetyLogSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SafetyLogSchema_id_safetyId_key" ON "SafetyLogSchema"("id", "safetyId");

-- AddForeignKey
ALTER TABLE "SafetyLogSchema" ADD CONSTRAINT "SafetyLogSchema_safetyId_fkey" FOREIGN KEY ("safetyId") REFERENCES "SafetySchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
