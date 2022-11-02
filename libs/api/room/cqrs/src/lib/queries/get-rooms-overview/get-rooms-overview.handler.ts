import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  RoomDtoFactory,
  RoomsRepository,
} from '@smart-home/api/room/infrastructure';
import { RoomOverviewDto } from '@smart-home/shared/dto';
import { GetRoomsOverviewQuery } from './get-rooms-overview.query';

@QueryHandler(GetRoomsOverviewQuery)
export class GetRoomsOverviewHandler
  implements IQueryHandler<GetRoomsOverviewQuery>
{
  constructor(
    private readonly repository: RoomsRepository,
    private readonly factory: RoomDtoFactory
  ) {}

  async execute(query: GetRoomsOverviewQuery): Promise<RoomOverviewDto[]> {
    const { houseId } = query;
    const rooms = await this.repository.getAllForHome(houseId);

    return rooms.map((room) => this.factory.toRoomOverviewDto(room));
  }
}
