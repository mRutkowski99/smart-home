import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiDeviceInfrastructureModule } from '@smart-home/api/device/infrastructure';
import { UpdateSetpointHandler } from './commands/update-setpoint';
import { UpdateStateHandler } from './commands/update-state';
import { DeviceVmMapper } from './mappers/device-vm.mapper';
import { GetDevicesGroupByRoomHandler } from './queries/get-devices-group-by-room';

@Module({
  imports: [CqrsModule, ApiDeviceInfrastructureModule],
  providers: [
    UpdateSetpointHandler,
    UpdateStateHandler,
    DeviceVmMapper,
    GetDevicesGroupByRoomHandler,
  ],
  exports: [CqrsModule],
})
export class ApiDeviceUseCasesModule {}
