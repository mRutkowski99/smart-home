import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiControllerPrefix } from '@smart-home/shared/util';
import { CommandBus } from '@nestjs/cqrs';
import {
  UpdateDeviceSetpointPayload,
  UpdateDeviceStatePayload,
} from '@smart-home/shared/device/util-device-payload';
import {
  UpdateSetpointCommand,
  UpdateStateCommand,
} from '@smart-home/api/device/use-cases';

@Controller(ApiControllerPrefix.Device)
export class DeviceController {
  constructor(private commandBus: CommandBus) {}

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
