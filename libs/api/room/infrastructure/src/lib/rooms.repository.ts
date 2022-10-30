import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import { Room } from '@smart-home/api/room/domain';
import { RoomMapper } from './room.mapper';

@Injectable()
export class RoomsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: RoomMapper
  ) {}

  async getAllForHome(homeId: string): Promise<Room[]> {
    const rooms = await this.prisma.roomSchema.findMany({ where: { homeId } });
    return rooms.map((room) => this.mapper.schemaToDomain(room));
  }

  async exist(id: string): Promise<boolean> {
    const room = await this.prisma.roomSchema.findUnique({ where: { id } });
    return !!room;
  }

  async getById(id: string): Promise<Room> {
    const room = await this.prisma.roomSchema.findUnique({ where: { id } });
    return this.mapper.schemaToDomain(room);
  }

  async findAndReplace(id: string, room: Room): Promise<void> {
    await this.prisma.roomSchema.update({
      where: { id },
      data: { ...this.mapper.domainToSchema(room) },
    });
  }
}
