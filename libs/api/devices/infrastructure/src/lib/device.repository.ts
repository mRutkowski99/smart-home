import { DeviceSchema } from '@prisma/client';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';

export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllForRoom(roomId: string): Promise<DeviceSchema[]> {
    return await this.prisma.deviceSchema.findMany({ where: { roomId } });
  }

  async findById(id: string): Promise<DeviceSchema | null> {
    return await this.prisma.deviceSchema.findUnique({ where: { id } });
  }

  async findAndReplace(device: DeviceSchema): Promise<void> {
    await this.prisma.deviceSchema.update({
      where: { id: device.id },
      data: { ...device },
    });
  }
}
