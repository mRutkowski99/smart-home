import { Module } from '@nestjs/common';
import { RoomCqrsModule } from '@smart-home/api/room/cqrs';
import { RoomController } from './room.controller';

@Module({
  imports: [RoomCqrsModule],
  controllers: [RoomController],
  providers: [],
  exports: [],
})
export class RoomFeatureModule {}
