import { Module } from '@nestjs/common';
import { RoomInfrastructureModule } from '@smart-home/api/room/infrastructure';
import { UpdateFavouriteHandler } from './commands';
import { GetRoomsOverviewHandler } from './queries';

@Module({
  imports: [RoomInfrastructureModule],
  controllers: [],
  providers: [GetRoomsOverviewHandler, UpdateFavouriteHandler],
})
export class RoomCqrsModule {}
