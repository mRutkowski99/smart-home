import { Module } from '@nestjs/common';
import { ApiSceneInfrastructureModule } from '@smart-home/api/scene/infrastructure';
import { GetScenesOverviewHandler } from './queries/get-scenes-overview';
import { SceneOverviewVmMapper } from './mappers/scene-overview-vm.mapper';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, ApiSceneInfrastructureModule],
  providers: [SceneOverviewVmMapper, GetScenesOverviewHandler],
  exports: [CqrsModule],
})
export class ApiSceneUseCasesModule {}
