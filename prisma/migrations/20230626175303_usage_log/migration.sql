-- CreateTable
CREATE TABLE "UsageLogSchema" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "homeId" TEXT NOT NULL,

    CONSTRAINT "UsageLogSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsageLogSchema_homeId_key" ON "UsageLogSchema"("homeId");

-- AddForeignKey
ALTER TABLE "UsageLogSchema" ADD CONSTRAINT "UsageLogSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
