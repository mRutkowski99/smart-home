import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AlarmsInfrastructureModule } from '@smart-home/api/alarms/infrastructure';
import {
  ConfirmLogHandler,
  CreateLogHandler,
  UpdateActiveForAllHandler,
  UpdateActiveHandler,
  UpdateDefaultStateHandler,
} from './commands';
import { GetAlarmsByHomeHandler, GetAlarmLogsHandler } from './queries';

@Module({
  imports: [CqrsModule, AlarmsInfrastructureModule],
  providers: [
    GetAlarmsByHomeHandler,
    GetAlarmLogsHandler,
    CreateLogHandler,
    ConfirmLogHandler,
    UpdateDefaultStateHandler,
    UpdateActiveHandler,
    UpdateActiveForAllHandler,
  ],
  exports: [CqrsModule],
})
export class AlarmsCqrsModule {}
