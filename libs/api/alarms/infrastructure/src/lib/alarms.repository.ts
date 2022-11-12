import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import { AlarmSchema } from '@prisma/client';
import {
  AlarmDomainSchema,
  AlarmInputSchemas,
  AlarmLogInput,
} from './alarm-schema.factory';
import {
  FilterFromParam,
  getFilterDate,
  threeMonthsAgo,
} from '@smart-home/api/core/utils';

@Injectable()
export class AlarmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByHomeId(homeId: string): Promise<AlarmDomainSchema[]> {
    return await this.prisma.alarmSchema.findMany({
      where: { homeId },
      include: { alarmLogs: { where: { confirmed: false } } },
      orderBy: { name: 'asc' },
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
            createDate: { gte: getFilterDate(from) },
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
        alarmLogs: { where: { createDate: { gte: threeMonthsAgo } } },
      },
    });
  }

  async findAllByHomeId(homeId: string): Promise<AlarmDomainSchema[] | null> {
    return await this.prisma.alarmSchema.findMany({
      where: { homeId },
      include: {
        alarmLogs: { where: { createDate: { gte: threeMonthsAgo } } },
      },
    });
  }

  async findAndReplace(
    alarm: AlarmSchema,
    logs: AlarmLogInput[]
  ): Promise<void> {
    await this.findAndReplaceQuery(alarm, logs);
  }

  async findAndReplaceMany(alarms: AlarmInputSchemas[]) {
    await this.prisma.$transaction(
      alarms.map((alarm) => this.findAndReplaceQuery(...alarm))
    );
  }

  private findAndReplaceQuery(alarm: AlarmSchema, logs: AlarmLogInput[]) {
    return this.prisma.alarmSchema.update({
      where: { id: alarm.id },
      data: {
        ...alarm,
        alarmLogs: {
          deleteMany: { alarmId: alarm.id },
          createMany: { data: [...logs] },
        },
      },
      include: { alarmLogs: true },
    });
  }
}
