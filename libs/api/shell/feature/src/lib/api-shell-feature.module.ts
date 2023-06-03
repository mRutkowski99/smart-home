import { Module } from '@nestjs/common';
import { ApiRoomPresentationModule } from '@smart-home/api/room/presentation';
import { ApiDevicePresentationModule } from '@smart-home/api/device/presentation';
import { ApiScenePresentationModule } from '@smart-home/api/scene/presentation';

@Module({
  imports: [
    ApiRoomPresentationModule,
    ApiDevicePresentationModule,
    ApiScenePresentationModule,
  ],
})
export class ApiShellFeatureModule {}
