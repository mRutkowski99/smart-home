import { IQueryHandler } from '@nestjs/cqrs';
import { RoomOverviewDto } from '@smart-home/shared/room/util-dto';
import { IRoomRepository } from '../abstracts/room-repository.abstract';

export interface GetRoomsOverviewQuery {
  readonly homeId: string;
}

export class GetRoomsOverviewHandler
  implements IQueryHandler<GetRoomsOverviewQuery>
{
  constructor(private repository: IRoomRepository) {}

  async execute({ homeId }: GetRoomsOverviewQuery): Promise<RoomOverviewDto[]> {
    return this.repository.getAllOverview(homeId);
  }
}
