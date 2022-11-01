import { Injectable } from '@nestjs/common';
import { Alarm } from '@smart-home/api/alarms/domain';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import dayjs = require('dayjs');
import { AlarmSchemaFactory } from './alarm-schema.factory';

@Injectable()
export class AlarmsWriteRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: AlarmSchemaFactory
  ) {}

  async findAlarmById(id: string): Promise<Alarm> {
    const alarm = await this.prisma.alarmSchema.findUnique({
      where: { id },
      include: {
        alarmLogs: { where: { createDate: { gte: this.threeMonthsAgo } } },
      },
    });

    return this.factory.createFromSchema(alarm, [], []);
  }

  async findAndReplace(id: string, alarm: Alarm): Promise<void> {
    const { alarm: alarmSchema, logs } = this.factory.create(alarm);

    await this.prisma.alarmSchema.update({
      where: { id },
      data: {
        ...alarmSchema,
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
