import {Controller, Logger} from '@nestjs/common';
import { SmartHubDeviceService } from './smart-hub-device.service';
import {EventPattern} from "@nestjs/microservices";
import {DeviceSetpointUpdated, DeviceStateUpdatedEvent} from "@smart-home/shared/device/util-device-event";

@Controller('device')
export class SmartHubDeviceController {
  constructor(private smartHubDeviceService: SmartHubDeviceService) {}

  @EventPattern(DeviceStateUpdatedEvent.pattern)
  handleDeviceStateUpdated(event: DeviceStateUpdatedEvent) {
    this.smartHubDeviceService.handleStateUpdate(event)
  }

  @EventPattern(DeviceSetpointUpdated.pattern)
  handleDeviceSetpointUpdated(event: DeviceSetpointUpdated) {
    this.smartHubDeviceService.handleSetpointUpdate(event)
  }
}
