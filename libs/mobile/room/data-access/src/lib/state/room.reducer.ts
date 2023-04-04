import { RoomVm } from '@smart-home/shared/room/util-room-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './room.actions';

export const ROOM_FEATURE_NAME = 'room';

export interface RoomState {
  roomDetails: RoomVm | null;
  roomDetailsStatus: StoreStatus;
  roomDetailsError: string | null;
}

const initialState: RoomState = {
  roomDetails: null,
  roomDetailsStatus: 'loading',
  roomDetailsError: null,
};

export const roomReducer = createReducer(
  initialState,
  on(Actions.getRoomDetails, (state) => ({
    ...state,
    roomDetailsStatus: 'loading',
    roomDetailsError: null,
  })),
  on(Actions.getRoomDetailsSuccess, (state, { roomDetails }) => ({
    ...state,
    roomDetailsStatus: 'success',
    roomDetails,
  })),
  on(Actions.getRoomDetailsFail, (state, { error }) => ({
    ...state,
    roomDetailsStatus: 'error',
    roomDetailsError: error,
  }))
);
