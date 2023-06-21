import {Injectable, Logger} from '@nestjs/common';
import {DeviceSetpointUpdated, DeviceStateUpdatedEvent} from "@smart-home/shared/device/util-device-event";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class SmartHubDeviceService {
    constructor(private httpService: HttpService) {
    }

    handleStateUpdate(event: DeviceStateUpdatedEvent) {
        Logger.log(JSON.stringify(event))
    }

    handleSetpointUpdate(event: DeviceSetpointUpdated) {
        Logger.log(JSON.stringify(event))
    }
}
