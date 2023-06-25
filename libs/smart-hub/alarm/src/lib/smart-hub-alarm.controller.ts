import { Controller } from '@nestjs/common';
import { SmartHubAlarmService } from './smart-hub-alarm.service';
import {EventPattern} from "@nestjs/microservices";
import {AlarmStateChangedEvent} from "@smart-home/shared/alarm/util-alarm-event";

@Controller('alarm')
export class SmartHubAlarmController {
  constructor(private smartHubAlarmService: SmartHubAlarmService) {}

  @EventPattern(AlarmStateChangedEvent.pattern)
  handleAlarmStateChange(event: AlarmStateChangedEvent) {
    this.smartHubAlarmService.handleStateChanged(event)
  }
}
