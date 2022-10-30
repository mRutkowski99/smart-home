import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { SceneMapper } from './scene.mapper';
import { SceneRepository } from './scene.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [SceneMapper, SceneRepository],
  exports: [SceneMapper, SceneRepository],
})
export class SceneInfrastructureModule {}
