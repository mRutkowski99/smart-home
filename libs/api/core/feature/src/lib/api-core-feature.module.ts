import { Module } from '@nestjs/common';
import { AlarmsFeatureModule } from '@smart-home/api/alarms/feature';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { RoomFeatureModule } from '@smart-home/api/room/feature';
import { SceneFeatureModule } from '@smart-home/api/scene/feature';

@Module({
  imports: [
    PrismaServiceModule,
    RoomFeatureModule,
    SceneFeatureModule,
    AlarmsFeatureModule,
  ],
  controllers: [],
})
export class ApiCoreFeatureModule {}
