import { Injectable } from '@nestjs/common';
import { AlarmLogSchema, AlarmSchema } from '@prisma/client';
import { Alarm } from '@smart-home/api/alarms/domain';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import dayjs = require('dayjs');
import { AlarmSchemaFactory } from './alarm-schema.factory';

type AlarmDomainSchema = AlarmSchema & {
  alarmLogs: AlarmLogSchema[];
};

@Injectable()
export class AlarmsWriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAlarmById(id: string): Promise<AlarmDomainSchema | null> {
    return await this.prisma.alarmSchema.findUnique({
      where: { id },
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
}
