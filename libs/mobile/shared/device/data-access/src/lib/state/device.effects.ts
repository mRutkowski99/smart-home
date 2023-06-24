import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DeviceApiService} from "../api/device-api.service";
import {DeviceActions} from "./device.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class DeviceEffects {

    getDevices$ = createEffect(() => this.actions$.pipe(
        ofType(DeviceActions.getDevices),
        switchMap(action => this.api.getDevices().pipe(
            map(devices => DeviceActions.getDevicesSuccess({devices})),
            catchError(() => of(DeviceActions.getDevicesFail({error: 'Failed to fetch'})))
        ))
    ))

    updateDeviceSetpoint$ = createEffect(() => this.actions$.pipe(
        ofType(DeviceActions.updateDeviceSetpoint),
        switchMap(action => this.api.updateDeviceSetpoint(action.deviceId, action.newValue).pipe(
            map(() => DeviceActions.updateDeviceSetpointSuccess()),
            catchError(() => of(DeviceActions.undoUpdateDeviceSetpoint({deviceId: action.deviceId, value: action.value})))
        ))
    ))

    updateDeviceState$ = createEffect(() => this.actions$.pipe(
        ofType(DeviceActions.updateDeviceState),
        switchMap(action => this.api.updateDeviceState(action.deviceId, action.value).pipe(
            map(() => DeviceActions.updateDeviceStateSuccess()),
            catchError(() => of(DeviceActions.undoUpdateDeviceState({deviceId: action.deviceId, value: !action.value})))
        ))
    ))

    constructor(private actions$: Actions, private api: DeviceApiService) {
    }
}