import { Module } from '@nestjs/common';
import { SceneInfrastructureModule } from '@smart-home/api/scene/infrastructure';
import { GetScenesOverviewHandler } from './queries/get-scenes-overview/get-scenes-overview.handler';

@Module({
  imports: [SceneInfrastructureModule],
  controllers: [],
  providers: [GetScenesOverviewHandler],
})
export class SceneCqrsModule {}
