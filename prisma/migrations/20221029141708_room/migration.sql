/*
  Warnings:

  - You are about to drop the column `devices` on the `RoomSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[homeId]` on the table `RoomSchema` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RoomSchema" DROP COLUMN "devices";

-- AlterTable
ALTER TABLE "SceneSchema" ADD COLUMN     "cron" TEXT,
ADD COLUMN     "expireDate" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "RoomSchema_homeId_key" ON "RoomSchema"("homeId");
