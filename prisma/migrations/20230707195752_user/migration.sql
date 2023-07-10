-- DropForeignKey
ALTER TABLE "UserSchema" DROP CONSTRAINT "UserSchema_homeId_fkey";

-- DropIndex
DROP INDEX "UserSchema_id_homeId_key";

-- AlterTable
ALTER TABLE "UserSchema" ALTER COLUMN "homeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserSchema" ADD CONSTRAINT "UserSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;
