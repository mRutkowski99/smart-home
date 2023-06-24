import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SHARED_DEVICE_FEATURE_KEY, SharedDeviceState} from "./device.reducer";

const featureSelector = createFeatureSelector<SharedDeviceState>(SHARED_DEVICE_FEATURE_KEY)
export const devicesVmSelector = createSelector(featureSelector, state => ({
    devices: state.devices,
    status: state.status,
    error: state.error
}))