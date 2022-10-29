import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SceneInfrastructureModule } from '@smart-home/api/scene/infrastructure';
import { GetScenesOverviewHandler } from './queries/get-scenes-overview/get-scenes-overview.handler';

@Module({
  imports: [SceneInfrastructureModule, CqrsModule],
  controllers: [],
  providers: [GetScenesOverviewHandler],
  exports: [CqrsModule],
})
export class SceneCqrsModule {}
