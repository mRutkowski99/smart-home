import { createAction, props } from '@ngrx/store';
import { RoomVm } from '@smart-home/shared/room/util-room-vm';

enum Types {
  GetRoomDetails = '[Room] Get Room Details',
  GetRoomDetailsSuccess = '[Room] Get Room Details Success',
  GetRoomDetailsFail = '[Room] Get Room Details Fail',
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
