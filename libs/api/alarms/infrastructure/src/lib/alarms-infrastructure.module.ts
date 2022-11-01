import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { AlarmMapper } from './alarm.mapper';
import { AlarmsRepository } from './alarms.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [AlarmMapper, AlarmsRepository],
})
export class AlarmsInfrastructureModule {}
