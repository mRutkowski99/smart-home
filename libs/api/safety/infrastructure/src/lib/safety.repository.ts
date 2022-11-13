import { Injectable } from '@nestjs/common';
import { SafetySchema } from '@prisma/client';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import {
  FilterFromParam,
  getFilterDate,
  threeMonthsAgo,
} from '@smart-home/api/core/utils';
import { SafetyDomainSchema, SafetyLogInput } from './safety-schema.factory';

@Injectable()
export class SafetyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByHomeId(homeId: string): Promise<SafetyDomainSchema[]> {
    return await this.prisma.safetySchema.findMany({
      where: { homeId },
      include: { logs: true },
      orderBy: { name: 'asc' },
    });
  }

  async getWithLogsById(
    id: string,
    onlyDanger: boolean,
    from: FilterFromParam
  ): Promise<SafetyDomainSchema | null> {
    return await this.prisma.safetySchema.findUnique({
      where: { id },
      include: {
        logs: {
          where: {
            createDate: { gte: getFilterDate(from) },
            ...(onlyDanger
              ? { OR: [{ state: 'Danger' }, { state: 'Disabled' }] }
              : {}),
          },
          orderBy: { createDate: 'desc' },
        },
      },
    });
  }

  async findById(id: string): Promise<SafetyDomainSchema | null> {
    return await this.prisma.safetySchema.findUnique({
      where: { id },
      include: {
        logs: { where: { createDate: { gte: threeMonthsAgo } } },
      },
    });
  }

  async findAndReplace(safety: SafetySchema, logs: SafetyLogInput[]) {
    return await this.prisma.safetySchema.update({
      where: { id: safety.id },
      data: {
        ...safety,
        logs: {
          deleteMany: { safetyId: safety.id },
          createMany: { data: [...logs] },
        },
      },
      include: { logs: true },
    });
  }
}
