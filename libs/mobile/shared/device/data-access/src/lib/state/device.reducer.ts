import {DeviceVm} from "@smart-home/shared/device/util-device-vm";
import {StoreStatus} from "@smart-home/shared/util";
import {createReducer, on} from "@ngrx/store";
import {DeviceActions} from "./device.actions";

export const SHARED_DEVICE_FEATURE_KEY = 'sharedScene'

export interface SharedDeviceState {
    devices: DeviceVm[];
    status: StoreStatus;
    error: string | null;
}

const initialState: SharedDeviceState = {
    devices: [],
    status: 'loading',
    error: null
}

export const deviceReducer = createReducer(initialState,
    on(DeviceActions.getDevices, (state) => ({
        ...state,
        status: 'loading',
        error: null
    })),
    on(DeviceActions.getDevicesSuccess, (state, {devices}) => ({
        ...state,
        devices,
        status: 'success'
    })),
    on(DeviceActions.getDevicesFail, (state, {error}) => ({
        ...state,
        error,
        status: 'error'
    })),
    on(DeviceActions.updateDeviceSetpoint, (state, action) => ({
        ...state,
        devices: updateDeviceSetpoint(state.devices, action.deviceId, action.newValue)
    })),
    on(DeviceActions.undoUpdateDeviceSetpoint, (state, action) => ({
        ...state,
        devices: updateDeviceSetpoint(state.devices, action.deviceId, action.value)
    })),
    on(DeviceActions.updateDeviceState, (state, action) => ({
        ...state,
        devices: updateDeviceState(state.devices, action.deviceId, action.value)
    })),
    on(DeviceActions.undoUpdateDeviceState, (state, action) => ({
        ...state,
        devices: updateDeviceState(state.devices, action.deviceId, action.value)
    }))
    )

const updateDeviceSetpoint = (devices: DeviceVm[], id: string, setpoint: number): DeviceVm[] =>
    devices.map(device => device.id === id ? {...device, setpoint} : device)

const updateDeviceState = (devices: DeviceVm[], id: string, state: boolean): DeviceVm[] =>
    devices.map(device => device.id === id ? {...device, state} : device)