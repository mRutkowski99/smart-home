import { Module } from '@nestjs/common';
import { SceneController } from './scene.controller';

@Module({
  controllers: [SceneController],
  providers: [],
  exports: [],
})
export class SceneFeatureModule {}
