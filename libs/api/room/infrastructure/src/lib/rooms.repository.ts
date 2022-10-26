import { Injectable } from '@nestjs/common';
import { RoomSchema } from '@prisma/client';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllForHome(homeId: string): Promise<RoomSchema[]> {
    return await this.prisma.roomSchema.findMany({ where: { homeId } });
  }
}
