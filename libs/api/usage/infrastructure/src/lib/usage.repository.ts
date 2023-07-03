import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
// import { UsageLog } from '@smart-home/api/usage/domain';
// import { getPeriodDates, Period } from '@smart-home/shared/util';

@Injectable()
export class UsageRepository {
  constructor(private prisma: PrismaService) {}

  // async getLogs(homeId: string, period: Period): Promise<UsageLog[]> {
  //   const periodDates = getPeriodDates(period);
  //
  //   if (!periodDates) throw new Error('Provide valid time period');
  //
  //   const { from, to } = periodDates;
  //   return this.prisma.usageLogSchema.findMany({
  //     where: { homeId, AND: { date: { gte: from, lte: to } } },
  //     orderBy: { date: 'asc' },
  //   });
  // }

  async addLog(homeId: string, value: number) {
    await this.prisma.usageLogSchema.create({
      data: { homeId, value, date: new Date() },
    });
  }
}
