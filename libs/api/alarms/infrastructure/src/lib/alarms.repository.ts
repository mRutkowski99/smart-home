import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import { AlarmLogSchema, AlarmSchema } from '@prisma/client';

type FilterFromParam = 'lastWeek' | 'lastMonth' | 'lastThreeMonths';
type AlarmDomainSchema = AlarmSchema & {
  alarmLogs: AlarmLogSchema[];
};

@Injectable()
export class AlarmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByHomeId(homeId: string): Promise<AlarmDomainSchema[]> {
    return await this.prisma.alarmSchema.findMany({
      where: { homeId },
      include: { alarmLogs: { where: { confirmed: false } } },
    });
  }

  async getWithLogsById(
    id: string,
    onlyDanger: boolean,
    from: FilterFromParam
  ): Promise<AlarmDomainSchema | null> {
    return await this.prisma.alarmSchema.findUnique({
      where: { id },
      include: {
        alarmLogs: {
          where: {
            createDate: { gte: this.getFilterDate(from) },
            ...(onlyDanger ? { danger: true } : {}),
          },
          orderBy: { createDate: 'desc' },
        },
      },
    });
  }

  async findAlarmById(id: string): Promise<AlarmDomainSchema | null> {
    return await this.prisma.alarmSchema.findUnique({
      where: { id },
      include: {
        alarmLogs: { where: { createDate: { gte: this.threeMonthsAgo } } },
      },
    });
  }

  async findAllByHomeId(homeId: string): Promise<AlarmDomainSchema[] | null> {
    return await this.prisma.alarmSchema.findMany({
      where: { homeId },
      include: {
        alarmLogs: { where: { createDate: { gte: this.threeMonthsAgo } } },
      },
    });
  }

  async findAndReplace(
    id: string,
    alarm: AlarmSchema,
    logs: AlarmLogSchema[]
  ): Promise<void> {
    await this.prisma.alarmSchema.update({
      where: { id },
      data: {
        ...alarm,
        alarmLogs: {
          deleteMany: { alarmId: id },
          createMany: { data: [...logs] },
        },
      },
      include: { alarmLogs: true },
    });
  }

  private readonly threeMonthsAgo = dayjs().subtract(3, 'month').toDate();

  private getFilterDate(param: FilterFromParam): Date {
    if (param === 'lastThreeMonths')
      return dayjs().subtract(3, 'month').toDate();
    else if (param === 'lastMonth')
      return dayjs().subtract(1, 'month').toDate();
    else return dayjs().subtract(1, 'week').toDate();
  }
}
