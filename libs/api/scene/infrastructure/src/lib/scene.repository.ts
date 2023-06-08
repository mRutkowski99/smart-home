import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import { Scene } from '@smart-home/api/scene/domain';
import { sceneFactory } from './scene.factory';

@Injectable()
export class SceneRepository {
  private readonly includes = {
    schedule: {
      select: {
        active: true,
        scheduleDays: {
          select: {
            dayOfWeek: true,
            startTimeHours: true,
            startTimeMinutes: true,
          },
        },
      },
    },
    controlledDevices: {
      select: {
        id: true,
        setpoint: true,
        state: true,
        device: {
          select: {
            id: true,
            name: true,
            valueType: true,
          },
        },
      },
    },
  };

  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Scene | null> {
    const scene = await this.prisma.sceneSchema.findUnique({
      where: { id },
      include: this.includes,
    });

    return scene ? sceneFactory(scene) : null;
  }

  async getAllByHomeId(homeId: string): Promise<Scene[]> {
    const scenes = await this.prisma.sceneSchema.findMany({
      where: { homeId },
      include: this.includes,
    });

    return scenes.map(sceneFactory);
  }

  async update(scene: Scene) {
    await this.prisma.sceneSchema.update({
      where: { id: scene.id.value },
      data: {
        id: scene.id.value,
        state: scene.state,
        name: scene.name.value,
        schedule: {
          update: {
            active: scene.schedule?.active,
            scheduleDays: {
              deleteMany: {},
              createMany: {
                data:
                  scene.schedule?.days.map((schedule) => ({
                    dayOfWeek: schedule.dayOfWeek,
                    startTimeHours: schedule.hours,
                    startTimeMinutes: schedule.minutes,
                  })) ?? [],
              },
            },
          },
        },
      },
    });
  }
}
