import { Body, Controller, Get, Headers, Param, Put } from '@nestjs/common';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  UpdateDeviceSetpointPayload,
  UpdateDeviceStatePayload,
} from '@smart-home/shared/device/util-device-payload';
import {
  GetDevicesGroupByRoomQuery,
  UpdateSetpointCommand,
  UpdateStateCommand,
} from '@smart-home/api/device/use-cases';
import { DeviceGroupVm } from '@smart-home/shared/device/util-device-vm';

@Controller(ApiControllerPrefix.Device)
export class DeviceController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('grouped')
  async getGroupedByRoom(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute<GetDevicesGroupByRoomQuery, DeviceGroupVm[]>(
      new GetDevicesGroupByRoomQuery(homeId)
    );
  }

  @Put(':id/setpoint')
  async updateSetpoint(
    @Param('id') id: string,
    @Body() { value }: UpdateDeviceSetpointPayload
  ) {
    await this.commandBus.execute<UpdateSetpointCommand, void>(
      new UpdateSetpointCommand(id, value)
    );
  }

  @Put(':id/state')
  async updateState(
    @Param('id') id: string,
    @Body() { value }: UpdateDeviceStatePayload
  ) {
    await this.commandBus.execute<UpdateStateCommand, void>(
      new UpdateStateCommand(id, value)
    );
  }
}
