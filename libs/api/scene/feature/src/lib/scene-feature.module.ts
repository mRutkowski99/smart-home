import { Module } from '@nestjs/common';
import { SceneCqrsModule } from '@smart-home/api/scene/cqrs';
import { SceneController } from './scene.controller';

@Module({
  imports: [SceneCqrsModule],
  controllers: [SceneController],
})
export class SceneFeatureModule {}
