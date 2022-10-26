import { Module } from '@nestjs/common';
import { RoomInfrastructureModule } from '@smart-home/api/room/infrastructure';
import { GetRoomsOverviewHandler } from './queries';

@Module({
  imports: [RoomInfrastructureModule],
  controllers: [],
  providers: [GetRoomsOverviewHandler],
  exports: [],
})
export class RoomCqrsModule {}
