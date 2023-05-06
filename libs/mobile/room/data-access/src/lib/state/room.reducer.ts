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
  })),
  on(Actions.updateDeviceSetpoint, (state, { deviceId, newValue }) => ({
    ...updateDeviceSetpoint(state, deviceId, newValue),
  })),
  on(Actions.undoUpdateDeviceSetpoint, (state, { deviceId, value }) => ({
    ...updateDeviceSetpoint(state, deviceId, value),
  })),
  on(Actions.updateDeviceState, (state, { deviceId, value }) => ({
    ...updateDeviceState(state, deviceId, value),
  })),
  on(Actions.undoUpdateDeviceState, (state, { deviceId, value }) => ({
    ...updateDeviceState(state, deviceId, value),
  }))
);

const updateDeviceSetpoint = (
  state: RoomState,
  deviceId: string,
  newValue: number
): RoomState => {
  if (state.roomDetails === null) return state;
  const devices = state.roomDetails.devices.map((device) => {
    if (device.id === deviceId) {
      return {
        ...device,
        setpoint: newValue,
      };
    }
    return device;
  });

  return {
    ...state,
    roomDetails: {
      ...state.roomDetails,
      devices,
    },
  };
};

const updateDeviceState = (
  state: RoomState,
  deviceId: string,
  newState: boolean
): RoomState => {
  if (state.roomDetails === null) return state;
  const devices = state.roomDetails.devices.map((device) => {
    if (device.id === deviceId) {
      return {
        ...device,
        state: newState,
      };
    }
    return device;
  });

  return {
    ...state,
    roomDetails: {
      ...state.roomDetails,
      devices,
    },
  };
};
