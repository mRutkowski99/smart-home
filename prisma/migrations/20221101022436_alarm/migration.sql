-- CreateTable
CREATE TABLE "AlarmSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "defaulState" BOOLEAN NOT NULL,
    "homeId" TEXT NOT NULL,

    CONSTRAINT "AlarmSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlarmLogSchema" (
    "id" TEXT NOT NULL,
    "danger" BOOLEAN NOT NULL,
    "message" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "confirmed" BOOLEAN,
    "confirmedAt" TIMESTAMP(3),
    "confirmedBy" TEXT NOT NULL,
    "alarmId" TEXT NOT NULL,

    CONSTRAINT "AlarmLogSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlarmSchema_id_homeId_key" ON "AlarmSchema"("id", "homeId");

-- CreateIndex
CREATE UNIQUE INDEX "AlarmLogSchema_id_alarmId_key" ON "AlarmLogSchema"("id", "alarmId");

-- AddForeignKey
ALTER TABLE "AlarmSchema" ADD CONSTRAINT "AlarmSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlarmLogSchema" ADD CONSTRAINT "AlarmLogSchema_alarmId_fkey" FOREIGN KEY ("alarmId") REFERENCES "AlarmSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
