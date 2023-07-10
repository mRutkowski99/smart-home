import {createFeatureSelector, createSelector} from "@ngrx/store";
import {WEB_FEATURE_KEY, WebState} from "./reducer";

const featureSelector = createFeatureSelector<WebState>(WEB_FEATURE_KEY)

const homesVmSelector = createSelector(featureSelector, state => ({
    homes: state.homes,
    error: state.homesError,
    status: state.homesStatus
}))

const roomsVmSelector = createSelector(featureSelector, state => ({
    rooms: state.rooms,
    error: state.roomsError,
    status: state.roomsStatus
}))

const alarmVmSelector = createSelector(featureSelector, state => ({
    alarm: state.alarm,
    error: state.alarmError,
    status: state.alarmStatus
}))

const usersVmSelector = createSelector(featureSelector, state => ({
    users: state.users,
    status: state.usersStatus,
    error: state.usersError
}))

export const selectedHomeIdSelector = createSelector(featureSelector, state => state.selectedHomeId)

export const webSelectors = {
    homesVmSelector,
    roomsVmSelector,
    alarmVmSelector,
    usersVmSelector,
    selectedHomeIdSelector
}