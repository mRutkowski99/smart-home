-- CreateEnum
CREATE TYPE "SafetyDeviceEnum" AS ENUM ('WaterLeakSensor', 'COSensor', 'SmokeSensor');

-- CreateTable
CREATE TABLE "SafetySchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SafetyDeviceEnum" NOT NULL,
    "homeId" TEXT NOT NULL,

    CONSTRAINT "SafetySchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyLog" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "confirmedBy" TEXT,
    "safetyId" TEXT NOT NULL,

    CONSTRAINT "SafetyLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SafetySchema_id_homeId_key" ON "SafetySchema"("id", "homeId");

-- CreateIndex
CREATE UNIQUE INDEX "SafetyLog_id_safetyId_key" ON "SafetyLog"("id", "safetyId");

-- AddForeignKey
ALTER TABLE "SafetySchema" ADD CONSTRAINT "SafetySchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyLog" ADD CONSTRAINT "SafetyLog_safetyId_fkey" FOREIGN KEY ("safetyId") REFERENCES "SafetySchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
