import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAlarmInfrastructureModule } from '@smart-home/api/alarm/infrastructure';
import { AlarmOverviewVmMapper } from './mappers/alarm-overview-vm.mapper';
import { GetAlarmOverviewHandler } from './queries/get-alarm-overview';
import {
  SmartHubClient,
  WebsocketGateway,
} from '@smart-home/api/shared/infrastructure';
import { UpdateAlarmHandler } from './commands/update-alarm-state';
import { UpdateAlarmStatusHandler } from './commands/update-alarm-status';

@Module({
  imports: [CqrsModule, ApiAlarmInfrastructureModule, SmartHubClient],
  providers: [
    AlarmOverviewVmMapper,
    GetAlarmOverviewHandler,
    UpdateAlarmHandler,
    WebsocketGateway,
    UpdateAlarmStatusHandler,
  ],
  exports: [CqrsModule],
})
export class ApiAlarmUseCasesModule {}
