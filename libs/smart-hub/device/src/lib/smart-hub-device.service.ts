import {Injectable, Logger} from '@nestjs/common';
import {DeviceSetpointUpdated, DeviceStateUpdatedEvent} from "@smart-home/shared/device/util-device-event";

@Injectable()
export class SmartHubDeviceService {
    handleStateUpdate(event: DeviceStateUpdatedEvent) {
        Logger.log(JSON.stringify(event))
    }

    handleSetpointUpdate(event: DeviceSetpointUpdated) {
        Logger.log(JSON.stringify(event))
    }
}
