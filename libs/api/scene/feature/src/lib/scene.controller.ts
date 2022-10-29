import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SceneOverviewDto } from '@smart-home/shared/dto';
import { GetScenesOverviewQuery } from 'libs/api/scene/cqrs/src/lib/queries/get-scenes-overview/get-scenes-overview.query';

@Controller('scene')
export class SceneController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get('overview/:homeId')
  async getScenesOverviews(
    @Param('homeId') homeId: string
  ): Promise<SceneOverviewDto[]> {
    return this.queryBus.execute<GetScenesOverviewQuery, SceneOverviewDto[]>(
      new GetScenesOverviewQuery(homeId)
    );
  }
}
