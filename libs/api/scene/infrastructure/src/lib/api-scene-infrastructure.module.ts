import { Module } from '@nestjs/common';
import { SceneRepository } from './scene.repository';
import { PrismaServiceModule } from '@smart-home/api/shared/infrastructure';

@Module({
  imports: [PrismaServiceModule],
  providers: [SceneRepository],
  exports: [SceneRepository],
})
export class ApiSceneInfrastructureModule {}
