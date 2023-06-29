import { UsageVm } from '@smart-home/shared/usage/util-usage-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { createReducer, on } from '@ngrx/store';
import { usageActions } from './usage.actions';

export const USAGE_FEATURE_KEY = 'usage';

export interface UsageState {
  usage: UsageVm | null;
  status: StoreStatus;
  error: string | null;
}

const initialState: UsageState = {
  usage: null,
  status: 'loading',
  error: null,
};

export const usageReducer = createReducer(
  initialState,
  on(usageActions.getUsage, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),
  on(usageActions.getUsageSuccess, (state, { usage }) => ({
    ...state,
    usage,
    status: 'success',
  })),
  on(usageActions.getUsageFail, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  }))
);
