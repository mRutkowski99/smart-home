import { Controller, Get, Headers } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetRoomsOverviewQuery } from '@smart-home/api/room/use-cases';
import { HOME_ID_HEADER_KEY } from '@smart-home/shared/util-constants';

@Controller('room')
export class RoomController {
  constructor(private queryBus: QueryBus) {}

  @Get('overview')
  async getRoomsOverview(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    console.log(homeId);
    return this.queryBus.execute(new GetRoomsOverviewQuery(homeId));
  }
}
