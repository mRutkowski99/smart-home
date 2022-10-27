import { Injectable } from '@nestjs/common';
import { RoomSchema } from '@prisma/client';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import { Room } from '@smart-home/api/room/domain';
import { RoomMapper } from './room.mapper';

@Injectable()
export class RoomsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: RoomMapper
  ) {}

  async getAllForHome(homeId: string): Promise<RoomSchema[]> {
    return await this.prisma.roomSchema.findMany({ where: { homeId } });
  }

  async exist(id: string): Promise<boolean> {
    const room = await this.prisma.roomSchema.findUnique({ where: { id } });
    return !!room ? true : false;
  }

  async getById(id: string): Promise<RoomSchema> {
    return await this.prisma.roomSchema.findUnique({ where: { id } });
  }

  async findAndReplace(id: string, room: Room): Promise<void> {
    this.prisma.roomSchema.update({
      where: { id },
      data: { ...this.mapper.domainToSchema(room) },
    });
  }
}
