import { Controller, Get, Headers, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetRoomDetailsQuery,
  GetRoomsOverviewQuery,
} from '@smart-home/api/room/use-cases';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';

@Controller(ApiControllerPrefix.Room)
export class RoomController {
  constructor(private queryBus: QueryBus) {}

  @Get('overview')
  getRoomsOverview(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute(new GetRoomsOverviewQuery(homeId));
  }

  @Get(':id')
  getRoomDetails(@Param('id') id: string) {
    return this.queryBus.execute(new GetRoomDetailsQuery(id));
  }
}
