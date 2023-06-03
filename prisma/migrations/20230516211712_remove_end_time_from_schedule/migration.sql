/*
  Warnings:

  - You are about to drop the column `endCron` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - You are about to drop the column `endTimeHours` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - You are about to drop the column `endTimeMinutes` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - You are about to drop the column `startCron` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - You are about to drop the `ControlledDeviceSchema` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cron` to the `SceneScheduleSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ControlledDeviceSchema" DROP CONSTRAINT "ControlledDeviceSchema_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "ControlledDeviceSchema" DROP CONSTRAINT "ControlledDeviceSchema_sceneId_fkey";

-- AlterTable
ALTER TABLE "SceneScheduleSchema" DROP COLUMN "endCron",
DROP COLUMN "endTimeHours",
DROP COLUMN "endTimeMinutes",
DROP COLUMN "startCron",
ADD COLUMN     "cron" TEXT NOT NULL;

-- DropTable
DROP TABLE "ControlledDeviceSchema";

-- CreateTable
CREATE TABLE "SceneControlledDeviceSchema" (
    "id" TEXT NOT NULL,
    "setpoint" DOUBLE PRECISION NOT NULL,
    "state" BOOLEAN NOT NULL,
    "sceneId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "SceneControlledDeviceSchema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SceneControlledDeviceSchema" ADD CONSTRAINT "SceneControlledDeviceSchema_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "SceneSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneControlledDeviceSchema" ADD CONSTRAINT "SceneControlledDeviceSchema_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "DeviceSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
