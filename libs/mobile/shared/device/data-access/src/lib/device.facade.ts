import {Injectable} from "@angular/core";
import {SharedDeviceState} from "./state/device.reducer";
import {Store} from "@ngrx/store";
import * as Selectors from './state/device.selectors'
import {DeviceActions} from "./state/device.actions";
import {first, map, Observable} from "rxjs";
import {DeviceVm} from "@smart-home/shared/device/util-device-vm";

@Injectable()
export class SharedDeviceFacade {
    constructor(private store: Store<SharedDeviceState>) {
    }

    deviceVm$ = this.store.select(Selectors.devicesVmSelector)

    getDevices() {
        this.store.dispatch(DeviceActions.getDevices())
    }

    updateDeviceState(deviceId: string, value: boolean) {
        this.store.dispatch(DeviceActions.updateDeviceState({deviceId, value}))
    }

    updateDeviceSetpoint(deviceId: string, newValue: number, value: number) {
        this.store.dispatch(DeviceActions.updateDeviceSetpoint({deviceId, value, newValue}))
    }

    getDeviceById(id: string): Observable<DeviceVm | undefined> {
        return this.deviceVm$.pipe(
            map(deviceVm => deviceVm.devices),
            map(devices => devices.find(device => device.id === id)),
            first()
        )
    }
}