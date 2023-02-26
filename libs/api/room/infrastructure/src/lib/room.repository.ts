import { IRoomRepository } from '@smart-home/api/room/use-cases';
import { RoomDto, RoomOverviewDto } from '@smart-home/shared/room/util-dto';
import { PrismaService } from '@smart-home/api/shared/util-prisma-service';
import { roomOverviewDtoMapper } from './mappers/room-overview-dto.mapper';
import { roomDtoMapper } from './mappers/room-dto.mapper';

export class RoomRepository implements IRoomRepository {
  constructor(private prisma: PrismaService) {}

  async getAllOverview(homeId: string): Promise<RoomOverviewDto[]> {
    const rooms = await this.prisma.roomSchema.findMany({ where: { homeId } });
    return rooms.map((room) => roomOverviewDtoMapper(room));
  }

  async getById(id: string): Promise<RoomDto | null> {
    const room = await this.prisma.roomSchema.findUnique({ where: { id } });
    return room ? roomDtoMapper(room) : null;
  }
}
