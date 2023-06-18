import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import { Device } from '@smart-home/api/device/domain';
import { deviceFactory } from './device.factory';

@Injectable()
export class DeviceRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Device | null> {
    const device = await this.prisma.deviceSchema.findUnique({
      where: { id },
      include: { addresses: true },
    });
    return device ? deviceFactory(device) : null;
  }

  async getAllGroupedByRoom(
    homeId: string
  ): Promise<{ roomName: string; devices: Device[] }[]> {
    const devices = await this.prisma.deviceSchema.findMany({
      where: { room: { homeId } },
      include: {
        room: {
          select: { name: true },
        },
      },
    });

    return devices.reduce(
      (
        groups: { roomName: string; devices: Device[] }[],
        device
      ): { roomName: string; devices: Device[] }[] => {
        const index = groups.findIndex(
          (group) => group.roomName === device.room.name
        );
        if (index === -1) {
          return [
            ...groups,
            { roomName: device.room.name, devices: [deviceFactory(device)] },
          ];
        } else {
          return groups.map((group, i) =>
            i === index
              ? {
                  roomName: group.roomName,
                  devices: [...group.devices, deviceFactory(device)],
                }
              : group
          );
        }
      },
      []
    );
  }

  async update(device: Device) {
    await this.prisma.deviceSchema.update({
      where: { id: device.id.value },
      data: {
        name: device.name.value,
        setpoint: device.setpoint,
        valueType: device.valueType,
        state: device.state,
        addresses: {
          deleteMany: { deviceId: device.id.value },
          createMany: {
            data: device.addresses.map((address) => ({
              id: address.id,
              address: address.address,
              addressType: address.addressType,
              controlledValue: address.controlledValue,
            })),
          },
        },
      },
    });
  }
}
