import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { SceneMapper } from './scene.mapper';

@Module({
  imports: [PrismaServiceModule],
  controllers: [],
  providers: [SceneMapper],
  exports: [],
})
export class SceneInfrastructureModule {}
