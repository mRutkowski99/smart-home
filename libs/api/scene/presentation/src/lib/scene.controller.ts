import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddControlledDeviceCommand,
  GetSceneDetailsQuery,
  GetScenesOverviewQuery,
  RemoveControlledDeviceCommand,
  UpdateControlledDeviceSetpointCommand,
  UpdateControlledDeviceStateCommand,
  UpdateSceneScheduleCommand,
} from '@smart-home/api/scene/use-cases';
import {
  SceneDetailsVm,
  SceneOverviewVm,
} from '@smart-home/shared/scene/util-scene-vm';
import {
  AddControlledDevicePayload,
  UpdateControlledDeviceSetpointPayload,
  UpdateControlledDeviceStatePayload,
  UpdateSceneSchedulePayload,
} from '@smart-home/shared/scene/util-scene-payload';

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

  @Put(':id/device-state')
  updateControlledDeviceState(
    @Param('id') id: string,
    @Body() { state, deviceId }: UpdateControlledDeviceStatePayload
  ) {
    return this.commandBus.execute<UpdateControlledDeviceStateCommand>(
      new UpdateControlledDeviceStateCommand(id, deviceId, state)
    );
  }

  @Put(':id/device-setpoint')
  updateControlledDeviceSetpoint(
    @Param('id') id: string,
    @Body() { setpoint, deviceId }: UpdateControlledDeviceSetpointPayload
  ) {
    return this.commandBus.execute<UpdateControlledDeviceSetpointCommand>(
      new UpdateControlledDeviceSetpointCommand(id, deviceId, setpoint)
    );
  }

  @Delete(':id/controlled-device/:deviceId')
  deleteControlledDevice(
    @Param('id') id: string,
    @Param('deviceId') deviceId: string
  ) {
    return this.commandBus.execute<RemoveControlledDeviceCommand>(
      new RemoveControlledDeviceCommand(id, deviceId)
    );
  }

  @Put(':id/device')
  addControlledDevice(
    @Param('id') id: string,
    @Body() payload: AddControlledDevicePayload
  ) {
    return this.commandBus.execute<AddControlledDeviceCommand>(
      new AddControlledDeviceCommand(
        id,
        payload.deviceId,
        payload.setpoint,
        payload.state,
        payload.valueType
      )
    );
  }
}
