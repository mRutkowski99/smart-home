import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import { Scene } from '@smart-home/api/scene/domain';
import { SceneMapper } from './scene.mapper';

@Injectable()
export class SceneRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: SceneMapper
  ) {}

  async exist(id: string): Promise<boolean> {
    const scene = await this.prisma.sceneSchema.findUnique({ where: { id } });
    return !!scene;
  }

  async getAllForHome(homeId: string): Promise<Scene[]> {
    const scenes = await this.prisma.sceneSchema.findMany({
      where: { homeId },
    });

    return scenes.map((scene) => this.mapper.schemaToDomain(scene));
  }
}
