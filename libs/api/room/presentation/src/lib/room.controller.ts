import {Body, Controller, Delete, Get, Headers, Param, Post, Put} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {
  CreateRoomCommand, DeleteRoomCommand,
  GetRoomDetailsQuery, GetRoomsDetailsQuery,
  GetRoomsOverviewQuery, UpdateRoomCommand,
} from '@smart-home/api/room/use-cases';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import {CreateRoomPayload, UpdateRoomPayload} from "@smart-home/shared/room/util-room-payload";

@Controller(ApiControllerPrefix.Room)
export class RoomController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get('overview')
  getRoomsOverview(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute(new GetRoomsOverviewQuery(homeId));
  }

  @Get(':id')
  getRoomDetails(@Param('id') id: string) {
    return this.queryBus.execute(new GetRoomDetailsQuery(id));
  }

  @Get('home/:homeId')
  getRoomsDetails(@Param('homeId') homeId: string) {
    return this.queryBus.execute(new GetRoomsDetailsQuery(homeId))
  }

  @Post()
  createRoom(@Body() payload: CreateRoomPayload) {
    return this.commandBus.execute(new CreateRoomCommand(payload.homeId, payload.name))
  }

  @Put(':id')
  updateRoom(@Param('id') id: string, @Body() payload: UpdateRoomPayload) {
    return this.commandBus.execute(new UpdateRoomCommand(id, payload.name))
  }

  @Delete(':id')
  deleteRoom(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteRoomCommand(id))
  }
}
