import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { ApiRoomUseCasesModule } from '@smart-home/api/room/use-cases';

@Module({
  imports: [ApiRoomUseCasesModule],
  controllers: [RoomController],
})
export class ApiRoomPresentationModule {}
