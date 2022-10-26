import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { RoomMapper } from './room.mapper';
import { RoomsRepository } from './rooms.repository';

@Module({
  imports: [PrismaServiceModule],
  controllers: [],
  providers: [RoomMapper, RoomsRepository],
  exports: [],
})
export class RoomInfrastructureModule {}
