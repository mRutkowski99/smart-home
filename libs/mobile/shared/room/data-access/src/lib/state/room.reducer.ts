import { RoomOverviewVm } from '@smart-home/shared/room/util-room-vm';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './room.actions';
import { StoreStatus } from '@smart-home/shared/util';

export const SHARED_ROOM_FEATURE_NAME = 'sharedRoom';

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
