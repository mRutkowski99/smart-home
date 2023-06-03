import { Module } from '@nestjs/common';
import { ApiSceneUseCasesModule } from '@smart-home/api/scene/use-cases';
import { SceneController } from './scene.controller';

@Module({
  imports: [ApiSceneUseCasesModule],
  controllers: [SceneController],
})
export class ApiScenePresentationModule {}
