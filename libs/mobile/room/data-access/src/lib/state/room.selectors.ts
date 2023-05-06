import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROOM_FEATURE_NAME, RoomState } from './room.reducer';

const featureSelector = createFeatureSelector<RoomState>(ROOM_FEATURE_NAME);

export const roomDetailsSelector = createSelector(
  featureSelector,
  (state) => state.roomDetails
);

export const roomDetailsStatusSelector = createSelector(
  featureSelector,
  (state) => state.roomDetailsStatus
);

export const roomDetailsErrorSelector = createSelector(
  featureSelector,
  (state) => state.roomDetailsError
);

export const roomDeviceSelector = (id: string) =>
  createSelector(
    featureSelector,
    (state) =>
      state.roomDetails?.devices.find((device) => device.id === id) ?? null
  );
