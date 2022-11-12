/*
  Warnings:

  - Added the required column `state` to the `SafetyLog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `SafetySchema` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SafetyDevice" AS ENUM ('WaterLeakSensor', 'COSensor', 'SmokeSensor');

-- CreateEnum
CREATE TYPE "SafetyState" AS ENUM ('Ok', 'Danger', 'Disabled');

-- AlterTable
ALTER TABLE "SafetyLog" ADD COLUMN     "state" "SafetyState" NOT NULL;

-- AlterTable
ALTER TABLE "SafetySchema" DROP COLUMN "type",
ADD COLUMN     "type" "SafetyDevice" NOT NULL;

-- DropEnum
DROP TYPE "SafetyDeviceEnum";
