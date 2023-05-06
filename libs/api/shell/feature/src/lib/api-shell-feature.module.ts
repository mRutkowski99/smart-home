import { Module } from '@nestjs/common';
import { ApiRoomPresentationModule } from '@smart-home/api/room/presentation';
import { ApiDevicePresentationModule } from '@smart-home/api/device/presentation';

@Module({
  imports: [ApiRoomPresentationModule, ApiDevicePresentationModule],
})
export class ApiShellFeatureModule {}
