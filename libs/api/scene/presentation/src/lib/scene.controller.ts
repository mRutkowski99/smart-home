import {
  Body,
  Controller,
  Delete,
  Get,
  Headers, Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddControlledDeviceCommand,
  CreateSceneCommand,
  DeleteSceneCommand,
  GetSceneDetailsQuery,
  GetScenesOverviewQuery,
  RemoveControlledDeviceCommand, SceneStartedCommand,
  UpdateControlledDeviceSetpointCommand,
  UpdateControlledDeviceStateCommand,
  UpdateSceneScheduleCommand,
  UpdateSceneStateCommand,
} from '@smart-home/api/scene/use-cases';
import {
  SceneDetailsVm,
  SceneOverviewVm,
} from '@smart-home/shared/scene/util-scene-vm';
import {
  AddControlledDevicePayload,
  CreateScenePayload, SceneStartedPayload,
  UpdateControlledDeviceSetpointPayload,
  UpdateControlledDeviceStatePayload,
  UpdateSceneSchedulePayload,
} from '@smart-home/shared/scene/util-scene-payload';
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Controller(ApiControllerPrefix.Scene)
export class SceneController {

  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
  }

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

  @Put(':id/state')
  updateSceneState(
    @Param('id') id: string,
    @Body() payload: { state: boolean },
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    return this.commandBus.execute<UpdateSceneStateCommand>(
      new UpdateSceneStateCommand(id, payload.state, homeId)
    );
  }

  @Put('schedule/:id')
  updateSceneSchedule(
    @Param('id') id: string,
    @Body() { active, days }: UpdateSceneSchedulePayload,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    return this.commandBus.execute<UpdateSceneScheduleCommand>(
      new UpdateSceneScheduleCommand(
        id,
        active,
        days.map((day) => ({ day: day.dayOfWeek, time: day.time })),
          homeId
      )
    );
  }

  @Put(':id/device-state')
  updateControlledDeviceState(
    @Param('id') id: string,
    @Body() { state, deviceId }: UpdateControlledDeviceStatePayload,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    return this.commandBus.execute<UpdateControlledDeviceStateCommand>(
      new UpdateControlledDeviceStateCommand(id, deviceId, state, homeId)
    );
  }

  @Put(':id/device-setpoint')
  updateControlledDeviceSetpoint(
    @Param('id') id: string,
    @Body() { setpoint, deviceId }: UpdateControlledDeviceSetpointPayload,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    return this.commandBus.execute<UpdateControlledDeviceSetpointCommand>(
      new UpdateControlledDeviceSetpointCommand(id, deviceId, setpoint, homeId)
    );
  }

  @Delete(':id/controlled-device/:deviceId')
  deleteControlledDevice(
    @Param('id') id: string,
    @Param('deviceId') deviceId: string,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    return this.commandBus.execute<RemoveControlledDeviceCommand>(
      new RemoveControlledDeviceCommand(id, deviceId, homeId)
    );
  }

  @Put(':id/device')
  addControlledDevice(
    @Param('id') id: string,
    @Body() payload: AddControlledDevicePayload,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    return this.commandBus.execute<AddControlledDeviceCommand>(
      new AddControlledDeviceCommand(
        id,
        payload.deviceId,
        payload.setpoint,
        payload.state,
        payload.valueType,
          homeId
      )
    );
  }

  @Delete(':id')
  deleteScene(@Param('id') id: string, @Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.commandBus.execute<DeleteSceneCommand>(
      new DeleteSceneCommand(id, homeId)
    );
  }

  @Post()
  createScene(
    @Body() payload: CreateScenePayload,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    this.commandBus.execute<CreateSceneCommand>(
      new CreateSceneCommand(
        homeId,
        payload.name,
        { active: payload.schedule.active, schedule: payload.schedule.days },
        payload.devices
      )
    );
  }

  @Put(':id/started')
  sceneStarted(@Param('id') id: string, @Headers(HOME_ID_HEADER_KEY) homeId: string) {
    this.commandBus.execute<SceneStartedCommand>(new SceneStartedCommand(id, homeId))
  }
}
