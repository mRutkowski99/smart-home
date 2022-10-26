import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  RoomsRepository,
  RoomMapper,
} from '@smart-home/api/room/infrastructure';
import { RoomOverviewDto } from '@smart-home/shared/dto';
import { GetRoomsOverviewQuery } from './get-rooms-overview.query';

@QueryHandler(GetRoomsOverviewQuery)
export class GetRoomsOverviewHandler
  implements IQueryHandler<GetRoomsOverviewQuery>
{
  constructor(
    private readonly repository: RoomsRepository,
    private readonly mapper: RoomMapper
  ) {}

  async execute(query: GetRoomsOverviewQuery): Promise<RoomOverviewDto[]> {
    const { houseId } = query;
    const rooms = await this.repository.getAllForHome(houseId);

    return rooms.map((room) => this.mapper.schemaToOverviewDto(room));
  }
}
