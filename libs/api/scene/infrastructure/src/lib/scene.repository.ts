import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import {ControlledDevice, Scene, SceneSchedule} from '@smart-home/api/scene/domain';
import { sceneFactory } from './scene.factory';
import { CreateSceneCommand } from '../../../use-cases/src/lib/commands/create-scene';
import { SceneSchema } from '@prisma/client';
import { DeviceValueType } from '@smart-home/shared/util';

@Injectable()
export class SceneRepository {
  private readonly includes = {
    schedule: {
      select: {
        id: true,
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
            room: {
              select: {
                id: true,
                name: true,
              },
            },
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

  async delete(id: string) {
    await this.prisma.sceneScheduleDaySchema.deleteMany({
      where: { sceneSchedule: { sceneId: id } },
    });
    await this.prisma.sceneScheduleSchema.delete({ where: { sceneId: id } });
    await this.prisma.sceneControlledDeviceSchema.deleteMany({
      where: { sceneId: id },
    });
    await this.prisma.deviceSchema.delete({ where: { id } });
  }

  async create(command: CreateSceneCommand): Promise<SceneSchema> {
    return this.prisma.sceneSchema.create({
      data: {
        homeId: command.homeId,
        name: command.name,
        state: false,
        schedule: {
          create: {
            active: command.schedule.active,
            scheduleDays: {
              createMany: {
                data: command.schedule.schedule.map((day) => ({
                  dayOfWeek: day.dayOfWeek,
                  startTimeHours: day.time.hours,
                  startTimeMinutes: day.time.minutes,
                })),
              },
            },
          },
        },
        controlledDevices: {
          createMany: {
            data: command.devices.map((device) => ({
              deviceId: device.deviceId,
              state: device.state,
              setpoint: device.setpoint,
            })),
          },
        },
      },
    });
  }

  async updateState(id: string, state: boolean) {
    await this.prisma.sceneSchema.update({ where: { id }, data: { state } });
  }

  async addControlledDevice(
    sceneId: string,
    deviceId: string,
    setpoint: number,
    state: boolean
  ) {
    await this.prisma.sceneControlledDeviceSchema.create({
      data: {
        sceneId,
        deviceId,
        state,
        setpoint,
      },
    });
  }

  async removeControlledDevice(sceneId: string, deviceId: string) {
    const controlledDevice = await this.getControlledDevice(sceneId, deviceId)
    if (!controlledDevice) return
    await this.prisma.sceneControlledDeviceSchema.delete({where: {id: controlledDevice.id}})
  }

  async updateControlledDeviceSetpoint(sceneId: string, deviceId: string, setpoint: number) {
    const controlledDevice = await this.getControlledDevice(sceneId, deviceId)
    if (!controlledDevice) return
    await this.prisma.sceneControlledDeviceSchema.update({where: {id: controlledDevice.id}, data: {setpoint}})
  }

  async updateControlledDeviceState(sceneId: string, deviceId: string, state: boolean) {
    const controlledDevice = await this.getControlledDevice(sceneId, deviceId)
    if (!controlledDevice) return
    await this.prisma.sceneControlledDeviceSchema.update({where: {id: controlledDevice.id}, data: {state}})
  }

  async updateSceneSchedule(sceneId: string, schedule: SceneSchedule | null) {
    if (!schedule) return

    const sceneSchedule = await this.prisma.sceneScheduleSchema.findUnique({where: {sceneId}})
    if (!sceneSchedule) return

    await this.prisma.sceneScheduleDaySchema.deleteMany({where: {sceneSchedule: {sceneId}}})

    await this.prisma.sceneScheduleDaySchema.createMany({data: schedule.days.map(day => ({
        sceneScheduleId: sceneSchedule.id,
        dayOfWeek: day.dayOfWeek,
        startTimeHours: day.hours,
        startTimeMinutes: day.minutes
      }))})

    await this.prisma.sceneScheduleSchema.update({where: {sceneId}, data: {active: schedule.active}})
  }

  private async getControlledDevice(sceneId: string, deviceId: string) {
    return this.prisma.sceneControlledDeviceSchema.findFirst({where: {sceneId, deviceId}})
  }

  async update(scene: Scene) {
    await this.prisma.sceneSchema.update({
      where: { id: scene.id.value },
      data: {
        id: scene.id.value,
        state: scene.state,
        name: scene.name.value,
        controlledDevices: {
          deleteMany: { sceneId: scene.id.value },
          createMany: {
            data: scene.controlledDevices.map((device) => ({
              id: device.id.value,
              state: device.state,
              deviceId: device.deviceId.value,
              setpoint: device.setpoint,
            })),
          },
        },
        schedule: {
          update: {
            active: scene.schedule?.active,
            scheduleDays: {
              deleteMany: { sceneScheduleId: scene.schedule?.id.value },
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
