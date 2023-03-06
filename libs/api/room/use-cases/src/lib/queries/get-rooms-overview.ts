import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoomRepository } from '@smart-home/api/room/infrastructure';
import { RoomOverviewVm } from '@smart-home/shared/room/util-room-vm';
import { RoomOverviewVmMapper } from '../mappers/room-overview-vm.mapper';

export class GetRoomsOverviewQuery {
  constructor(public readonly homeId: string) {}
}

@QueryHandler(GetRoomsOverviewQuery)
export class GetRoomsOverviewHandler
  implements IQueryHandler<GetRoomsOverviewQuery, RoomOverviewVm[]>
{
  constructor(
    private repository: RoomRepository,
    private mapper: RoomOverviewVmMapper
  ) {}

  async execute({ homeId }: GetRoomsOverviewQuery): Promise<RoomOverviewVm[]> {
    return this.mapper.mapAll(await this.repository.getAllByHomeId(homeId));
  }
}
