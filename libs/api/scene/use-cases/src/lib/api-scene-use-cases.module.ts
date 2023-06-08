import { Module } from '@nestjs/common';
import { ApiSceneInfrastructureModule } from '@smart-home/api/scene/infrastructure';
import { GetScenesOverviewHandler } from './queries/get-scenes-overview';
import { SceneOverviewVmMapper } from './mappers/scene-overview-vm.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { SceneDetailsVmMapper } from './mappers/scene-details-vm.mapper';
import { GetSceneDetailsHandler } from './queries/get-scene-details';
import { UpdateSceneScheduleHandler } from './commands/update-scene-schedule';

@Module({
  imports: [CqrsModule, ApiSceneInfrastructureModule],
  providers: [
    SceneOverviewVmMapper,
    SceneDetailsVmMapper,
    GetScenesOverviewHandler,
    GetSceneDetailsHandler,
    UpdateSceneScheduleHandler,
  ],
  exports: [CqrsModule],
})
export class ApiSceneUseCasesModule {}
