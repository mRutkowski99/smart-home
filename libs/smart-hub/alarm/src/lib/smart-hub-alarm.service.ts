import {Injectable, Logger} from '@nestjs/common';
import {ControlDeviceService} from "@smart-home/smart-hub/common";
import {AlarmStateChangedEvent} from "@smart-home/shared/alarm/util-alarm-event";
import {HttpService} from "@nestjs/axios";
import {ApiControllerPrefix, getControllerUrl, HOME_ID_HEADER_KEY} from "@smart-home/shared/util";

const homeId = '51e93387-8e2c-4b59-88ca-e6f4f43c56f6'

@Injectable()
export class SmartHubAlarmService {
    constructor(private controlService: ControlDeviceService, private http: HttpService) {
    }

    handleStateChanged(event: AlarmStateChangedEvent) {
        Logger.log(`Alarm ${event.state ? 'activated' : 'deactivated'}`)
        this.controlService.writeDigital(event.state, event.address)
    }

    handleStatusChanged(value: boolean) {
        this.http.put(`${getControllerUrl(ApiControllerPrefix.Alarm)}`, {value}, {
            headers: {[HOME_ID_HEADER_KEY]: homeId}
        })
    }
}
