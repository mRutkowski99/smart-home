import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRoomsOverviewHandler } from './queries/get-rooms-overview';
import { ApiRoomInfrastructureModule } from '@smart-home/api/room/infrastructure';
import { RoomOverviewVmMapper } from './mappers/room-overview-vm.mapper';

@Module({
  imports: [CqrsModule, ApiRoomInfrastructureModule],
  providers: [RoomOverviewVmMapper, GetRoomsOverviewHandler],
  exports: [CqrsModule],
})
export class ApiRoomUseCasesModule {}
