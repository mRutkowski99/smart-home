import { Injectable } from '@nestjs/common';
import { SceneSchema } from '@prisma/client';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';

@Injectable()
export class SceneRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllForHome(homeId: string): Promise<SceneSchema[]> {
    return await this.prisma.sceneSchema.findMany({
      where: { homeId },
      orderBy: [{ active: 'desc' }, { favourite: 'desc' }],
    });
  }

  async findById(id: string): Promise<SceneSchema | null> {
    return await this.prisma.sceneSchema.findUnique({ where: { id } });
  }

  async findAndReplace(id: string, scene: SceneSchema): Promise<void> {
    await this.prisma.sceneSchema.update({
      where: { id },
      data: { ...scene },
    });
  }
}
