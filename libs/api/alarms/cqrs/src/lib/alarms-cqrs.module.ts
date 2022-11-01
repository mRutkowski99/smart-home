import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AlarmsInfrastructureModule } from '@smart-home/api/alarms/infrastructure';
import { GetAlarmsByHomeHandler } from './queries';

@Module({
  imports: [CqrsModule, AlarmsInfrastructureModule],
  providers: [GetAlarmsByHomeHandler],
  exports: [CqrsModule],
})
export class AlarmsCqrsModule {}
