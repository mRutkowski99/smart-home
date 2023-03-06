import { Module } from '@nestjs/common';
import { ApiRoomPresentationModule } from '@smart-home/api/room/presentation';

@Module({
  imports: [ApiRoomPresentationModule],
})
export class ApiShellFeatureModule {}
