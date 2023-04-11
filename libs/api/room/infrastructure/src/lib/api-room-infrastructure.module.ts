import { Module } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { PrismaServiceModule } from '@smart-home/api/shared/infrastructure';

@Module({
  imports: [PrismaServiceModule],
  providers: [RoomRepository],
  exports: [RoomRepository],
})
export class ApiRoomInfrastructureModule {}
