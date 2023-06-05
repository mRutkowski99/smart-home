/*
  Warnings:

  - You are about to drop the column `daysOfWeek` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - You are about to drop the column `startTimeHours` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - You are about to drop the column `startTimeMinutes` on the `SceneScheduleSchema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SceneScheduleSchema" DROP COLUMN "daysOfWeek",
DROP COLUMN "startTimeHours",
DROP COLUMN "startTimeMinutes";

-- CreateTable
CREATE TABLE "SceneScheduleDaySchema" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTimeHours" INTEGER NOT NULL,
    "startTimeMinutes" INTEGER NOT NULL,
    "sceneScheduleId" TEXT NOT NULL,

    CONSTRAINT "SceneScheduleDaySchema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SceneScheduleDaySchema" ADD CONSTRAINT "SceneScheduleDaySchema_sceneScheduleId_fkey" FOREIGN KEY ("sceneScheduleId") REFERENCES "SceneScheduleSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
