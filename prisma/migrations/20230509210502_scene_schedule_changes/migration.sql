/*
  Warnings:

  - You are about to drop the column `from` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `SceneScheduleSchema` table. All the data in the column will be lost.
  - Added the required column `active` to the `SceneScheduleSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daysOfWeek` to the `SceneScheduleSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startCron` to the `SceneScheduleSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTimeHours` to the `SceneScheduleSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTimeMinutes` to the `SceneScheduleSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SceneScheduleSchema" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "daysOfWeek" TEXT NOT NULL,
ADD COLUMN     "endCron" TEXT,
ADD COLUMN     "endTimeHours" INTEGER,
ADD COLUMN     "endTimeMinutes" INTEGER,
ADD COLUMN     "startCron" TEXT NOT NULL,
ADD COLUMN     "startTimeHours" INTEGER NOT NULL,
ADD COLUMN     "startTimeMinutes" INTEGER NOT NULL;
