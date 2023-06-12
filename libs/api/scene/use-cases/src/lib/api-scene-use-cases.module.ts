import { Module } from '@nestjs/common';
import { ApiSceneInfrastructureModule } from '@smart-home/api/scene/infrastructure';
import { GetScenesOverviewHandler } from './queries/get-scenes-overview';
import { SceneOverviewVmMapper } from './mappers/scene-overview-vm.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { SceneDetailsVmMapper } from './mappers/scene-details-vm.mapper';
import { GetSceneDetailsHandler } from './queries/get-scene-details';
import { UpdateSceneScheduleHandler } from './commands/update-scene-schedule';
import { UpdateControlledDeviceStateHandler } from './commands/update-controlled-device-state';
import { UpdateControlledDeviceSetpointHandler } from './commands/update-controlled-device-setpoint';
import { RemoveControlledDeviceHandler } from './commands/remove-controlled-device';
import { AddControlledDeviceHandler } from './commands/add-controlled-device';

@Module({
  imports: [CqrsModule, ApiSceneInfrastructureModule],
  providers: [
    SceneOverviewVmMapper,
    SceneDetailsVmMapper,
    GetScenesOverviewHandler,
    GetSceneDetailsHandler,
    UpdateSceneScheduleHandler,
    UpdateControlledDeviceStateHandler,
    UpdateControlledDeviceSetpointHandler,
    RemoveControlledDeviceHandler,
    AddControlledDeviceHandler,
  ],
  exports: [CqrsModule],
})
export class ApiSceneUseCasesModule {}
