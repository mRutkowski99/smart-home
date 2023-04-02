import { createAction, props } from '@ngrx/store';
import { RoomOverviewVm } from '@smart-home/shared/room/util-room-vm';

enum Types {
  getAllOverview = '[Room] Get All Overview',
  getAllOverviewSuccess = '[Room] Get All Overview Success',
  getAllOverviewFail = '[Room] Get All Overview Fail',
}

export const getAllOverview = createAction(Types.getAllOverview);
export const getAllOverviewSuccess = createAction(
  Types.getAllOverviewSuccess,
  props<{ rooms: RoomOverviewVm[] }>()
);
export const getAllOverviewFail = createAction(
  Types.getAllOverviewFail,
  props<{ error: string }>()
);
