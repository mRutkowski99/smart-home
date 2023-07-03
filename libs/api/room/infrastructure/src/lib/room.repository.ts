import { Room } from '@smart-home/api/room/domain';
import { roomFactory } from './room.factory';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import {RoomDetailsVm} from "@smart-home/shared/room/util-room-vm";

@Injectable()
export class RoomRepository {
  constructor(private prisma: PrismaService) {}

  async getAllByHomeId(homeId: string): Promise<Room[]> {
    const rooms = await this.prisma.roomSchema.findMany({
      where: { homeId },
      include: { devices: true },
    });
    return rooms.map(roomFactory);
  }

  async getById(id: string): Promise<Room | null> {
    const room = await this.prisma.roomSchema.findUnique({
      where: { id },
      include: { devices: true },
    });
    return room ? roomFactory(room) : null;
  }

  async getRoomsDetails(homeId: string): Promise<RoomDetailsVm[]> {
    return (await this.prisma.roomSchema.findMany({
      where: { homeId },
      include: { devices: {include: {addresses: true}} },
    })).map(schema => ({
      id: schema.id,
      name: schema.name,
      homeId: schema.homeId,
      devices: schema.devices.map(device => ({
        id: device.id,
        name: device.name,
        valueType: device.valueType,
        addresses: device.addresses.map(address => ({
          id: address.id,
          address: address.address,
          addressType: address.addressType,
          controlledValue: address.controlledValue,
        })),
      }))
    }))
  }

  async create(homeId: string, name: string): Promise<void> {
    await this.prisma.roomSchema.create({
      data: {homeId, name, imgUrl: ''}
    })
  }

  async update(room: Room): Promise<void> {
    await this.prisma.roomSchema.update({
          where: {id: room.id.value},
          data: {name: room.name.value, imgUrl: room.imgUrl}
      })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.roomSchema.delete({where: {id}})
  }
}
