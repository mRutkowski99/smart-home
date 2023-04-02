import { Controller, Get, Headers } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetRoomsOverviewQuery } from '@smart-home/api/room/use-cases';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';

@Controller(ApiControllerPrefix.Room)
export class RoomController {
  constructor(private queryBus: QueryBus) {}

  @Get('overview')
  async getRoomsOverview(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute(new GetRoomsOverviewQuery(homeId));
  }
}
