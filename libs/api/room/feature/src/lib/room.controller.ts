import { Controller, Get } from '@nestjs/common';
import { Body, Param, Patch } from '@nestjs/common/decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ToggleRoomFavouriteRequest } from '@smart-home/shared/requests';
import {
  GetRoomsOverviewQuery,
  UpdateFavouriteCommand,
} from '@smart-home/api/room/cqrs';
import { RoomOverviewDto } from '@smart-home/shared/dto';

@Controller('room')
export class RoomController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get('overviews/:houseId')
  async getRoomsOverviews(
    @Param('houseId') houseId: string
  ): Promise<RoomOverviewDto[]> {
    return this.queryBus.execute<GetRoomsOverviewQuery, RoomOverviewDto[]>(
      new GetRoomsOverviewQuery(houseId)
    );
  }

  @Patch(':id/toggleFavourite')
  async toggleFavourite(
    @Param('id') id: string,
    @Body() request: ToggleRoomFavouriteRequest
  ): Promise<void> {
    await this.commandBus.execute<UpdateFavouriteCommand, void>(
      new UpdateFavouriteCommand(id, request.value)
    );
  }
}
