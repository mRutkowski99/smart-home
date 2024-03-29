import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import { Device } from '@smart-home/api/device/domain';
import { deviceFactory } from './device.factory';
import {AddressType, ControlledValue, ValueType} from "@prisma/client";

@Injectable()
export class DeviceRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(homeId: string): Promise<Device[]> {
    const devices = await this.prisma.deviceSchema.findMany({where: {room: {homeId}}, include: {addresses: true}})
    return devices.map(deviceFactory)
  }

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

  async updateSetpoint(id: string, value: number) {
    this.prisma.deviceSchema.update({
      where: {id},
      data: {setpoint: value}
    })
  }

  async updateState(id: string, value: boolean) {
    this.prisma.deviceSchema.update({
      where: {id},
      data: {state: value}
    })
  }

  async handleSceneDevices(jobs: {deviceId: string, setpoint: number, state: boolean}[]) {
    for (const job of jobs) {
      await this.updateSetpoint(job.deviceId, job.setpoint)
      await this.updateState(job.deviceId, job.state)
    }
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

  async create(device: Device) {
    const newDevice = await this.prisma.deviceSchema.create({
      data: {
        roomId: device.roomId.value,
        name: device.name.value,
        valueType: device.valueType,
        state: device.state,
        setpoint: device.setpoint,
      }
    })

    await this.prisma.deviceAddressSchema.createMany({
      data: device.addresses.map(device => ({
        deviceId: newDevice.id,
        address: device.address,
        addressType: device.addressType,
        controlledValue: device.controlledValue,
      }))
    })
  }

  async delete(id: string) {
    await this.prisma.deviceSchema.delete({where: {id}})
  }
}
