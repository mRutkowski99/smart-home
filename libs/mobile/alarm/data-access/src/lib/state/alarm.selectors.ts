import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ALARM_FEATURE_KEY, AlarmState} from "./alarm.reducer";

const featureSelector = createFeatureSelector<AlarmState>(ALARM_FEATURE_KEY)

const alarmVmSelector = createSelector(featureSelector, state => ({
    alarm: state.alarm,
    status: state.status,
    error: state.error
}))

export const alarmSelectors = {
    alarmVmSelector
}