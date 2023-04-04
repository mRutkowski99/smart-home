import { Room } from '@smart-home/api/room/domain';
import { roomFactory } from './room.factory';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared';

@Injectable()
export class RoomRepository {
  constructor(private prisma: PrismaService) {}

  async getAllByHomeId(homeId: string): Promise<Room[]> {
    const rooms = await this.prisma.roomSchema.findMany({ where: { homeId } });
    return rooms.map((room) => roomFactory(room));
  }

  async getById(id: string): Promise<Room | null> {
    const room = await this.prisma.roomSchema.findUnique({ where: { id } });
    return room ? roomFactory(room) : null;
  }
}
