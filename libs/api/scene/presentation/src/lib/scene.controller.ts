import { Body, Controller, Get, Headers, Param, Put } from '@nestjs/common';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetSceneDetailsQuery,
  GetScenesOverviewQuery,
  UpdateSceneScheduleCommand,
} from '@smart-home/api/scene/use-cases';
import {
  SceneDetailsVm,
  SceneOverviewVm,
} from '@smart-home/shared/scene/util-scene-vm';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

@Controller(ApiControllerPrefix.Scene)
export class SceneController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

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

  @Put('schedule/:id')
  updateSceneSchedule(
    @Param('id') id: string,
    @Body() { active, days }: UpdateSceneSchedulePayload
  ) {
    return this.commandBus.execute<UpdateSceneScheduleCommand>(
      new UpdateSceneScheduleCommand(
        id,
        active,
        days.map((day) => ({ day: day.dayOfWeek, time: day.time }))
      )
    );
  }
}
