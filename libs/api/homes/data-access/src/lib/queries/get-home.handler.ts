import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@smart-home/api/core/shared/services/prisma-service';
import { GetHomeQuery } from '@smart-home/api/homes/utils';
import { HomeWithRoomsVm } from '@smart-home/shared/data-access';

@QueryHandler(GetHomeQuery)
export class GetHomeHandler implements IQueryHandler<GetHomeQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetHomeQuery): Promise<HomeWithRoomsVm> {
    const { id } = query;

    return this.prisma.home.findUnique({
      where: { id },
      include: { rooms: true },
    });
  }
}
