import { Module } from '@nestjs/common';
import {AlarmRepository} from "./alarm.repository";
import {PrismaServiceModule} from "@smart-home/api/shared/infrastructure";

@Module({
  imports: [PrismaServiceModule],
  providers: [AlarmRepository],
  exports: [AlarmRepository]
})
export class ApiAlarmInfrastructureModule {}
