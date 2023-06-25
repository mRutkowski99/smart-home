import { Module } from '@nestjs/common';
import {AlarmController} from "./alarm.controller";
import {ApiAlarmUseCasesModule} from "@smart-home/api/alarm/use-cases";

@Module({
  imports: [ApiAlarmUseCasesModule],
  controllers: [AlarmController],
})
export class ApiAlarmPresentationModule {}
