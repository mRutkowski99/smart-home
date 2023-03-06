import { Module } from '@nestjs/common';
import { ApiSharedUtilPrismaServiceModule } from '@smart-home/api/shared/util-prisma-service';
import { RoomRepository } from './room.repository';

@Module({
  imports: [ApiSharedUtilPrismaServiceModule],
  providers: [RoomRepository],
  exports: [RoomRepository],
})
export class ApiRoomInfrastructureModule {}
