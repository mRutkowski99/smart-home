import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {StoreStatus} from "@smart-home/shared/util";
import {createReducer, on} from "@ngrx/store";
import {AlarmActions} from "./alarm.actions";

export const ALARM_FEATURE_KEY = 'alarm'

export interface AlarmState {
    alarm: AlarmOverviewVm | null;
    status: StoreStatus;
    error: string | null;
}

const initialState: AlarmState = {
    alarm: null,
    status: 'loading',
    error: null
}

export const alarmReducer = createReducer(initialState,
    on(AlarmActions.getAlarm, state => ({
        ...state,
        status: 'loading',
        error: null
    })),
    on(AlarmActions.getAlarmSuccess, (state, action) => ({
        ...state,
        alarm: action.alarm,
        status: 'success'
    })),
    on(AlarmActions.getAlarmFail, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error
    })),
    on(AlarmActions.updateAlarmState, (state, action) => ({
        ...state,
        alarm: state.alarm ? {...state.alarm, state: action.value} : null
    })),
    on(AlarmActions.undoUpdateAlarmState, (state, action) => ({
        ...state,
        alarm: state.alarm ? {...state.alarm, state: action.value} : null
    }))
    )