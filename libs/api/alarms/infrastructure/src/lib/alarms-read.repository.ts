import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import { AlarmDto, AlarmWithLogsDto } from '@smart-home/shared/dto';
import { AlarmDtoFactory } from './alarm-dto.factory';

type FilterFromParam = 'lastWeek' | 'lastMonth' | 'lastThreeMonths';

@Injectable()
export class AlarmsReadRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: AlarmDtoFactory
  ) {}

  async getAllByHomeId(homeId: string): Promise<AlarmDto[]> {
    const alarms = await this.prisma.alarmSchema.findMany({
      where: { homeId },
      include: { alarmLogs: { where: { confirmed: false } } },
    });

    return alarms.map((alarm) => this.factory.toAlarmDto(alarm));
  }

  async getWithLogsById(
    id: string,
    onlyDanger: boolean,
    from: FilterFromParam
  ): Promise<AlarmWithLogsDto> {
    const alarm = await this.prisma.alarmSchema.findUnique({
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

    return this.factory.toAlarmWithLogsDto(alarm);
  }

  private getFilterDate(param: FilterFromParam): Date {
    if (param === 'lastThreeMonths')
      return dayjs().subtract(3, 'month').toDate();
    else if (param === 'lastMonth')
      return dayjs().subtract(1, 'month').toDate();
    else return dayjs().subtract(1, 'week').toDate();
  }
}
