import {createFeatureSelector, createSelector} from "@ngrx/store";
import {USAGE_FEATURE_KEY, UsageState} from "./usage.reducer";

const featureSelector = createFeatureSelector<UsageState>(USAGE_FEATURE_KEY)
const usageVmSelector = createSelector(featureSelector, state => ({
    usage: state.usage,
    error: state.error,
    status: state.status
}))

export const usageSelectors = {
    usageVmSelector
}