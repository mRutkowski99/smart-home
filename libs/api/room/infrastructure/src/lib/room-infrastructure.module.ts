import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { RoomDtoFactory } from './room-dto.factory';
import { RoomSchemaFactory } from './room-schema.factory';
import { RoomsRepository } from './rooms.repository';

@Module({
  imports: [PrismaServiceModule],
  controllers: [],
  providers: [RoomsRepository, RoomDtoFactory, RoomSchemaFactory],
  exports: [RoomsRepository, RoomDtoFactory, RoomSchemaFactory],
})
export class RoomInfrastructureModule {}
