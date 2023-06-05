import { Controller, Get, Headers, Param } from '@nestjs/common';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetSceneDetailsQuery,
  GetScenesOverviewQuery,
} from '@smart-home/api/scene/use-cases';
import {
  SceneDetailsVm,
  SceneOverviewVm,
} from '@smart-home/shared/scene/util-scene-vm';

@Controller(ApiControllerPrefix.Scene)
export class SceneController {
  constructor(private queryBus: QueryBus) {}

  @Get('overview')
  getScenesOverview(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute<GetScenesOverviewQuery, SceneOverviewVm[]>(
      new GetScenesOverviewQuery(homeId)
    );
  }

  @Get(':id')
  getSceneDetails(@Param('id') id: string) {
    return this.queryBus.execute<GetSceneDetailsQuery, SceneDetailsVm>(
      new GetSceneDetailsQuery(id)
    );
  }
}
