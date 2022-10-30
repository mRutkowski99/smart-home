import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetScenesOverviewQuery } from '@smart-home/api/scene/cqrs';
import { SceneOverviewDto } from '@smart-home/shared/dto';
import {
  ToggleSceneActiveRequest,
  ToggleSceneFavouriteRequest,
} from '@smart-home/shared/requests';
import { UpdateFavouriteCommand } from '@smart-home/api/scene/cqrs';

@Controller('scene')
export class SceneController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get('overviews/:homeId')
  async getScenesOverviews(
    @Param('homeId') homeId: string
  ): Promise<SceneOverviewDto[]> {
    return this.queryBus.execute<GetScenesOverviewQuery, SceneOverviewDto[]>(
      new GetScenesOverviewQuery(homeId)
    );
  }

  @Patch(':id/toggleFavourite')
  async toggleFavourite(
    @Param('id') id: string,
    @Body() request: ToggleSceneFavouriteRequest
  ): Promise<void> {
    await this.commandBus.execute<UpdateFavouriteCommand, void>(
      new UpdateFavouriteCommand(id, request.value)
    );
  }

  @Patch(':id/toggleActive')
  async toggleActive(
    @Param('id') id: string,
    @Body() request: ToggleSceneActiveRequest
  ): Promise<void> {
    await this.commandBus.execute<UpdateFavouriteCommand, void>(
      new UpdateFavouriteCommand(id, request.value)
    );
  }
}
