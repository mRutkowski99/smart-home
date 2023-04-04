import { Module } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { ApiSharedUtilPrismaServiceModule } from '@smart-home/api/shared';

@Module({
  imports: [ApiSharedUtilPrismaServiceModule],
  providers: [RoomRepository],
  exports: [RoomRepository],
})
export class ApiRoomInfrastructureModule {}
