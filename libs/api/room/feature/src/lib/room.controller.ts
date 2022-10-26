import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { QueryBus } from '@nestjs/cqrs';
import { GetRoomsOverviewQuery } from '@smart-home/api/room/cqrs';
import { RoomOverviewDto } from '@smart-home/shared/dto';

@Controller('room')
export class RoomController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('overviews/:houseId')
  async getRoomsOverviews(
    @Param('houseId') houseId: string
  ): Promise<RoomOverviewDto[]> {
    return this.queryBus.execute<GetRoomsOverviewQuery, RoomOverviewDto[]>(
      new GetRoomsOverviewQuery(houseId)
    );
  }
}
