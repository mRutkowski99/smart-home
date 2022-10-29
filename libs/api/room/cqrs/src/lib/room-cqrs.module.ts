import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomInfrastructureModule } from '@smart-home/api/room/infrastructure';
import { UpdateFavouriteHandler } from './commands';
import { GetRoomsOverviewHandler } from './queries';

@Module({
  imports: [RoomInfrastructureModule, CqrsModule],
  controllers: [],
  providers: [GetRoomsOverviewHandler, UpdateFavouriteHandler],
  exports: [CqrsModule],
})
export class RoomCqrsModule {}
