import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AlarmsInfrastructureModule } from '@smart-home/api/alarms/infrastructure';
import { GetAlarmWithLogsQuery } from '@smart-home/shared/requests';
import {
  ConfirmLogHandler,
  CreateLogHandler,
  UpdateDefaultStateHandler,
} from './commands';
import { GetAlarmsByHomeHandler } from './queries';

@Module({
  imports: [CqrsModule, AlarmsInfrastructureModule],
  providers: [
    GetAlarmsByHomeHandler,
    GetAlarmWithLogsQuery,
    CreateLogHandler,
    ConfirmLogHandler,
    UpdateDefaultStateHandler,
  ],
  exports: [CqrsModule],
})
export class AlarmsCqrsModule {}
