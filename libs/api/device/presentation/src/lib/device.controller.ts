import {Body, Controller, Delete, Get, Header, Headers, Param, Post, Put} from '@nestjs/common';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateDevicePayload, UpdateDevicePayload,
  UpdateDeviceSetpointPayload,
  UpdateDeviceStatePayload,
} from '@smart-home/shared/device/util-device-payload';
import {
  CreateDeviceCommand, DeleteDeviceCommand,
  GetDevicesGroupByRoomQuery, GetDevicesQuery, UpdateDeviceCommand,
  UpdateSetpointCommand,
  UpdateStateCommand,
} from '@smart-home/api/device/use-cases';
import {DeviceGroupVm, DeviceVm} from '@smart-home/shared/device/util-device-vm';

@Controller(ApiControllerPrefix.Device)
export class DeviceController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getDevices(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute<GetDevicesQuery, DeviceVm[]>(
        new GetDevicesQuery(homeId)
    )
  }

  @Get('grouped')
  async getGroupedByRoom(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute<GetDevicesGroupByRoomQuery, DeviceGroupVm[]>(
      new GetDevicesGroupByRoomQuery(homeId)
    );
  }

  @Put(':id/setpoint')
  async updateSetpoint(
    @Param('id') id: string,
    @Body() { value }: UpdateDeviceSetpointPayload,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    await this.commandBus.execute<UpdateSetpointCommand, void>(
      new UpdateSetpointCommand(id, value, homeId)
    );
  }

  @Put(':id/state')
  async updateState(
    @Param('id') id: string,
    @Body() { value }: UpdateDeviceStatePayload,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    await this.commandBus.execute<UpdateStateCommand, void>(
      new UpdateStateCommand(id, value, homeId)
    );
  }

  @Post()
  async createDevice(@Body() payload: CreateDevicePayload) {
    await this.commandBus.execute<CreateDeviceCommand>(
        new CreateDeviceCommand(payload.roomId, payload.name, payload.valueType, payload.addresses)
    )
  }

  @Put(':id')
  async updateDevice(@Param('id') id: string, @Body() payload: UpdateDevicePayload) {
    await this.commandBus.execute<UpdateDeviceCommand>(new UpdateDeviceCommand(id, payload.name,payload.addresses ))
  }

  @Delete(':id')
  async deleteDevice(@Param('id') id: string) {
    await this.commandBus.execute<DeleteDeviceCommand>(new DeleteDeviceCommand(id))
  }
}
