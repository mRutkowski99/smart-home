import { createAction, props } from '@ngrx/store';
import { RoomVm } from '@smart-home/shared/room/util-room-vm';

enum Types {
  GetRoomDetails = '[Room] Get Room Details',
  GetRoomDetailsSuccess = '[Room] Get Room Details Success',
  GetRoomDetailsFail = '[Room] Get Room Details Fail',
  UpdateDeviceSetpoint = '[Room] Update Device Setpoint',
  UpdateDeviceSetpointSuccess = '[Room] Update Device Setpoint Success',
  UndoUpdateDeviceSetpoint = '[Room] Undo Update Device Setpoint',
  UpdateDeviceState = '[Room] Update Device State',
  UpdateDeviceStateSuccess = '[Room] Update Device State Success',
  UndoUpdateDeviceState = '[Room] Undo Update Device State',
}

export const getRoomDetails = createAction(
  Types.GetRoomDetails,
  props<{ roomId: string }>()
);

export const getRoomDetailsSuccess = createAction(
  Types.GetRoomDetailsSuccess,
  props<{ roomDetails: RoomVm }>()
);

export const getRoomDetailsFail = createAction(
  Types.GetRoomDetailsFail,
  props<{ error: string }>()
);

export const updateDeviceSetpoint = createAction(
  Types.UpdateDeviceSetpoint,
  props<{ deviceId: string; value: number; newValue: number }>()
);

export const updateDeviceSetpointSuccess = createAction(
  Types.UpdateDeviceSetpointSuccess
);
export const undoUpdateDeviceSetpoint = createAction(
  Types.UndoUpdateDeviceSetpoint,
  props<{ deviceId: string; value: number }>()
);

export const updateDeviceState = createAction(
  Types.UpdateDeviceState,
  props<{ deviceId: string; value: boolean }>()
);

export const updateDeviceStateSuccess = createAction(
  Types.UpdateDeviceStateSuccess
);
export const undoUpdateDeviceState = createAction(
  Types.UndoUpdateDeviceState,
  props<{ deviceId: string; value: boolean }>()
);
