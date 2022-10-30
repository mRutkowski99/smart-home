import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SceneInfrastructureModule } from '@smart-home/api/scene/infrastructure';
import { UpdateFavouriteHandler } from './commands';
import { GetScenesOverviewHandler } from './queries/get-scenes-overview/get-scenes-overview.handler';

@Module({
  imports: [SceneInfrastructureModule, CqrsModule],
  controllers: [],
  providers: [GetScenesOverviewHandler, UpdateFavouriteHandler],
  exports: [CqrsModule],
})
export class SceneCqrsModule {}
