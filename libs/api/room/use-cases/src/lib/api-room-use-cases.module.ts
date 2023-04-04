import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRoomsOverviewHandler } from './queries/get-rooms-overview';
import { ApiRoomInfrastructureModule } from '@smart-home/api/room/infrastructure';
import { RoomOverviewVmMapper } from './mappers/room-overview-vm.mapper';
import { RoomVmMapper } from './mappers/room-vm.mapper';
import { GetRoomDetailsHandler } from './queries/get-room-details';

@Module({
  imports: [CqrsModule, ApiRoomInfrastructureModule],
  providers: [
    RoomOverviewVmMapper,
    RoomVmMapper,
    GetRoomsOverviewHandler,
    GetRoomDetailsHandler,
  ],
  exports: [CqrsModule],
})
export class ApiRoomUseCasesModule {}
