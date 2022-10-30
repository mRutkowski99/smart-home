import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SceneInfrastructureModule } from '@smart-home/api/scene/infrastructure';
import { UpdateFavouriteHandler, UpdateActiveHandler } from './commands';
import { GetScenesOverviewHandler } from './queries';

@Module({
  imports: [SceneInfrastructureModule, CqrsModule],
  controllers: [],
  providers: [
    GetScenesOverviewHandler,
    UpdateFavouriteHandler,
    UpdateActiveHandler,
  ],
  exports: [CqrsModule],
})
export class SceneCqrsModule {}
