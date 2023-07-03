/*
  Warnings:

  - Added the required column `city` to the `HomeSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `HomeSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HomeSchema" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
