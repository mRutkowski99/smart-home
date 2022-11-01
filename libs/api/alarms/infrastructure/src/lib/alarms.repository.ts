import { Injectable } from '@nestjs/common';
import { Alarm } from '@smart-home/api/alarms/domain';
import { PrismaService } from '@smart-home/api/core/services/prisma-service';
import { AlarmMapper } from './alarm.mapper';

@Injectable()
export class AlarmsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: AlarmMapper
  ) {}
}
