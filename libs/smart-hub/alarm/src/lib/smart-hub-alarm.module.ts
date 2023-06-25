import { Module } from '@nestjs/common';
import { SmartHubAlarmController } from './smart-hub-alarm.controller';
import { SmartHubAlarmService } from './smart-hub-alarm.service';
import {ControlDeviceService} from "@smart-home/smart-hub/common";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [SmartHubAlarmController, HttpModule],
  providers: [SmartHubAlarmService, ControlDeviceService],
  exports: [SmartHubAlarmService],
})
export class SmartHubAlarmModule {}
