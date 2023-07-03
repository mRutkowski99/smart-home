import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {HomeVm} from "@smart-home/shared/home/util-home-vm";
import {RoomDetailsVm} from "@smart-home/shared/room/util-room-vm";
import {AlarmDetailsVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {CreateHomePayload} from "@smart-home/shared/home/util-home-payload";
import {CreateDevicePayload, UpdateDevicePayload} from "@smart-home/shared/device/util-device-payload";
import {CreateAlarmPayload} from "@smart-home/shared/alarm/util-alarm-payload";
import {CreateRoomPayload, UpdateRoomPayload} from "@smart-home/shared/room/util-room-payload";

export const webActions = createActionGroup({
    source: 'Web',
    events: {
        'Get Homes': emptyProps(),
        'Get Homes Success': props<{homes: HomeVm[]}>(),
        'Get Homes Fail': props<{error: string}>(),
        'Create Home': props<{payload: CreateHomePayload}>(),
        'Create Home Success': emptyProps(),
        'Create Home Fail': props<{error: string}>(),
        'Delete Home': props<{id: string}>(),
        'Delete Home Success': emptyProps(),
        'Delete Home Fail': props<{error: string}>(),

        'Get Rooms': props<{homeId: string}>(),
        'Get Rooms Success': props<{rooms: RoomDetailsVm[]}>(),
        'Get Rooms Fail': props<{error: string}>(),
        'Create Room': props<{payload: CreateRoomPayload}>(),
        'Create Room Success': emptyProps(),
        'Create Room Fail': props<{error: string}>(),
        'Update Room': props<{payload: UpdateRoomPayload}>(),
        'Update Room Success': emptyProps(),
        'Update Room Fail': props<{error: string}>(),
        'Delete Room': props<{roomId: string}>(),
        'Delete Room Success': emptyProps(),
        'Delete Room Fail': props<{error: string}>(),

        'Create Device': props<{payload: CreateDevicePayload}>(),
        'Create Device Success': emptyProps(),
        'Create Device Fail': props<{error: string}>(),
        'Update Device': props<{payload: UpdateDevicePayload}>(),
        'Update Device Success': emptyProps(),
        'Update Device Fail': props<{error: string}>(),
        'Delete Device': props<{deviceId: string}>(),
        'Delete Device Success': emptyProps(),
        'Delete Device Fail': props<{error: string}>(),

        'Get Alarm': props<{homeId: string}>(),
        'Get Alarm Success': props<{alarm: AlarmDetailsVm | null}>(),
        'Get Alarm Fail': props<{error: string}>(),
        'Create Alarm': props<{payload: CreateAlarmPayload}>(),
        'Create Alarm Success': emptyProps(),
        'Create Alarm Fail': props<{error: string}>(),
        'Delete Alarm': props<{alarmId: string}>(),
        'Delete Alarm Success': emptyProps(),
        'Delete Alarm Fail': props<{error: string}>(),
    }
})