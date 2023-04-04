import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHARED_ROOM_FEATURE_NAME, SharedRoomState } from './room.reducer';

const featureSelector = createFeatureSelector<SharedRoomState>(
  SHARED_ROOM_FEATURE_NAME
);

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
