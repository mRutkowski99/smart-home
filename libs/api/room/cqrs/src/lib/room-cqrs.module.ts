import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomInfrastructureModule } from '@smart-home/api/room/infrastructure';
import { UpdateFavouriteHandler } from './commands';
import { GetRoomDetailsHandler, GetRoomsOverviewHandler } from './queries';

@Module({
  imports: [RoomInfrastructureModule, CqrsModule],
  controllers: [],
  providers: [
    GetRoomsOverviewHandler,
    UpdateFavouriteHandler,
    GetRoomDetailsHandler,
  ],
  exports: [CqrsModule],
})
export class RoomCqrsModule {}
