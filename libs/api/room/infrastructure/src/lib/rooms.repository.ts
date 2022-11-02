import { Injectable } from '@nestjs/common';
import { RoomSchema } from '@prisma/client';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllForHome(homeId: string): Promise<RoomSchema[]> {
    return await this.prisma.roomSchema.findMany({
      where: { homeId },
      orderBy: [{ favourite: 'desc' }],
    });
  }

  async findById(id: string): Promise<RoomSchema | null> {
    return await this.prisma.roomSchema.findUnique({ where: { id } });
  }

  async findAndReplace(id: string, room: RoomSchema): Promise<void> {
    await this.prisma.roomSchema.update({
      where: { id },
      data: { ...room },
    });
  }
}
