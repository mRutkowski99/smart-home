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
import {AlarmDetailVmMapper} from "./mappers/alarm-detail-vm.mapper";
import {GetAlarmDetailHandler} from "./queries/get-alarm-detail";
import {CreateAlarmHandler} from "./commands/create-alarm";
import {DeleteAlarmHandler} from "./commands/delete-alarm";

@Module({
  imports: [CqrsModule, ApiAlarmInfrastructureModule, SmartHubClient],
  providers: [
    AlarmDetailVmMapper,
    AlarmOverviewVmMapper,
    GetAlarmOverviewHandler,
    UpdateAlarmHandler,
    WebsocketGateway,
    UpdateAlarmStatusHandler,
    GetAlarmDetailHandler,
    CreateAlarmHandler,
    DeleteAlarmHandler
  ],
  exports: [CqrsModule],
})
export class ApiAlarmUseCasesModule {}
