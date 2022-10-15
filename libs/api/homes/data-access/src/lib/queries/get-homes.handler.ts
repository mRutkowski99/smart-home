import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@smart-home/api/core/shared/services/prisma-service';
import { GetHomesQuery } from '@smart-home/api/homes/utils';

@QueryHandler(GetHomesQuery)
export class GetHomesHandler implements IQueryHandler<GetHomesQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetHomesQuery) {
    return this.prisma.home.findMany();
  }
}
