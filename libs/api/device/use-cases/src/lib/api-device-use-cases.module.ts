import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiDeviceInfrastructureModule } from '@smart-home/api/device/infrastructure';
import { UpdateSetpointHandler } from './commands/update-setpoint';
import { UpdateStateHandler } from './commands/update-state';
import { DeviceVmMapper } from './mappers/device-vm.mapper';
import { GetDevicesGroupByRoomHandler } from './queries/get-devices-group-by-room';
import {SmartHubClient, WebsocketGateway} from '@smart-home/api/shared/infrastructure';
import {SceneStartedHandler} from "./events/handle-scene-started";
import {GetDevicesHandler} from "./queries/get-devices";
import {CreateDeviceHandler} from "./commands/create-device";
import {UpdateDeviceHandler} from "./commands/update-device";
import {DeleteDeviceHandler} from "./commands/delete-device";

@Module({
  imports: [
    CqrsModule,
    ApiDeviceInfrastructureModule,
    SmartHubClient
  ],
  providers: [
      WebsocketGateway,
    UpdateSetpointHandler,
    UpdateStateHandler,
    DeviceVmMapper,
    GetDevicesGroupByRoomHandler,
    SceneStartedHandler,
      GetDevicesHandler,
    CreateDeviceHandler,
    UpdateDeviceHandler,
    DeleteDeviceHandler
  ],
  exports: [CqrsModule],
})
export class ApiDeviceUseCasesModule {}
