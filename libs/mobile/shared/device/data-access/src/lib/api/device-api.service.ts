import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiControllerPrefix, getControllerUrl} from "@smart-home/shared/util";
import {Observable} from "rxjs";
import {DeviceVm} from "@smart-home/shared/device/util-device-vm";

@Injectable()
export class DeviceApiService {
    constructor(private http: HttpClient) {
    }

    getDevices(): Observable<DeviceVm[]> {
        return this.http.get<DeviceVm[]>(getControllerUrl(ApiControllerPrefix.Device))
    }

    updateDeviceSetpoint(id: string, value: number) {
        return this.http.put(`${getControllerUrl(ApiControllerPrefix.Device)}/${id}/setpoint`, {value})
    }

    updateDeviceState(id: string, value: boolean) {
        return this.http.put(`${getControllerUrl(ApiControllerPrefix.Device)}/${id}/state`, {value})
    }
}