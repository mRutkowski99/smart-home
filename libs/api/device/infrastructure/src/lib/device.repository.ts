import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import { Device } from '@smart-home/api/device/domain';
import { deviceFactory } from './device.factory';

@Injectable()
export class DeviceRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Device | null> {
    const device = await this.prisma.deviceSchema.findUnique({ where: { id } });
    return device ? deviceFactory(device) : null;
  }

  async update(device: Device) {
    await this.prisma.deviceSchema.update({
      where: { id: device.id.value },
      data: {
        name: device.name.value,
        setpoint: device.setpoint,
        valueType: device.valueType,
        state: device.state,
      },
    });
  }
}
