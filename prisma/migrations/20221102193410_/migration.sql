-- DropForeignKey
ALTER TABLE "RoomSchema" DROP CONSTRAINT "RoomSchema_homeId_fkey";

-- DropForeignKey
ALTER TABLE "SceneSchema" DROP CONSTRAINT "SceneSchema_homeId_fkey";

-- AddForeignKey
ALTER TABLE "RoomSchema" ADD CONSTRAINT "RoomSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneSchema" ADD CONSTRAINT "SceneSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
