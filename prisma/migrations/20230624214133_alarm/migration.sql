-- CreateTable
CREATE TABLE "AlarmSchema" (
    "id" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "homeId" TEXT NOT NULL,

    CONSTRAINT "AlarmSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlarmSchema_homeId_key" ON "AlarmSchema"("homeId");

-- AddForeignKey
ALTER TABLE "AlarmSchema" ADD CONSTRAINT "AlarmSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
