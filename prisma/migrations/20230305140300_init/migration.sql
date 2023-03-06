-- CreateTable
CREATE TABLE "HomeSchema" (
    "id" TEXT NOT NULL,

    CONSTRAINT "HomeSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "homeId" TEXT NOT NULL,

    CONSTRAINT "RoomSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomSchema_id_homeId_key" ON "RoomSchema"("id", "homeId");

-- AddForeignKey
ALTER TABLE "RoomSchema" ADD CONSTRAINT "RoomSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
