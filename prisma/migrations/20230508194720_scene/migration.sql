-- AlterTable
ALTER TABLE "DeviceSchema" ALTER COLUMN "setpoint" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "SceneSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "homeId" TEXT NOT NULL,

    CONSTRAINT "SceneSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SceneScheduleSchema" (
    "id" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "cron" TEXT NOT NULL,
    "sceneId" TEXT NOT NULL,

    CONSTRAINT "SceneScheduleSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControlledDeviceSchema" (
    "id" TEXT NOT NULL,
    "setpointAtStart" DOUBLE PRECISION NOT NULL,
    "stateAtStart" BOOLEAN NOT NULL,
    "setpointAtEnd" DOUBLE PRECISION,
    "stateAtEnd" BOOLEAN,
    "sceneId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "ControlledDeviceSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SceneSchema_id_homeId_key" ON "SceneSchema"("id", "homeId");

-- CreateIndex
CREATE UNIQUE INDEX "SceneScheduleSchema_sceneId_key" ON "SceneScheduleSchema"("sceneId");

-- AddForeignKey
ALTER TABLE "SceneSchema" ADD CONSTRAINT "SceneSchema_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "HomeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneScheduleSchema" ADD CONSTRAINT "SceneScheduleSchema_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "SceneSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlledDeviceSchema" ADD CONSTRAINT "ControlledDeviceSchema_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "SceneSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlledDeviceSchema" ADD CONSTRAINT "ControlledDeviceSchema_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "DeviceSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
