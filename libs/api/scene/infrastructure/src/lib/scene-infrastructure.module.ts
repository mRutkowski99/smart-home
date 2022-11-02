import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { SceneDtoFactory } from './scene-dto.factory';
import { SceneSchemaFactory } from './scene-schema.factory';
import { SceneRepository } from './scene.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [SceneSchemaFactory, SceneDtoFactory, SceneRepository],
  exports: [SceneSchemaFactory, SceneDtoFactory, SceneRepository],
})
export class SceneInfrastructureModule {}
