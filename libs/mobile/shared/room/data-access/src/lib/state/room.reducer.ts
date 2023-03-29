import { RoomOverviewVm } from '@smart-home/shared/room/util-room-vm';
import { StoreStatus } from '@smart-home/shared/util-models';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './room.actions';

export const FEATURE_NAME = 'sharedRooms';

export interface SharedRoomState {
  rooms: RoomOverviewVm[] | null;
  status: StoreStatus;
  error: string | null;
}

const initialState: SharedRoomState = {
  rooms: null,
  error: null,
  status: 'loading',
};

export const roomReducer = createReducer(
  initialState,
  on(Actions.getAllOverview, (state) => ({
    ...state,
    error: null,
    status: 'loading',
  })),
  on(Actions.getAllOverviewSuccess, (state, { rooms }) => ({
    ...state,
    rooms,
    status: 'success',
  })),
  on(Actions.getAllOverviewFail, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  }))
);