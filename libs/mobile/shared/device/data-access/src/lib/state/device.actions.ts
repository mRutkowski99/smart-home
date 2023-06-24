import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {DeviceVm} from "@smart-home/shared/device/util-device-vm";

export const DeviceActions = createActionGroup({
    source: 'Shared Device',
    events: {
        'Get Devices': emptyProps(),
        'Get Devices Success': props<{devices: DeviceVm[]}>(),
        'Get Devices Fail': props<{error: string}>(),
        'Update Device Setpoint': props<{ deviceId: string; value: number; newValue: number }>(),
        'Update Device Setpoint Success': emptyProps(),
        'Undo Update Device Setpoint': props<{ deviceId: string; value: number }>(),
        'Update Device State': props<{ deviceId: string; value: boolean }>(),
        'Update Device State Success': emptyProps(),
        'Undo Update Device State': props<{ deviceId: string; value: boolean }>()
    }
})