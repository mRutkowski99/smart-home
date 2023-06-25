import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";

export const AlarmActions = createActionGroup({
    source: '[Alarm]',
    events: {
        'Get Alarm': emptyProps(),
        'Get Alarm Success': props<{alarm: AlarmOverviewVm | null}>(),
        'Get Alarm Fail': props<{error: string}>(),
        'Update Alarm State': props<{id: string, value: boolean}>(),
        'Update Alarm State Success': emptyProps(),
        'Undo Update Alarm State': props<{id: string, value: boolean}>()
    }
})