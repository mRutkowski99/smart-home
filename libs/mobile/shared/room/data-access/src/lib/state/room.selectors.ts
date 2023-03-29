import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_NAME, SharedRoomState } from './room.reducer';

const featureSelector = createFeatureSelector<SharedRoomState>(FEATURE_NAME);

export const roomOverviewSelector = createSelector(
  featureSelector,
  (state) => state.rooms
);
export const statusSelector = createSelector(
  featureSelector,
  (state) => state.status
);
export const errorSelector = createSelector(
  featureSelector,
  (state) => state.error
);
