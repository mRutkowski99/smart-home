/*
  Warnings:

  - You are about to drop the `Home` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_homeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_homeId_fkey";

-- DropTable
DROP TABLE "Home";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "HomeSchema" (
    "id" TEXT NOT NULL,

    CONSTRAINT "HomeSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "devices" INTEGER NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "homeId" TEXT,

    CONSTRAINT "RoomSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SceneSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "homeId" TEXT,

    CONSTRAINT "SceneSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomSchema_id_homeId_key" ON "RoomSchema"("id", "homeId");

-- CreateIndex
CREATE UNIQUE INDEX "SceneSchema_id_homeId_key" ON "SceneSchema"("id", "homeId");

-- AddForeignKey
ALTER TABLE "RoomSchema" ADD CONSTRAINT "RoomSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneSchema" ADD CONSTRAINT "SceneSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;
