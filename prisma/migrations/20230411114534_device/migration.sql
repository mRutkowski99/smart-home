-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('DIGITAL', 'PERCENT', 'TEMPERATURE');

-- CreateTable
CREATE TABLE "DeviceSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "setpoint" INTEGER NOT NULL,
    "valueType" "ValueType" NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "DeviceSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceSchema_id_roomId_key" ON "DeviceSchema"("id", "roomId");

-- AddForeignKey
ALTER TABLE "DeviceSchema" ADD CONSTRAINT "DeviceSchema_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "RoomSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
